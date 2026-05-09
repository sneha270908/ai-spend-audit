'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { TOOL_PLANS, TOOL_LABELS } from '@/lib/pricing-data';
import { ToolName, UseCase, ToolInput } from '@/types';

const ALL_TOOLS = Object.keys(TOOL_LABELS) as ToolName[];

export default function AuditPage() {
  const router = useRouter();
  const [tools, setTools] = useState<ToolInput[]>([]);
  const [teamSize, setTeamSize] = useState(1);
  const [useCase, setUseCase] = useState<UseCase>('mixed');
  const [selectedTool, setSelectedTool] = useState<ToolName>('cursor');

  const handleAddTool = () => {
    const alreadyAdded = tools.find((t) => t.tool === selectedTool);
    if (alreadyAdded) {
      alert('This tool is already added!');
      return;
    }
    const defaultPlan = TOOL_PLANS[selectedTool].plans[0];
    const defaultPrice = TOOL_PLANS[selectedTool].defaultPrice[defaultPlan];
    setTools([...tools, { tool: selectedTool, plan: defaultPlan, monthlySpend: defaultPrice, seats: 1 }]);
  };

  const handleRemove = (index: number) => {
    setTools(tools.filter((_, i) => i !== index));
  };

  const handleUpdateTool = (index: number, updated: ToolInput) => {
    const newTools = [...tools];
    newTools[index] = updated;
    setTools(newTools);
  };

  const handleSubmit = () => {
    if (tools.length === 0) {
      alert('Please add at least one tool!');
      return;
    }
    router.push('/result/preview');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">AI Spend Audit</h1>
          <p className="text-gray-500">Add your AI tools — we'll show where you're overspending.</p>
        </div>

        {/* Team Info */}
        <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
          <h2 className="text-lg font-semibold mb-4">Team Info</h2>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Team Size</label>
              <input
                type="number"
                min={1}
                value={teamSize}
                onChange={(e) => setTeamSize(Number(e.target.value))}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-1">Primary Use Case</label>
              <select
                value={useCase}
                onChange={(e) => setUseCase(e.target.value as UseCase)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              >
                <option value="coding">Coding</option>
                <option value="writing">Writing</option>
                <option value="data">Data Analysis</option>
                <option value="research">Research</option>
                <option value="mixed">Mixed</option>
              </select>
            </div>
          </div>
        </div>

        {/* Add Tool */}
        <div className="bg-white rounded-xl p-6 shadow-sm mb-6">
          <h2 className="text-lg font-semibold mb-4">Add a Tool</h2>
          <div className="flex gap-3">
            <select
              value={selectedTool}
              onChange={(e) => setSelectedTool(e.target.value as ToolName)}
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2"
            >
              {ALL_TOOLS.map((tool) => (
                <option key={tool} value={tool}>{TOOL_LABELS[tool]}</option>
              ))}
            </select>
            <button
              onClick={handleAddTool}
              className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 font-medium"
            >
              + Add
            </button>
          </div>
        </div>

        {/* Tools List */}
        {tools.length === 0 ? (
          <div className="bg-white rounded-xl p-8 shadow-sm mb-6 text-center text-gray-400">
            <p>No tools added yet. Select a tool above and click + Add</p>
          </div>
        ) : (
          <div className="space-y-4 mb-6">
            {tools.map((tool, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-semibold text-gray-800">{TOOL_LABELS[tool.tool]}</h3>
                  <button onClick={() => handleRemove(index)} className="text-red-500 text-sm hover:underline">
                    Remove
                  </button>
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Plan</label>
                    <select
                      value={tool.plan}
                      onChange={(e) => {
                        const newPrice = TOOL_PLANS[tool.tool].defaultPrice[e.target.value];
                        handleUpdateTool(index, { ...tool, plan: e.target.value, monthlySpend: newPrice });
                      }}
                      className="w-full border border-gray-300 rounded-lg px-2 py-1 text-sm"
                    >
                      {TOOL_PLANS[tool.tool].plans.map((plan) => (
                        <option key={plan} value={plan}>{plan}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Monthly Spend ($)</label>
                    <input
                      type="number"
                      min={0}
                      value={tool.monthlySpend}
                      onChange={(e) => handleUpdateTool(index, { ...tool, monthlySpend: Number(e.target.value) })}
                      className="w-full border border-gray-300 rounded-lg px-2 py-1 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-500 mb-1">Seats</label>
                    <input
                      type="number"
                      min={1}
                      value={tool.seats}
                      onChange={(e) => handleUpdateTool(index, { ...tool, seats: Number(e.target.value) })}
                      className="w-full border border-gray-300 rounded-lg px-2 py-1 text-sm"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <button
          onClick={handleSubmit}
          className="w-full bg-green-600 text-white py-3 rounded-xl font-semibold hover:bg-green-700 text-lg"
        >
          Get My Audit →
        </button>
      </div>
    </div>
  );
}