# Metrics

## North Star Metric

**Qualified leads captured per week** — defined as email submissions from audits
showing >$100/month in identified savings.

### Why this and not something else

This tool exists to generate leads for Credex. DAU or total audit completions are
vanity metrics — a solo dev who completes an audit and saves $5/month is not a
Credex customer. The North Star must reflect business value, not engagement.

"Qualified leads" (savings >$100/mo) are the metric because:
- They have proven, quantified pain
- They are the right company size to be a Credex customer
- They are the ones Credex sales should call first

A tool used once a quarter by the right person is more valuable than one used
daily by the wrong person. DAU would optimize for the wrong behavior.

## 3 Input Metrics

**1. Audit completion rate**
Percentage of users who land on `/audit` and click "Get My Audit."
Target: >60%. If below 40%, the form is too long or confusing.
Drives the North Star by filling the top of the funnel.

**2. Email capture rate**
Percentage of completed audits where user submits email.
Target: >15%. If below 10%, the result page is not showing enough value
before asking for the email, or the CTA copy is weak.
Directly drives qualified lead count.

**3. High-savings audit rate**
Percentage of completed audits showing >$100/month savings.
Target: >40%. If below 20%, either the wrong users are finding the tool
(already optimized teams) or the audit engine is too conservative.
Determines what fraction of email captures become qualified leads.

## What I would instrument first

1. **Audit completion rate** — funnel drop-off between landing page and result page.
   Use Vercel Analytics or a simple Supabase event log.

2. **Email capture rate** — already tracked via Supabase leads table.
   Add a `completed_audit` boolean to distinguish from direct email signups.

3. **Savings distribution** — histogram of `total_monthly_savings` across all audits.
   Tells us if we are reaching the right users or if the engine needs recalibration.

4. **Traffic source** — UTM parameters on inbound links to know which GTM
   channels are working (HN vs Reddit vs X vs direct).

## What number triggers a pivot decision

**If email capture rate stays below 8% after 500 audits:**
The tool is not showing enough value, or the wrong users are finding it.
Pivot options: add a benchmark ("your spend vs similar teams"), improve result
page design, or change acquisition channel to reach higher-spend teams.

**If high-savings audit rate is below 15% after 500 audits:**
Most users are already optimized. The tool is attracting the wrong audience
(e.g. solo devs on free plans). Pivot: add team size gate — require team size
>3 before showing results, or adjust GTM to target engineering managers only.

**If qualified leads per week is below 5 after 4 weeks of active distribution:**
The entire funnel is broken. Stop optimizing and do 20 user interviews to
understand where the disconnect is before writing more code.