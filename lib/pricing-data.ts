export const TOOL_PLANS: Record<string, { plans: string[]; defaultPrice: Record<string, number> }> = {
  cursor: {
    plans: ['Hobby', 'Pro', 'Business', 'Enterprise'],
    defaultPrice: { Hobby: 0, Pro: 20, Business: 40, Enterprise: 60 },
  },
  'github-copilot': {
    plans: ['Individual', 'Business', 'Enterprise'],
    defaultPrice: { Individual: 10, Business: 19, Enterprise: 39 },
  },
  claude: {
    plans: ['Free', 'Pro', 'Max', 'Team', 'Enterprise', 'API'],
    defaultPrice: { Free: 0, Pro: 20, Max: 100, Team: 30, Enterprise: 60, API: 0 },
  },
  chatgpt: {
    plans: ['Free', 'Plus', 'Team', 'Enterprise', 'API'],
    defaultPrice: { Free: 0, Plus: 20, Team: 30, Enterprise: 60, API: 0 },
  },
  'anthropic-api': {
    plans: ['Pay as you go'],
    defaultPrice: { 'Pay as you go': 0 },
  },
  'openai-api': {
    plans: ['Pay as you go'],
    defaultPrice: { 'Pay as you go': 0 },
  },
  gemini: {
    plans: ['Free', 'Pro', 'Ultra', 'API'],
    defaultPrice: { Free: 0, Pro: 20, Ultra: 30, API: 0 },
  },
  windsurf: {
    plans: ['Free', 'Pro', 'Teams'],
    defaultPrice: { Free: 0, Pro: 15, Teams: 35 },
  },
};

export const TOOL_LABELS: Record<string, string> = {
  cursor: 'Cursor',
  'github-copilot': 'GitHub Copilot',
  claude: 'Claude',
  chatgpt: 'ChatGPT',
  'anthropic-api': 'Anthropic API',
  'openai-api': 'OpenAI API',
  gemini: 'Gemini',
  windsurf: 'Windsurf',
};