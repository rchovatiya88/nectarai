# NECTAR.AI — Bee Catalog & Skill Matrix
## Internal Implementation Document v1.0

**Classification:** Internal / Hive Manager Reference
**Last Updated:** May 2026
**Total Bees:** 18 specialized agents across 3 Hives
**Total Hermes Skills Mapped:** 87+

---

## 1. The Hive Architecture

NECTAR.AI is not an AI tool marketplace. It is a workforce platform where clients hire AI employees (Bees) that perform real business functions using our underlying skill infrastructure.

```
┌─────────────────────────────────────────────────────────────┐
│                    HIVE MANAGER (AI)                         │
│         Client Relations · Strategy · Billing               │
└─────────────────────────────────────────────────────────────┘
                              │
         ┌────────────────────┼────────────────────┐
         │                    │                    │
    ┌────▼───┐          ┌────▼───┐          ┌────▼───┐
    │ENGINEE-│          │CREATIVE│          │OPERATIO│
    │  RING  │          │ & MEDIA│          │  NS    │
    │  HIVE  │          │  HIVE  │          │  HIVE  │
    └──┬┬───┘          └──┬┬───┘          └──┬┬───┘
       ││                 ││                 ││
   ┌───┘└───┐         ┌───┘└───┐         ┌───┘└───┐
   │  5 Bees │         │ 6 Bees │         │ 7 Bees │
   │ $399-799│         │ $299-499│        │ $199-599│
   └────────┘         └────────┘         └────────┘
```

**Key Insight:** Each Bee is a persona wrapper around 3–7 Hermes skills. When a client hires "HoneyBee (Customer Support)", they are actually buying a managed deployment of `web`, `browser`, and custom WhatsApp/Telegram integration skills.

---

## 2. Bee-to-Skill Mapping Matrix

### ENGINEERING HIVE (5 Bees)

| Bee | Skills Used | Primary Deliverables | Price |
|-----|------------|----------------------|-------|
| DevBee | `nectarai-platform-dev`, `webgl-react-integration`, `node-inspect-debugger`, `python-debugpy`, `test-driven-development`, `writing-plans`, `spike` | Production PRs, architecture ADRs, test suites | $499/mo |
| QABee | `systematic-debugging`, `dogfood`, `test-driven-development`, `requesting-code-review`, `github-code-review` | E2E specs, Lighthouse audits, security scans | $349/mo |
| DevOpsBee | `kanban-orchestrator`, `kanban-worker`, `github-pr-workflow`, `github-repo-management`, `github-issues`, `webhook-subscriptions`, `codebase-inspection` | CI/CD pipelines, branch protection, kanban boards | $399/mo |
| MLBee | `dspy`, `huggingface-hub`, `llama-cpp`, `serving-llms-vllm`, `evaluating-llms-harness`, `weights-and-biases`, `segment-anything-model`, `jupyter-live-kernel` | Fine-tuned models, RAG pipelines, benchmark reports | $799/mo |
| CodeBee | `claude-code`, `codex`, `opencode`, `subagent-driven-development` | Autonomous PRs, multi-file refactors, bug fixes | $599/mo |

### CREATIVE & MEDIA HIVE (6 Bees)

| Bee | Skills Used | Primary Deliverables | Price |
|-----|------------|----------------------|-------|
| DesignBee | `claude-design`, `sketch`, `popular-web-designs`, `architecture-diagram`, `excalidraw`, `design-md` | HTML prototypes, design systems, architecture SVGs | $449/mo |
| ContentBee | `humanizer`, `youtube-content`, `blogwatcher`, `llm-wiki` | Landing page copy, blog posts, content calendars | $349/mo |
| SocialBee | `xurl`, `youtube-content` | Social calendars, thread templates, analytics reports | $299/mo |
| VideoBee | `comfyui`, `manim-video`, `ascii-video`, `p5js`, `touchdesigner-mcp` | AI videos, Manim animations, p5.js generative art | $499/mo |
| AudioBee | `audiocraft-audio-generation`, `heartmula`, `songsee`, `spotify`, `songwriting-and-ai-music` | AI music, jingles, podcast audio, spectrograms | $399/mo |
| InfographicBee | `baoyu-infographic`, `baoyu-comic`, `ascii-art`, `pixel-art` | Data viz, comics, ASCII branding, pixel art | $349/mo |

### OPERATIONS HIVE (7 Bees)

| Bee | Skills Used | Primary Deliverables | Price |
|-----|------------|----------------------|-------|
| AdminBee | `notion`, `google-workspace`, `airtable`, `linear`, `powerpoint`, `nano-pdf`, `ocr-and-documents`, `obsidian` | Notion workspaces, Airtable CRMs, pitch decks | $399/mo |
| ResearchBee | `arxiv`, `polymarket`, `maps`, `blogwatcher` | Literature reviews, market reports, competitive analysis | $449/mo |
| EmailBee | `himalaya`, `google-workspace` | Email sequences, newsletters, segmentation, list mgmt | $299/mo |
| SecurityBee | `godmode`, `requesting-code-review`, `github-code-review` | Pen-test reports, secret scanning, remediation guides | $499/mo |
| AppleBee | `apple-notes`, `apple-reminders`, `findmy`, `imessage`, `macos-computer-use` | macOS automations, iMessage campaigns, device mgmt | $199/mo |
| DataBee | `himalaya` (reporting), `notion` (dashboards), `google-workspace` (Sheets) | Data reports, dashboards, spreadsheet automations | $599/mo |
| ScoutBee | `maps` (local SEO), `web` (scraping), `xurl` (outreach) | Lead lists, local SEO audits, cold outreach research | $499/mo |

---

## 3. Use Case Library

### Use Case A: "Landing Page Sprint" (Engineering + Creative)

**Client:** SaaS startup needs a marketing site in 48 hours.

**Bees Dispatched:**
1. **ResearchBee** → Analyzes 5 competitor landing pages, extracts winning patterns
2. **DesignBee** → Builds dark-themed HTML prototype with gold accents
3. **ContentBee** → Writes hero headline, feature bullets, CTA copy using `humanizer`
4. **DevBee** → Converts prototype to React + Vite + Tailwind + Three.js
5. **QABee** → Runs Lighthouse audit, fixes CLS and LCP issues
6. **DevOpsBee** → Ships to Vercel with GitHub Actions CI

**Client Deliverable:** Live URL, source repo, design spec
**Timeline:** 2 days
**Client Cost:** $2,499 (one-time)
**Our Cost:** ~$15 API usage
**Margin:** 99.4%

---

### Use Case B: "AI Content Engine" (Creative + Operations)

**Client:** B2B founder wants 4 blog posts + social + email/month.

**Bees Dispatched:**
1. **ResearchBee** → Scans arXiv + blogs for trending topics in client's niche
2. **ContentBee** → Writes 4 blog posts with SEO optimization
3. **InfographicBee** → Creates 4 data viz graphics for each post
4. **SocialBee** → Adapts each post into Twitter threads + LinkedIn posts
5. **EmailBee** → Writes weekly newsletter summarizing posts
6. **AdminBee** → Schedules everything in Notion content calendar

**Client Deliverable:** 4 blog posts + 16 social posts + 4 newsletters
**Timeline:** Ongoing monthly
**Client Cost:** $1,499/mo (retainer)
**Our Cost:** ~$80/mo API usage
**Margin:** 94.7%

---

### Use Case C: "WhatsApp Business Bot" (Engineering + Operations)

**Client:** Restaurant owner wants WhatsApp ordering + FAQ bot.

**Bees Dispatched:**
1. **DevBee** → Builds Baileys-based WhatsApp bot with menu system
2. **MLBee** → Fine-tunes language understanding for food orders
3. **QABee** → Tests edge cases (allergies, substitutions, payment)
4. **AdminBee** → Creates Airtable order tracking dashboard
5. **AppleBee** → Sets up iMessage fallback for iPhone users

**Client Deliverable:** Deployed bot + dashboard + manual
**Timeline:** 5 days
**Client Cost:** $1,999 (setup) + $399/mo
**Our Cost:** ~$40 API + $20 hosting
**Margin:** 97%

---

### Use Case D: "Real Estate CMA Tool" (Engineering + Creative)

**Client:** Realtor needs branded CMA generator that integrates with MLS.

**Bees Dispatched:**
1. **ResearchBee** → Analyzes MLS API options (RETS/RESO)
2. **DevBee** → Builds React CMA frontend with PDF export
3. **MLBee** → Creates property valuation model from comps
4. **DesignBee** → Designs branded PDF report template
5. **QABee** → Validates pricing accuracy against real sales
6. **AdminBee** → Sets up client CRM in Notion

**Client Deliverable:** CMA web app + branded reports
**Timeline:** 1 week
**Client Cost:** $2,999
**Our Cost:** ~$75 API usage
**Margin:** 97.5%

---

### Use Case E: "Startup Security Audit" (Engineering)

**Client:** Pre-seed startup needs security review for investor diligence.

**Bees Dispatched:**
1. **SecurityBee** → Runs red-team jailbreak tests on their AI features
2. **QABee** → Scans for XSS, SQLi, dependency vulnerabilities
3. **DevBee** → Fixes identified issues and patches dependencies
4. **ResearchBee** → Writes compliance memo (SOC2-ready)

**Client Deliverable:** Audit report + fixed codebase
**Timeline:** 3 days
**Client Cost:** $1,999
**Our Cost:** ~$30
**Margin:** 98.5%

---

### Use Case F: "E-Commerce Analytics Dashboard" (Operations + Engineering)

**Client:** Shopify store owner wants AI-powered sales insights.

**Bees Dispatched:**
1. **DataBee** → Connects to Shopify API, builds analytics pipeline
2. **MLBee** → Creates churn prediction and LTV models
3. **InfographicBee** → Designs dashboard UI components
4. **AdminBee** → Sets up automated daily reports in Slack

**Client Deliverable:** Live dashboard + predictions
**Timeline:** 4 days
**Client Cost:** $2,499
**Our Cost:** ~$50
**Margin:** 98%

---

## 4. Hive Departmental Workflows

### Engineering Hive Workflow Template

```
RECEIPT: Client requests "web application"
  │
  ├── Step 1: [DevBee] Writes plan.md + tech stack recommendation
  │
  ├── Step 2: [DesignBee] (parallel) Creates wireframes + design tokens
  │
  ├── Step 3: [DevBee] Implements feature based on plan
  │
  ├── Step 4: [QABee] Tests, runs Lighthouse, files bugs
  │
  ├── Step 5: [DevBee] Fixes bugs from QA
  │
  ├── Step 6: [DevOpsBee] Sets up CI/CD + deploys to Vercel
  │
  └── DELIVER: Live URL + demo video + source code

SWARM价: $2,499–$4,999
TIMELINE: 2–7 days
```

### Creative Hive Workflow Template

```
RECEIPT: Client requests "brand content package"
  │
  ├── Step 1: [ResearchBee] Analyzes competitor content strategy
  │
  ├── Step 2: [ContentBee] Writes all copy (headlines, long-form, social)
  │
  ├── Step 3: [DesignBee] Creates visual assets
  │
  ├── Step 4: [VideoBee] Produces hero video/animation
  │
  ├── Step 5: [AudioBee] Generates brand jingle / background music
  │
  ├── Step 6: [InfographicBee] Data visualizations
  │
  └── DELIVER: Content calendar + assets + scheduling

SWARM价: $1,499–$3,499
TIMELINE: 3–5 days
```

### Operations Hive Workflow Template

```
RECEIPT: Client requests "business automation"
  │
  ├── Step 1: [AdminBee] Maps current workflows and tools
  │
  ├── Step 2: [ResearchBee] Recommends optimal integrations
  │
  └── Step 3: [AdminBee] Implements in chosen platforms

SWARM价: $999–$1,999
TIMELINE: 1–3 days
```

---

## 5. Implementation Status

| Bee | Status | Deployable? | Notes |
|-----|--------|-------------|-------|
| DevBee | ✅ Active | Yes | Used for nectarai site build |
| QABee | ✅ Active | Yes | Lighthouse audits implemented |
| DevOpsBee | ⚠️ Partial | No | Needs GitHub Actions templates |
| MLBee | ⚠️ Partial | No | Needs model fine-tuning pipeline |
| CodeBee | ⚠️ Partial | No | Needs SOTA coding agent integration |
| DesignBee | ✅ Active | Yes | Produces HTML artifacts (claude-design) |
| ContentBee | ✅ Active | Yes | Writes copy, SEO-optimized |
| SocialBee | ⚠️ Partial | No | Needs XURL API integration |
| VideoBee | ⚠️ Partial | No | Needs ComfyUI pipeline |
| AudioBee | ⚠️ Partial | No | Needs AudioCraft pipeline |
| InfographicBee | ⚠️ Partial | No | Needs Baoyu API |
| AdminBee | ✅ Active | Yes | Notion/Airtable/sheets work |
| ResearchBee | ✅ Active | Yes | arXiv + blog monitoring works |
| EmailBee | ⚠️ Partial | No | Needs Himalaya email setup |
| SecurityBee | ⚠️ Partial | No | Needs penetration test harness |
| AppleBee | ✅ Active | Yes | macOS automation works |
| DataBee | ⚠️ Partial | No | Needs dashboard framework |
| ScoutBee | ⚠️ Partial | No | Needs lead gen pipeline |

**Legend:**
- ✅ Active — Skill tested, can accept client work
- ⚠️ Partial — Core skill works, needs client-facing wrapper
- ❌ Planned — Not yet built

---

## 6. Revenue Forecast by Hive

### Engineering Hive (5 Bees)
- Average ticket: $2,500–$5,000/project
- Monthly recurring potential: 5 clients × $1,500/mo = $7,500/mo
- Margin: 95–99%

### Creative Hive (6 Bees)
- Average ticket: $1,500–$3,000/project
- Monthly recurring potential: 8 clients × $1,000/mo = $8,000/mo
- Margin: 94–97%

### Operations Hive (7 Bees)
- Average ticket: $1,000–$2,000/project
- Monthly recurring potential: 10 clients × $500/mo = $5,000/mo
- Margin: 95–98%

### TOTAL PLATFORM PROJECTION (Month 6)
- Total monthly recurring: $20,500+
- One-off project revenue: $8,000+/mo
- API costs: < $1,000/mo
- **Net margin: ~95%**

---

## 7. Next Build Sprint Priorities

### SPRINT 1 (Week 1–2): Foundation Completion
1. Complete DevOpsBee (CI/CD templates)
2. Complete EmailBee (Himalaya + campaign setup)
3. Complete SocialBee (XURL integration)

### SPRINT 2 (Week 3–4): Creative Pipeline
1. Complete VideoBee (ComfyUI → MP4 pipeline)
2. Complete AudioBee (AudioCraft → WAV pipeline)
3. Complete InfographicBee (Baoyu API)

### SPRINT 3 (Week 5–6): Operations Automation
1. Complete DataBee (dashboard framework)
2. Complete ScoutBee (lead gen pipeline)
3. Complete SecurityBee (pen-test harness)

### SPRINT 4 (Week 7–8): Integration Layer
1. Build client-side Bee deployer (WhatsApp/Telegram bot)
2. Build subscription billing webhook
3. Build client dashboard (Bee status, deliverables)

---

## 8. Bee-Channel Integration Matrix

| Channel | Support Bee | Integration Method | Status |
|---------|------------|-------------------|--------|
| **WhatsApp** | HoneyBee (Support) | Baileys `whatsapp-cli` | ⚠️ Needs re-auth |
| **Telegram** | HoneyBee (Support) | Bot API via `web` tools | Planned |
| **Email** | HoneyBee + EmailBee | Himalaya CLI | ⚠️ Needs setup |
| **Slack** | HoneyBee, DataBee | Webhook API | Planned |
| **Web Chat** | HoneyBee | Custom widget | Planned |
| **iMessage** | AppleBee | `imsg` CLI | ✅ Working |
| **Notion** | AdminBee, ContentBee | Notion API | ✅ Working |
| **Airtable** | AdminBee, DataBee | Airtable REST API | ✅ Working |
| **Shopify** | ScoutBee, DataBee | Shopify Admin API | Planned |
| **HubSpot** | ScoutBee | HubSpot API | Planned |
| **Calendar** | ClockBee (future) | Google Calendar API | Planned |
| **Social** | BuzzBee (future) | XURL + platform APIs | Planned |

---

## 9. Competitive Advantage Summary

Traditional agency hiring NECTAR.AI Bees:
- **Speed:** 2 days vs 3 weeks for a landing page
- **Cost:** $2,499 vs $15K+ agency quote
- **Availability:** 24/7, no sick days, no turnover
- **Scalability:** Add 5 more Bees instantly vs 2-month hiring process
- **Consistency:** Every Bee follows the same skill protocol
- **Documentation:** Every deliverable is versioned in git

---

## 10. Hive Manager Dispatch Cheat Sheet

When a client asks for X, dispatch these Bees:

| Client Need | Primary Bees | Timeline | Price |
|------------|-------------|----------|-------|
| "Website" | DevBee + DesignBee + QABee | 2–3 days | $2,499 |
| "Content" | ContentBee + ResearchBee | Ongoing | $999/mo |
| "Social media" | SocialBee + InfographicBee | Ongoing | $799/mo |
| "Chatbot" | DevBee + MLBee + AdminBee | 3–5 days | $1,999 |
| "AI model" | MLBee + ResearchBee + DevBee | 1–2 weeks | $4,999 |
| "Security audit" | SecurityBee + QABee + DevBee | 2–3 days | $1,999 |
| "Data dashboard" | DataBee + InfographicBee + MLBee | 4–5 days | $2,999 |
| "Full startup package" | ALL HIVE Bees | 1 month | $9,999 |

---

*Document generated by Hive Manager | NECTAR.AI Internal*
*For questions or updates, file an issue in the nectarai repo*
