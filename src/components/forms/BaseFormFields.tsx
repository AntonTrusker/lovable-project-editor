
import { UseFormRegister, FieldErrors } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent } from '@/components/ui/card'
import { useCountries } from '@/hooks/useCountries'

interface BaseFormFieldsProps {
  register: UseFormRegister<any>
  errors: FieldErrors<any>
  setValue: (name: string, value: any) => void
}

export const BaseFormFields = ({ register, errors, setValue }: BaseFormFieldsProps) => {
  const { countries, loading: countriesLoading } = useCountries()

  return (
    <Card className="border-0 bg-muted/5">
      <CardContent className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="first_name" className="text-sm font-medium">First Name *</Label>
            <Input
              id="first_name"
              {...register('first_name', { required: 'First name is required' })}
              placeholder="John"
              className="h-10"
            />
            {errors.first_name && (
              <p className="text-sm text-red-500">{String(errors.first_name.message)}</p>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="last_name" className="text-sm font-medium">Last Name *</Label>
            <Input
              id="last_name"
              {...register('last_name', { required: 'Last name is required' })}
              placeholder="Doe"
              className="h-10"
            />
            {errors.last_name && (
              <p className="text-sm text-red-500">{String(errors.last_name.message)}</p>
            )}
          </div>
        </div>

        <div className="space-y-2">
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
            className="h-10"
          />
          {errors.email && (
            <p className="text-sm text-red-500">{String(errors.email.message)}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone" className="text-sm font-medium">Phone Number</Label>
          <Input
            id="phone"
            type="tel"
            {...register('phone')}
            placeholder="+1 (555) 123-4567"
            className="h-10"
          />
          <p className="text-xs text-muted-foreground">Optional</p>
          {errors.phone && (
            <p className="text-sm text-red-500">{String(errors.phone.message)}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="country" className="text-sm font-medium">Country</Label>
          <Select onValueChange={(value) => setValue('country', value)}>
            <SelectTrigger className="h-10">
              <SelectValue placeholder={countriesLoading ? "Loading countries..." : "Select country"} />
            </SelectTrigger>
            <SelectContent className="max-h-60">
              {countries.map((country) => (
                <SelectItem key={country.id} value={country.name}>
                  {country.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="linkedin_url" className="text-sm font-medium">LinkedIn Profile URL</Label>
          <Input
            id="linkedin_url"
            type="url"
            {...register('linkedin_url', {
              pattern: {
                value: /^(https?:\/\/)?(www\.)?linkedin\.com\/in\/[a-zA-Z0-9-]+\/?$/,
                message: 'Please enter a valid LinkedIn profile URL',
              },
            })}
            placeholder="https://linkedin.com/in/username"
            className="h-10"
          />
          {errors.linkedin_url && (
            <p className="text-sm text-red-500">{String(errors.linkedin_url.message)}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="website_url" className="text-sm font-medium">Website URL</Label>
          <Input
            id="website_url"
            type="url"
            {...register('website_url', {
              pattern: {
                value: /^(https?:\/\/)?([\w\-]+\.)+[\w\-]+(\/[\w\- .\/?%&=]*)?$/,
                message: 'Please enter a valid website URL',
              },
            })}
            placeholder="https://yourwebsite.com"
            className="h-10"
          />
          {errors.website_url && (
            <p className="text-sm text-red-500">{String(errors.website_url.message)}</p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
