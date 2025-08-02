
import { UseFormRegister, FieldErrors } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { TrendingUp } from 'lucide-react'
import { InvestorData } from '@/types/membership'
import { useCountries } from '@/hooks/useCountries'

interface InvestorFormFieldsProps {
  register: UseFormRegister<InvestorData>
  errors: FieldErrors<InvestorData>
  setValue: (name: string, value: any) => void
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
]

export const InvestorFormFields = ({ register, errors, setValue }: InvestorFormFieldsProps) => {
  const { countries, loading: countriesLoading } = useCountries()

  return (
    <Card className="border-0 bg-muted/5">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center text-lg">
          <TrendingUp className="h-5 w-5 mr-2 text-primary" />
          Investment Details
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
          <Label htmlFor="investor_type" className="text-sm font-medium">Investor Type *</Label>
          <Select onValueChange={(value) => setValue('investor_type', value)}>
            <SelectTrigger className="h-10">
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
          {errors.investor_type && (
            <p className="text-sm text-red-500">Please select an investor type</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="investment_focus" className="text-sm font-medium">Investment Focus</Label>
          <Textarea
            id="investment_focus"
            {...register('investment_focus')}
            placeholder="Describe your investment focus (industries, stages, etc.)..."
            rows={3}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="ticket_size_min" className="text-sm font-medium">Minimum Ticket Size ($)</Label>
            <Input
              id="ticket_size_min"
              type="number"
              {...register('ticket_size_min', {
                valueAsNumber: true,
                min: { value: 0, message: 'Minimum ticket size cannot be negative' }
              })}
              placeholder="10000"
              className="h-10"
            />
            {errors.ticket_size_min && (
              <p className="text-sm text-red-500">{String(errors.ticket_size_min.message)}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="ticket_size_max" className="text-sm font-medium">Maximum Ticket Size ($)</Label>
            <Input
              id="ticket_size_max"
              type="number"
              {...register('ticket_size_max', {
                valueAsNumber: true,
                min: { value: 0, message: 'Maximum ticket size cannot be negative' }
              })}
              placeholder="100000"
              className="h-10"
            />
            {errors.ticket_size_max && (
              <p className="text-sm text-red-500">{String(errors.ticket_size_max.message)}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="preferred_stages" className="text-sm font-medium">Preferred Stages</Label>
            <Textarea
              id="preferred_stages"
              {...register('preferred_stages')}
              placeholder="Pre-seed, Seed, Series A..."
              rows={2}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="portfolio_size" className="text-sm font-medium">Portfolio Size</Label>
            <Input
              id="portfolio_size"
              type="number"
              {...register('portfolio_size', {
                valueAsNumber: true,
                min: { value: 0, message: 'Portfolio size cannot be negative' }
              })}
              placeholder="25"
              className="h-10"
            />
            {errors.portfolio_size && (
              <p className="text-sm text-red-500">{String(errors.portfolio_size.message)}</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
