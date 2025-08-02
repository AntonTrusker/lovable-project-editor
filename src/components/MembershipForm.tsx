import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useCountries } from '@/hooks/useCountries';

// Use import.meta.env for Vite compatibility
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '');

const startupStages = [
  'Idea/Pre-seed',
  'Seed',
  'Series A',
  'Series B',
  'Series C+',
  'Growth',
  'Enterprise',
];

interface MembershipFormProps {
  tier: {
    id: string;
    name: string;
    price: string;
    description: string;
    displayPrice: string;
  };
  onClose: () => void;
}

const CheckoutForm = ({ tier, onClose }: { tier: any; onClose: () => void }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [clientSecret, setClientSecret] = useState('');
  
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { countries, loading: countriesLoading } = useCountries();

  // Create payment intent when component mounts
  useEffect(() => {
    const createPaymentIntent = async () => {
      try {
        console.log('Creating payment intent for tier:', tier.id);
        const amount = tier.price === 'Free' ? 0 : parseInt(tier.price.replace(/[^0-9]/g, ''));
        console.log('Amount in cents:', amount);
        
        const response = await fetch('/api/create-payment-intent', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            tierId: tier.id,
            amount: amount * 100,
          }),
        });
        
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.error || 'Failed to create payment intent');
        }
        
        const data = await response.json();
        console.log('Payment intent created:', data);
        
        if (!data.clientSecret) {
          throw new Error('No client secret received from server');
        }
        
        setClientSecret(data.clientSecret);
      } catch (err: any) {
        const errorMessage = err.message || 'Failed to initialize payment. Please try again.';
        console.error('Error creating payment intent:', err);
        setError(errorMessage);
      }
    };

    if (tier.price !== 'Free') {
      createPaymentIntent();
    } else {
      console.log('Free tier selected, no payment intent needed');
    }
  }, [tier]);

  const onSubmit = async (data: any) => {
    console.log('Form submitted with data:', data);
    
    if (tier.price === 'Free') {
      // Handle free tier registration
      try {
        setIsLoading(true);
        setError(null);
        
        console.log('Submitting free tier registration...');
        const response = await fetch('/api/register-member', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            phone: data.phone,
            country: data.country,
            startupStage: data.startupStage,
            linkedin: data.linkedin || null,
            website: data.website || null,
            tier: tier.id,
            amount: 0,
          }),
        });

        const responseData = await response.json().catch(() => ({}));
        
        if (!response.ok) {
          throw new Error(responseData.error || 'Registration failed');
        }
        
        console.log('Registration successful, redirecting...');
        // Redirect to success page or show success message
        window.location.href = '/success?tier=' + tier.id;
      } catch (err) {
        setError('Registration failed. Please try again.');
        console.error('Registration error:', err);
      } finally {
        setIsLoading(false);
      }
      return;
    }

    // Handle paid tiers
    if (!stripe || !elements) {
      console.error('Stripe not initialized');
      setError('Payment system not ready. Please refresh the page and try again.');
      return;
    }

    if (!clientSecret) {
      console.error('No client secret available');
      setError('Payment initialization failed. Please try again.');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      console.log('Confirming card payment with client secret:', clientSecret.substring(0, 20) + '...');
      
      const cardElement = elements.getElement(CardElement);
      if (!cardElement) {
        throw new Error('Card element not found. Please try again.');
      }

      // Confirm card payment
      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: `${data.firstName} ${data.lastName}`.trim(),
            email: data.email,
            phone: data.phone,
            address: {
              country: data.country,
            },
          },
        },
      });

      if (stripeError) {
        console.error('Stripe error:', stripeError);
        throw new Error(stripeError.message || 'Payment failed. Please check your card details and try again.');
      }

      if (paymentIntent && paymentIntent.status === 'succeeded') {
        console.log('Payment succeeded, saving member data...');
        
        // Save member data to your database
        const response = await fetch('/api/register-member', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            phone: data.phone,
            country: data.country,
            startupStage: data.startupStage,
            linkedin: data.linkedin || null,
            website: data.website || null,
            tier: tier.id,
            paymentIntentId: paymentIntent.id,
            amount: paymentIntent.amount,
          }),
        });

        const responseData = await response.json().catch(() => ({}));
        
        if (!response.ok) {
          console.error('Registration failed:', responseData);
          throw new Error(responseData.error || 'Registration failed after payment');
        }

        console.log('Registration successful, redirecting to success page...');
        // Redirect to success page
        window.location.href = `/success?tier=${tier.id}&payment_intent=${paymentIntent.id}`;
      } else {
        console.error('Unexpected payment intent status:', paymentIntent?.status);
        throw new Error('Payment processing incomplete. Please contact support.');
      }
    } catch (err: any) {
      const errorMessage = err.message || 'An unexpected error occurred. Please try again.';
      console.error('Payment error:', err);
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name *</Label>
          <Input
            id="firstName"
            {...register('firstName', { required: 'First name is required' })}
            placeholder="John"
          />
          {errors.firstName && (
            <p className="text-sm text-red-500">{String(errors.firstName.message)}</p>
          )}
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name *</Label>
          <Input
            id="lastName"
            {...register('lastName', { required: 'Last name is required' })}
            placeholder="Doe"
          />
          {errors.lastName && (
            <p className="text-sm text-red-500">{String(errors.lastName.message)}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email *</Label>
        <Input
          id="email"
          type="email"
          {...register('email', { 
            required: 'Email is required',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: 'Invalid email address',
            },
          })}
          placeholder="you@example.com"
        />
        {errors.email && (
          <p className="text-sm text-red-500">{String(errors.email.message)}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Phone Number *</Label>
        <Input
          id="phone"
          type="tel"
          {...register('phone', { 
            required: 'Phone number is required',
            pattern: {
              value: /^[\+\d\s-()]{10,}$/,
              message: 'Please enter a valid phone number',
            },
          })}
          placeholder="+1 (555) 123-4567"
        />
        {errors.phone && (
          <p className="text-sm text-red-500">{String(errors.phone.message)}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="country">Country *</Label>
          <Select
            onValueChange={(value) => {
              // @ts-ignore - react-hook-form types issue
              register('country').onChange({ target: { value, name: 'country' } });
            }}
            {...register('country', { required: 'Country is required' })}
          >
            <SelectTrigger>
              <SelectValue placeholder={countriesLoading ? "Loading countries..." : "Select country"} />
            </SelectTrigger>
            <SelectContent>
              {countries.map((country) => (
                <SelectItem key={country.id} value={country.name}>
                  {country.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.country && (
            <p className="text-sm text-red-500">{String(errors.country.message)}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="startupStage">Startup Stage *</Label>
          <Select
            onValueChange={(value) => {
              // @ts-ignore - react-hook-form types issue
              register('startupStage').onChange({ target: { value, name: 'startupStage' } });
            }}
            {...register('startupStage', { required: 'Startup stage is required' })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select stage" />
            </SelectTrigger>
            <SelectContent>
              {startupStages.map((stage) => (
                <SelectItem key={stage} value={stage}>
                  {stage}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.startupStage && (
            <p className="text-sm text-red-500">{String(errors.startupStage.message)}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="linkedin">LinkedIn Profile URL</Label>
        <Input
          id="linkedin"
          type="url"
          {...register('linkedin', {
            pattern: {
              value: /^(https?:\/\/)?(www\.)?linkedin\.com\/in\/[a-zA-Z0-9-]+\/?$/,
              message: 'Please enter a valid LinkedIn profile URL',
            },
          })}
          placeholder="https://linkedin.com/in/username"
        />
        {errors.linkedin && (
          <p className="text-sm text-red-500">{String(errors.linkedin.message)}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="website">Startup Website</Label>
        <Input
          id="website"
          type="url"
          {...register('website', {
            pattern: {
              value: /^(https?:\/\/)?([\w\-]+\.)+[\w\-]+(\/[\w\- .\/?%&=]*)?$/,
              message: 'Please enter a valid website URL',
            },
          })}
          placeholder="https://yourstartup.com"
        />
        {errors.website && (
          <p className="text-sm text-red-500">{String(errors.website.message)}</p>
        )}
      </div>

      {tier.price !== 'Free' && (
        <div className="space-y-2">
          <Label>Credit Card Information *</Label>
          <div className="border rounded-md p-3">
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: '16px',
                    color: '#424770',
                    '::placeholder': {
                      color: '#aab7c4',
                    },
                  },
                  invalid: {
                    color: '#9e2146',
                  },
                },
              }}
            />
          </div>
          <p className="text-xs text-muted-foreground">
            Your payment is secure and encrypted.
          </p>
        </div>
      )}

      <div className="bg-muted/50 p-4 rounded-md">
        <div className="flex justify-between items-center">
          <span className="font-medium">Selected Tier:</span>
          <span className="font-semibold">{tier.name}</span>
        </div>
        <div className="flex justify-between items-center mt-2">
          <span className="font-medium">Amount Due:</span>
          <span className="text-lg font-bold">
            {tier.price === 'Free' ? 'Free' : tier.displayPrice || `$${tier.price}`}
          </span>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 text-red-700 p-3 rounded-md text-sm">
          {error}
        </div>
      )}

      <div className="flex justify-end space-x-3 pt-4">
        <Button
          type="button"
          variant="outline"
          onClick={onClose}
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={!stripe && tier.price !== 'Free' || isLoading}>
          {isLoading ? 'Processing...' : `Pay $${tier.price}`}
        </Button>
      </div>
    </form>
  );
};

const MembershipForm = ({ tier, onClose }: MembershipFormProps) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-background rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Complete Your {tier.name} Membership</h2>
            <button 
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground"
              aria-label="Close"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
          
          <Elements stripe={stripePromise}>
            <CheckoutForm tier={tier} onClose={onClose} />
          </Elements>
        </div>
      </div>
    </div>
  );
};

export default MembershipForm;
