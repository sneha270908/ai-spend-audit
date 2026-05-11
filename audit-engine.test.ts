import { describe, it, expect } from 'vitest';
import { runAudit } from './lib/audit-engine';

describe('Audit Engine Tests', () => {

  it('should return no savings for optimal Cursor Pro plan', () => {
    const result = runAudit({
      tools: [{ tool: 'cursor', plan: 'Pro', monthlySpend: 20, seats: 1 }],
      teamSize: 1,
      useCase: 'coding',
    });
    expect(result.totalMonthlySavings).toBe(0);
    expect(result.recommendations[0].recommendedAction).toBe('No change needed');
  });

  it('should recommend downgrade from Cursor Business for small team', () => {
    const result = runAudit({
      tools: [{ tool: 'cursor', plan: 'Business', monthlySpend: 40, seats: 2 }],
      teamSize: 2,
      useCase: 'coding',
    });
    expect(result.recommendations[0].savings).toBe(40);
    expect(result.recommendations[0].recommendedAction).toBe('Downgrade to Cursor Pro');
  });

  it('should recommend downgrade from Claude Team for single user', () => {
    const result = runAudit({
      tools: [{ tool: 'claude', plan: 'Team', monthlySpend: 30, seats: 1 }],
      teamSize: 1,
      useCase: 'writing',
    });
    expect(result.recommendations[0].savings).toBe(10);
    expect(result.recommendations[0].recommendedAction).toBe('Downgrade to Claude Pro');
  });

  it('should calculate correct annual savings', () => {
    const result = runAudit({
      tools: [{ tool: 'cursor', plan: 'Business', monthlySpend: 40, seats: 2 }],
      teamSize: 2,
      useCase: 'coding',
    });
    expect(result.totalAnnualSavings).toBe(result.totalMonthlySavings * 12);
  });

  it('should handle multiple tools and sum savings correctly', () => {
    const result = runAudit({
      tools: [
        { tool: 'cursor', plan: 'Business', monthlySpend: 40, seats: 2 },
        { tool: 'claude', plan: 'Team', monthlySpend: 30, seats: 1 },
      ],
      teamSize: 2,
      useCase: 'coding',
    });
    expect(result.totalMonthlySavings).toBe(50);
    expect(result.recommendations.length).toBe(2);
  });

  it('should recommend downgrade from GitHub Copilot Enterprise for small team', () => {
    const result = runAudit({
      tools: [{ tool: 'github-copilot', plan: 'Enterprise', monthlySpend: 39, seats: 3 }],
      teamSize: 3,
      useCase: 'coding',
    });
    expect(result.recommendations[0].savings).toBe(60);
    expect(result.recommendations[0].recommendedAction).toBe('Downgrade to GitHub Copilot Business');
  });

  it('should flag high API spend for optimization', () => {
    const result = runAudit({
      tools: [{ tool: 'anthropic-api', plan: 'Pay as you go', monthlySpend: 500, seats: 1 }],
      teamSize: 1,
      useCase: 'mixed',
    });
    expect(result.recommendations[0].savings).toBeGreaterThan(0);
  });

});