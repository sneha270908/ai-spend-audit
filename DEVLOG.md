# Dev Log — AI Spend Audit

## Day 1 — 2026-05-07

**Hours worked:** 2

**What I did:**
- Set up Next.js 15 project with TypeScript and Tailwind CSS
- Initialized Git repository and connected to GitHub
- Fixed remote merge conflicts and successfully pushed initial code
- Planned folder structure: app, lib, types, components

**What I learned:**
- How Git remote repositories and merge conflicts work
- Next.js App Router structure is different from Pages Router

**Blockers / what I'm stuck on:**
- README merge conflict while connecting GitHub repo — resolved with --allow-unrelated-histories

**Plan for tomorrow:**
- Build spend input form with all 8 AI tools
- Add tool pricing structure
- Set up Zustand for state persistence

---

## Day 2 — 2026-05-08

**Hours worked:** 3

**What I did:**
- Built spend input form with all 8 AI tools (Cursor, GitHub Copilot, Claude, ChatGPT, Anthropic API, OpenAI API, Gemini, Windsurf)
- Added plan dropdowns, monthly spend input, and seat count for each tool
- Set up Zustand store with localStorage persistence
- Updated landing page with hero section and CTA button

**What I learned:**
- Zustand persist middleware saves form state to localStorage automatically
- shadcn/ui components need proper initialization before use

**Blockers / what I'm stuck on:**
- Audit engine logic not started yet — rule-based reasoning is the hardest part

**Plan for tomorrow:**
- Build audit engine with rules for each tool
- Write 5+ tests for the audit engine
- Start result page UI

---

## Day 3 — 2026-05-09

**Hours worked:** 4

**What I did:**
- Built complete audit engine with rule-based logic for all 8 tools
- Built result page showing total monthly and annual savings
- Per-tool breakdown with recommended actions and savings reasons
- Added lead capture email input on result page
- Fixed infinite reload bug — switched from Zustand persist to useState

**What I learned:**
- Turbopack in Next.js 16 caused stability issues — downgraded to Next.js 15
- Rule-based audit logic is cleaner and more defensible than AI for math-heavy recommendations
- Zustand persist was causing hydration issues — useState is simpler for single-page state

**Blockers / what I'm stuck on:**
- Tests not written yet
- Supabase backend not connected

**Plan for tomorrow:**
- Write 7 Vitest tests for audit engine
- Set up Supabase for lead storage
- Connect email capture to database

---

## Day 4 — 2026-05-11

**Hours worked:** 4

**What I did:**
- Wrote 7 automated tests for audit engine using Vitest — all 7 passing
- Set up Supabase project, created leads table with SQL
- Connected email capture button to Supabase database
- Fixed 401 Unauthorized error by switching from legacy anon key to publishable key
- Lead data (email, team size, savings amount) now successfully stored on submission

**What I learned:**
- Supabase introduced new publishable keys — legacy anon keys now give 401 errors
- Vitest works with Next.js without complex Jest configuration
- RLS must be disabled for public insert access without authentication

**Blockers / what I'm stuck on:**
- Vercel deployment still pending
- All markdown documentation files not written yet

**Plan for tomorrow:**
- Deploy to Vercel
- Write all required markdown files
- Set up GitHub Actions CI

---

## Day 5 — 2026-05-11

**Hours worked:** 3

**What I did:**
- Successfully deployed project to Vercel
- Fixed ESLint and TypeScript build errors blocking production build
- Updated Next.js to latest stable version
- Live URL working: https://ai-spend-audit-quru.vercel.app
- Full flow tested on production: audit form → result page → email capture → Supabase

**What I learned:**
- Vercel build fails on ESLint errors even if they are warnings locally — need ignoreDuringBuilds: true
- Production testing reveals issues that localhost hides

**Blockers / what I'm stuck on:**
- All markdown documentation files need to be written tomorrow
- GitHub Actions CI not set up yet
- User interviews not done yet

**Plan for tomorrow:**
- Write README, ARCHITECTURE, GTM, ECONOMICS, REFLECTION, PRICING_DATA, PROMPTS, TESTS, LANDING_COPY, METRICS, USER_INTERVIEWS
- Set up GitHub Actions CI
- Do 3 user interviews