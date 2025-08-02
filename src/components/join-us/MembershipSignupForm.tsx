import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import { StripePaymentForm } from '@/components/payment/StripePaymentForm';
import { countries, popularCountries } from '@/data/countries';

interface MembershipSignupData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  country: string;
  userType: string;
  linkedinUrl?: string;
  websiteUrl?: string;
  agreedToTerms: boolean;
  tierId: string;
}

const userTypes = [
  'Founder',
  'Not yet started',
  'Business owner',
  'Investor',
  'Advisor/Mentor',
  'Service Provider',
  'Other'
];

interface MembershipSignupFormProps {
  selectedTier: {
    id: string;
    name: string;
    price: number;
    display_price: string;
  };
  onClose?: () => void;
  onFormComplete?: () => void;
}

export const MembershipSignupForm = ({ selectedTier, onClose, onFormComplete }: MembershipSignupFormProps) => {
  const [currentStep, setCurrentStep] = useState<'details' | 'payment' | 'success'>('details');
  const [isLoading, setIsLoading] = useState(false);
  const [memberData, setMemberData] = useState<MembershipSignupData | null>(null);
  const [paymentIntentId, setPaymentIntentId] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<MembershipSignupData>({
    defaultValues: {
      tierId: selectedTier.id,
    },
  });

  const onSubmitDetails = async (data: MembershipSignupData) => {
    if (!data.agreedToTerms) {
      toast.error('Please agree to the terms and conditions');
      return;
    }

    if (!data.country) {
      toast.error('Please select a country');
      return;
    }

    if (!data.userType) {
      toast.error('Please select your role');
      return;
    }

    console.log('Form data being submitted:', data);
    setMemberData(data);
    
    // Register member and handle completion
    await registerMember(data, null);
  };

  const registerMember = async (data: MembershipSignupData, paymentIntentId: string | null) => {
    try {
      setIsLoading(true);

      // Find the selected country ID
      const selectedCountry = countries.find(country => country.name === data.country);

      // Prepare member data for the edge function
      const memberDataForAPI = {
        user_type: data.userType.toLowerCase().replace(/\s+/g, '_'), // Map userType to database format
        email: data.email,
        first_name: data.firstName,
        last_name: data.lastName,
        phone: data.phone || null,
        country_id: selectedCountry?.id || null,
        linkedin_url: data.linkedinUrl || null,
        website_url: data.websiteUrl || null,
      };

      console.log('Registering member with data:', memberDataForAPI);

      // Call the registration edge function
      const { data: result, error } = await supabase.functions.invoke('register-member-new', {
        body: {
          memberData: memberDataForAPI,
          tierId: selectedTier.id,
          paymentIntentId: paymentIntentId,
        },
      });

      if (error) {
        console.error('Registration error:', error);
        throw error;
      }

      console.log('Registration successful:', result);
      toast.success('Registration successful!');
      
      // For paid tiers, proceed to payment
      if (selectedTier.price > 0) {
        setCurrentStep('payment');
      } else {
        // For free tiers, show success
        setCurrentStep('success');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      toast.error('Registration failed. Please contact support.');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePaymentSuccess = async (paymentIntentId: string) => {
    if (!memberData) return;
    setPaymentIntentId(paymentIntentId);
    setCurrentStep('success');
    toast.success('Payment completed successfully!');
  };

  const handlePaymentError = (error: string) => {
    console.error('Payment error:', error);
    toast.error(`Payment failed: ${error}`);
  };

  const FormContent = () => {
    if (currentStep === 'success') {
      return (
        <Card className="border-0 bg-gradient-to-br from-green-50 to-green-100/50">
          <CardContent className="p-4 sm:p-6 text-center">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
              <span className="text-white text-lg sm:text-2xl font-bold">✓</span>
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-green-800 mb-2">Welcome to TheFounders!</h3>
            <p className="text-green-600 mb-3 sm:mb-4 text-sm">
              Your registration{selectedTier.price > 0 ? ' and payment have' : ' has'} been completed successfully. You now have access to our community and resources.
            </p>
            <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
              <Badge className="bg-green-100 text-green-800 border-green-200 text-xs">
                {selectedTier.name} Member
              </Badge>
            </div>
            <p className="text-xs text-green-600 mb-4">
              Check your email for next steps and platform access instructions.
            </p>
            {onClose && (
              <Button 
                onClick={onClose}
                className="w-full sm:w-auto"
                variant="outline"
                size="sm"
              >
                Close
              </Button>
            )}
          </CardContent>
        </Card>
      );
    }

    if (currentStep === 'payment') {
      return (
        <div className="space-y-3 sm:space-y-4">
          <Card className="border-0 bg-muted/5">
            <CardHeader className="pb-2 sm:pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base sm:text-lg font-semibold">
                  Complete Payment
                </CardTitle>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentStep('details')}
                    className="text-xs sm:text-sm text-muted-foreground hover:text-foreground underline"
                  >
                    ← Back
                  </button>
                  {onClose && (
                    <button
                      onClick={onClose}
                      className="text-xs sm:text-sm text-muted-foreground hover:text-foreground"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Badge className="border-muted-foreground/20 text-xs">{selectedTier.name}</Badge>
                <Badge className="bg-muted text-muted-foreground text-xs">{selectedTier.display_price}</Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <StripePaymentForm
                tier={selectedTier}
                onPaymentSuccess={handlePaymentSuccess}
                onPaymentError={handlePaymentError}
              />
            </CardContent>
          </Card>
        </div>
      );
    }

    return (
      <div className="space-y-3 sm:space-y-4">
        <Card className="border-0 bg-muted/5">
          <CardHeader className="pb-2 sm:pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base sm:text-lg font-semibold">
                Membership Registration
              </CardTitle>
              {onClose && (
                <button
                  onClick={onClose}
                  className="text-xs sm:text-sm text-muted-foreground hover:text-foreground"
                >
                  ✕
                </button>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Badge className="border-muted-foreground/20 text-xs">{selectedTier.name}</Badge>
              <Badge className="bg-muted text-muted-foreground text-xs">{selectedTier.display_price}</Badge>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <form onSubmit={handleSubmit(onSubmitDetails)} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="firstName" className="text-sm font-medium">First Name *</Label>
                  <Input
                    id="firstName"
                    {...register('firstName', { required: 'First name is required' })}
                    placeholder="John"
                    className="h-9"
                  />
                  {errors.firstName && (
                    <p className="text-xs text-red-500">{errors.firstName.message}</p>
                  )}
                </div>
                
                <div className="space-y-1.5">
                  <Label htmlFor="lastName" className="text-sm font-medium">Last Name *</Label>
                  <Input
                    id="lastName"
                    {...register('lastName', { required: 'Last name is required' })}
                    placeholder="Doe"
                    className="h-9"
                  />
                  {errors.lastName && (
                    <p className="text-xs text-red-500">{errors.lastName.message}</p>
                  )}
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-sm font-medium">Email *</Label>
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
                  className="h-9"
                />
                {errors.email && (
                  <p className="text-xs text-red-500">{errors.email.message}</p>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="phone" className="text-sm font-medium">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    {...register('phone')}
                    placeholder="+1 (555) 123-4567"
                    className="h-9"
                  />
                  <p className="text-xs text-muted-foreground">Optional</p>
                </div>

                <div className="space-y-1.5">
                  <Label htmlFor="country" className="text-sm font-medium">Country *</Label>
                  <Select onValueChange={(value) => setValue('country', value)}>
                    <SelectTrigger className="h-9">
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent className="max-h-60">
                      <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground border-b">
                        Popular Countries
                      </div>
                      {popularCountries.map((country) => (
                        <SelectItem key={`popular-${country.id}`} value={country.name}>
                          {country.name}
                        </SelectItem>
                      ))}
                      <div className="px-2 py-1.5 text-xs font-medium text-muted-foreground border-b border-t">
                        All Countries
                      </div>
                      {countries.map((country) => (
                        <SelectItem key={country.id} value={country.name}>
                          {country.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.country && (
                    <p className="text-xs text-red-500">Please select a country</p>
                  )}
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="userType" className="text-sm font-medium">I am a *</Label>
                <Select onValueChange={(value) => setValue('userType', value)}>
                  <SelectTrigger className="h-9">
                    <SelectValue placeholder="Select your role" />
                  </SelectTrigger>
                  <SelectContent>
                    {userTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.userType && (
                  <p className="text-xs text-red-500">Please select your role</p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="linkedinUrl" className="text-sm font-medium">LinkedIn Profile URL</Label>
                <Input
                  id="linkedinUrl"
                  type="url"
                  {...register('linkedinUrl', {
                    pattern: {
                      value: /^(https?:\/\/)?(www\.)?linkedin\.com\/in\/[a-zA-Z0-9-]+\/?$/,
                      message: 'Please enter a valid LinkedIn profile URL',
                    },
                  })}
                  placeholder="https://linkedin.com/in/username"
                  className="h-9"
                />
                {errors.linkedinUrl && (
                  <p className="text-xs text-red-500">{errors.linkedinUrl.message}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="websiteUrl" className="text-sm font-medium">Website URL</Label>
                <Input
                  id="websiteUrl"
                  type="url"
                  {...register('websiteUrl', {
                    pattern: {
                      value: /^(https?:\/\/)?([\w\-]+\.)+[\w\-]+(\/[\w\- .\/?%&=]*)?$/,
                      message: 'Please enter a valid website URL',
                    },
                  })}
                  placeholder="https://yourwebsite.com"
                  className="h-9"
                />
                {errors.websiteUrl && (
                  <p className="text-xs text-red-500">{errors.websiteUrl.message}</p>
                )}
              </div>

              <div className="flex items-start space-x-2 pt-2">
                <Checkbox 
                  id="terms" 
                  {...register('agreedToTerms', { required: true })}
                  className="mt-0.5"
                />
                <Label htmlFor="terms" className="text-xs sm:text-sm leading-relaxed">
                  I agree to the terms and conditions and privacy policy *
                </Label>
              </div>
              {errors.agreedToTerms && (
                <p className="text-xs text-red-500">You must agree to the terms and conditions</p>
              )}

              <Button 
                type="submit" 
                disabled={isLoading} 
                className="w-full h-10 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary"
              >
                {isLoading && <span className="mr-2 text-sm">⏳</span>}
                {selectedTier.price === 0 ? 'Complete Registration' : 'Continue to Payment'}
              </Button>

              {selectedTier.price > 0 && (
                <p className="text-xs text-muted-foreground text-center">
                  By continuing, you'll proceed to secure payment processing via Stripe.
                </p>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
    );
  };

  // If onClose is provided, render in a modal
  if (onClose) {
    return (
      <Dialog open={true} onOpenChange={onClose}>
        <DialogContent className="max-w-lg sm:max-w-2xl max-h-[95vh] overflow-y-auto p-4 sm:p-6">
          <DialogHeader className="pb-2">
            <DialogTitle className="text-base sm:text-lg">Membership Registration</DialogTitle>
          </DialogHeader>
          <FormContent />
        </DialogContent>
      </Dialog>
    );
  }

  return <FormContent />;
};
