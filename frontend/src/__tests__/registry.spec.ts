import { describe, it, expect } from 'vitest';
import { INITIAL_TOOLS, searchTools } from '../tools/registry';

describe('Tool Registry', () => {
  it('contains the three initial tools', () => {
    expect(INITIAL_TOOLS).toHaveLength(3);
    const ids = INITIAL_TOOLS.map((t) => t.id);
    expect(ids).toContain('calculator');
    expect(ids).toContain('dps-calculator');
    expect(ids).toContain('tax-calculator');
  });

  it('matches tools case-insensitively by name', () => {
    const results = searchTools(INITIAL_TOOLS, 'CaLcUlAtOr');
    expect(results.length).toBeGreaterThanOrEqual(1);
    expect(results.some((t) => t.id === 'calculator')).toBe(true);
  });

  it('matches tools by description', () => {
    const results = searchTools(INITIAL_TOOLS, 'maturity');
    expect(results.length).toBe(1);
    expect(results[0].id).toBe('dps-calculator');
  });

  it('matches tools by keywords', () => {
    const arithmeticMatch = searchTools(INITIAL_TOOLS, 'arithmetic');
    expect(arithmeticMatch.some((t) => t.id === 'calculator')).toBe(true);

    const rebateMatch = searchTools(INITIAL_TOOLS, 'rebate');
    expect(rebateMatch.some((t) => t.id === 'tax-calculator')).toBe(true);
  });

  it('returns empty array when no tools match', () => {
    const results = searchTools(INITIAL_TOOLS, 'nonexistent-tool-xyz');
    expect(results).toHaveLength(0);
  });

  it('returns all tools when search query is empty or whitespace', () => {
    expect(searchTools(INITIAL_TOOLS, '')).toHaveLength(3);
    expect(searchTools(INITIAL_TOOLS, '   ')).toHaveLength(3);
  });
});
