# Stripe Integration Guide

This document provides instructions for setting up and configuring the Stripe payment integration for The Founders Space membership system.

## Prerequisites

1. Stripe Account: [Sign up for Stripe](https://dashboard.stripe.com/register)
2. Supabase Project: [Create a Supabase project](https://app.supabase.com/)
3. Node.js (v14+)
4. npm or yarn

## Setup Instructions

### 1. Environment Variables

Copy the example environment file and update it with your actual credentials:

```bash
cp .env.local.example .env.local
```

Update the following variables in `.env.local`:

```env
# Stripe Configuration
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Application URL (for webhooks and redirects)
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 2. Stripe Setup

1. Log in to your [Stripe Dashboard](https://dashboard.stripe.com/)
2. Get your API keys from Developers → API keys
3. Set up webhooks in the Stripe Dashboard:
   - Go to Developers → Webhooks
   - Add an endpoint: `[YOUR_APP_URL]/api/webhook`
   - Select these events to listen for:
     - `payment_intent.succeeded`
     - `payment_intent.payment_failed`
     - `checkout.session.completed`
   - Retrieve the webhook signing secret

### 3. Supabase Setup

1. Create a new Supabase project or use an existing one
2. Run the SQL migration to create the members table:
   - Go to the SQL Editor in Supabase
   - Create a new query and paste the contents of `supabase/migrations/20240101000000_create_members_table.sql`
   - Run the query

3. Set up Row Level Security (RLS) policies as defined in the migration

### 4. Install Dependencies

```bash
npm install
```

### 5. Run the Development Server

```bash
npm run dev
```

## Testing the Integration

1. Use Stripe test cards for payment testing:
   - Success: `4242 4242 4242 4242`
   - Authentication required: `4000 0025 0000 3155`
   - Insufficient funds: `4000 0082 6000 3178`

2. Test both successful and failed payment scenarios

## Production Deployment

1. Update your environment variables with production values
2. Set up a production database
3. Configure your production domain in Stripe and Supabase
4. Set up SSL certificates
5. Deploy your application

## Troubleshooting

- **Stripe errors**: Check the Stripe Dashboard logs
- **Database issues**: Verify Supabase connection and table permissions
- **Webhook failures**: Ensure the webhook URL is correct and accessible

## Security Considerations

- Never commit `.env` files to version control
- Use environment variables for all sensitive information
- Regularly rotate your API keys
- Monitor your Stripe Dashboard for suspicious activity

## Support

For any issues or questions, please contact support@thefounders.space
