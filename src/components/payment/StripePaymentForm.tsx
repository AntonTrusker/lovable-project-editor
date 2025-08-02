
import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, CreditCard, Lock } from 'lucide-react';
import { toast } from 'sonner';
import { PaymentService } from '@/services/paymentService';

const stripePromise = loadStripe('pk_test_51QaBd9AYNtKzFJGrh2dRGBRWZUH9RVj8VJZjNxsFbUdCsXVGbKJYoHLNrbKLOAXEfLtOdCvTFoLz7oD8f4WRdNiF00iZiHJOGz');

interface StripePaymentFormProps {
  tier: {
    id: string;
    name: string;
    price: number;
    display_price: string;
  };
  onPaymentSuccess: (paymentIntentId: string) => void;
  onPaymentError: (error: string) => void;
}

const PaymentForm = ({ tier, onPaymentSuccess, onPaymentError }: StripePaymentFormProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      return;
    }

    setIsProcessing(true);

    try {
      // Create payment intent
      const { clientSecret, paymentIntentId } = await PaymentService.createPaymentIntent({
        tierId: tier.id,
        amount: Math.round(tier.price * 100), // Convert to cents
        currency: 'eur',
        metadata: {
          tier_name: tier.name,
          tier_id: tier.id
        }
      });

      // Confirm payment
      const { error } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardElement,
        }
      });

      if (error) {
        onPaymentError(error.message || 'Payment failed');
      } else {
        onPaymentSuccess(paymentIntentId);
      }
    } catch (error) {
      onPaymentError(error instanceof Error ? error.message : 'Payment failed');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Card className="border-muted">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center text-lg">
            <CreditCard className="h-5 w-5 mr-2 text-primary" />
            Payment Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
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
                },
              }}
            />
          </div>
          
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-muted-foreground">Total Amount:</span>
            <span className="font-semibold text-lg">{tier.display_price}</span>
          </div>

          <Button
            type="submit"
            disabled={!stripe || isProcessing}
            className="w-full bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary"
          >
            {isProcessing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing Payment...
              </>
            ) : (
              <>
                <Lock className="mr-2 h-4 w-4" />
                Pay {tier.display_price}
              </>
            )}
          </Button>

          <p className="text-xs text-muted-foreground text-center mt-2">
            <Lock className="inline h-3 w-3 mr-1" />
            Your payment is secured by Stripe
          </p>
        </CardContent>
      </Card>
    </form>
  );
};

export const StripePaymentForm = (props: StripePaymentFormProps) => {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm {...props} />
    </Elements>
  );
};
