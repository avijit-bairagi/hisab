export class ApiException extends Error {
    status;
    error;
    fieldErrors;
    constructor(apiError) {
        super(apiError.message || 'An unexpected error occurred');
        this.name = 'ApiException';
        this.status = apiError.status;
        this.error = apiError.error;
        this.fieldErrors = apiError.fieldErrors;
    }
}
async function request(endpoint, options = {}) {
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
        let errorData;
        if (isJson) {
            errorData = await response.json();
        }
        else {
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
    return response.json();
}
export const apiService = {
    getHealth() {
        return request('/api/v1/health');
    },
    getTools() {
        return request('/api/v1/tools');
    },
    evaluateCalculator(expression) {
        const payload = { expression };
        return request('/api/v1/calculator/evaluate', {
            method: 'POST',
            body: JSON.stringify(payload)
        });
    },
    calculateDps(payload) {
        return request('/api/v1/dps/calculate', {
            method: 'POST',
            body: JSON.stringify(payload)
        });
    },
    calculateTax(payload) {
        return request('/api/v1/tax/calculate', {
            method: 'POST',
            body: JSON.stringify(payload)
        });
    }
};
