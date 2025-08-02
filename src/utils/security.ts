
import DOMPurify from 'dompurify';

/**
 * Security utilities for input sanitization and validation
 */
export class SecurityUtils {
  /**
   * Sanitize HTML input to prevent XSS attacks
   */
  static sanitizeHtml(input: string): string {
    if (!input) return '';
    return DOMPurify.sanitize(input, {
      ALLOWED_TAGS: [],
      ALLOWED_ATTR: [],
      KEEP_CONTENT: true
    });
  }

  /**
   * Sanitize text input by removing potentially dangerous characters
   */
  static sanitizeText(input: string): string {
    if (!input) return '';
    // Remove script tags, javascript:, data:, and other potentially dangerous content
    return input
      .replace(/<script[^>]*>.*?<\/script>/gi, '')
      .replace(/javascript:/gi, '')
      .replace(/data:/gi, '')
      .replace(/vbscript:/gi, '')
      .replace(/on\w+\s*=/gi, '')
      .trim();
  }

  /**
   * Validate email format with enhanced security
   */
  static isValidEmail(email: string): boolean {
    if (!email || typeof email !== 'string') return false;
    
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    const isValidFormat = emailRegex.test(email);
    const hasValidLength = email.length <= 254; // RFC 5321 limit
    const hasValidLocalPart = email.split('@')[0]?.length <= 64; // RFC 5321 limit
    
    return isValidFormat && hasValidLength && hasValidLocalPart;
  }

  /**
   * Validate URL format with security checks
   */
  static isValidUrl(url: string): boolean {
    if (!url || typeof url !== 'string') return false;
    
    try {
      const urlObj = new URL(url);
      // Only allow http and https protocols
      return ['http:', 'https:'].includes(urlObj.protocol);
    } catch {
      return false;
    }
  }

  /**
   * Validate phone number format
   */
  static isValidPhone(phone: string): boolean {
    if (!phone || typeof phone !== 'string') return false;
    
    // Basic international phone number validation
    const phoneRegex = /^\+?[1-9]\d{1,14}$/;
    return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
  }

  /**
   * Rate limiting check (client-side basic implementation)
   */
  static checkRateLimit(key: string, maxAttempts: number = 5, windowMs: number = 15 * 60 * 1000): boolean {
    const now = Date.now();
    const storageKey = `rate_limit_${key}`;
    
    try {
      const stored = localStorage.getItem(storageKey);
      const attempts = stored ? JSON.parse(stored) : [];
      
      // Filter attempts within the time window
      const recentAttempts = attempts.filter((timestamp: number) => now - timestamp < windowMs);
      
      if (recentAttempts.length >= maxAttempts) {
        return false; // Rate limit exceeded
      }
      
      // Add current attempt and store
      recentAttempts.push(now);
      localStorage.setItem(storageKey, JSON.stringify(recentAttempts));
      
      return true; // Within rate limit
    } catch {
      // If localStorage fails, allow the request but log it
      console.warn('Rate limiting check failed - localStorage unavailable');
      return true;
    }
  }

  /**
   * Generate a secure random string for tokens
   */
  static generateSecureToken(length: number = 32): string {
    const array = new Uint8Array(length);
    crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
  }

  /**
   * Mask sensitive data for logging
   */
  static maskSensitiveData(data: any): any {
    if (!data || typeof data !== 'object') return data;
    
    const sensitiveFields = ['password', 'token', 'secret', 'key', 'email', 'phone'];
    const masked = { ...data };
    
    for (const field of sensitiveFields) {
      if (masked[field]) {
        const value = masked[field].toString();
        if (field === 'email') {
          // Mask email: test@example.com -> t***@e******.com
          const [local, domain] = value.split('@');
          const maskedLocal = local[0] + '*'.repeat(Math.max(local.length - 1, 3));
          const maskedDomain = domain[0] + '*'.repeat(Math.max(domain.indexOf('.') - 1, 3)) + domain.substring(domain.indexOf('.'));
          masked[field] = `${maskedLocal}@${maskedDomain}`;
        } else {
          // Mask other fields: show first 2 and last 2 characters
          masked[field] = value.length > 4 
            ? value.substring(0, 2) + '*'.repeat(value.length - 4) + value.substring(value.length - 2)
            : '*'.repeat(value.length);
        }
      }
    }
    
    return masked;
  }
}

/**
 * Secure error handler that doesn't leak sensitive information
 */
export class SecureErrorHandler {
  private static isDevelopment = import.meta.env.MODE === 'development';

  /**
   * Handle and sanitize errors for client display
   */
  static handleError(error: unknown, context?: string): string {
    // Log the full error in development
    if (this.isDevelopment) {
      console.error(`Error in ${context}:`, error);
    } else {
      // In production, log sanitized error details
      const sanitizedError = this.sanitizeError(error);
      console.error(`Error in ${context}:`, sanitizedError);
    }

    // Return user-friendly error message
    return this.getUserFriendlyMessage(error);
  }

  /**
   * Sanitize error for logging (remove sensitive data)
   */
  private static sanitizeError(error: unknown): any {
    if (error instanceof Error) {
      return {
        name: error.name,
        message: this.sanitizeErrorMessage(error.message),
        stack: this.isDevelopment ? error.stack : '[REDACTED]'
      };
    }
    
    if (typeof error === 'object' && error !== null) {
      return SecurityUtils.maskSensitiveData(error);
    }
    
    return { message: 'Unknown error occurred' };
  }

  /**
   * Sanitize error messages to remove sensitive information
   */
  private static sanitizeErrorMessage(message: string): string {
    // Remove potential SQL injection attempts or database details
    return message
      .replace(/\b\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z\b/g, '[TIMESTAMP]') // Remove timestamps
      .replace(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/g, '[EMAIL]') // Remove emails
      .replace(/\b\d{10,15}\b/g, '[PHONE]') // Remove phone numbers
      .replace(/\b(sk_|pk_)[a-zA-Z0-9_]+/g, '[API_KEY]') // Remove API keys
      .replace(/\b[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}\b/gi, '[UUID]'); // Remove UUIDs
  }

  /**
   * Get user-friendly error message
   */
  private static getUserFriendlyMessage(error: unknown): string {
    if (error instanceof Error) {
      const message = error.message.toLowerCase();
      
      // Map common technical errors to user-friendly messages
      if (message.includes('network') || message.includes('fetch')) {
        return 'Network connection error. Please check your internet connection and try again.';
      }
      
      if (message.includes('validation') || message.includes('invalid')) {
        return 'Please check your input and try again.';
      }
      
      if (message.includes('unauthorized') || message.includes('forbidden')) {
        return 'You are not authorized to perform this action.';
      }
      
      if (message.includes('rate limit')) {
        return 'Too many requests. Please wait a moment before trying again.';
      }
      
      if (message.includes('payment') || message.includes('stripe')) {
        return 'Payment processing error. Please try again or contact support.';
      }
    }
    
    // Default user-friendly message
    return 'An unexpected error occurred. Please try again later.';
  }
}
