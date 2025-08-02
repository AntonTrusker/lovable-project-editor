
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Loader2, TrendingUp } from 'lucide-react';
import { toast } from 'sonner';
import { useCountries } from '@/hooks/useCountries';
import { supabase } from '@/integrations/supabase/client';

interface InvestorInterestData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  country: string;
  company: string;
  title: string;
  investorType: string;
  additionalQuestions?: string;
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

export const InvestorInterestForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { countries, loading: countriesLoading } = useCountries();

  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<InvestorInterestData>();

  const onSubmit = async (data: InvestorInterestData) => {
    setIsLoading(true);
    try {
      // Use a Supabase edge function to handle the submission
      const { data: result, error } = await supabase.functions.invoke('submit-investor-interest', {
        body: {
          first_name: data.firstName,
          last_name: data.lastName,
          email: data.email,
          phone: data.phone || null,
          country: data.country,
          user_type: 'Investor',
          company: data.company,
          title: data.title,
          investor_type: data.investorType,
          additional_questions: data.additionalQuestions || null,
        }
      });

      if (error) {
        throw error;
      }

      toast.success('Interest submitted successfully! We\'ll be in touch soon.');
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting investor interest:', error);
      toast.error('Failed to submit interest. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <Card className="border-0 bg-gradient-to-br from-green-50 to-green-100/50">
        <CardContent className="p-8 text-center">
          <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-green-800 mb-2">Interest Submitted!</h3>
          <p className="text-green-600 mb-4">
            Thank you for your interest in joining our investor community. Our team will review your submission and get back to you within 24-48 hours.
          </p>
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            Submission Under Review
          </Badge>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="border-0 bg-muted/5">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center text-lg">
            <TrendingUp className="h-5 w-5 mr-2 text-primary" />
            Investor Interest Form
          </CardTitle>
        </CardHeader>
        <CardContent>
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
                  {...register('phone')}
                  placeholder="+1 (555) 123-4567"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="country">Country *</Label>
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
                {errors.country && (
                  <p className="text-sm text-red-500">Please select a country</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="company">Company/Organization *</Label>
                <Input
                  id="company"
                  {...register('company', { required: 'Company is required' })}
                  placeholder="Your Company"
                />
                {errors.company && (
                  <p className="text-sm text-red-500">{errors.company.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="title">Title/Position *</Label>
                <Input
                  id="title"
                  {...register('title', { required: 'Title is required' })}
                  placeholder="CEO, Investment Partner, etc."
                />
                {errors.title && (
                  <p className="text-sm text-red-500">{errors.title.message}</p>
                )}
              </div>
            </div>

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
              <Label htmlFor="additionalQuestions">Additional Information</Label>
              <Textarea
                id="additionalQuestions"
                {...register('additionalQuestions')}
                placeholder="Tell us more about your investment interests, portfolio, or any specific questions..."
                rows={4}
              />
            </div>

            <Button 
              type="submit" 
              disabled={isLoading} 
              className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary"
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isLoading ? 'Submitting...' : 'Submit Interest'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
