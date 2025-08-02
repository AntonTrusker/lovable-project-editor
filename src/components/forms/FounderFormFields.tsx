
import { UseFormRegister, FieldErrors } from 'react-hook-form'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Rocket } from 'lucide-react'
import { FounderData } from '@/types/membership'

interface FounderFormFieldsProps {
  register: UseFormRegister<FounderData>
  errors: FieldErrors<FounderData>
  setValue: (name: string, value: any) => void
}

const startupStages = [
  'Idea/Pre-seed',
  'Seed',
  'Series A',
  'Series B',
  'Series C+',
  'Growth',
  'Enterprise',
]

const industries = [
  'Technology',
  'Healthcare',
  'FinTech',
  'E-commerce',
  'Education',
  'Manufacturing',
  'Real Estate',
  'Food & Beverage',
  'Transportation',
  'Energy',
  'Media & Entertainment',
  'Other'
]

const fundingStages = [
  'Bootstrapped',
  'Friends & Family',
  'Angel',
  'Seed',
  'Series A',
  'Series B',
  'Series C+',
  'Not seeking funding'
]

export const FounderFormFields = ({ register, errors, setValue }: FounderFormFieldsProps) => {
  return (
    <Card className="border-0 bg-muted/5">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center text-lg">
          <Rocket className="h-5 w-5 mr-2 text-primary" />
          Startup Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="startup_stage" className="text-sm font-medium">Startup Stage</Label>
            <Select onValueChange={(value) => setValue('startup_stage', value)}>
              <SelectTrigger className="h-10">
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
          </div>

          <div className="space-y-2">
            <Label htmlFor="company_name" className="text-sm font-medium">Company Name</Label>
            <Input
              id="company_name"
              {...register('company_name')}
              placeholder="Your Company Inc."
              className="h-10"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="industry" className="text-sm font-medium">Industry</Label>
            <Select onValueChange={(value) => setValue('industry', value)}>
              <SelectTrigger className="h-10">
                <SelectValue placeholder="Select industry" />
              </SelectTrigger>
              <SelectContent>
                {industries.map((industry) => (
                  <SelectItem key={industry} value={industry}>
                    {industry}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="team_size" className="text-sm font-medium">Team Size</Label>
            <Input
              id="team_size"
              type="number"
              {...register('team_size', {
                valueAsNumber: true,
                min: { value: 1, message: 'Team size must be at least 1' }
              })}
              placeholder="5"
              className="h-10"
            />
            {errors.team_size && (
              <p className="text-sm text-red-500">{String(errors.team_size.message)}</p>
            )}
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="funding_stage" className="text-sm font-medium">Funding Stage</Label>
          <Select onValueChange={(value) => setValue('funding_stage', value)}>
            <SelectTrigger className="h-10">
              <SelectValue placeholder="Select funding stage" />
            </SelectTrigger>
            <SelectContent>
              {fundingStages.map((stage) => (
                <SelectItem key={stage} value={stage}>
                  {stage}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  )
}
