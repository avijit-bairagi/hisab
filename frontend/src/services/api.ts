import type {
  CalculatorRequest,
  CalculatorResponse,
  DpsRequest,
  DpsResponse,
  HealthStatus,
  TaxRequest,
  TaxResponse,
  ToolDefinition,
  ApiError
} from '../types';

export class ApiException extends Error {
  public status: number;
  public error: string;
  public fieldErrors?: Record<string, string>;

  constructor(apiError: ApiError) {
    super(apiError.message || 'An unexpected error occurred');
    this.name = 'ApiException';
    this.status = apiError.status;
    this.error = apiError.error;
    this.fieldErrors = apiError.fieldErrors;
  }
}

async function request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const headers = new Headers(options.headers || {});
  if (!headers.has('Accept')) {
    headers.set('Accept', 'application/json');
  }
  if (options.body && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  const response = await fetch(endpoint, {
    ...options,
    headers
  });

  const contentType = response.headers.get('content-type') || '';
  const isJson = contentType.includes('application/json');

  if (!response.ok) {
    let errorData: ApiError;
    if (isJson) {
      errorData = await response.json();
    } else {
      const text = await response.text();
      errorData = {
        status: response.status,
        error: response.statusText,
        message: text || `HTTP error ${response.status}`,
        timestamp: new Date().toISOString()
      };
    }
    throw new ApiException(errorData);
  }

  return response.json() as Promise<T>;
}

export const apiService = {
  getHealth(): Promise<HealthStatus> {
    return request<HealthStatus>('/api/v1/health');
  },

  getTools(): Promise<ToolDefinition[]> {
    return request<ToolDefinition[]>('/api/v1/tools');
  },

  evaluateCalculator(expression: string): Promise<CalculatorResponse> {
    const payload: CalculatorRequest = { expression };
    return request<CalculatorResponse>('/api/v1/calculator/evaluate', {
      method: 'POST',
      body: JSON.stringify(payload)
    });
  },

  calculateDps(payload: DpsRequest): Promise<DpsResponse> {
    return request<DpsResponse>('/api/v1/dps/calculate', {
      method: 'POST',
      body: JSON.stringify(payload)
    });
  },

  calculateTax(payload: TaxRequest): Promise<TaxResponse> {
    return request<TaxResponse>('/api/v1/tax/calculate', {
      method: 'POST',
      body: JSON.stringify(payload)
    });
  }
};
