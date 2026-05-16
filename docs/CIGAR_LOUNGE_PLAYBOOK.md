# NECTAR.AI — Real Client Playbook: Cigar Lounge Deployment
## Hermes Agent + Telegram + Google Drive | Production Plan v1.0

**Classification:** Internal / Hive Manager Operations
**Last Updated:** May 2026
**Client Archetype:** Small business (cigar lounge/bar), non-technical owner
**Total Quote:** $500 setup + pay-as-you-go ($49–$199/Bee-mission)
**Margin:** ~92% after API costs
**Timeline:** 7–14 days for full deployment

---

## 1. The Dream: How It Works for the Client

Your friend (the cigar lounge owner) wakes up Monday morning, opens Telegram, and messages:

```
[@CigartoBot] /hire designbee — i need a website for my cigar lounge
[@CigartoBot] Add our menu, location, and some dark luxury vibes
[@CigartoBot] Put everything in our Google Drive
```

**Behind the scenes** (what he doesn't see):
1. Telegram bot receives his message
2. Hive Manager parses intent → dispatches DesignBee + DevBee + ContentBee
3. Bees work in parallel, writing deliverables to HIS Google Drive
4. He gets Telegram notifications: "🐝 DesignBee uploaded 3 concepts → /view"
5. He approves one: `/approve concept-2`
6. DevBee builds the site, pushes to Vercel
7. ContentBee writes Instagram posts, saves to `/Social Media/June 2026/`
8. He gets: "🚀 Your site is live: https://cigar-lounge.vercel.app"

**He never talks to anyone. He just chats with a bot.**

Your role (NECTAR.AI / Hive Manager):
- Handle the $500 setup
- Provision the Telegram bot
- Connect his Google Drive via OAuth
- Monitor Bee execution
- Invoice for overage usage beyond included hours

---

## 2. The Three Laws of This System

1. **Client owns their data.** ALL files live in THEIR Google Drive. We never hold original files.
2. **Client controls the work.** Every deliverable requires Telegram approval. No surprises.
3. **Client pays only for what they use.** Setup fee covers basic deployment. Actual work is per-Bee-mission or per-hour consumed.

---

## 3. Architecture: Telegram ↔ Hive Manager ↔ Hermes Skills → Google Drive

```
┌──────────────────┐
│  Client Phone    │
│  (Telegram App)  │
└────────┬─────────┘
         │
         │ Send: /hire designbee
         │ Upload: /add-files menu.pdf
         │ Approve: /approve concept-2
         │
         ▼
┌─────────────────────┐
│  Telegram Bot API   │
│  (BotFather token)  │
└────────┬────────────┘
         │ Webhook / Polling
         │
         ▼
┌─────────────────────┐
│  NECTAR.AI Router   │
│  Middleman Service  │
│  (Our backend)      │
│  • Command parser   │
│  • Budget tracker   │
│  • Bee dispatcher   │
│  • Billing logger   │
└────────┬────────────┘
         │
    ┌────┴────┐
    │         │
    ▼         ▼
┌──────┐  ┌────────┐
│Hive  │  │Google  │
│Manage│  │Drive   │
│r (You)│  │OAuth   │
└──┬───┘  └───┬────┘
   │          │
   │dispatch  │write deliverables
   │          │read brand assets
   ▼          ▼
┌─────────────────────┐
│  Hermes Worker Pool │
│  (Our agent infra)  │
│                     │
│  🐝 DesignBee       │
│  🐝 DevBee          │
│  🐝 ContentBee      │
│  🐝 SocialBee       │
│  🐝 AdminBee        │
│                     │
│  Each = delegate_   │
│  task() subagent    │
└─────────────────────┘
```

---

## 4. Google Drive File Management Protocol (CRITICAL)

This is the hardest part to get right. Here's the protocol:

### 4.1 OAuth Scope
We need `drive.file` scope (limited) + `drive.metadata.readonly` (for folder listing).

**We NEVER request `drive` full scope.** We only access files the client explicitly shares or creates through our app.

### 4.2 Folder Structure (Auto-Generated in Client's Drive)

When client links Google Drive, we auto-create:

```
📁 NECTAR.AI — Cigar Lounge Project/
├── 📁 01_Brand Assets/
│   ├── 📄 logo.png
│   ├── 📄 brand_colors.json
│   └── 📄 font_preferences.txt
├── 📁 02_Design/
│   ├── 📄 figma_link.txt
│   ├── 📄 design_system.json
│   └── 📄 wireframes.pdf
├── 📁 03_Website/
│   ├── 📁 src/
│   ├── 📄 index.html
│   └── 📄 README.md
├── 📁 04_Content/
│   ├── 📁 Blog/
│   ├── 📁 Menu/
│   ├── 📁 About/
│   └── 📁 Emails/
├── 📁 05_Social Media/
│   ├── 📁 June 2026/
│   ├── 📁 July 2026/
│   └── 📄 content_calendar.ics
├── 📁 06_Deliverables/
│   ├── 📄 [2026-06-01] DesignBee_concepts-v1.pdf
│   ├── 📄 [2026-06-02] DevBee_website-v1.zip
│   └── 📄 [2026-06-03] ContentBee_blog_draft.docx
└── 📁 99_Archive/
    └── (old versions, backups)
```

### 4.3 File Naming Convention
`[DATE]_[BeeName]_[DESCRIPTION]_[VERSION].[ext]`

Examples:
- `2026-06-01_DesignBee_homepage-mock-v1.png`
- `2026-06-02_DevBee_full-website-source-v2.zip`
- `2026-06-03_ContentBee_instagram-captions-june.json`

### 4.4 Permissions Model
- Client is owner of everything
- We (NECTAR.AI service account) get `writer` access to the root folder
- Client can revoke access anytime
- We NEVER download client files to our local disk (stream via API only)

### 4.5 Conflict Resolution
If client uploads a file with same name:
- Our system appends `-v2`, `-v3` automatically
- Telegram notification: "⚠️ File version conflict. Saved as `logo-v2.png`"

---

## 5. Telegram Bot Command System

### 5.1 Client Commands

| Command | Description | Example |
|---------|-------------|---------|
| `/start` | Welcome + setup wizard | Shows current Bees, budget, quick actions |
| `/hire [bee]` | Request a Bee for a mission | `/hire designbee — need a homepage mockup` |
| `/status` | Check all active missions | Shows which Bees are working, ETA |
| `/budget` | Show current spending | Hours used, API cost, balance |
| `/add-files` | Upload files to Google Drive | Opens file picker, saves to Brand Assets |
| `/view` | List latest deliverables | Lists files in Deliverables folder with links |
| `/approve [id]` | Approve a deliverable | `/approve design-v2` |
| `/reject [id]` | Reject with feedback | `/reject design-v2 — make the red darker` |
| `/upgrade` | Add more Bees or hours | Shows pricing, processes payment |
| `/support` | Talk to Hive Manager (human) | Escalates to you for complex issues |

### 5.2 Bee Auto-Notifications

Bees push updates to Telegram automatically:

```
🐝 DesignBee started work: "Luxury cigar lounge homepage"
ETA: 4 hours
Budget: $49 (included in setup)

---

🐝 DesignBee delivered: 3 concepts
📎 View in Google Drive: [link]

Reply:
• /approve concept-2
• /reject concept-2 — needs darker palette
• /compare — show all side by side

---

🐝 DevBee deployed website
🌐 Live URL: https://cigar-lounge.vercel.app
📦 Source: [Google Drive link]

---

⚠️ Budget Alert
You've used 80% of your June Bee hours ($150/$199)
Reply /upgrade to add more hours.
```

### 5.3 Voice & Image Input

Client can also:
- **Send voice messages** → Transcribed via Whisper, treated as command
- **Send photos** → Saved to Brand Assets folder + analyzed by DesignBee for brand alignment
- **Send screenshots** → QABee uses for bug reports or feedback

---

## 6. Billing Model: Pay-As-You-Go

### 6.1 Setup Fee: $500 (One-Time)

This covers:
| Item | Cost to Us | Included |
|------|-----------|----------|
| Telegram bot provisioning | $0 | ✅ |
| Google Drive OAuth setup | $0 | ✅ |
| Domain acquisition (if needed) | $12 | ✅ |
| Vercel hosting setup | $0 | ✅ |
| Initial brand intake call | 30 min of Hive Manager time | ✅ |
| 3 Bee missions (design + dev + content) | ~$80 API cost | ✅ |
| **Total to client** | **$500** | |
| **Our cost** | **~$92** | |
| **Margin** | **82%** | |

### 6.2 Ongoing Usage (Pay-As-You-Go)

**Option A: Per-Mission Pricing** (Simple, recommended for SMBs)

| Mission Type | Description | Price |
|-------------|-------------|-------|
| 🎨 Design Mission | 3 concepts, 2 revisions | $49 |
| 💻 Dev Mission | Feature build or fix | $79 |
| ✍️ Content Mission | 3 blog posts or 10 social posts | $39 |
| 📊 Data Mission | Report or analysis | $59 |
| 🎬 Video Mission | Short video or animation | $99 |
| 🎵 Audio Mission | Music, jingle, or sound | $69 |
| 🔒 Security Mission | Audit or scan | $89 |
| 🐝 Combo Mission | Multi-Bee project | $149 |

**Option B: Hour Credits** (Flexible, recommended for ongoing)

| Package | Bee Hours | Price | Per-Hour |
|---------|-----------|-------|----------|
| 🍯 Honey Starter | 10 hours | $99 | $9.90 |
| 🐝 Worker Hive | 30 hours | $249 | $8.30 |
| 👑 Royal Hive | 100 hours | $699 | $6.99 |
| 🏢 Swarm (Unlimited) | Unlimited | $1,499/mo | - |

**Hour definitions:**
- 1 Bee hour = ~$5–$15 in actual API costs for us
- Complex tasks (DevBee full website) = 8–12 hours
- Simple tasks (ContentBee Instagram post) = 0.5–1 hour
- Client gets real-time hour burn-down in Telegram

### 6.3 Middleman Revenue Model

```
Client pays: $500 setup + $249/mo (Worker Hive)
  ↓
Our costs:
  - API usage:     ~$80/mo
  - Vercel Pro:    ~$20/mo
  - Domain:        ~$1/mo
  - Hive Manager:  ~$0 (you own this)
  ───────────────
  Total cost:      ~$101/mo
  ↓
Net margin:        $148/mo / client × 60% = 89%
```

At 20 clients:
- Revenue: $4,980/mo + $10,000 setup ($500 × 20)
- Costs: ~$2,020/mo
- **Net: $2,960/mo (59% margin)**

At 50 clients:
- Revenue: $12,450/mo + $25,000 setup
- Costs: ~$5,050/mo
- **Net: $7,400/mo (59% margin)**

### 6.4 Overage Pricing

If client exceeds their package hours:
- Overage rate: $12/hour (vs $6.99–$9.90 in package)
- Auto-notification at 80% usage
- Grace period: 1 day to upgrade (no auto-billing)
- Hard stop at 100% (Bees pause until payment)

---

## 7. The Cigar Lounge: Full Project Plan

### 7.1 Client Profile

**Business:** The Humidor Lounge & Bar
**Owner:** Friend (non-technical)
**Location:** Downtown area
**Needs:**
- Modern, dark luxury website ($500 budget)
- Menu page with cigars and cocktails
- Photo gallery of the lounge
- Event calendar (live jazz, tastings)
- Instagram integration (feed on homepage)
- Contact/booking form

### 7.2 Deployment Timeline (Day-by-Day)

#### DAY 1: Setup ($500 charged)
**Hive Manager tasks:**
- [ ] Create Telegram bot via BotFather → name: `@CigartoBot`
- [ ] Set webhook to our backend
- [ ] Send client `/start` link via text
- [ ] Client authorizes Google Drive via OAuth
- [ ] Auto-create folder structure in client's Drive
- [ ] 15-min intake call (or async in Telegram)

**Client receives:**
```
🐝 Welcome to NECTAR.AI!
Your Google Drive is connected. Folder created:
📁 NECTAR.AI — The Humidor Lounge/

Available Bees:
🎨 DesignBee  💻 DevBee  ✍️ ContentBee
📸 SocialBee  📊 AdminBee

Budget: $500 setup (3 missions included)
Type /hire to get started.
```

#### DAY 1–2: Discovery
**Client sends in Telegram:**
```
/hire designbee
Brief: I want a dark, luxury website for my cigar lounge.
Our vibe: leather, wood, warm amber lighting.
Colors: Deep brown (#2C1810), gold (#D4AF37), cream (#F5F0E8)
Mood: Speakeasy meets modern sophistication

/add-files
[uploads: logo.png, lounge_photos.zip, menu.pdf]
```

**AdminBee →** Organizes all files into Google Drive folders:
- Brand Assets receives logo, photos
- Content receives menu text (extracted from PDF via OCR)

**ResearchBee →** (optional, if time permits)
- Analyzes 5 competitor cigar lounge websites
- Extracts design patterns: navigation, hero structure, booking flow
- Writes brief report to `/Research/competitive_analysis.pdf`

#### DAY 2–3: Design Phase ($49 mission)
**DesignBee dispatched:**

```
🐝 DesignBee started: "The Humidor Lounge homepage"
Context loaded: logo, photos, menu, brand colors
Research: competitor analysis
ETA: 6 hours
```

**DesignBee work:**
1. Create moodboard → save to `/Design/moodboard_v1.pdf`
2. Create homepage mockup (desktop + mobile) → `2026-06-02_DesignBee_homepage-v1.png`
3. Create design system tokens → `2026-06-02_DesignBee_design_system.json`

**Telegram notification:**
```
🐝 DesignBee delivered!

📎 Concept 1: Classic luxury
📎 Concept 2: Modern speakeasy ⭐ (recommended)
📎 Concept 3: Avant-garde bold

View all: [Google Drive link]

Reply:
• /approve concept-2
• /reject all — too dark, need more gold accents
```

**Client replies:** `/approve concept-2`

#### DAY 3–5: Development Phase ($79 mission)
**DevBee dispatched:**

```
🐝 DevBee started: "The Humidor Lounge website"
Requirements: React + Vite + Tailwind
Design: Concept 2 (modern speakeasy)
Pages: Home, Menu, Gallery, Events, Contact
Budget: 8 Bee hours
ETA: 2 days
```

**DevBee work:**
1. Initialize project in Hermes workspace
2. Create pages based on DesignBee specs
3. Integrate Google Photos API (if possible) or use client-uploaded images
4. Build responsive layout
5. Add Framer Motion animations
6. Deploy to Vercel

**Deliverables to Google Drive:**
- `/Website/the-humidor-lounge/` (full source code)
- `/Deliverables/2026-06-04_DevBee_website-v1.zip`

**Telegram notification:**
```
🐝 DevBee deployed!

🌐 Preview URL: https://the-humidor-lounge-preview.vercel.app
📦 Source: [Google Drive link]

Features built:
✅ Responsive homepage with hero video
✅ Interactive menu with categories
✅ Photo gallery with lightbox
✅ Event calendar
✅ Contact form
✅ Mobile optimized

Reply /approve or send feedback.
```

**Client tests on phone, replies:**
```
/reject
- On mobile the logo is too small
- Menu page font is hard to read over the background image
- Need Google Maps embed on contact page
```

#### DAY 5–6: Revision Phase (included in $79)
**DevBee handles revision:**

```
🐝 DevBee revision started (1/2 included)
ETA: 4 hours
```

**Changes made:**
- Logo sizing fix in responsive CSS
- Menu page gets semi-transparent overlay for readability
- Contact page adds embedded Google Map

**Redeployed.** Client approves.

#### DAY 6–7: Content Phase ($39 mission)
**ContentBee dispatched:**

```
🐝 ContentBee started: "The Humidor Lounge brand content"
Brief: Write SEO-optimized copy for all pages
Tone: Sophisticated but approachable
Keywords: cigar lounge, premium cigars, downtown, live events
```

**ContentBee work:**
1. Homepage copy → `2026-06-06_ContentBee_homepage_copy.docx`
2. About page story → `2026-06-06_ContentBee_about.docx`
3. Menu descriptions (cigar + cocktail) → `2026-06-06_ContentBee_menu_copy.docx`
4. SEO meta tags → `2026-06-06_ContentBee_seo_meta.json`

**Client approves copy. DevBee integrates into site.**

**Final delivery:**
```
🚀 THE HUMIDOR LOUNGE — LIVE

🌐 https://thehumidorlounge.com
📦 Source: [Google Drive]
📄 Documentation: [Google Drive]

Bees deployed:
🎨 DesignBee (mockups)
💻 DevBee (website)
✍️ ContentBee (copy)

Setup fee: $500 ✅ Paid
Missions used: 3/3 (Design $49 + Dev $79 + Content $39 = $167)
Remaining: $500 - $167 = $333 credit

Your website is now live and managed by NECTAR.AI.
To request updates, just message me here!
```

### 7.3 Post-Launch: Ongoing Engagement

**Month 2 onwards:**

**SocialBee** ($39/mo mission):
```
/hire socialbee
Brief: 3 Instagram posts per week about cigars, cocktails, and events
```
- Auto-generates captions with `xurl` + `humanizer`
- Creates image prompts for each post
- Saves to `/Social Media/June 2026/` in client's Google Drive
- Client or assistant posts manually (or we offer auto-post for +$20/mo)

**ContentBee** ($39/mo mission):
```
/hire contentbee
Brief: 1 blog post per week about cigar culture
```
- Writes 4 blog posts/month
- Saves to `/Content/Blog/`
- SEO optimized

**DevBee** (as-needed $79/mission):
```
/hire devbee
Brief: Add event booking calendar
```
- One-off feature development

**Total monthly for ongoing:** ~$157/mo (Social + Content)
**At cost to us:** ~$30/mo
**Margin:** 81%

---

## 8. Technical Implementation Specs

### 8.1 Telegram Bot Backend

**Technology:** Python FastAPI + Aiogram 3

```python
# Simplified architecture
from aiogram import Router, F
from aiogram.types import Message

router = Router()

@router.message(F.text.startswith("/hire"))
async def hire_bee(message: Message):
    """
    1. Parse command: /hire designbee — brief text
    2. Check client budget (database lookup)
    3. Deduct estimated cost (hold)
    4. Dispatch Hermes subagent with bee persona
    5. Send "started" notification
    6. Poll for completion via webhooks
    """
    pass

@router.message(F.photo)
async def upload_file(message: Message):
    """
    1. Download photo via Telegram API
    2. Upload to client's Google Drive (Brand Assets folder)
    3. Send confirmation with Drive link
    """
    pass
```

**Required env vars:**
- `TELEGRAM_BOT_TOKEN` (from BotFather)
- `HERMES_API_KEY` (for delegate_task)
- `GOOGLE_OAUTH_CLIENT_ID` / `GOOGLE_OAUTH_CLIENT_SECRET`
- `SUPABASE_URL` / `SUPABASE_KEY` (for billing DB)
- `VERCEL_TOKEN` (for deployments)

### 8.2 Google Drive Integration

**Technology:** Google Drive API v3 + Service Account

```python
from googleapiclient.discovery import build
from google.oauth2.credentials import Credentials

def write_to_client_drive(client_id: str, filename: str, content: bytes):
    """
    1. OAuth2 flow (completed once during /start)
    2. Get or create root folder: 'NECTAR.AI — [Project Name]/'
    3. Upload file with naming convention
    4. Return webViewLink for Telegram notification
    """
    pass
```

**Security rules:**
- Access tokens stored encrypted (Supabase vault)
- Refresh tokens rotated every 30 days
- Client can revoke access via Google Account → Third-party apps
- All API calls logged for audit

### 8.3 Bee Dispatcher

**Technology:** Hermes `delegate_task` with context injection

```python
async def dispatch_designbee(brief: str, asset_urls: list):
    """
    Loads DesignBee skill context and dispatches subagent.
    Subagent writes to Google Drive via injected credentials.
    """
    result = delegate_task(
        goal=f"Design luxury cigar lounge website homepage",
        context=f"""
        You are DesignBee, NECTAR.AI's UI/UX designer.
        
        Client brief: {brief}
        Brand colors: {extracted_colors}
        Assets: {asset_urls}
        
        Deliverables:
        1. Moodboard (PNG) → upload to Google Drive
        2. Homepage mockup (PNG) → upload to Google Drive  
        3. Design system JSON → upload to Google Drive
        
        Use Google Drive API to upload files.
        Use claude-design skill for artifact generation.
        """,
        toolsets=["web", "terminal", "file"]
    )
    return result
```

### 8.4 Billing Tracker

**Database schema (Supabase):**

```sql
create table clients (
    id uuid primary key,
    telegram_id bigint unique not null,
    google_drive_email text,
    drive_folder_id text,
    setup_paid boolean default false,
    balance decimal(10,2) default 0,
    plan text default 'setup', -- setup, starter, worker, royal, swarm
    created_at timestamp default now()
);

create table missions (
    id uuid primary key,
    client_id uuid references clients,
    bee_type text not null, -- designbee, devbee, etc.
    status text default 'queued', -- queued, active, completed, failed
    cost_estimate decimal(10,2),
    cost_actual decimal(10,2),
    description text,
    deliverables jsonb, -- array of {filename, drive_link}
    started_at timestamp,
    completed_at timestamp,
    created_at timestamp default now()
);

create table transactions (
    id uuid primary key,
    client_id uuid references clients,
    amount decimal(10,2),
    type text, -- payment, charge, refund
    description text,
    created_at timestamp default now()
);
```

### 8.5 Deployment Pipeline

**Vercel integration:**
```python
async def deploy_vercel(project_name: str, source_dir: str):
    """
    1. Create Vercel project (if new)
    2. Deploy from GitHub repo or direct upload
    3. Return preview URL + production URL
    4. Save to client's Google Drive
    """
    pass
```

---

## 9. Risk Mitigation for Cigar Lounge Client

| Risk | Mitigation |
|------|-----------|
| Client gets confused by bot | Include `/help` at every step. Allow `/support` to escalate to human |
| Google Drive auth fails | Backup: client manually shares folder link, we add to our drive |
| Client exceeds $500 quickly | Auto-stop at $0 balance. Never charge without approval |
| API costs blow up | Cost caps per Bee mission. Local inference (llama.cpp) for simple tasks |
| Client wants "real person" | Position as "AI employee with human oversight" — you review all deliverables |
| File format issues | Export to common formats (PDF, PNG, DOCX). Client-specific formats charged extra |
| Copyright on AI content | Use original assets only. Logo/design = client provides or hires human |
| WhatsApp Ban (if used) | Telegram primary. Website chat widget as backup |
| Client ghosts after setup | No loss — we don't pay for idle resources. Bee hours are prepaid |

---

## 10. Upsell Ladder for Cigar Lounge

After initial website delivery:

| Week | Upsell | Price | Profit |
|------|--------|-------|--------|
| 2 | "Add online booking?" | +$79 | +$65 |
| 4 | "3 Instagram posts/week?" | $39/mo | +$35/mo |
| 6 | "Monthly event flyer?" | $19/mo | +$17/mo |
| 8 | "SEO blog posts?" | $39/mo | +$35/mo |
| 12 | "Full management package" | $149/mo | +$120/mo |

**Year 1 total from one client:** $500 setup + ($149 × 11 months) = **$2,139**
**Cost to us:** ~$500 in API + hosting
**Net per client:** **$1,639 (77% margin)**

---

## 11. Client Communication Templates (Telegram)

### Welcome Sequence
```
🐝 Welcome to NECTAR.AI, [Name]!

You now have an AI engineering and marketing team 
on speed dial.

Connected:
✅ Telegram
✅ Google Drive (nectarai-the-humidor-lounge)

Your team:
🎨 DesignBee — Website design & branding
💻 DevBee — Website builds & features
✍️ ContentBee — Blog posts & copy
📸 SocialBee — Instagram & social media
📊 AdminBee — Organization & scheduling

Current budget: $500 (3 missions included)
Monthly plans: /plans

Let's build something great!
```

### Delivery Notification
```
🐝 [BeeName] delivered!

[Description of what was done]

📎 Files: [Google Drive link]
⏱️ Time: [X hours]
💰 Cost: $[amount]

Next steps:
• /approve — Looks great, ship it!
• /revisions — I have feedback
• /archive — Save for later

[Thumbnail preview if applicable]
```

### Budget Warning
```
⚠️ Budget check

Used: $167 of $500 included
Remaining: $333

At current pace, you'll run out in ~3 weeks.

Upgrade now:
• 🍯 Honey ($99/10hrs)
• 🐝 Worker ($249/30hrs)
• 👑 Royal ($699/100hrs)

Reply /upgrade [plan] or keep going.
```

---

## 12. Files in This Document

This playbook lives at:
`/Users/ronakchovatiya/Desktop/repos/nectarai/docs/CIGAR_LOUNGE_PLAYBOOK.md`

Companion files:
- `BEE_CATALOG.md` — Full bee-skill mapping
- `IMPLEMENTATION_ROADMAP.md` — 2026 execution plan

---

*Document authored by Hive Manager | NECTAR.AI*
*For operational use only — do not share with clients*
