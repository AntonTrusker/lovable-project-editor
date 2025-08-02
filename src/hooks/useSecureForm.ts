
import { useState, useCallback } from 'react';
import { SecurityUtils, SecureErrorHandler } from '@/utils/security';
import { toast } from 'sonner';

interface UseSecureFormOptions {
  rateLimitKey?: string;
  maxAttempts?: number;
  windowMs?: number;
}

/**
 * Custom hook for secure form handling with input validation and rate limiting
 */
export const useSecureForm = (options: UseSecureFormOptions = {}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const {
    rateLimitKey = 'form_submission',
    maxAttempts = 5,
    windowMs = 15 * 60 * 1000 // 15 minutes
  } = options;

  /**
   * Validate and sanitize form data
   */
  const validateAndSanitize = useCallback((data: Record<string, any>): { isValid: boolean; sanitizedData: Record<string, any>; errors: Record<string, string> } => {
    const sanitizedData: Record<string, any> = {};
    const validationErrors: Record<string, string> = {};

    for (const [key, value] of Object.entries(data)) {
      if (value === null || value === undefined) {
        sanitizedData[key] = value;
        continue;
      }

      const stringValue = String(value);
      
      switch (key) {
        case 'email':
          const sanitizedEmail = SecurityUtils.sanitizeText(stringValue).toLowerCase();
          if (!SecurityUtils.isValidEmail(sanitizedEmail)) {
            validationErrors[key] = 'Please enter a valid email address';
          } else {
            sanitizedData[key] = sanitizedEmail;
          }
          break;

        case 'phone':
          const sanitizedPhone = SecurityUtils.sanitizeText(stringValue);
          if (sanitizedPhone && !SecurityUtils.isValidPhone(sanitizedPhone)) {
            validationErrors[key] = 'Please enter a valid phone number';
          } else {
            sanitizedData[key] = sanitizedPhone;
          }
          break;

        case 'linkedin_url':
        case 'website_url':
          const sanitizedUrl = SecurityUtils.sanitizeText(stringValue);
          if (sanitizedUrl && !SecurityUtils.isValidUrl(sanitizedUrl)) {
            validationErrors[key] = 'Please enter a valid URL';
          } else {
            sanitizedData[key] = sanitizedUrl;
          }
          break;

        case 'first_name':
        case 'last_name':
        case 'company_name':
          const sanitizedName = SecurityUtils.sanitizeText(stringValue);
          if (!sanitizedName || sanitizedName.length < 2) {
            validationErrors[key] = `${key.replace('_', ' ')} must be at least 2 characters long`;
          } else if (sanitizedName.length > 100) {
            validationErrors[key] = `${key.replace('_', ' ')} must be less than 100 characters`;
          } else {
            sanitizedData[key] = sanitizedName;
          }
          break;

        default:
          // For other fields, just sanitize the text
          sanitizedData[key] = typeof stringValue === 'string' ? SecurityUtils.sanitizeText(stringValue) : value;
          break;
      }
    }

    return {
      isValid: Object.keys(validationErrors).length === 0,
      sanitizedData,
      errors: validationErrors
    };
  }, []);

  /**
   * Submit form with security checks
   */
  const secureSubmit = useCallback(async <T>(
    formData: Record<string, any>,
    submitFunction: (sanitizedData: Record<string, any>) => Promise<T>,
    customRateLimitKey?: string
  ): Promise<T | null> => {
    try {
      // Check rate limiting
      const limitKey = customRateLimitKey || `${rateLimitKey}_${formData.email || 'anonymous'}`;
      if (!SecurityUtils.checkRateLimit(limitKey, maxAttempts, windowMs)) {
        toast.error('Too many attempts. Please wait before trying again.');
        return null;
      }

      // Validate and sanitize input
      const { isValid, sanitizedData, errors: validationErrors } = validateAndSanitize(formData);
      
      if (!isValid) {
        setErrors(validationErrors);
        toast.error('Please correct the errors and try again.');
        return null;
      }

      setErrors({});
      setIsLoading(true);

      // Submit with sanitized data
      const result = await submitFunction(sanitizedData);
      
      toast.success('Form submitted successfully!');
      return result;

    } catch (error) {
      const errorMessage = SecureErrorHandler.handleError(error, 'Form submission');
      setErrors({ submit: errorMessage });
      toast.error(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [rateLimitKey, maxAttempts, windowMs, validateAndSanitize]);

  /**
   * Clear errors
   */
  const clearErrors = useCallback(() => {
    setErrors({});
  }, []);

  /**
   * Clear specific error
   */
  const clearError = useCallback((field: string) => {
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });
  }, []);

  return {
    isLoading,
    errors,
    secureSubmit,
    validateAndSanitize,
    clearErrors,
    clearError
  };
};
