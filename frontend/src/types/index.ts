export type ToolCategory = 'GENERAL' | 'FINANCE';
export type ToolStatus = 'AVAILABLE' | 'COMING_SOON';

export interface ToolDefinition {
  id: string;
  name: string;
  route: string;
  description: string;
  icon: string;
  category: ToolCategory;
  keywords: string[];
  status: ToolStatus;
}

export interface HealthStatus {
  status: string;
  version: string;
  timestamp: string;
}

export interface CalculatorRequest {
  expression: string;
}

export interface CalculatorResponse {
  expression: string;
  result: string;
  formattedResult: string;
}

export type DpsDepositTiming = 'BEGINNING_OF_MONTH' | 'END_OF_MONTH';
export type DpsCompoundingFrequency = 'MONTHLY' | 'QUARTERLY' | 'SEMI_ANNUALLY' | 'ANNUALLY';

export interface DpsRequest {
  monthlyDeposit: number;
  durationMonths: number;
  annualInterestRate: number;
  depositTiming: DpsDepositTiming;
  compoundingFrequency: DpsCompoundingFrequency;
}

export interface DpsYearlyBreakdown {
  year: number;
  depositedAmount: number;
  earnedProfit: number;
  balance: number;
}

export interface DpsResponse {
  monthlyDeposit: number;
  durationMonths: number;
  annualInterestRate: number;
  depositTiming: DpsDepositTiming;
  compoundingFrequency: DpsCompoundingFrequency;
  totalPrincipal: number;
  estimatedProfit: number;
  maturityAmount: number;
  assumptions: string[];
  breakdown: DpsYearlyBreakdown[];
}

export type TaxpayerCategory = 'GENERAL' | 'FEMALE_AND_SENIOR' | 'DISABLED' | 'FREEDOM_FIGHTER';
export type TaxpayerLocation = 'DHAKA_CHATTOGRAM_CITY' | 'OTHER_CITY' | 'NON_CITY';

export interface TaxRequest {
  taxYear: string;
  category: TaxpayerCategory;
  location: TaxpayerLocation;
  annualSalary: number;
  otherIncome?: number;
  eligibleInvestment?: number;
  disabledDependentsCount?: number;
}

export interface TaxSlabBreakdown {
  slabDescription: string;
  ratePercent: number;
  taxableAmountInSlab: number;
  taxForSlab: number;
}

export interface TaxResponse {
  taxYear: string;
  category: TaxpayerCategory;
  location: TaxpayerLocation;
  grossIncome: number;
  exemptSalaryIncome: number;
  taxableIncome: number;
  slabBreakdowns: TaxSlabBreakdown[];
  taxBeforeRebate: number;
  eligibleRebate: number;
  taxAfterRebate: number;
  minimumTaxApplied: boolean;
  finalTax: number;
  profileSummary: string;
  notes: string[];
}

export interface ApiError {
  status: number;
  error: string;
  message: string;
  timestamp: string;
  fieldErrors?: Record<string, string>;
}
