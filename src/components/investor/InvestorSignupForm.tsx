
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useCountries } from '@/hooks/useCountries';

interface InvestorSignupData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  linkedinUrl?: string;
  investorType: string;
  organizationName: string;
  investmentFocus: string;
  ticketSizeMin: number;
  ticketSizeMax: number;
  preferredStages: string;
  portfolioSize?: number;
  additionalInfo?: string;
  agreedToTerms: boolean;
}

const investorTypes = [
  'Angel Investor',
  'Venture Capitalist',
  'Family Office',
  'Corporate Investor',
  'Fund Manager',
  'Private Equity',
  'Crowdfunding Platform',
  'Other'
];

const investmentStages = [
  'Pre-seed',
  'Seed',
  'Series A',
  'Series B',
  'Series C+',
  'Growth',
  'Late Stage'
];

export const InvestorSignupForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { countries, loading: countriesLoading } = useCountries();

  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<InvestorSignupData>();

  const onSubmit = async (data: InvestorSignupData) => {
    if (!data.agreedToTerms) {
      toast.error('Please agree to the terms and conditions');
      return;
    }

    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Investor signup data:', data);
      toast.success('Application submitted successfully! We\'ll be in touch soon.');
      setIsSubmitted(true);
    } catch (error) {
      toast.error('Failed to submit application. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <Card className="border-0 bg-gradient-to-br from-green-50 to-green-100/50">
        <CardContent className="p-8 text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-green-800 mb-2">Application Submitted!</h3>
          <p className="text-green-600 mb-4">
            Thank you for your interest in joining our investor community. Our team will review your application and get back to you within 24-48 hours.
          </p>
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            Application Under Review
          </Badge>
        </CardContent>
      </Card>
    );
  }

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
            <p className="text-sm text-red-500">{errors.firstName.message}</p>
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
            <p className="text-sm text-red-500">{errors.lastName.message}</p>
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
          <p className="text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <Input
            id="phone"
            type="tel"
            {...register('phone', {
              pattern: {
                value: /^[\+\d\s-()]{10,}$/,
                message: 'Please enter a valid phone number',
              },
            })}
            placeholder="+1 (555) 123-4567"
          />
          {errors.phone && (
            <p className="text-sm text-red-500">{errors.phone.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="country">Country</Label>
          <Select onValueChange={(value) => setValue('country', value)}>
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
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="linkedinUrl">LinkedIn Profile URL</Label>
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
        />
        {errors.linkedinUrl && (
          <p className="text-sm text-red-500">{errors.linkedinUrl.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="investorType">Investor Type *</Label>
          <Select onValueChange={(value) => setValue('investorType', value)}>
            <SelectTrigger>
              <SelectValue placeholder="Select investor type" />
            </SelectTrigger>
            <SelectContent>
              {investorTypes.map((type) => (
                <SelectItem key={type} value={type}>
                  {type}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.investorType && (
            <p className="text-sm text-red-500">Please select an investor type</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="organizationName">Organization/Fund Name *</Label>
          <Input
            id="organizationName"
            {...register('organizationName', { required: 'Organization name is required' })}
            placeholder="Your Fund/Organization"
          />
          {errors.organizationName && (
            <p className="text-sm text-red-500">{errors.organizationName.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="investmentFocus">Investment Focus *</Label>
        <Textarea
          id="investmentFocus"
          {...register('investmentFocus', { required: 'Investment focus is required' })}
          placeholder="Describe your investment focus (industries, stages, geographies, etc.)"
          rows={3}
        />
        {errors.investmentFocus && (
          <p className="text-sm text-red-500">{errors.investmentFocus.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="ticketSizeMin">Minimum Ticket Size ($)</Label>
          <Input
            id="ticketSizeMin"
            type="number"
            {...register('ticketSizeMin', {
              valueAsNumber: true,
              min: { value: 0, message: 'Minimum ticket size cannot be negative' }
            })}
            placeholder="10000"
          />
          {errors.ticketSizeMin && (
            <p className="text-sm text-red-500">{errors.ticketSizeMin.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="ticketSizeMax">Maximum Ticket Size ($)</Label>
          <Input
            id="ticketSizeMax"
            type="number"
            {...register('ticketSizeMax', {
              valueAsNumber: true,
              min: { value: 0, message: 'Maximum ticket size cannot be negative' }
            })}
            placeholder="100000"
          />
          {errors.ticketSizeMax && (
            <p className="text-sm text-red-500">{errors.ticketSizeMax.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="preferredStages">Preferred Investment Stages</Label>
          <Textarea
            id="preferredStages"
            {...register('preferredStages')}
            placeholder="e.g., Pre-seed, Seed, Series A"
            rows={2}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="portfolioSize">Current Portfolio Size</Label>
          <Input
            id="portfolioSize"
            type="number"
            {...register('portfolioSize', {
              valueAsNumber: true,
              min: { value: 0, message: 'Portfolio size cannot be negative' }
            })}
            placeholder="25"
          />
          {errors.portfolioSize && (
            <p className="text-sm text-red-500">{errors.portfolioSize.message}</p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="additionalInfo">Additional Information</Label>
        <Textarea
          id="additionalInfo"
          {...register('additionalInfo')}
          placeholder="Tell us more about your investment criteria, portfolio companies, or any specific interests..."
          rows={4}
        />
      </div>

      <div className="flex items-center space-x-2">
        <Checkbox 
          id="terms" 
          {...register('agreedToTerms', { required: true })}
        />
        <Label htmlFor="terms" className="text-sm">
          I agree to the terms and conditions and privacy policy *
        </Label>
      </div>
      {errors.agreedToTerms && (
        <p className="text-sm text-red-500">You must agree to the terms and conditions</p>
      )}

      <Button 
        type="submit" 
        disabled={isLoading} 
        className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary"
      >
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        {isLoading ? 'Submitting Application...' : 'Submit Application'}
      </Button>

      <p className="text-xs text-muted-foreground text-center">
        By submitting this form, you'll join our exclusive investor community and get access to curated deal flow.
      </p>
    </form>
  );
};
