export type UseCase =
  | 'coding'
  | 'writing'
  | 'research'
  | 'marketing'
  | 'mixed';

export interface ToolInput {
  tool: string;
  plan: string;
  monthlySpend: number;
  seats: number;
}

export interface AuditInput {
  tools: ToolInput[];
  teamSize: number;
  useCase: UseCase;
}

export interface Recommendation {
  tool: string;
  currentSpend: number;
  suggestedPlan: string;
  savings: number;
  reason: string;
}

export interface AuditResult {
  recommendations: Recommendation[];
  totalMonthlySavings: number;
  totalAnnualSavings: number;
}