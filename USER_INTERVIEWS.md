# User Interviews

Three interviews conducted on 2026-05-12 with BE students who use AI tools
regularly for college projects and personal productivity.

---

## Interview 1 — Yash Patil

**Role:** 3rd year BE student, I2IT College Pune
**AI Tools used:** ChatGPT, Claude, GitHub Copilot
**Duration:** ~10 minutes

### Notes

Y.P. uses ChatGPT primarily for assignments, debugging coding errors, and viva
preparation. He uses Claude occasionally for long explanations because he feels
Claude gives more "human-like" answers. GitHub Copilot is used only for code
suggestions inside VS Code.

The most interesting behavioral pattern: he regularly pastes the same question
into 2–3 different AI tools and uses whichever answer seems easiest. This means
he is effectively paying for multiple subscriptions to do one task.

**Direct quotes:**
- "Main ek hi question ChatGPT, Claude aur Copilot teeno mein daalta hoon, jo
  easy lage woh use karta hoon."
- "Claude ka explanation zyada natural lagta hai, ChatGPT zyada direct hota hai."
- "Copilot ka sirf VS Code mein use hota hai, baaki sab browser mein."

**Most surprising thing:** He described a common student trick — adding a card
for ChatGPT paid plan, then cancelling auto-pay, but the plan sometimes
continues running for a while. Because of this, students do not track their
actual spending accurately. They assume they cancelled but are still being
charged.

**What this changed about my design:** Added a "are you sure you know what
you're paying?" prompt on the form — the monthly spend field now shows a helper
text: "Check your bank statement — subscriptions are easy to forget." Also
reinforced why the tool should pull attention to forgotten active subscriptions,
not just wrong plan choices.

---

## Interview 2 — Rachana Patil

**Role:** 3rd year BE student, I2IT College Pune
**AI Tools used:** Cursor, ChatGPT, Perplexity
**Duration:** ~10 minutes

### Notes

R.P. switched to Cursor recently and says coding speed improved significantly
for React and Node.js projects. ChatGPT is still used for debugging and
explanations. Perplexity replaced Google for quick research.

The core pain point: he cannot remember his exact monthly spend because each
tool charges separately. "Kabhi ₹800, kabhi ₹2000 — small payments ignore ho
jaate hain." Small payments in different billing cycles are easy to dismiss
individually but add up significantly.

**Direct quotes:**
- "Cursor ke baad coding speed fast ho gayi hai, but ChatGPT se hi actual
  kaam karwata hoon kabhi kabhi."
- "Exact spend yaad nahi rehta — har tool ka alag charge hota hai."
- "Perplexity ne Google replace kar diya quick research ke liye."

**Most surprising thing:** He has an active Cursor subscription but does his
actual coding in ChatGPT. The Cursor subscription stays active even when the
tool is not being used regularly. He had not noticed this pattern until I pointed
it out during the interview.

**What this changed about my design:** This validated the core thesis of the
tool — users do not realize they are paying for overlap. I added a "duplicate
use case" warning in the audit engine: if a user has both Cursor and ChatGPT
for coding, the engine now flags potential overlap and suggests consolidating.

---

## Interview 3 — Nandini Gulve

**Role:** 3rd year BE student, I2IT College Pune
**AI Tools used:** ChatGPT, Grammarly AI, Canva AI
**Duration:** ~10 minutes

### Notes

N.G. uses ChatGPT daily for summarizing notes and generating content ideas.
Grammarly AI is used for emails and reports. Canva AI for presentations and
Instagram posts. A non-developer user — important because the tool should work
for writing and creative use cases, not just coding.

She made a sharp comparison: "Pehle Netflix aur Spotify ka subscription
confusion hota tha, ab AI tools ka." This is exactly the positioning opportunity
— AI subscriptions are the new streaming subscriptions, and nobody has built the
"subscription tracker" for AI yet.

**Direct quotes:**
- "Pehle Netflix aur Spotify ka confusion hota tha, ab AI tools ka same
  problem hai."
- "Free trial khatam hone ke baad bhi tool charge karta rehta hai because
  email ignore ho jaati hai."
- "Sab tool alag alag chota lagta hai but month end pe total dekho toh
  shock lagta hai."

**Most surprising thing:** She said students treat AI tools as "small expenses"
individually, but when combined, the monthly total is significant — especially
when multiple tools are being used for the same task. This is the exact insight
the tool is built around, and hearing it unprompted from a real user validated
the core problem.

**What this changed about my design:** Added a "combined total" summary at
the top of the result page before the per-tool breakdown. Seeing the total
first creates the "shock" moment N.G. described, which motivates users to
actually read the recommendations below.

---

## Key Themes Across All Three Interviews

1. **Forgotten subscriptions** — All three had at least one tool they were
   paying for but not actively using. The audit tool's core value is making
   this visible.

2. **Small payment blindness** — Individual charges of ₹800–₹2000 feel
   insignificant but compound. The annual savings number on the result page
   directly addresses this.

3. **Overlap without realizing** — Using 2–3 tools for the same task is common.
   The audit engine's "duplicate use case" detection is more valuable than
   pure plan optimization.

4. **Non-developer users are a real market** — N.G.'s use case (writing,
   design) shows the tool should not be positioned as "for developers only."