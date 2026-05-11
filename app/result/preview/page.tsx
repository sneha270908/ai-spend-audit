'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { runAudit } from '@/lib/audit-engine';
import { TOOL_LABELS } from '@/lib/pricing-data';
import { AuditResult } from '@/types';
import { supabase } from '@/lib/supabase'

export default function ResultPage() {
  const [result, setResult] = useState<AuditResult | null>(null);
  const [email, setEmail] = useState('');
const [submitted, setSubmitted] = useState(false);
const [loading, setLoading] = useState(false);

const handleEmailSubmit = async () => {
  if (!email || !result) return;
  setLoading(true);
  try {
    await supabase.from('leads').insert({
      email,
      team_size: result.input.teamSize,
      total_monthly_savings: result.totalMonthlySavings,
      audit_data: result.input,
    });
    setSubmitted(true);
  } catch (err) {
    console.error(err);
  }
  setLoading(false);
};

  useEffect(() => {
    const stored = localStorage.getItem('audit-input');
    if (stored) {
      const input = JSON.parse(stored);
      const auditResult = runAudit(input);
      setResult(auditResult);
    }
  }, []);

  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 mb-4">No audit data found.</p>
          <Link href="/audit" className="text-blue-600 hover:underline">
            Start a new audit →
          </Link>
        </div>
      </div>
    );
  }

  const isHighSavings = result.totalMonthlySavings > 500;
  const isLowSavings = result.totalMonthlySavings < 100;

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-2xl mx-auto">

        {/* Hero */}
        <div className={`rounded-2xl p-8 mb-8 text-center ${isHighSavings ? 'bg-green-600 text-white' : 'bg-blue-600 text-white'}`}>
          <p className="text-lg font-medium opacity-90 mb-2">Your AI Spend Audit</p>
          <div className="text-6xl font-bold mb-2">
            ${result.totalMonthlySavings}/mo
          </div>
          <p className="text-xl opacity-90">
            potential savings · ${result.totalAnnualSavings.toLocaleString()}/year
          </p>
          {isLowSavings && (
            <p className="mt-4 text-sm opacity-80 bg-white/20 rounded-lg px-4 py-2 inline-block">
              You are spending well on AI tools
            </p>
          )}
        </div>

        {/* Credex CTA */}
        {isHighSavings && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-8">
            <h3 className="font-bold text-gray-900 text-lg mb-2">
              Capture even more savings with Credex
            </h3>
            <p className="text-gray-600 mb-4">
              You are overspending by ${result.totalMonthlySavings}/mo. Credex sells discounted AI credits at up to 40% off retail.
            </p>
            
              href="https://credex.rocks"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-yellow-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-yellow-600 inline-block"
            <a>
              Book a Credex Consultation
            </a>
          </div>
        )}

        {/* Per-tool breakdown */}
        <div className="bg-white rounded-xl shadow-sm mb-8">
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold">Per-Tool Breakdown</h2>
          </div>
          <div className="divide-y">
            {result.recommendations.map((rec) => (
              <div key={rec.tool} className="p-6">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-semibold text-gray-900">{TOOL_LABELS[rec.tool]}</h3>
                    <p className="text-sm text-gray-500">Current spend: ${rec.currentSpend}/mo</p>
                  </div>
                  <div className="text-right">
                    {rec.savings > 0 ? (
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                        Save ${rec.savings}/mo
                      </span>
                    ) : (
                      <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">
                        Optimal
                      </span>
                    )}
                  </div>
                </div>
                <p className="text-sm font-medium text-blue-700 mb-1">{rec.recommendedAction}</p>
                <p className="text-sm text-gray-600">{rec.reason}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Lead capture */}
<div className="bg-white rounded-xl shadow-sm p-6 mb-8">
  <h2 className="text-lg font-semibold mb-2">
    {isLowSavings ? 'Get notified when new optimizations apply' : 'Get your full report'}
  </h2>
  <p className="text-gray-500 text-sm mb-4">
    {isLowSavings
      ? "You are optimized now, but AI pricing changes fast."
      : 'Get a detailed PDF report and personalized recommendations.'}
  </p>
  {submitted ? (
    <div className="bg-green-50 text-green-700 px-4 py-3 rounded-lg text-sm font-medium">
      Done! We will be in touch soon.
    </div>
  ) : (
    <div className="flex gap-3">
      <input
        type="email"
        placeholder="your@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm"
      />
      <button
        onClick={handleEmailSubmit}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50"
      >
        {loading ? 'Saving...' : 'Send Report'}
      </button>
    </div>
  )}
</div>

        <Link
          href="/audit"
          className="block text-center text-gray-500 hover:text-gray-700 text-sm"
        >
          Start a new audit
        </Link>
      </div>
    </div>
  );
}