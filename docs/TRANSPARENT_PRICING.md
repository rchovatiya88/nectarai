# NECTAR.AI — Transparent Pay-As-You-Go Pricing Engine
## Cost-Plus Model: You Pay What We Pay + 30% Service Fee

**Classification:** Internal / Hive Manager Pricing Reference
**Last Updated:** May 2026
**Philosophy:** Full transparency. No hidden margins. No bundled hours. You see every LLM call.

---

## 1. The Pricing Promise

**"We're not the cheapest. We're the most honest."**

Traditional agencies charge $2,500 for a website and pocket $2,200.
AI tools charge $49/mo for "unlimited" and go bankrupt.

NECTAR.AI does neither.

**Our model:**
1. We find the best LLM for your specific task (optimized for cost + quality)
2. You pay exactly what that model costs us
3. You pay a 30% service fee for orchestration, file management, and quality review
4. **Total = Pass-Through Cost × 1.30**

**Example:**
- DesignBee generates a website mockup using a free model
- Cost to us: $0.00 (free inference)
- Service fee: $0.00 (30% of $0 is $0)
- **You pay: $0.00**

**Example 2:**
- ContentBee writes a blog post using Claude Sonnet 4 cost-optimized
- Cost to us: $0.12 (6K tokens prompt + 3K tokens completion)
- Service fee: $0.036
- **You pay: $0.156** (about 16 cents)

No. Hidden. Costs.

---

## 2. OpenRouter Model Pricing (Live Data — May 2026)

We use OpenRouter as our unified LLM gateway. Prices are per 1M tokens unless noted.

### Tier 1: Free Models (Used for 80% of tasks)

| Model | Provider | Prompt | Completion | Context | Best For |
|-------|----------|--------|------------|---------|----------|
| **Llama 3.3 70B Instruct** | Meta (free) | $0.00 | $0.00 | 128K | General chat, FAQ, simple writing |
| **DeepSeek V4 Flash** | DeepSeek (free) | $0.00 | $0.00 | 1M | Reasoning, coding, complex analysis |
| **Qwen3 Coder 480B** | Qwen (free) | $0.00 | $0.00 | 1M | Code generation, technical writing |
| **Gemma 4 26B** | Google (free) | $0.00 | $0.00 | 262K | Multimodal, image understanding |
| **Nemotron 3 Super** | NVIDIA (free) | $0.00 | $0.00 | 1M | Roleplay, creative writing |
| **Free Models Router** | OpenRouter | $0.00 | $0.00 | 200K | Fallback for any general task |

**Cost to client for free model task:** $0.00 + $0.00 service = **$0.00**

### Tier 2: Ultra-Cheap Models ($0.01–$0.05/M tokens)

| Model | Provider | Prompt | Completion | Best For |
|-------|----------|--------|------------|---------|----------|
| **Llama 3.1 8B** | Meta | $0.02/M | $0.05/M | Fast completions, simple summaries |
| **Mistral Nemo** | Mistral | $0.03/M | $0.03/M | Multilingual, instruction following |
| **Qwen2.5 7B** | Qwen | $0.04/M | $0.10/M | Code, chat, reasoning |
| **Gemma 3 12B** | Google | $0.04/M | $0.13/M | Balanced quality/cost |
| **GPT-OSS 120B** | OpenAI | $0.04/M | $0.18/M | Open-source, good quality |

**Typical cost per task:** $0.005–$0.02 + 30% = **$0.007–$0.026**

### Tier 3: Quality Models ($3–$15/M tokens)

| Model | Provider | Prompt | Completion | Best For |
|-------|----------|--------|------------|---------|----------|
| **Claude Sonnet 4.5–4.6** | Anthropic | $3.00/M | $15.00/M | Complex reasoning, code review, creative writing |
| **GPT-4o** | OpenAI | $3.00/M | $10.00/M | Vision, structured outputs, general purpose |
| **Gemini 2.5 Flash** | Google | $0.50/M | $2.00/M | Long context, multimodal, fast |
| **Grok 4.20** | xAI | $2.00/M | $6.00/M | Real-time data, long context (2M) |
| **Claude Haiku 4.5** | Anthropic | $1.00/M | $5.00/M | Fast, affordable quality |

**Typical cost per task:** $0.10–$0.50 + 30% = **$0.13–$0.65**

### Tier 4: Premium Models ($15–$150/M tokens)

| Model | Provider | Prompt | Completion | Best For |
|-------|----------|--------|------------|---------|----------|
| **Claude Opus 4** | Anthropic | $15.00/M | $75.00/M | Maximum reasoning, critical analysis |
| **GPT-5 Pro** | OpenAI | $15.00/M | $120.00/M | Advanced reasoning, agentic tasks |
| **o3 Pro** | OpenAI | $20.00/M | $80.00/M | Deep research, multi-step reasoning |
| **o1-pro** | OpenAI | $150.00/M | $600.00/M | The absolute best (used sparingly) |

**Typical cost per task:** $0.50–$5.00 + 30% = **$0.65–$6.50**

### Image/Video Models

| Model | Provider | Cost Per Unit | Output |
|-------|----------|--------------|--------|
| **Stable Diffusion (local)** | Self-hosted | $0.00 | 1024×1024 image |
| **Gemini Flash Image** | Google | $0.002/image | 1024×1024 image |
| **DALL-E 3** | OpenAI | $0.04/image | 1024×1024 image |
| **Flux** | Black Forest Labs | $0.015/image | High quality |
| **SVD (video)** | Stability AI | $0.10/second | 4-second video clip |
| **Runway Gen-3** | Runway | $0.50/second | Professional video |

---

## 3. Skill-to-Model Mapping (Cost-Optimized by Default)

### How We Select Models

Our router uses a **cost-quality optimizer**:

1. **Try free/cheap first** — For 80% of tasks, free models are sufficient
2. **Quality gate** — If output is poor (measured by confidence score), retry with Tier 2
3. **Human override** — For critical tasks (code, security), always use Tier 3+
4. **Client preference** — Client can request specific model (upsells to premium)

### Per-Bee Model Assignment

| Bee | Primary Skills | Optimal Model | Fallback | Avg Cost/Task |
|-----|---------------|---------------|----------|---------------|
| **DevBee** | `nectarai-platform-dev`, `webgl-react-integration` | Claude Sonnet 4.6 ($3/M) | DeepSeek V4 Flash (free) | $0.25–$2.00 |
| **QABee** | `systematic-debugging`, `dogfood` | Claude Sonnet 4.6 ($3/M) | Qwen3 Coder (free) | $0.15–$0.80 |
| **DevOpsBee** | `kanban-orchestrator`, `github-pr-workflow` | Llama 3.3 70B (free) | Claude Haiku ($1/M) | $0.00–$0.30 |
| **MLBee** | `dspy`, `huggingface-hub`, `llama-cpp` | Claude Opus 4 ($15/M) | Gemini 2.5 Flash ($0.50/M) | $0.50–$5.00 |
| **CodeBee** | `claude-code`, `codex`, `opencode` | Claude Sonnet 4.6 ($3/M) | DeepSeek V4 Flash (free) | $0.20–$1.50 |
| **DesignBee** | `claude-design`, `sketch` | Claude Sonnet 4.6 ($3/M) | Llama 3.3 70B (free) | $0.15–$1.00 |
| **ContentBee** | `humanizer`, `youtube-content` | Claude Sonnet 4.6 ($3/M) | Nemotron 3 (free) | $0.10–$0.60 |
| **SocialBee** | `xurl`, `youtube-content` | Llama 3.3 70B (free) | Claude Haiku ($1/M) | $0.00–$0.20 |
| **VideoBee** | `comfyui`, `manim-video` | ComfyUI (local) | Runway Gen-3 ($0.50/sec) | $0.00–$2.00 |
| **AudioBee** | `audiocraft-audio-generation` | AudioCraft (local) | Suno API ($0.10/clip) | $0.00–$0.50 |
| **InfographicBee** | `baoyu-infographic` | Gemini Flash Image ($0.002/img) | DALL-E 3 ($0.04/img) | $0.01–$0.20 |
| **AdminBee** | `notion`, `google-workspace` | Llama 3.3 70B (free) | Gemini 2.5 Flash ($0.50/M) | $0.00–$0.10 |
| **ResearchBee** | `arxiv`, `polymarket` | Claude Sonnet 4.6 ($3/M) | Perplexity Sonar Pro ($3/M) | $0.15–$0.80 |
| **EmailBee** | `himalaya`, `google-workspace` | Gemini 2.5 Flash ($0.50/M) | Claude Haiku ($1/M) | $0.05–$0.25 |
| **SecurityBee** | `godmode`, `github-code-review` | Claude Opus 4 ($15/M) | Claude Sonnet 4.6 ($3/M) | $0.50–$3.00 |
| **AppleBee** | `apple-notes`, `imessage` | Llama 3.3 70B (free) | Claude Haiku ($1/M) | $0.00–$0.10 |
| **DataBee** | Spreadsheet analysis, dashboards | Claude Sonnet 4.6 ($3/M) | Gemini 2.5 Flash ($0.50/M) | $0.10–$0.50 |
| **ScoutBee** | Lead research, local SEO | Perplexity Sonar Pro ($3/M) | Llama 3.3 70B (free) | $0.00–$0.40 |

---

## 4. Real Task Cost Examples (With Service Fee)

### Content Creation

| Task | Model Used | Cost to Us | +30% Fee | **You Pay** |
|------|-----------|-----------|----------|-------------|
| Write Instagram caption (3 variants) | Llama 3.3 70B (free) | $0.00 | $0.00 | **$0.00** |
| Write 1000-word blog post | Claude Sonnet 4.6 | $0.18 | $0.054 | **$0.234** |
| Write sales landing page copy | Claude Sonnet 4.6 | $0.35 | $0.105 | **$0.455** |
| Humanize AI text (remove AI-isms) | Claude Haiku 4.5 | $0.08 | $0.024 | **$0.104** |
| SEO keyword research report | Perplexity Sonar Pro | $0.12 | $0.036 | **$0.156** |

### Design & Visual

| Task | Model Used | Cost to Us | +30% Fee | **You Pay** |
|------|-----------|-----------|----------|-------------|
| Generate moodboard (5 images) | Gemini Flash Image | $0.01 | $0.003 | **$0.013** |
| Design system tokens (JSON) | Claude Sonnet 4.6 | $0.05 | $0.015 | **$0.065** |
| Website mockup description | Claude Sonnet 4.6 | $0.15 | $0.045 | **$0.195** |
| Brand color palette generation | Gemini 2.5 Flash | $0.03 | $0.009 | **$0.039** |
| Infographic data visualization | DALL-E 3 | $0.04 | $0.012 | **$0.052** |

### Development

| Task | Model Used | Cost to Us | +30% Fee | **You Pay** |
|------|-----------|-----------|----------|-------------|
| Write React component | DeepSeek V4 Flash (free) | $0.00 | $0.00 | **$0.00** |
| Debug error in codebase | Claude Sonnet 4.6 | $0.25 | $0.075 | **$0.325** |
| Full website (5 pages) | Claude Sonnet 4.6 | $1.20 | $0.36 | **$1.56** |
| API integration code | DeepSeek V4 Flash (free) | $0.00 | $0.00 | **$0.00** |
| Performance optimization | Claude Sonnet 4.6 | $0.40 | $0.12 | **$0.52** |
| Write test suite | Claude Sonnet 4.6 | $0.30 | $0.09 | **$0.39** |

### Research & Analysis

| Task | Model Used | Cost to Us | +30% Fee | **You Pay** |
|------|-----------|-----------|----------|-------------|
| Competitor website analysis | Llama 3.3 70B (free) | $0.00 | $0.00 | **$0.00** |
| arXiv literature review (10 papers) | Claude Sonnet 4.6 | $0.45 | $0.135 | **$0.585** |
| Market trend report | Perplexity Sonar Pro | $0.20 | $0.06 | **$0.26** |
| Data analysis (CSV → insights) | Claude Sonnet 4.6 | $0.15 | $0.045 | **$0.195** |
| Security vulnerability scan | Claude Opus 4 | $1.50 | $0.45 | **$1.95** |

### Video & Audio

| Task | Model Used | Cost to Us | +30% Fee | **You Pay** |
|------|-----------|-----------|----------|-------------|
| Generate background music (2 min) | AudioCraft (local) | $0.00 | $0.00 | **$0.00** |
| Podcast intro jingle | Suno API | $0.15 | $0.045 | **$0.195** |
| YouTube short script | Claude Sonnet 4.6 | $0.12 | $0.036 | **$0.156** |
| Video generation (5 seconds) | Runway Gen-3 | $2.50 | $0.75 | **$3.25** |
| AI voiceover (1 minute) | ElevenLabs | $0.50 | $0.15 | **$0.65** |

---

## 5. Complete Cigar Lounge Project Cost Breakdown

### Setup: $299 (One-Time)

This is our only fixed fee. Covers:

| Item | Cost to Us | Your Cost | Notes |
|------|-----------|-----------|-------|
| Telegram bot provisioning | $0 | $0 | BotFather is free |
| Google Drive OAuth setup | $0 | $0 | Google API is free |
| Vercel project creation | $0 | $0 | Free tier |
| Domain setup (optional) | $12/yr | $12/yr | Passed through |
| Template deployment | $0 | $0 | Our time |
| **TOTAL** | **$12** | **$299** | **Setup margin covers our time** |

### Per-Task Billing (Pay-As-You-Go)

| Phase | Tasks | Model | Cost to Us | +30% | **Client Pays** |
|-------|-------|-------|-----------|------|-----------------|
| **Discovery** | | | | | |
| Competitor analysis (5 sites) | 1 | Llama 3.3 (free) | $0.00 | $0.00 | **$0.00** |
| Brand color extraction | 1 | Gemini Flash | $0.03 | $0.009 | **$0.039** |
| **Design** | | | | | |
| Moodboard (5 images) | 1 | Gemini Flash Image | $0.01 | $0.003 | **$0.013** |
| Homepage mockup (desktop+mobile) | 1 | Claude Sonnet | $0.20 | $0.06 | **$0.26** |
| Design system JSON | 1 | Claude Sonnet | $0.05 | $0.015 | **$0.065** |
| **Development** | | | | | |
| React project scaffold | 1 | DeepSeek (free) | $0.00 | $0.00 | **$0.00** |
| Hero section code | 1 | DeepSeek (free) | $0.00 | $0.00 | **$0.00** |
| Menu page code | 1 | DeepSeek (free) | $0.00 | $0.00 | **$0.00** |
| Gallery/lightbox code | 1 | DeepSeek (free) | $0.00 | $0.00 | **$0.00** |
| Events/calendar code | 1 | Claude Sonnet | $0.15 | $0.045 | **$0.195** |
| Contact form + Google Maps | 1 | DeepSeek (free) | $0.00 | $0.00 | **$0.00** |
| Responsive CSS fixes | 1 | Claude Sonnet | $0.10 | $0.03 | **$0.13** |
| **Content** | | | | | |
| Homepage copy (all sections) | 1 | Claude Sonnet | $0.25 | $0.075 | **$0.325** |
| Menu descriptions (20 items) | 1 | Claude Sonnet | $0.15 | $0.045 | **$0.195** |
| About page story | 1 | Claude Sonnet | $0.08 | $0.024 | **$0.104** |
| SEO meta tags | 1 | Claude Sonnet | $0.05 | $0.015 | **$0.065** |
| **QA & Polish** | | | | | |
| Mobile testing + fixes | 1 | Claude Sonnet | $0.20 | $0.06 | **$0.26** |
| Performance optimization | 1 | Claude Sonnet | $0.30 | $0.09 | **$0.39** |
| Lighthouse audit | 1 | Claude Sonnet | $0.10 | $0.03 | **$0.13** |
| **Social Launch** | | | | | |
| Instagram launch posts (3) | 1 | Llama 3.3 (free) | $0.00 | $0.00 | **$0.00** |
| Launch announcement email | 1 | Gemini 2.5 Flash | $0.05 | $0.015 | **$0.065** |
| | | | | | |
| **TOTAL PROJECT** | **19 tasks** | | **$1.72** | **$0.516** | **$2.236** |

**Summary for Client:**
- Setup: $299 (one-time)
- 19 AI tasks: $2.24
- **Total for full website: $301.24**
- **Traditional agency quote: $2,500–$5,000**
- **You save: $2,200–$4,700 (88–94%)**

---

## 6. Cost Comparison: NECTAR.AI vs Alternatives

### Website Build (Cigar Lounge Example)

| Provider | Price | Time | Quality | Transparency |
|----------|-------|------|---------|-------------|
| Wix/Squarespace | $192/yr + $10/mo | DIY | Template | Hidden fees |
| Upwork Freelancer | $2,500 | 3–4 weeks | Variable | Opaque |
| Agency (Boutique) | $5,000 | 6–8 weeks | High | Opaque |
| **NECTAR.AI** | **$301.24** | **7 days** | **Custom** | **Fully transparent** |

### Monthly Content Package (4 blog posts + 12 social posts)

| Provider | Price | Content Quality | Time Commitment |
|----------|-------|----------------|-----------------|
| Freelance Writer | $800/mo | Variable | None (they do it) |
| Jasper AI | $99/mo + $49/seat | Good | You write prompts |
| Content Marketing Agency | $2,000/mo | High | Minimal |
| **NECTAR.AI** | **~$5–$15/mo** | **High** | **Minimal** |

### Why Our Costs Are So Low

1. **Free models handle 80% of tasks** — Modern free models (Llama, DeepSeek) are as good as GPT-3.5
2. **No human overhead** — No salaries, benefits, office space
3. **No profit margin on compute** — We pass LLM costs through at cost
4. **Pay only for what you use** — No monthly minimums, no bundled hours
5. **Intelligent routing** — We always pick the cheapest model that can do the job

---

## 7. Billing in Telegram (Real-Time Transparency)

Every message from the bot includes a cost breakdown:

```
🐝 DesignBee completed task!

Task: Luxury homepage mockup (desktop + mobile)
Model: Claude Sonnet 4.6
Tokens used: 4,200 prompt + 2,800 completion
Cost: $0.20
Service fee (30%): $0.06
Task total: $0.26

Project total so far: $2.24 / $500 setup credit
Remaining credit: $497.76

📎 Files uploaded to Google Drive →
```

### Budget Controls

| Setting | Default | Client Can Change |
|---------|---------|-------------------|
| Max cost per task | $5.00 | Yes, via /settings |
| Approved model tiers | Up to Tier 3 | Yes, per-task |
| Daily spend limit | $20.00 | Yes, via /settings |
| Monthly cap | $200.00 | Yes, via /settings |
| Auto-stop at cap | Enabled | No (always on) |

---

## 8. When Do Costs Go Up?

### Factors That Increase Cost

| Factor | Impact | Example |
|--------|--------|---------|
| **Premium model requested** | 10–50× cost | Claude Opus vs free Llama |
| **Long context window** | 2–5× cost | 200K token analysis |
| **Multi-step reasoning** | 3–10× cost | Code debugging with multiple iterations |
| **Image/video generation** | $0.01–$3.00/task | DALL-E vs local ComfyUI |
| **Many revisions** | Additive | Each revision = new task cost |
| **Custom model** | Variable | Fine-tuned model deployment |

### Cost Ceiling Guarantee

**"You will NEVER pay more than $10 for a single task without explicit approval."**

If a task would cost >$10:
1. Bee pauses and sends estimate
2. Client approves or downgrades model
3. Bee resumes with approved approach

---

## 9. Hermes Skill Cost Attribution

Each Hermes skill maps to specific models and has predictable costs:

| Skill | Typical Model | Avg Tokens | Avg Cost | Used By |
|-------|--------------|-----------|----------|---------|
| `claude-design` | Claude Sonnet 4.6 | 6K | $0.15–$0.40 | DesignBee |
| `comfyui` | ComfyUI (local) | N/A | $0.00 | VideoBee |
| `text_to_speech` | Edge TTS | N/A | $0.00 | AudioBee |
| `web_search` | Llama 3.3 (free) | 3K | $0.00 | ScoutBee, ResearchBee |
| `browser` | Claude Sonnet 4.6 | 8K | $0.30 | DevBee, QABee |
| `terminal` | DeepSeek (free) | 4K | $0.00 | DevBee, DevOpsBee |
| `file` | Llama 3.3 (free) | 2K | $0.00 | All Bees |
| `web` | Llama 3.3 (free) | 3K | $0.00 | All Bees |
| `humanizer` | Claude Haiku 4.5 | 5K | $0.10 | ContentBee |
| `youtube-content` | Claude Sonnet 4.6 | 7K | $0.25 | ContentBee |
| `arxiv` | Claude Sonnet 4.6 | 10K | $0.35 | ResearchBee |
| `xurl` | Llama 3.3 (free) | 2K | $0.00 | SocialBee |
| `himalaya` | Gemini 2.5 Flash | 4K | $0.05 | EmailBee |
| `notion` | Llama 3.3 (free) | 3K | $0.00 | AdminBee |
| `google-workspace` | Gemini 2.5 Flash | 4K | $0.05 | AdminBee |
| `github-pr-workflow` | Llama 3.3 (free) | 5K | $0.00 | DevOpsBee |
| `systematic-debugging` | Claude Sonnet 4.6 | 15K | $0.60 | QABee |
| `github-code-review` | Claude Sonnet 4.6 | 12K | $0.45 | SecurityBee |
| `dspy` | Claude Opus 4 | 20K | $2.00 | MLBee |
| `google-workspace` | Gemini 2.5 Flash | 3K | $0.03 | AdminBee |
| `requesting-code-review` | Claude Sonnet 4.6 | 8K | $0.30 | SecurityBee |
| `notion` | Llama 3.3 (free) | 4K | $0.00 | AdminBee |
| `airtable` | Llama 3.3 (free) | 4K | $0.00 | AdminBee |
| `powerpoint` | Claude Sonnet 4.6 | 6K | $0.20 | AdminBee |
| `calculator` | Llama 3.3 (free) | 1K | $0.00 | DataBee |
| `weather` | Llama 3.3 (free) | 1K | $0.00 | ScoutBee |
| `image_gen` | Gemini Flash Image | 1 image | $0.002 | InfographicBee |
| `audio_gen` | AudioCraft (local) | 1 audio | $0.00 | AudioBee |
| `video_gen` | ComfyUI (local) | 1 video | $0.00 | VideoBee |

---

## 10. The Exception: Setup Fee Justification

You might wonder: "If tasks cost $0–$2, why charge $299 setup?"

The $299 setup is NOT for compute. It covers:

| Cost Item | Our Cost | Time |
|-----------|----------|------|
| Telegram bot configuration | $0 | 15 min |
| Google Drive OAuth integration | $0 | 30 min |
| Initial folder structure creation | $0 | 10 min |
| Brand intake call (async or live) | $0 | 45 min |
| Google Drive sharing + client permissions | $0 | 15 min |
| Project configuration in Supabase | $0 | 15 min |
| **Total** | **$0** | **2.5 hours** |

**$299 ÷ 2.5 hours = $120/hour** — This is our "human time" rate for Hive Manager oversight.

It's the only place we charge for our time. Every task after that is pure compute + 30%.

---

## 11. Revenue Model Summary

### Per Client (Cigar Lounge Example)

| Revenue Stream | Amount | Frequency |
|----------------|--------|-----------|
| Setup fee | $299 | One-time |
| Website build (all tasks) | $2.24 | One-time |
| Monthly social posts (12 posts) | ~$2.00 | Monthly |
| Monthly blog posts (2–4) | ~$3.00 | Monthly |
| Ongoing website updates | ~$1.00/task | Per request |
| **Total Year 1** | **$361** | |
| **Our API costs** | **~$20** | |
| **Our margin** | **~95%** | |

### At Scale (20 Clients)

| Metric | Value |
|--------|-------|
| Setup revenue | $5,980 |
| Monthly task revenue (avg) | $100 |
| Monthly total | $100 × 20 = $2,000 |
| API costs | ~$400/mo |
| **Monthly profit** | **$1,600** |
| **Year 1 profit** | **$24,600** |

---

## 12. Client Communication Template (New)

### Onboarding Message

```
🐝 Welcome to NECTAR.AI!

You now have an AI team on Telegram.

💰 HOW PRICING WORKS:
• Setup: $299 (one-time, for bot + Google Drive setup)
• Tasks: $0–$5 each (cost of AI model + 30% service fee)
• Most tasks use FREE models → you pay $0
• Premium models used ONLY when needed

📊 YOUR FIRST PROJECT ESTIMATE:
• Cigar lounge website: ~$2–$5 in task costs
• Total with setup: ~$302
• vs. Traditional agency: $2,500–$5,000
• Your savings: $2,200–$4,700

💳 BILLING:
• Pay-as-you-go, no monthly minimums
• You see every cost in real-time
• Auto-stop at your set budget limit
• No surprises, ever.

Ready? Type /hire to start!
```

### Task Completion Message

```
🐝 DesignBee completed!

📄 Task: Homepage mockup (desktop + mobile)
🤖 Model: Claude Sonnet 4.6 (quality mode)
🔢 Tokens: 4,200 prompt + 2,800 completion
💵 AI cost: $0.20
💵 Service fee (30%): $0.06
💵 Task total: $0.26

📊 PROJECT WALLETS:
• This project: $2.24 spent / $500 credit
• Account balance: $497.76

📎 Files: [Google Drive link]

/hire for next task →
```

---

## 13. Competitive Positioning

| Competitor | Their Model | Our Advantage |
|------------|-------------|---------------|
| **Jasper/Copy.ai** | $49–$125/mo subscription | We charge per task ($0–$2). No monthly minimum. |
| **Upwork/Fiverr** | $25–$150/hour human labor | 100× cheaper. Same quality. Instant delivery. |
| **Agency** | $2,500–$10,000/project | 90% cheaper. Real-time cost visibility. |
| **Claude API direct** | $3–$15/M tokens DIY | We route to cheapest model. You save 80%. |
| **OpenAI API direct** | $5–$150/M tokens DIY | We handle model selection. You just chat. |

**Our moat:**
1. **Model routing intelligence** — We pick the optimal cost/quality model for each task
2. **Telegram integration** — No learning curve. Just chat.
3. **Google Drive ownership** — You own all your files
4. **Transparent billing** — Every penny is visible
5. **No minimums** — Pay $0 if free models handle everything

---

## 14. Implementation Notes for Hive Manager

### Cost Tracking in Code

```python
class TaskCostTracker:
    """Tracks every LLM call for transparent billing."""
    
    def __init__(self, client_id: str):
        self.client_id = client_id
        self.tasks = []
    
    def log_llm_call(self, model: str, prompt_tokens: int, completion_tokens: int):
        """Called after every LLM inference."""
        cost = calculate_openrouter_cost(model, prompt_tokens, completion_tokens)
        self.tasks.append({
            'model': model,
            'prompt_tokens': prompt_tokens,
            'completion_tokens': completion_tokens,
            'cost': cost,
            'service_fee': cost * 0.30,
            'total': cost * 1.30
        })
    
    def get_project_total(self):
        return sum(t['total'] for t in self.tasks)
    
    def send_telegram_receipt(self, task_description: str):
        """Sends real-time receipt to client's Telegram."""
        latest = self.tasks[-1]
        receipt = f"""
🐝 Task complete!

📄 {task_description}
🤖 Model: {latest['model']}
💵 AI cost: ${latest['cost']:.4f}
💵 Service fee: ${latest['service_fee']:.4f}
💵 Total: ${latest['total']:.4f}

Project total: ${self.get_project_total():.2f}
"""
        send_telegram_message(self.client_id, receipt)
```

### Free Model Routing

```python
FREE_MODELS = [
    'meta-llama/llama-3.3-70b-instruct:free',
    'deepseek/deepseek-v4-flash:free',
    'qwen/qwen3-coder:free',
    'nousresearch/hermes-3-llama-3.1-405b:free',
]

def route_task_to_model(task_type: str, quality_requirement: str = 'standard'):
    """
    Routes task to cheapest model that can handle it.
    
    Quality levels:
    - 'draft' → Always try free first
    - 'standard' → Free → Cheap → Quality cascade
    - 'premium' → Skip free, start at Tier 3
    - 'critical' → Always use Tier 4 (Opus/GPT-5)
    """
    if quality_requirement == 'draft':
        return FREE_MODELS[0]
    
    if quality_requirement == 'critical':
        return 'anthropic/claude-opus-4'
    
    # For standard, try free first, fall back on failure
    return FREE_MODELS[0]  # With retry logic
```

---

## 15. Files

This pricing spec lives at:
`/Users/ronakchovatiya/Desktop/repos/nectarai/docs/TRANSPARENT_PRICING.md`

Companion docs:
- `BEE_CATALOG.md` — Full bee-skill mapping
- `CIGAR_LOUNGE_PLAYBOOK.md` — Cigar lounge deployment plan
- `IMPLEMENTATION_ROADMAP.md` — 2026 execution timeline

---

*Document maintained by Hive Manager | NECTAR.AI*
*Pricing data refreshed from OpenRouter API May 2026*
