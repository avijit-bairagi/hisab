import type { ToolDefinition } from '../types';

export const INITIAL_TOOLS: ToolDefinition[] = [
  {
    id: 'calculator',
    name: 'Calculator',
    route: '/tools/calculator',
    description: 'Perform everyday mathematical calculations.',
    icon: 'mdi-calculator',
    category: 'GENERAL',
    keywords: [
      'calculator',
      'math',
      'arithmetic',
      'percentage',
      'addition',
      'subtraction',
      'multiplication',
      'division'
    ],
    status: 'AVAILABLE'
  },
  {
    id: 'dps-calculator',
    name: 'DPS Calculator',
    route: '/tools/dps-calculator',
    description: 'Estimate savings maturity from regular monthly deposits.',
    icon: 'mdi-piggy-bank-outline',
    category: 'FINANCE',
    keywords: [
      'DPS',
      'savings',
      'monthly deposit',
      'maturity',
      'interest',
      'profit'
    ],
    status: 'AVAILABLE'
  },
  {
    id: 'tax-calculator',
    name: 'Tax Calculator',
    route: '/tools/tax-calculator',
    description: 'Estimate income tax based on a selected Bangladesh tax-year profile.',
    icon: 'mdi-file-document-edit-outline',
    category: 'FINANCE',
    keywords: [
      'income tax',
      'salary tax',
      'tax',
      'rebate',
      'annual income'
    ],
    status: 'AVAILABLE'
  }
];

export function searchTools(tools: ToolDefinition[], query: string): ToolDefinition[] {
  if (!query || !query.trim()) {
    return tools;
  }
  const normalized = query.trim().toLowerCase();
  return tools.filter((tool) => {
    const nameMatch = tool.name.toLowerCase().includes(normalized);
    const descMatch = tool.description.toLowerCase().includes(normalized);
    const keywordMatch = tool.keywords.some((k) => k.toLowerCase().includes(normalized));
    const categoryMatch = tool.category.toLowerCase().includes(normalized);
    return nameMatch || descMatch || keywordMatch || categoryMatch;
  });
}
