\# Dev Log — AI Spend Audit



\## Day 1 — 2026-05-07



\### Hours Worked

2 hours



\### What I Did

\- Set up Next.js project with TypeScript and Tailwind CSS

\- Initialized Git repository and connected it to GitHub

\- Fixed remote conflicts and successfully pushed code

\- Planned initial folder structure and project flow



\### What I Learned

\- Learned how Git remote repositories and force push work

\- Understood how merge conflicts happen in Git



\### Blockers

\- Faced README merge conflict while connecting GitHub repo



\### Plan For Tomorrow

\- Build spend input form

\- Add tool pricing structure

\- Start audit engine logic

## Day 2 — 2026-05-08

**Hours worked:** 3

**What I did:**
- Built spend input form with all 8 AI tools
- Added plan dropdowns, monthly spend input, seat count for each tool
- Set up Zustand store with localStorage persistence — form data survives page reload
- Updated landing page with hero section and CTA

**What I learned:**
- Zustand persist middleware makes localStorage integration very simple
- shadcn/ui components need proper initialization before use

**Blockers / what I'm stuck on:**
- Need to build the audit engine logic tomorrow — the rule-based reasoning is the hardest part

**Plan for tomorrow:**
- Build audit engine with rules for each tool
- Write 5+ tests for the audit engine
- Start result page UI

## Day 3 — 2026-05-09

**Hours worked:** 4

**What I did:**
- Built audit engine with rule-based logic for all 8 tools
- Built result page showing total monthly and annual savings
- Per-tool breakdown with recommended actions and reasons
- Lead capture email input added
- Fixed infinite reload bug by downgrading Next.js

**What I learned:**
- Turbopack in Next.js 16 had stability issues — Next.js 15 is more stable
- Rule-based audit logic is cleaner than AI for math-heavy recommendations

**Blockers / what I'm stuck on:**
- Tests not written yet — needed for assignment
- Supabase backend not connected yet

**Plan for tomorrow:**
- Write 5+ Jest tests for audit engine
- Set up Supabase for lead storage
- Connect email capture button