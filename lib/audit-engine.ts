// lib/audit-engine.ts
import { AuditInput, AuditRecommendation, AuditResult } from '@/types';

export function runAudit(input: AuditInput): AuditResult {
  const recommendations: AuditRecommendation[] = [];

  for (const tool of input.tools) {
    const { tool: toolName, plan, monthlySpend, seats } = tool;

    let recommendedAction = 'No change needed';
    let savings = 0;
    let reason = 'Your current plan is optimal for your usage.';

    // ── CURSOR ──
    if (toolName === 'cursor') {
      if (plan === 'Business' && seats <= 2) {
        savings = seats * (40 - 20);
        recommendedAction = 'Downgrade to Cursor Pro';
        reason = `With only ${seats} seat(s), Pro ($20/user) covers all features you need. Business ($40/user) adds admin controls only useful for 5+ person teams.`;
      } else if (plan === 'Enterprise') {
        savings = seats * (60 - 40);
        recommendedAction = 'Downgrade to Cursor Business';
        reason = `Enterprise pricing is for 50+ seat orgs with SSO requirements. Business plan at $40/user gives same coding features.`;
      } else if (plan === 'Pro' && input.useCase === 'coding' && seats >= 3) {
        savings = 0;
        recommendedAction = 'Consider GitHub Copilot Business';
        reason = `GitHub Copilot Business ($19/user) offers similar AI coding at $${(20 - 19) * seats}/mo less. Worth evaluating for your team size.`;
      }
    }

    // ── GITHUB COPILOT ──
    if (toolName === 'github-copilot') {
      if (plan === 'Enterprise' && seats <= 5) {
        savings = seats * (39 - 19);
        recommendedAction = 'Downgrade to GitHub Copilot Business';
        reason = `Enterprise ($39/user) adds Copilot Chat in GitHub.com — not needed for teams under 10. Business ($19/user) has full IDE integration.`;
      } else if (plan === 'Individual' && seats >= 3) {
        savings = seats * (19 - 10);
        recommendedAction = 'Switch to GitHub Copilot Business';
        reason = `At ${seats} users, Individual ($10/user) lacks usage policies. Business ($19/user) adds org management — but you're paying less per seat than expected.`;
      }
    }

    // ── CLAUDE ──
    if (toolName === 'claude') {
      if (plan === 'Team' && seats <= 2) {
        savings = seats * (30 - 20);
        recommendedAction = 'Downgrade to Claude Pro';
        reason = `Team plan ($30/user) is for collaborative workspaces. With ${seats} user(s), Claude Pro ($20/user) gives same model access without the overhead.`;
      } else if (plan === 'Max' && input.useCase !== 'coding') {
        savings = monthlySpend - 20;
        recommendedAction = 'Downgrade to Claude Pro';
        reason = `Claude Max ($100/user) is for very heavy API-like usage. For ${input.useCase} use cases, Pro ($20/user) has sufficient limits.`;
      } else if (plan === 'Enterprise' && seats <= 5) {
        savings = seats * (60 - 30);
        recommendedAction = 'Switch to Claude Team';
        reason = `Enterprise is designed for 20+ seat orgs with SSO. Team plan ($30/user) covers your needs at ${seats} seats.`;
      }
    }

    // ── CHATGPT ──
    if (toolName === 'chatgpt') {
      if (plan === 'Team' && seats <= 2) {
        savings = seats * (30 - 20);
        recommendedAction = 'Downgrade to ChatGPT Plus';
        reason = `ChatGPT Team ($30/user) adds shared workspaces. With ${seats} user(s), Plus ($20/user) gives same GPT-4o access.`;
      } else if (plan === 'Enterprise' && seats <= 10) {
        savings = seats * (60 - 30);
        recommendedAction = 'Switch to ChatGPT Team';
        reason = `Enterprise tier is for large orgs needing SSO and admin controls. Team ($30/user) covers your ${seats}-person team.`;
      } else if (plan === 'Plus' && input.useCase === 'coding') {
        savings = 0;
        recommendedAction = 'Consider switching to Cursor Pro';
        reason = `For coding use cases, Cursor Pro ($20/user) offers deeper IDE integration than ChatGPT Plus at the same price.`;
      }
    }

    // ── GEMINI ──
    if (toolName === 'gemini') {
      if (plan === 'Ultra' && input.useCase === 'writing') {
        savings = monthlySpend - 20;
        recommendedAction = 'Downgrade to Gemini Pro';
        reason = `Gemini Ultra ($30/user) is for multimodal heavy tasks. For writing, Gemini Pro ($20/user) or Claude Pro ($20/user) are equally capable.`;
      } else if (plan === 'Pro' && input.useCase === 'coding') {
        savings = 0;
        recommendedAction = 'Consider Cursor Pro instead';
        reason = `For coding, Cursor Pro ($20/user) gives inline IDE suggestions. Gemini Pro is better for research/writing tasks.`;
      }
    }

    // ── WINDSURF ──
    if (toolName === 'windsurf') {
      if (plan === 'Teams' && seats <= 3) {
        savings = seats * (35 - 15);
        recommendedAction = 'Downgrade to Windsurf Pro';
        reason = `Teams plan ($35/user) adds admin features not needed under 5 users. Pro ($15/user) covers all AI coding features.`;
      }
    }

    // ── ANTHROPIC API / OPENAI API ──
    if (toolName === 'anthropic-api' || toolName === 'openai-api') {
      if (monthlySpend > 200) {
        savings = Math.round(monthlySpend * 0.2);
        recommendedAction = 'Optimize API usage with caching + prompt compression';
        reason = `At $${monthlySpend}/mo, implementing prompt caching and reducing token waste could save ~20% ($${savings}/mo). Also consider Credex credits for bulk discounts.`;
      } else {
        recommendedAction = 'Usage looks reasonable';
        reason = `API spend of $${monthlySpend}/mo is within normal range. Monitor usage as you scale.`;
      }
    }

    recommendations.push({
      tool: toolName,
      currentSpend: monthlySpend * seats || monthlySpend,
      recommendedAction,
      savings,
      reason,
    });
  }

  const totalMonthlySavings = recommendations.reduce((sum, r) => sum + r.savings, 0);

  return {
    id: crypto.randomUUID(),
    input,
    recommendations,
    totalMonthlySavings,
    totalAnnualSavings: totalMonthlySavings * 12,
    createdAt: new Date().toISOString(),
  };
}