import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { loadStripe } from '@stripe/stripe-js'
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { BaseFormFields } from '@/components/forms/BaseFormFields'
import { FounderFormFields } from '@/components/forms/FounderFormFields'
import { PartnerFormFields } from '@/components/forms/PartnerFormFields'
import { InvestorFormFields } from '@/components/forms/InvestorFormFields'
import { useSecureForm } from '@/hooks/useSecureForm'
import { MemberService } from '@/services/memberService'
import { PaymentService } from '@/services/paymentService'
import { MembershipTier, UserType, MemberData, FounderData, PartnerData, InvestorData } from '@/types/membership'

const stripePromise = loadStripe('pk_test_51QKMo7ADX3Z6HgQNkJLzKWFjhXEQmPJxQPeOfCjqhpnKBFdGnKLCFKJfmFXvuYGpBJJOdlOVKNIlxPbDhG4JEcxA00xXeqIcfD')

interface EnhancedMembershipFormProps {
  tier: MembershipTier
  userType: UserType
  onClose: () => void
}

const CheckoutForm = ({ tier, userType, onClose }: EnhancedMembershipFormProps) => {
  const stripe = useStripe()
  const elements = useElements()
  const [clientSecret, setClientSecret] = useState('')
  
  const createDefaultValues = () => {
    const baseValues = { 
      email: '',
      first_name: '',
      last_name: ''
    }
    
    switch (userType) {
      case 'founder':
        return {
          ...baseValues,
          user_type: 'founder' as const
        } as FounderData
      case 'partner':
        return {
          ...baseValues,
          company_name: '',
          country: '',
          user_type: 'partner' as const
        } as PartnerData
      case 'investor':
        return {
          ...baseValues,
          investor_type: '',
          country: '',
          company: '',
          title: '',
          user_type: 'investor' as const
        } as InvestorData
    }
  }

  const { register, handleSubmit, formState: { errors }, setValue } = useForm({
    defaultValues: createDefaultValues()
  })

  const { isLoading, errors: formErrors, secureSubmit, clearErrors } = useSecureForm({
    rateLimitKey: 'enhanced_membership',
    maxAttempts: 3,
    windowMs: 15 * 60 * 1000
  })

  const onSubmit = async (data: any) => {
    clearErrors()
    
    await secureSubmit(data, async (sanitizedData) => {
      // Create member data with user_type - cast to MemberData since we know it has all required fields
      const memberData = {
        ...sanitizedData,
        user_type: userType
      } as MemberData

      let paymentIntentId: string | undefined

      // For paid tiers, process payment
      if (tier.price > 0) {
        if (!stripe || !elements) {
          throw new Error('Payment system not ready')
        }

        // Create payment intent if not exists
        if (!clientSecret) {
          const paymentResult = await PaymentService.createPaymentIntent({
            tierId: tier.id,
            amount: Math.round(tier.price * 100),
            currency: 'EUR'
          })
          setClientSecret(paymentResult.clientSecret)
          paymentIntentId = paymentResult.paymentIntentId
        }

        const cardElement = elements.getElement(CardElement)
        if (!cardElement) {
          throw new Error('Card element not found')
        }

        const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: cardElement,
            billing_details: {
              name: `${memberData.first_name} ${memberData.last_name}`,
              email: memberData.email,
            },
          },
        })

        if (stripeError) {
          throw new Error(stripeError.message || 'Payment failed')
        }

        if (paymentIntent?.status !== 'succeeded') {
          throw new Error('Payment was not successful')
        }

        paymentIntentId = paymentIntent.id
      }

      // Create member
      const result = await MemberService.createMember({
        memberData,
        tierId: tier.id,
        paymentIntentId
      })

      // Redirect to success page
      window.location.href = `/success?tier=${tier.id}&type=${memberData.user_type}${paymentIntentId ? `&payment_intent=${paymentIntentId}` : ''}`
      
      return result
    })
  }

  const renderUserTypeFields = () => {
    switch (userType) {
      case 'founder':
        return (
          <FounderFormFields 
            register={register as any} 
            errors={errors} 
            setValue={setValue} 
          />
        )
      case 'partner':
        return (
          <PartnerFormFields 
            register={register as any} 
            errors={errors} 
            setValue={setValue} 
          />
        )
      case 'investor':
        return (
          <InvestorFormFields 
            register={register as any} 
            errors={errors} 
            setValue={setValue} 
          />
        )
      default:
        return null
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="outline">{userType.charAt(0).toUpperCase() + userType.slice(1)}</Badge>
          <h3 className="text-lg font-semibold">{tier.name} Membership</h3>
        </div>
        <p className="text-sm text-muted-foreground">{tier.description}</p>
      </div>

      <BaseFormFields register={register as any} errors={errors} setValue={setValue} />
      
      {renderUserTypeFields()}

      {tier.price > 0 && (
        <div className="space-y-2">
          <Label>Payment Information *</Label>
          <div className="border rounded-md p-3">
            <CardElement
              options={{
                style: {
                  base: {
                    fontSize: '16px',
                    color: '#424770',
                    '::placeholder': { color: '#aab7c4' },
                  },
                  invalid: { color: '#9e2146' },
                },
              }}
            />
          </div>
          <p className="text-xs text-muted-foreground">
            Your payment is secure and encrypted.
          </p>
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Order Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-2">
            <span>Membership Tier:</span>
            <span className="font-semibold">{tier.name}</span>
          </div>
          <div className="flex justify-between items-center">
            <span>Total Amount:</span>
            <span className="text-lg font-bold">
              {tier.price === 0 ? 'Free' : tier.display_price}
            </span>
          </div>
        </CardContent>
      </Card>

      {formErrors.submit && (
        <div className="bg-red-50 text-red-700 p-3 rounded-md text-sm">
          {formErrors.submit}
        </div>
      )}

      <div className="flex justify-end space-x-3 pt-4">
        <Button type="button" variant="outline" onClick={onClose} disabled={isLoading}>
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Processing...' : tier.price === 0 ? 'Join Free' : `Pay ${tier.display_price}`}
        </Button>
      </div>
    </form>
  )
}

const EnhancedMembershipForm = ({ tier, userType, onClose }: EnhancedMembershipFormProps) => {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-background rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Complete Your Membership</h2>
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
            <CheckoutForm tier={tier} userType={userType} onClose={onClose} />
          </Elements>
        </div>
      </div>
    </div>
  )
}

export default EnhancedMembershipForm
