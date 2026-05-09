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

**Hours worked:** 3

**What I did:**
- Fixed infinite reload issue by downgrading Next.js from 16 to 15
- Fixed audit form — removed Zustand persist (was causing reload bug), used useState instead
- Form now working: tools add/remove, plan dropdown, monthly spend, seats all functional
- Identified that result page needs to be built next

**What I learned:**
- Zustand persist middleware was causing hydration issues with Next.js 16 Turbopack
- useState is simpler and more reliable for single-page form state

**Blockers / what I'm stuck on:**
- Result page (404) needs to be built tomorrow

**Plan for tomorrow:**
- Build audit engine logic (rule-based)
- Build result page showing savings
- Write 5+ tests