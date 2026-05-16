# NECTAR.AI — Pay-As-You-Go Business Model Strategy
## Why This Model Wins (and How to Make It Work)

**Classification:** Internal / Founder-level Strategic Document  
**Last Updated:** May 2026  
**Decision:** Pay-as-you-go (not SaaS subscription)

---

## Why We Chose Pay-As-You-Go

### The Problem with SaaS Subscriptions

**From the client side:**
- $199/mo feels abstract — "What am I actually getting?"
- Usage anxiety — "Am I using it enough to justify the cost?"
- Cancellation inertia built on guilt, not value
- Churn happens at month 3 when the shine wears off
- SMBs hate recurring bills (cash flow is lumpy)

**From our side:**
- MRR looks good but hides bad unit economics
- Customer success required to prevent churn
- Feature bloat to justify the monthly price
- Engagement metrics drive roadmap, not client outcomes
- Margin gets eaten by support and retention teams

### The Problem with Agency Retainers

- "$2,500/mo for 20 hours" — hours get padded, work gets stretched
- Scope creep battles every month
- Client wonders: "What did I actually get for $2,500?"
- We look like every other agency (commoditized)

### Why Pay-As-You-Go Fixes Both

| Dimension | SaaS Subscription | Agency Retainer | Pay-As-You-Go |
|-----------|------------------|-----------------|---------------|
| Client feels | Abstract obligation | Hourly anxiety | Concrete value |
| Pricing basis | Seat/feature access | Time spent | Actual deliverable |
| Churn reason | "Not using enough" | "Too expensive" | "Don't need right now" |
| Churn recovery | Hard (guilt-based) | Medium (contract) | Easy (no friction) |
| Upsell moment | Plan upgrade | Scope expansion | Task completion |
| Our alignment | Keep them logged in | Keep them billed | Make them successful |
| Cash flow | Predictable but fragile | Predictable but adversarial | Lumpy but honest |
| Sales pitch | "Save money vs hiring" | "We're your team" | "Pay for what you get" |
| Trust level | Medium | Low | High |

**Key insight:** Pay-as-you-go aligns our incentives with the client's. We only make money when they get value. No value = no bill = no resentment. When they get value, they come back.

---

## The Psychology of Pay-As-You-Go

### Why Clients Love It

1. **No commitment fear** — Try one task for $0. If it works, do more.
2. **Tangible receipts** — "I paid $0.26 and got a homepage mockup."
3. **Budget control** — "I set a $20/day limit. Never surprises."
4. **No sunk cost** — Didn't use it this month? No bill. No guilt.
5. **Visible value** — Every receipt shows what they got for what they paid.

### The Behavioral Economics

**Loss aversion:** Subscriptions feel like losing $199 every month. Pay-as-you-go feels like gaining value every task.

**Mental accounting:** "That task cost less than a coffee and saved me 2 hours."

**Endowment effect:** When clients see their Google Drive filling with deliverables, they feel ownership. They built something. They want to build more.

**Reciprocity:** When we deliver $500 worth of value for $0.50, clients feel the urge to give us more work (not because they have to, but because they want to).

---

## Operational Mechanics

### How Billing Actually Works

```
Client sends task in Telegram:
  "Write a blog post about small business taxes"

System:
  1. Estimates cost (model selection)
     → "This will use Claude Sonnet, estimated cost: $0.18 + $0.054 fee = $0.234"
  2. Client approves (or requests cheaper model)
  3. Bee executes
  4. Deliverable saved to client's Google Drive
  5. Receipt sent:
     "Task complete: Blog post (1,200 words)
      Model: Claude Sonnet 4.6
      Tokens: 3,200 prompt + 1,800 completion
      Raw cost: $0.18
      Service fee (30%): $0.054
      Total: $0.234
      
      View deliverable: [Google Drive link]"
  6. Running total updated in client dashboard
```

### The Wallet Model

Instead of invoicing monthly, clients pre-fund a wallet:
- Minimum: $50 (covers 2–3 weeks of typical usage)
- Auto-refill at $25 (optional)
- Refund unused balance anytime
- Receipts in real-time, invoice weekly or monthly (their choice)

**Why wallets work:**
- Reduces transaction friction (no per-task payment)
- Creates a "balance" that psychologically encourages usage
- Still pay-as-you-go at the task level
- No surprise bills (ever)

### Setup Fee as Filter

$299 setup fee isn't about revenue — it's a qualification filter:
- Shows they're serious (not tire-kickers)
- Covers onboarding cost (30 min call + config)
- Creates commitment without locking them in
- 90%+ margin on setup means we can afford to be generous on tasks

---

## Revenue Scenarios

### Scenario 1: Micro Client (Restaurant Owner)

**Month 1:**
- Setup: $299
- Tasks: Menu design ($0.05), 14 Instagram captions ($0.00), review responses ($0.15)
- Total: $299.20
- Our cost: $0.20
- Margin: 99.9%

**Month 2:**
- Tasks: Weekly specials ($0.60), event promotion ($0.30)
- Total: $0.90
- Our cost: $0.30
- Margin: 95%

**Month 12:**
- Cumulative revenue: $299 + ($10 × 11) = $409
- Cumulative cost: $0.20 + ($3 × 11) = $33.20
- Net: $375.80 (91% margin)

**Insight:** The setup fee covers the entire first-year profit. Ongoing tasks are pure margin.

### Scenario 2: Growth Client (E-commerce Brand)

**Month 1:**
- Setup: $299
- Tasks: 50 product descriptions ($2.00), 30 social posts ($1.50), email sequences ($0.80), analytics report ($0.50)
- Total: $303.80
- Our cost: $4.80
- Margin: 98%

**Month 3:**
- Tasks: Heavy month — new collection launch
- Content: 100 descriptions ($4.00), 60 social posts ($3.00), video scripts ($1.50), email campaign ($0.60)
- Total: $9.10
- Our cost: $3.10
- Margin: 95%

**Month 12:**
- Cumulative: $299 + ($50 × 11 avg) = $849
- Our cost: $5 + ($15 × 11) = $170
- Net: $679 (80% margin)

### Scenario 3: Power Client (SaaS Startup)

**Month 1:**
- Setup: $299
- Tasks: Landing page build ($1.00), blog posts ($2.00), docs ($1.50), security scan ($2.00)
- Total: $305.50
- Our cost: $6.50
- Margin: 98%

**Ongoing:**
- Average: $100–$150/mo in tasks
- Our cost: $30–$45/mo
- Margin: 70–75%

**Why lower margin?** Premium models (Claude Opus) for code review and security.

---

## Risk Analysis

### Risk 1: Clients Never Come Back After Setup

**Probability:** Medium  
**Mitigation:**
- Setup includes 3 free tasks (gets them hooked)
- First task is high-value, low-cost (creates wow moment)
- Follow-up sequence: "Your website is live — want to add a blog?"
- Monthly check-in from Hive Manager (human touch)
- Case studies and templates reduce activation energy

### Risk 2: API Costs Spike

**Probability:** Low (we route to free models)  
**Mitigation:**
- Hard cap: $5/task default, $20/day, $200/mo
- Client approval required for premium models
- Free model quality is continuously improving
- Local models (llama.cpp) for high-volume tasks

### Risk 3: Clients Expect Human Quality at AI Speed

**Probability:** High  
**Mitigation:**
- Clear messaging: "AI employees, not human replacements"
- Confidence thresholds — flag uncertain outputs for review
- 2 free revisions per deliverable
- Escalation path to Hive Manager (human)
- Portfolio shows range of quality expectations

### Risk 4: Competition Copies the Model

**Probability:** High  
**Defense:**
- 91 skills = deep moat (not just a chatbot)
- Hermes platform integration (we control the infrastructure)
- Google Drive ownership (sticky — leaving means moving files)
- Hive Manager relationships (personal trust)
- Continuous skill expansion (new Bees monthly)

### Risk 5: Pay-As-You-Go Revenue is Too Lumpy

**Probability:** Medium  
**Mitigation:**
- Setup fees provide baseline revenue
- Wallet balances smooth cash flow
- Package deals: "Prepay $500, get 10% bonus"
- Enterprise retainers for predictable clients
- Many micro-transactions = statistically stable aggregate

---

## Sales Strategy for Pay-As-You-Go

### The Pitch Framework

**1. The Cost Shock:**
> "How much did you spend on marketing last month? $500? $1,000? What did you actually get?"

**2. The Transparent Alternative:**
> "With us, you pay per deliverable. A blog post costs $0.20. A landing page costs $1. A social post costs $0. You see every penny."

**3. The Setup Commitment:**
> "Setup is $299 one-time. That covers your bot, your Google Drive, your onboarding, and your first 3 tasks. After that, you only pay for what you use."

**4. The No-Risk Close:**
> "Start with one task. If you don't love it, you walk away. No contract. No minimums. Your files stay in your Drive."

### Objection Handling

**"It's too cheap to be good."**
> "It's cheap because AI models are now free. We don't pay salaries, rent, or benefits. Traditional agencies charge $2,500 for a website because they have $200K in overhead. We have $12 in overhead."

**"I don't want to manage this."**
> "You don't. You chat with a bot like you chat with a freelancer. The difference is this 'freelancer' works 24/7, never takes vacation, and costs $0.20 per task."

**"What if I need a lot of work?"**
> "Great. We have 'Royal Hive' — prepay $699 for 100 hours of Bee time. That's $6.99/hr for a team that never sleeps. Compare that to any freelancer."

---

## Transition Plan (If We Change Later)

**If pay-as-you-go proves too lumpy:**
1. Introduce "Bee Retainers" — $199/mo for 1 dedicated Bee
2. Keep pay-as-you-go as the entry tier
3. Enterprise gets custom pricing

**If clients want more predictability:**
1. "Monthly cap" — "Never more than $X"
2. "Unlimited pass" — $499/mo for unlimited tasks
3. Hybrid: Base retainer + overage

**Decision rule:** Don't change the model until 50+ clients prove it doesn't work.

---

## Key Metrics to Track

| Metric | Target | Why |
|--------|--------|-----|
| Setup → First task | < 24 hours | Activation speed |
| Tasks/client/month | 5+ (Month 2+) | Engagement |
| Avg revenue/client/month | $15–$50 | Healthy usage |
| Setup refund rate | < 5% | Fit quality |
| Task approval rate | > 90% | Quality |
| Client NPS | > 50 | Loyalty |
| Time to first paid referral | < 60 days | Organic growth |

---

## The Bottom Line

**Pay-as-you-go is not a pricing tactic. It is a trust signal.**

It says:
- We have nothing to hide
- We only win when you win
- We are confident enough in our quality to let you pay per result
- We respect your intelligence enough to show you the real cost

Traditional agencies hide their margins because they're ashamed of them. We expose ours because we're proud of them.

**$299 setup. $0–$5 per task. No subscriptions. No contracts. No bullshit.**

---

*NECTAR.AI | The most honest deal in tech*
