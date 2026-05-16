# NECTAR.AI — Cross-Skill Integration Workflows
## How Bees Work Together on Real Projects

**What this is:** Not every project is one Bee. Most meaningful work requires 3–5 Bees in sequence or parallel. This doc documents the proven patterns.

---

## Workflow A: Landing Page Sprint (2–3 Days)

**Trigger:** Client says "I need a website for my business"
**Bees:** 6 | **Client cost:** $299 setup + ~$1 in tasks | **Margin:** 99%

```
Day 1: Morning
├─ ResearchBee → Competitor analysis (5 sites)
│  └─ Output: /Research/competitive_analysis.md
│
├─ DesignBee → Moodboard + design system (parallel)
│  └─ Output: /Design/moodboard_v1.pdf + design_system.json
│
└─ ContentBee → Brand copy brief
   └─ Output: /Content/brand_messaging.md

Day 1: Afternoon
├─ DesignBee → Homepage mockup (desktop + mobile)
│  └─ Output: /Design/homepage_mockup_v1.png
│
└─ ContentBee → All page copy (hero, features, about, contact)
   └─ Output: /Content/all_page_copy.md

Day 2: Morning (client approves mockup)
├─ DevBee → React/Vite scaffold + all pages
│  └─ Skills: nectarai-platform-dev, webgl-react-integration
│  └─ Output: /Website/ (full source)
│
└─ DesignBee → Responsive CSS refinements
   └─ Output: /Design/responsive_specs.md

Day 2: Afternoon
├─ DevBee → Deploy to Vercel
│  └─ Output: https://client-name.vercel.app
│
└─ QABee → Lighthouse audit
   └─ Output: /QA/lighthouse_report_v1.json

Day 3: Morning
├─ DevBee → Fixes from QA
│  └─ Lighthouse score target: 90+
│
├─ ContentBee → SEO meta tags, alt text
│  └─ Output: /Content/seo_meta.json
│
└─ DevBee → Final deploy
   └─ Output: Live URL + Google Drive source zip
```

**Dependencies:**
- DesignBee waits for ResearchBee output
- DevBee waits for client `/approve design-v1`
- QABee runs after DevBee deploy
- DevBee returns for fixes

**Failure modes:**
- Client doesn't approve → loop until `/approve` or `/reject with feedback`
- Lighthouse score < 90 → DevBee iterates (max 3)
- Deploy fails → DevBee retries with DevOpsBee

---

## Workflow B: Content Engine (Ongoing Monthly)

**Trigger:** Client subscribes to "Content Engine" package
**Bees:** 7 | **Client cost:** ~$5–$8/mo | **Replaces:** $3,000–$8,000 agency

```
Week 1: Research
├─ ResearchBee → Trending topics in client's niche
│  ├─ arXiv papers (if B2B/tech)
│  ├─ Blogwatcher (competitor content)
│  ├─ XURL (trending threads)
│  └─ Output: /Content/topic_research_month.md
│
└─ ContentBee → Content calendar
   └─ Output: /Content/calendar_month.json

Week 2–3: Production (parallel)
├─ ContentBee → 4 blog posts (1/week)
│  └─ Output: /Content/Blog/post_{1-4}.md
│
├─ InfographicBee → 4 data viz / carousel graphics
│  └─ Output: /Content/Graphics/infographic_{1-4}.png
│
├─ SocialBee → 20+ social posts from blog content
│  └─ Output: /Content/Social/posts_month.json
│
├─ AudioBee → 1 podcast episode or audio version
│  └─ Output: /Content/Audio/episode_month.mp3
│
└─ VideoBee → 2 YouTube Shorts from blog content
   └─ Output: /Content/Video/short_{1-2}.mp4

Week 4: Distribution
├─ SocialBee → Schedule all posts
│  └─ Skills: xurl (X/Twitter)
│  └─ Manual: LinkedIn, Instagram (API limits)
│
├─ EmailBee → Weekly newsletter from blog posts
│  └─ Output: /Content/Email/newsletter_{1-4}.html
│
└─ AdminBee → Notion calendar updated, metrics tracked
   └─ Output: /Content/Analytics/report_month.json
```

**Key integration:**
- InfographicBee reads ContentBee's blog posts
- SocialBee reads both blog posts and infographics
- VideoBee reads blog + AudioBee's audio
- EmailBee reads everything → digest

---

## Workflow C: Real Estate Tech Stack (1 Week)

**Trigger:** Realtor wants branded CMA tool + website
**Bees:** 7 | **Client cost:** $2,999 |

```
Day 1: Discovery
├─ ResearchBee → MLS API research (RETS/RESO)
│  └─ Output: /Research/mls_api_options.md
│
├─ ScoutBee → Local competitor analysis
│  └─ Output: /Research/competitor_sites.pdf
│
└─ AdminBee → CRM setup in Airtable
   └─ Output: /Operations/crm_base.csv

Day 2–3: Design
├─ DesignBee → Website wireframes + CMA UI
│  └─ Output: /Design/website_mockups.png
│
├─ DesignBee → Branded PDF report template
│  └─ Output: /Design/cma_template.pdf
│
└─ ContentBee → Website copy + CMA descriptions
   └─ Output: /Content/website_copy.md

Day 4–5: Development
├─ DevBee → React CMA frontend with PDF export
│  └─ Skills: nectarai-platform-dev
│  └─ Output: /Website/cma-tool/ (source)
│
├─ MLBee → Property valuation model (if historical data available)
│  └─ Skills: dspy, huggingface-hub
│  └─ Output: /ML/valuation_model.pkl
│
└─ DevBee → Integration with chosen MLS API
   └─ Output: /Website/api_integration.md

Day 6: QA + Polish
├─ QABee → Accuracy testing (validate against real comps)
│  └─ Output: /QA/accuracy_report.md
│
├─ ContentBee → SEO optimization
│  └─ Output: /Content/seo_final.md
│
└─ DesignBee → Final responsive refinements

Day 7: Deploy + Handoff
├─ DevBee → Deploy to Vercel
│  └─ Output: https://realtor-name-cma.vercel.app
│
├─ AdminBee → Documentation + training guide
│  └─ Output: /Operations/user_guide.pdf
│
└─ EmailBee → Lead nurture sequences
   └─ Output: /Content/Email/sequences.json
```

---

## Workflow D: Security Audit (2–3 Days)

**Trigger:** Startup needs security review for investor diligence
**Bees:** 4 | **Client cost:** $1,999 |

```
Day 1: Reconnaissance
├─ SecurityBee → Automated vulnerability scan
│  ├─ Secret scanning (GitLeaks, TruffleHog)
│  ├─ Dependency audit (npm audit, pip-audit)
│  ├─ Static analysis (Bandit, Semgrep)
│  └─ Output: /Security/scan_results.json
│
└─ ResearchBee → Compliance requirements
   └─ Output: /Research/compliance_checklist.md

Day 2: Deep Testing
├─ SecurityBee → Manual code review
│  ├─ XSS vectors
│  ├─ SQLi opportunities
│  ├─ Auth bypass attempts
│  └─ Output: /Security/manual_review.md
│
├─ SecurityBee → Red team on AI features
│  ├─ Jailbreak attempts on LLM endpoints
│  ├─ Prompt injection testing
│  └─ Skills: godmode
│  └─ Output: /Security/red_team_report.md
│
└─ QABee → E2E security regression tests
   └─ Output: /QA/security_e2e.spec.ts

Day 3: Fix + Report
├─ DevBee → Fix critical vulnerabilities
│  └─ Output: /Security/fixes.patch
│
├─ SecurityBee → Remediation guide
│  └─ Output: /Security/remediation_guide.md
│
└─ ResearchBee → Compliance memo (SOC2-ready)
   └─ Output: /Security/compliance_memo.pdf
```

---

## Workflow E: Startup Launch Package (1 Month)

**Trigger:** Pre-seed startup needs everything
**Bees:** ALL (12+) | **Client cost:** $9,999 |

```
Week 1: Foundation
├─ ResearchBee → Market research + competitive intel
├─ DesignBee → Brand identity + design system
├─ ContentBee → Messaging + positioning
└─ AdminBee → Notion workspace + project tracking

Week 2: Product
├─ DevBee → MVP frontend (React/Vite)
├─ CodeBee → Core features + API integration
├─ MLBee → AI features (if applicable)
└─ QABee → E2E tests + bug reports

Week 3: Growth
├─ ContentBee → Blog launch (5 posts)
├─ SocialBee → Social presence (all platforms)
├─ EmailBee → Welcome sequences + nurture
├─ InfographicBee → Press kit + data viz
└─ VideoBee → Explainer video + product demo

Week 4: Operations
├─ DevOpsBee → CI/CD + monitoring
├─ SecurityBee → Security audit + fixes
├─ DataBee → Analytics dashboard
├─ AdminBee → CRM + onboarding automation
└─ HoneyBee → Support bot training + deployment
```

---

## Integration Patterns

### Pattern 1: File Pass-Through
```
Bee A writes to /Content/
Bee B reads from /Content/ and writes to /Design/
Bee C reads from /Design/ and /Content/, writes to /Website/
```
**Tool:** Google Drive is the shared filesystem. Each Bee has `drive.file` scope.

### Pattern 2: Approval Gates
```
Bee delivers → Telegram DM → Client /approve or /reject
If approved → next Bee starts
If rejected → same Bee revises (max 2 revisions)
```
**Tool:** Telegram bot is the approval router.

### Pattern 3: Parallel Execution
```
ResearchBee + DesignBee + ContentBee all start simultaneously
None depend on each other
DevBee waits for all three to finish
```
**Constraint:** Interdependent files need a single Bee. Parallel only when independent.

### Pattern 4: Human-in-the-Loop
```
Bees handle 80% of work
Hive Manager (human) handles:
  - Client intake calls
  - Complex strategy decisions
  - Conflict resolution between Bees
  - Billing and invoicing
```

### Pattern 5: Failure Cascade
```
If Bee A fails → Hive Manager assesses
  - Retry with different model? (free → paid)
  - Escalate to human?
  - Split task into smaller pieces?
```

---

## Cost Benchmarks by Workflow

| Workflow | Bees | Client Cost | Our Cost | Margin | Time | Replaces |
|----------|------|-------------|----------|--------|------|----------|
| Landing Page | 6 | $300 | ~$1 | 99% | 2–3 days | $2,500 agency |
| Content Engine | 7 | $5/mo | ~$2/mo | 95% | Ongoing | $3,000 agency |
| Real Estate CMA | 7 | $2,999 | ~$10 | 99% | 1 week | $10,000 dev shop |
| Security Audit | 4 | $1,999 | ~$5 | 99% | 2–3 days | $5,000 consultant |
| Startup Launch | 12+ | $9,999 | ~$50 | 99% | 1 month | $50,000 team |

---

*NECTAR.AI | Workflows that work*
