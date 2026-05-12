# Reflection

## 1. The hardest bug I hit this week

The hardest bug was the infinite page reload on the `/audit` page. Every time the page loaded, it would trigger a GET request every 50ms, making the browser tab spin continuously and all buttons unresponsive.

My first hypothesis was that there was an infinite loop in a `useEffect` — but there was no `useEffect` on the audit page. My second hypothesis was that the Zustand persist middleware was causing a hydration mismatch between server and client rendering. Next.js renders the page on the server first, then hydrates on the client — if the client state differs from server state, React re-renders repeatedly.

I tried removing the persist middleware first — no change. I then tried adding `suppressHydrationWarning` to the root element — still no change. I checked the Turbopack logs and saw repeated FATAL errors which pointed to a Turbopack bug in Next.js 16.

What finally worked: I downgraded Next.js from 16 to 15.1.0, which resolved the Turbopack crash. Then I replaced Zustand entirely with plain `useState` for the form, which eliminated the hydration mismatch. The page loaded instantly after both changes. The key insight was that two separate bugs were compounding — Turbopack instability AND hydration mismatch — making it hard to isolate.

## 2. A decision I reversed mid-week

I initially built the form state persistence using Zustand with the `persist` middleware, saving form data to `localStorage` automatically. This seemed elegant — the form would survive page reloads without any extra code.

I reversed this decision on Day 3 when I discovered it was causing the infinite reload bug. The Zustand persist middleware reads from `localStorage` on mount, but Next.js App Router renders on the server where `localStorage` does not exist. This mismatch caused React to re-render repeatedly.

I switched to plain `useState` with a manual `localStorage.setItem` call only on form submit. This is slightly less elegant — the form does not persist across reloads — but it is stable, predictable, and easy to debug. I documented this in ARCHITECTURE.md as a known trade-off.

## 3. What I would build in week 2

In week 2 I would focus on three things:

First, shareable result URLs. Right now the result lives at `/result/preview` for everyone. Each audit should get a unique UUID-based URL like `/result/abc123` stored in Supabase, with identifying information stripped for the public version. This is the viral loop — users share their audit results on Twitter and Hacker News.

Second, a proper AI-generated summary using the Anthropic API. The summary would be ~100 words, personalized to the user's specific tool stack and use case, with a graceful fallback to a templated string if the API fails.

Third, Open Graph preview images for the shareable URLs. When someone shares their audit result link on Twitter, a card should show their savings number prominently. This dramatically increases click-through rates.

## 4. How I used AI tools

I used Claude (claude.ai) throughout this week as my primary assistant. Specifically I used it for: generating boilerplate code for the audit engine rules, helping debug the Zustand hydration error, drafting the Supabase SQL schema, and writing the CI workflow YAML.

I did not trust Claude with: the audit engine logic itself (I wrote and verified every rule manually against official pricing pages), the DEVLOG entries (these had to reflect my actual experience), and the user interview notes (these came from real conversations).

One specific time Claude was wrong: it suggested using `turbopack: false` in `next.config.ts` to disable Turbopack. This caused a TypeScript error because `turbopack` is not a valid top-level config key in Next.js 15. I caught this because VS Code showed a red underline immediately. The actual fix was to use the `--no-turbo` flag in the dev script, and ultimately to downgrade Next.js.

## 5. Self-rating

| Dimension | Rating | Reason |
|-----------|--------|--------|
| Discipline | 6/10 | Started strong but lost a day to the infinite reload bug. Commits are spread across 5 days but not evenly. |
| Code quality | 7/10 | TypeScript throughout, sensible abstractions in the audit engine, but form state could be cleaner with a custom hook. |
| Design sense | 6/10 | Functional and clean but not remarkable. The result page hero number is clear, but overall UI lacks personality. |
| Problem-solving | 8/10 | Debugged a compound bug (Turbopack + hydration) by isolating variables systematically. Switched approaches when needed. |
| Entrepreneurial thinking | 7/10 | Built something genuinely useful, not just a coding exercise. GTM and economics show real thought but I wish I had more time for user interviews. |