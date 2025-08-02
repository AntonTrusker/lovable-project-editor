
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Handshake, CheckCircle } from 'lucide-react'
import { BaseFormFields } from '@/components/forms/BaseFormFields'
import { PartnerFormFields } from '@/components/forms/PartnerFormFields'
import { useSecureForm } from '@/hooks/useSecureForm'
import { MemberService } from '@/services/memberService'
import { PartnerData } from '@/types/membership'
import { toast } from 'sonner'

interface PartnershipApplicationFormProps {
  selectedType?: string
  onClose?: () => void
}

const PartnershipApplicationForm = ({ selectedType, onClose }: PartnershipApplicationFormProps) => {
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const { register, handleSubmit, formState: { errors }, setValue } = useForm<PartnerData>({
    defaultValues: {
      email: '',
      first_name: '',
      last_name: '',
      company_name: '',
      country: '',
      partnership_type: selectedType as any || undefined
    }
  })

  const onSubmit = async (data: PartnerData) => {
    setIsLoading(true)
    try {
      // Transform PartnerData to MemberData format for the service
      const memberData = {
        ...data,
        user_type: 'partner' as const
      }

      const result = await MemberService.createMember({
        memberData,
        tierId: 'partner-tier-id'
      })

      toast.success('Partnership application submitted successfully!')
      setIsSubmitted(true)
    } catch (error) {
      console.error('Error submitting partnership application:', error)
      toast.error('Failed to submit application. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  if (isSubmitted) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto" />
            <h2 className="text-2xl font-bold">Application Submitted!</h2>
            <p className="text-muted-foreground">
              Thank you for your interest in partnering with us. We'll review your application and get back to you within 2-3 business days.
            </p>
            {onClose && (
              <Button onClick={onClose} className="mt-4">
                Close
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center text-2xl">
            <Handshake className="h-6 w-6 mr-2 text-primary" />
            Partnership Application
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <BaseFormFields register={register} errors={errors} setValue={setValue} />
            
            <PartnerFormFields register={register} errors={errors} setValue={setValue} />

            <div className="flex justify-end space-x-3 pt-4">
              {onClose && (
                <Button type="button" variant="outline" onClick={onClose} disabled={isLoading}>
                  Cancel
                </Button>
              )}
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Submitting...' : 'Submit Application'}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

export default PartnershipApplicationForm
