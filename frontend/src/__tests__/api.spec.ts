import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { apiService, ApiException } from '../services/api';

describe('API Service', () => {
  const originalFetch = globalThis.fetch;

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    globalThis.fetch = originalFetch;
  });

  it('successfully fetches health status', async () => {
    const mockHealth = {
      status: 'UP',
      version: '1.0.0',
      timestamp: '2026-10-29T12:00:00Z'
    };
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      headers: new Headers({ 'content-type': 'application/json' }),
      json: () => Promise.resolve(mockHealth)
    } as unknown as Response);

    const res = await apiService.getHealth();
    expect(res.status).toBe('UP');
    expect(res.version).toBe('1.0.0');
  });

  it('successfully evaluates calculator expression', async () => {
    const mockResponse = {
      expression: '12 + 8',
      result: '20',
      formattedResult: '20'
    };
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: true,
      headers: new Headers({ 'content-type': 'application/json' }),
      json: () => Promise.resolve(mockResponse)
    } as unknown as Response);

    const res = await apiService.evaluateCalculator('12 + 8');
    expect(res.result).toBe('20');
  });

  it('throws ApiException with field errors on 400 Bad Request', async () => {
    const mockError = {
      status: 400,
      error: 'Bad Request',
      message: 'Validation failed for one or more fields',
      timestamp: '2026-10-29T12:00:00Z',
      fieldErrors: {
        monthlyDeposit: 'Monthly deposit must be greater than zero'
      }
    };
    globalThis.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 400,
      statusText: 'Bad Request',
      headers: new Headers({ 'content-type': 'application/json' }),
      json: () => Promise.resolve(mockError)
    } as unknown as Response);

    await expect(
      apiService.calculateDps({
        monthlyDeposit: -100,
        durationMonths: 12,
        annualInterestRate: 8,
        depositTiming: 'BEGINNING_OF_MONTH',
        compoundingFrequency: 'MONTHLY'
      })
    ).rejects.toThrow(ApiException);
  });
});
