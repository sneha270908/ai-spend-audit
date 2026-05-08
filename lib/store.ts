import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ToolInput, UseCase } from '@/types';

interface AuditStore {
  tools: ToolInput[];
  teamSize: number;
  useCase: UseCase;
  addTool: (tool: ToolInput) => void;
  updateTool: (index: number, tool: ToolInput) => void;
  removeTool: (index: number) => void;
  setTeamSize: (size: number) => void;
  setUseCase: (useCase: UseCase) => void;
  reset: () => void;
}

export const useAuditStore = create<AuditStore>()(
  persist(
    (set) => ({
      tools: [],
      teamSize: 1,
      useCase: 'mixed',
      addTool: (tool) => set((state) => ({ tools: [...state.tools, tool] })),
      updateTool: (index, tool) =>
        set((state) => {
          const tools = [...state.tools];
          tools[index] = tool;
          return { tools };
        }),
      removeTool: (index) =>
        set((state) => ({
          tools: state.tools.filter((_, i) => i !== index),
        })),
      setTeamSize: (teamSize) => set({ teamSize }),
      setUseCase: (useCase) => set({ useCase }),
      reset: () => set({ tools: [], teamSize: 1, useCase: 'mixed' }),
    }),
    { name: 'audit-store' }
  )
);