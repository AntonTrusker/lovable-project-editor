
import { UseFormRegister, FieldErrors } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Handshake } from 'lucide-react'
import { PartnerData, PartnershipType, PartnershipInterest } from '@/types/membership'
import { useCountries } from '@/hooks/useCountries'

interface PartnerFormFieldsProps {
  register: UseFormRegister<PartnerData>
  errors: FieldErrors<PartnerData>
  setValue: (name: string, value: any) => void
}

const partnershipTypes = [
  { value: 'incubator-accelerator', label: 'Business Incubators & Accelerators' },
  { value: 'software-technology', label: 'Software & Technology Companies' },
  { value: 'large-corporation', label: 'Large Corporations & Enterprises' },
  { value: 'event-organizer', label: 'Event Organizers & Conference Hosts' },
  { value: 'professional-services', label: 'Professional Service Providers' },
  { value: 'venture-capital', label: 'Venture Capital Firms & Investors' },
  { value: 'educational-institution', label: 'Educational Institutions & Universities' },
  { value: 'other', label: 'Other' }
]

const partnershipInterests = [
  { value: 'early-partnership-membership', label: 'Special Early Partnership Program' },
  { value: 'sponsor-project', label: 'Sponsor our project (we will contact separately)' },
  { value: 'standard-partnership', label: 'Standard Partnership' }
]

const companySizes = [
  'Startup (1-10 employees)',
  'Small (11-50 employees)',
  'Medium (51-200 employees)',
  'Large (201-1000 employees)',
  'Enterprise (1000+ employees)'
]

export const PartnerFormFields = ({ register, errors, setValue }: PartnerFormFieldsProps) => {
  const { countries, loading: countriesLoading } = useCountries()

  return (
    <Card className="border-0 bg-muted/5">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center text-lg">
          <Handshake className="h-5 w-5 mr-2 text-primary" />
          Partnership Details
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="country" className="text-sm font-medium">Country *</Label>
          <Select onValueChange={(value) => setValue('country', value)}>
            <SelectTrigger className="h-10">
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

        <div className="space-y-2">
          <Label htmlFor="company_name" className="text-sm font-medium">Company Name *</Label>
          <Input
            id="company_name"
            {...register('company_name', { required: 'Company name is required' })}
            placeholder="Your Company Inc."
            className="h-10"
          />
          {errors.company_name && (
            <p className="text-sm text-red-500">{String(errors.company_name.message)}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="partnership_type" className="text-sm font-medium">Partnership Type</Label>
            <Select onValueChange={(value) => setValue('partnership_type', value as PartnershipType)}>
              <SelectTrigger className="h-10">
                <SelectValue placeholder="Select partnership type" />
              </SelectTrigger>
              <SelectContent>
                {partnershipTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="company_size" className="text-sm font-medium">Company Size</Label>
            <Select onValueChange={(value) => setValue('company_size', value)}>
              <SelectTrigger className="h-10">
                <SelectValue placeholder="Select company size" />
              </SelectTrigger>
              <SelectContent>
                {companySizes.map((size) => (
                  <SelectItem key={size} value={size}>
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="partnership_interest" className="text-sm font-medium">Partnership Interest</Label>
          <Select onValueChange={(value) => setValue('partnership_interest', value as PartnershipInterest)}>
            <SelectTrigger className="h-10">
              <SelectValue placeholder="Select your interest level" />
            </SelectTrigger>
            <SelectContent>
              {partnershipInterests.map((interest) => (
                <SelectItem key={interest.value} value={interest.value}>
                  {interest.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="services_offered" className="text-sm font-medium">Services Offered</Label>
          <Textarea
            id="services_offered"
            {...register('services_offered')}
            placeholder="Describe the services your company offers..."
            rows={3}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="years_experience" className="text-sm font-medium">Years of Experience</Label>
            <Input
              id="years_experience"
              type="number"
              {...register('years_experience', {
                valueAsNumber: true,
                min: { value: 0, message: 'Years of experience cannot be negative' }
              })}
              placeholder="5"
              className="h-10"
            />
            {errors.years_experience && (
              <p className="text-sm text-red-500">{String(errors.years_experience.message)}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="expected_partnership_model" className="text-sm font-medium">Expected Partnership Model</Label>
            <Select onValueChange={(value) => setValue('expected_partnership_model', value)}>
              <SelectTrigger className="h-10">
                <SelectValue placeholder="Select preferred model" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="revenue-sharing">Revenue Sharing</SelectItem>
                <SelectItem value="strategic-alliance">Strategic Alliance</SelectItem>
                <SelectItem value="joint-venture">Joint Venture</SelectItem>
                <SelectItem value="referral-partnership">Referral Partnership</SelectItem>
                <SelectItem value="licensing">Licensing Agreement</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="additional_information" className="text-sm font-medium">Additional Information</Label>
          <Textarea
            id="additional_information"
            {...register('additional_information')}
            placeholder="Tell us more about your partnership goals and expectations..."
            rows={4}
          />
        </div>
      </CardContent>
    </Card>
  )
}
