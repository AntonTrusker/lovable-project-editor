
import { SecurityUtils, SecureErrorHandler } from './security';

interface RequestConfig {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  headers?: Record<string, string>;
  body?: any;
  timeout?: number;
  retries?: number;
  retryDelay?: number;
}

/**
 * Secure API client with built-in security features
 */
export class SecureApiClient {
  private static readonly DEFAULT_TIMEOUT = 30000; // 30 seconds
  private static readonly DEFAULT_RETRIES = 3;
  private static readonly DEFAULT_RETRY_DELAY = 1000; // 1 second

  /**
   * Make a secure API request with built-in security features
   */
  static async request<T>(
    url: string,
    config: RequestConfig = {}
  ): Promise<T> {
    const {
      method = 'GET',
      headers = {},
      body,
      timeout = this.DEFAULT_TIMEOUT,
      retries = this.DEFAULT_RETRIES,
      retryDelay = this.DEFAULT_RETRY_DELAY
    } = config;

    // Security headers
    const secureHeaders = {
      'Content-Type': 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'X-Frame-Options': 'DENY',
      'X-Content-Type-Options': 'nosniff',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      ...headers
    };

    // Add CSRF protection for state-changing operations
    if (['POST', 'PUT', 'DELETE', 'PATCH'].includes(method)) {
      const csrfToken = SecurityUtils.generateSecureToken();
      secureHeaders['X-CSRF-Token'] = csrfToken;
      // Store token for validation if needed
      sessionStorage.setItem('csrf-token', csrfToken);
    }

    const requestConfig: RequestInit = {
      method,
      headers: secureHeaders,
      credentials: 'same-origin', // Only send cookies for same-origin requests
      mode: 'cors',
      cache: 'no-cache'
    };

    // Sanitize and add body if present
    if (body && ['POST', 'PUT', 'PATCH'].includes(method)) {
      requestConfig.body = JSON.stringify(this.sanitizeRequestBody(body));
    }

    // Create AbortController for timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);
    requestConfig.signal = controller.signal;

    let lastError: unknown;

    // Retry logic
    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        const response = await fetch(url, requestConfig);
        clearTimeout(timeoutId);

        // Handle HTTP errors
        if (!response.ok) {
          const errorData = await this.handleErrorResponse(response);
          throw new Error(`HTTP ${response.status}: ${errorData.message || response.statusText}`);
        }

        // Parse JSON response safely
        const data = await this.parseJsonResponse<T>(response);
        return data;

      } catch (error) {
        lastError = error;
        clearTimeout(timeoutId);

        // Don't retry on certain errors
        if (this.isNonRetryableError(error)) {
          break;
        }

        // Wait before retrying (exponential backoff)
        if (attempt < retries) {
          await this.delay(retryDelay * Math.pow(2, attempt - 1));
        }
      }
    }

    // All retries failed, handle the error
    throw SecureErrorHandler.handleError(lastError, `API request to ${url}`);
  }

  /**
   * Sanitize request body to prevent injection attacks
   */
  private static sanitizeRequestBody(body: any): any {
    if (typeof body === 'string') {
      return SecurityUtils.sanitizeText(body);
    }

    if (Array.isArray(body)) {
      return body.map(item => this.sanitizeRequestBody(item));
    }

    if (body && typeof body === 'object') {
      const sanitized: any = {};
      for (const [key, value] of Object.entries(body)) {
        if (typeof value === 'string') {
          sanitized[key] = SecurityUtils.sanitizeText(value);
        } else {
          sanitized[key] = this.sanitizeRequestBody(value);
        }
      }
      return sanitized;
    }

    return body;
  }

  /**
   * Handle error responses securely
   */
  private static async handleErrorResponse(response: Response): Promise<any> {
    try {
      const errorData = await response.json();
      return errorData;
    } catch {
      return { message: 'An error occurred while processing your request' };
    }
  }

  /**
   * Safely parse JSON response
   */
  private static async parseJsonResponse<T>(response: Response): Promise<T> {
    const text = await response.text();
    
    if (!text) {
      return {} as T;
    }

    try {
      return JSON.parse(text);
    } catch (error) {
      throw new Error('Invalid JSON response from server');
    }
  }

  /**
   * Check if error should not be retried
   */
  private static isNonRetryableError(error: unknown): boolean {
    if (error instanceof Error) {
      const message = error.message.toLowerCase();
      return (
        message.includes('400') || // Bad Request
        message.includes('401') || // Unauthorized
        message.includes('403') || // Forbidden
        message.includes('404') || // Not Found
        message.includes('422') || // Unprocessable Entity
        message.includes('abort')  // Request was aborted
      );
    }
    return false;
  }

  /**
   * Delay utility for retries
   */
  private static delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * GET request helper
   */
  static async get<T>(url: string, config?: Omit<RequestConfig, 'method' | 'body'>): Promise<T> {
    return this.request<T>(url, { ...config, method: 'GET' });
  }

  /**
   * POST request helper
   */
  static async post<T>(url: string, body?: any, config?: Omit<RequestConfig, 'method'>): Promise<T> {
    return this.request<T>(url, { ...config, method: 'POST', body });
  }

  /**
   * PUT request helper
   */
  static async put<T>(url: string, body?: any, config?: Omit<RequestConfig, 'method'>): Promise<T> {
    return this.request<T>(url, { ...config, method: 'PUT', body });
  }

  /**
   * DELETE request helper
   */
  static async delete<T>(url: string, config?: Omit<RequestConfig, 'method' | 'body'>): Promise<T> {
    return this.request<T>(url, { ...config, method: 'DELETE' });
  }
}
