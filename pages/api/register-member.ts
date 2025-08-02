
import { NextApiRequest, NextApiResponse } from 'next';
import { query, withTransaction } from '@/lib/db';

// Input sanitization helper
function sanitizeInput(input: string): string {
  if (!input || typeof input !== 'string') return ''
  return input
    .trim()
    .replace(/<script[^>]*>.*?<\/script>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '')
    .substring(0, 1000)
}

// Enhanced email validation
function isValidEmail(email: string): boolean {
  if (!email || typeof email !== 'string') return false
  const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/
  return emailRegex.test(email) && email.length <= 254
}

// Rate limiting store (in-memory for development)
const rateLimitStore = new Map<string, { count: number; resetTime: number }>()

function checkRateLimit(key: string, maxRequests: number = 5, windowMs: number = 300000): boolean {
  const now = Date.now()
  
  const record = rateLimitStore.get(key)
  if (!record || now > record.resetTime) {
    rateLimitStore.set(key, { count: 1, resetTime: now + windowMs })
    return true
  }
  
  if (record.count >= maxRequests) {
    return false
  }
  
  record.count++
  return true
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    console.log('Method not allowed:', req.method);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  console.log('Received registration request');
  
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      country,
      startupStage,
      linkedin,
      website,
      tier,
      paymentIntentId,
      amount = 0,
    } = req.body;

    // Rate limiting check
    const clientIP = req.headers['x-forwarded-for'] as string || req.socket.remoteAddress || 'unknown'
    const sanitizedEmail = email ? sanitizeInput(email.toLowerCase()) : ''
    const rateLimitKey = `register_${sanitizedEmail || clientIP}`
    
    if (!checkRateLimit(rateLimitKey)) {
      return res.status(429).json({ error: 'Too many registration attempts. Please wait before trying again.' });
    }

    console.log('Validating request data...');
    
    // Validate required fields with specific error messages
    const missingFields = [];
    if (!firstName) missingFields.push('firstName');
    if (!lastName) missingFields.push('lastName');
    if (!email) missingFields.push('email');
    if (!phone) missingFields.push('phone');
    if (!country) missingFields.push('country');
    if (!startupStage) missingFields.push('startupStage');
    if (!tier) missingFields.push('tier');
    
    if (missingFields.length > 0) {
      console.error('Missing required fields:', missingFields);
      return res.status(400).json({ 
        error: `Missing required fields: ${missingFields.join(', ')}` 
      });
    }
    
    // Validate email format
    if (!isValidEmail(sanitizedEmail)) {
      console.error('Invalid email format:', sanitizedEmail);
      return res.status(400).json({ error: 'Invalid email format' });
    }

    // Sanitize all inputs
    const sanitizedData = {
      firstName: sanitizeInput(firstName),
      lastName: sanitizeInput(lastName),
      email: sanitizedEmail,
      phone: sanitizeInput(phone),
      country: sanitizeInput(country),
      startupStage: sanitizeInput(startupStage),
      linkedin: linkedin ? sanitizeInput(linkedin) : null,
      website: website ? sanitizeInput(website) : null,
      tier: sanitizeInput(tier),
      paymentIntentId: paymentIntentId ? sanitizeInput(paymentIntentId) : null,
      amount: parseInt(amount) || 0
    }

    // Additional validation
    if (sanitizedData.firstName.length < 2 || sanitizedData.firstName.length > 100) {
      return res.status(400).json({ error: 'First name must be between 2 and 100 characters' });
    }

    if (sanitizedData.lastName.length < 2 || sanitizedData.lastName.length > 100) {
      return res.status(400).json({ error: 'Last name must be between 2 and 100 characters' });
    }

    console.log('Starting database transaction...');
    
    // Use a transaction to ensure data consistency
    const result = await withTransaction(async (client) => {
      console.log('Checking for existing member with email:', sanitizedData.email);
      
      // Check if member already exists
      const existingMember = await client.query(
        'SELECT id, created_at FROM members WHERE email = $1',
        [sanitizedData.email]
      );

      if (existingMember.rows.length > 0) {
        const member = existingMember.rows[0];
        console.error('Member already exists:', { 
          id: member.id, 
          created_at: member.created_at 
        });
        throw new Error('An account with this email already exists. Please use a different email or contact support.');
      }

      console.log('Creating new member record...');
      
      // Create member record
      const newMember = await client.query(
        `INSERT INTO members (
          first_name, last_name, email, phone, country, 
          startup_stage, linkedin_url, website, 
          membership_tier, payment_intent_id, amount_paid, status
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
        RETURNING id, created_at`,
        [
          sanitizedData.firstName,
          sanitizedData.lastName,
          sanitizedData.email,
          sanitizedData.phone,
          sanitizedData.country,
          sanitizedData.startupStage,
          sanitizedData.linkedin,
          sanitizedData.website,
          sanitizedData.tier,
          sanitizedData.paymentIntentId,
          sanitizedData.amount,
          sanitizedData.paymentIntentId ? 'active' : 'pending',
        ]
      );

      if (!newMember.rows[0]?.id) {
        console.error('Failed to create member record: No ID returned');
        throw new Error('Failed to create member record');
      }
      
      const memberId = newMember.rows[0].id;
      console.log('Member created successfully:', { id: memberId, created_at: newMember.rows[0].created_at });

      return { 
        success: true, 
        memberId: newMember.rows[0].id,
        message: 'Member registered successfully' 
      };
    });

    console.log('Transaction completed successfully');
    return res.status(200).json(result);

  } catch (error: any) {
    console.error('Registration error:', {
      message: error.message,
      stack: error.stack,
      code: error.code,
      name: error.name
    });
    
    // Handle specific database errors
    if (error.code === '23505') { // Unique violation
      return res.status(409).json({
        error: 'This email is already registered. Please use a different email or contact support.'
      });
    }
    
    return res.status(500).json({
      error: error.message || 'An error occurred during registration. Please try again or contact support.'
    });
  }
}
