// NECTAR.AI — Transparent Task Costs for Each Bee
// Model costs are passed through at zero markup. Service fee is 30%.
// Most tasks use free models (Llama 3.3, DeepSeek V4, Qwen3 Coder)

export interface BeeExample {
  user: string;
  bee: string;
}

export interface BeeConfig {
  key: string;
  label: string;
  description: string;
  defaultValue: boolean;
  priceModifier: number;
}

export interface TaskCost {
  task: string;
  avgTokens: number;
  model: string;
  estimatedCost: number; // in USD, at cost (before 30% fee)
}

export interface Bee {
  id: string;
  name: string;
  role: string;
  emoji: string;
  variant?: "chat" | "cma";
  shortDesc: string;
  description: string;
  basePrice: number;
  color: string;
  features: string[];
  configs: BeeConfig[];
  examples: BeeExample[];
  taskCosts: TaskCost[];
  defaultModel: string;
}

export const bees: Bee[] = [
  {
    id: "support",
    name: "HoneyBee",
    role: "Customer Support",
    emoji: "🍯",
    shortDesc: "Answers questions, resolves tickets, handles refunds 24/7.",
    description:
      "HoneyBee is your tireless frontline support agent. It learns your product docs, FAQs, and policies. It replies instantly, escalates complex issues to humans, and keeps customers happy around the clock.",
    basePrice: 0,
    color: "#F5B700",
    features: [
      "Instant email & chat replies",
      "Learns from your docs & past tickets",
      "Auto-escalation to human team",
      "Sentiment detection & priority routing",
      "Multi-language support",
    ],
    configs: [
      {
        key: "channels",
        label: "Extra Channels",
        description: "Add WhatsApp, Instagram DM, and Discord support",
        defaultValue: false,
        priceModifier: 100,
      },
      {
        key: "multilingual",
        label: "Multi-Language",
        description: "Support in 40+ languages simultaneously",
        defaultValue: false,
        priceModifier: 80,
      },
    ],
    examples: [
      {
        user: "My order hasn't arrived yet. Order #48291",
        bee: "I checked order #48291 — it shipped on May 12 and is currently at the Los Angeles distribution center. The estimated delivery is May 18. Would you like me to send you live tracking updates?",
      },
      {
        user: "Can I get a refund?",
        bee: "Absolutely. Since your order is within the 30-day window, I can process that immediately. The $149.99 refund will hit your original payment method in 3–5 business days. Shall I go ahead?",
      },
    ],
    taskCosts: [
      { task: "Answer 100 support tickets", avgTokens: 50000, model: "Llama 3.3 70B (free)", estimatedCost: 0.00 },
      { task: "Escalation analysis + sentiment report", avgTokens: 15000, model: "Claude Sonnet 4.6", estimatedCost: 0.25 },
    ],
    defaultModel: "meta-llama/llama-3.3-70b-instruct:free",
  },
  {
    id: "leadgen",
    name: "ScoutBee",
    role: "Lead Generation",
    emoji: "🔍",
    shortDesc: "Qualifies leads, books meetings, and follows up automatically.",
    description:
      "ScoutBee captures every inbound lead, instantly qualifies them against your Ideal Customer Profile, and books meetings on your calendar. It never forgets to follow up.",
    basePrice: 0,
    color: "#FF6B6B",
    features: [
      "Auto-qualifies leads from any channel",
      "Books meetings on your calendar",
      "Smart follow-up sequences (email/SMS)",
      "CRM enrichment & scoring",
      "Real-time Slack alerts for hot leads",
    ],
    configs: [
      {
        key: "outbound",
        label: "Outbound Mode",
        description: "Send personalized cold outreach via email & LinkedIn",
        defaultValue: false,
        priceModifier: 150,
      },
      {
        key: "crm",
        label: "CRM Integration",
        description: "Native sync with HubSpot, Salesforce, or Pipedrive",
        defaultValue: false,
        priceModifier: 50,
      },
    ],
    examples: [
      {
        user: "Hi, I'm interested in your marketing services for my dental practice",
        bee: "Great to meet you! I'm ScoutBee from NECTAR.AI. Before we schedule a strategy call, could you share how many locations you have and your current monthly ad spend? This helps us prepare the right recommendations.",
      },
      {
        user: "2 locations, about $3k/month on ads",
        bee: "Perfect — that's right in our sweet spot. Based on your profile, I think our Growth Hive plan would be ideal. I've opened a 30-minute slot for Thursday at 2pm PT. Does that work?",
      },
    ],
    taskCosts: [
      { task: "Qualify 50 leads", avgTokens: 25000, model: "Llama 3.3 70B (free)", estimatedCost: 0.00 },
      { task: "Meeting booking + follow-up sequence", avgTokens: 12000, model: "Claude Sonnet 4.6", estimatedCost: 0.20 },
    ],
    defaultModel: "meta-llama/llama-3.3-70b-instruct:free",
  },
  {
    id: "content",
    name: "InkBee",
    role: "Content Creator",
    emoji: "✍️",
    shortDesc: "Writes blogs, social posts, newsletters, and ad copy.",
    description:
      "InkBee produces on-brand content at scale. It learns your voice, researches topics automatically, and publishes to your blog, social channels, and email list without you lifting a finger.",
    basePrice: 0,
    color: "#4ECDC4",
    features: [
      "Weekly blog posts in your brand voice",
      "Auto-generated social media threads",
      "Newsletter drafting & scheduling",
      "SEO keyword research & optimization",
      "Repurposes long-form into short clips",
    ],
    configs: [
      {
        key: "video_scripts",
        label: "Video Scripts",
        description: "Generate YouTube/TikTok/Reels scripts weekly",
        defaultValue: false,
        priceModifier: 120,
      },
      {
        key: "publish",
        label: "Auto-Publish",
        description: "Post directly to WordPress, LinkedIn, Twitter, Mailchimp",
        defaultValue: false,
        priceModifier: 60,
      },
    ],
    examples: [
      {
        user: "Write a LinkedIn post about why small businesses need AI in 2026",
        bee: "Here's a hook-first post for you:\n\n'In 2024, I spent 20 hours a week on admin. In 2026, I spend 2.\n\nThe difference? Not hiring more people.\n\nI hired AI employees.\n\nHere's what that actually looks like...'\n\n[Thread continues]\n\nWant me to schedule this for Tuesday 9am?",
      },
      {
        user: "Make it shorter and punchier",
        bee: "Done:\n\n'2024: 20 hrs/week on admin.\n2026: 2 hrs.\n\nI didn't hire a VA.\nI hired AI.\n\nThe future isn't more humans doing busywork.\nIt's humans doing what only humans can do.'\n\n— 78 words, ready to post.",
      },
    ],
    taskCosts: [
      { task: "Write 1000-word blog post", avgTokens: 6000, model: "Claude Sonnet 4.6", estimatedCost: 0.18 },
      { task: "Generate 10 social posts", avgTokens: 3000, model: "Llama 3.3 70B (free)", estimatedCost: 0.00 },
      { task: "Email newsletter draft", avgTokens: 4000, model: "Claude Sonnet 4.6", estimatedCost: 0.12 },
    ],
    defaultModel: "anthropic/claude-sonnet-4",
  },
  {
    id: "appointment",
    name: "ClockBee",
    role: "Appointment Scheduling",
    emoji: "📅",
    shortDesc: "Handles scheduling, reminders, reschedules, and no-shows.",
    description:
      "ClockBee manages your entire calendar. It books appointments, sends reminders, handles reschedules, and even fills last-minute cancellations from your waitlist.",
    basePrice: 0,
    color: "#A78BFA",
    features: [
      "24/7 booking via web, SMS, email",
      "Smart reminder sequences",
      "Auto-reschedule on cancellations",
      "Waitlist backfill for gaps",
      "Calendar sync with Google/Outlook/Apple",
    ],
    configs: [
      {
        key: "payments",
        label: "Payment Collection",
        description: "Collect deposits or full payment at booking",
        defaultValue: false,
        priceModifier: 80,
      },
      {
        key: "sms",
        label: "SMS Reminders",
        description: "Send text reminders 24hr and 1hr before appointments",
        defaultValue: true,
        priceModifier: 40,
      },
    ],
    examples: [
      {
        user: "I need to book a haircut for next Tuesday",
        bee: "I'd love to help! Our salon is open Tue 9am–7pm. We have openings at 10:30am, 1:00pm, and 4:15pm. Which works best for you?",
      },
      {
        user: "1pm please",
        bee: "Perfect! You're booked for Tuesday at 1:00pm with Maria. I'll send a reminder 24 hours before. Need to reschedule? Just reply to this message anytime.",
      },
    ],
    taskCosts: [
      { task: "Schedule 30 appointments", avgTokens: 15000, model: "Llama 3.3 70B (free)", estimatedCost: 0.00 },
      { task: "Reminder sequence setup", avgTokens: 8000, model: "Gemini 2.5 Flash", estimatedCost: 0.05 },
    ],
    defaultModel: "meta-llama/llama-3.3-70b-instruct:free",
  },
  {
    id: "social",
    name: "BuzzBee",
    role: "Social Media Manager",
    emoji: "📢",
    shortDesc: "Posts, replies, engages, and grows your social presence.",
    description:
      "BuzzBee runs your entire social media presence. It posts content, replies to comments and DMs, engages with your community, and tracks growth metrics so you can focus on building.",
    basePrice: 0,
    color: "#F472B6",
    features: [
      "Daily posts across Twitter, LinkedIn, Instagram",
      "Auto-replies to comments and DMs",
      "Community engagement & outreach",
      "Hashtag research & trend monitoring",
      "Weekly analytics reports",
    ],
    configs: [
      {
        key: "ads",
        label: "Ad Management",
        description: "Create and manage Meta & LinkedIn ad campaigns",
        defaultValue: false,
        priceModifier: 200,
      },
      {
        key: "influencer",
        label: "Influencer Outreach",
        description: "Find and DM micro-influencers in your niche",
        defaultValue: false,
        priceModifier: 150,
      },
    ],
    examples: [
      {
        user: "Someone left a negative review on our last post",
        bee: "I saw that. I already replied publicly to acknowledge their concern and invited them to DM us for a resolution. I also flagged it in your Slack. Want me to draft a follow-up DM?",
      },
      {
        user: "Yes draft it",
        bee: "Drafted:\n\n'Hi [Name], thanks for taking the time to share your feedback. I'm sorry your experience didn't match what we aim for. I'd love to make this right — could you share your order number? I'll personally ensure it's handled within the hour.\n\n— Sarah, Customer Success'\n\nReady to send?",
      },
    ],
    taskCosts: [
      { task: "30 social posts across platforms", avgTokens: 15000, model: "Llama 3.3 70B (free)", estimatedCost: 0.00 },
      { task: "Hashtag research + trend analysis", avgTokens: 10000, model: "Claude Sonnet 4.6", estimatedCost: 0.15 },
    ],
    defaultModel: "meta-llama/llama-3.3-70b-instruct:free",
  },
  {
    id: "data",
    name: "DataBee",
    role: "Data Analyst",
    emoji: "📊",
    shortDesc: "Reports, dashboards, forecasts, and business insights.",
    description:
      "DataBee connects to your business tools and generates real-time dashboards, weekly reports, and actionable insights. It spots trends before you do and alerts you to opportunities.",
    basePrice: 0,
    color: "#60A5FA",
    features: [
      "Real-time dashboard creation",
      "Weekly business intelligence reports",
      "Sales forecasting & trend alerts",
      "Churn risk identification",
      "Custom metric tracking",
    ],
    configs: [
      {
        key: "sql",
        label: "SQL Database Access",
        description: "Query your database directly in plain English",
        defaultValue: false,
        priceModifier: 150,
      },
      {
        key: "predictive",
        label: "Predictive Analytics",
        description: "Revenue forecasting and customer LTV prediction",
        defaultValue: false,
        priceModifier: 200,
      },
    ],
    examples: [
      {
        user: "How did this month's revenue compare to last month?",
        bee: "May 2026 revenue is $47,200 — that's up 18% from April ($40,000).\n\nKey drivers:\n• New product line: +$8,400\n• Repeat customers: +12%\n• Avg order value: $142 → $158\n\nOne concern: churn is up 3% in the last 2 weeks. I flagged 14 at-risk accounts. Want the detailed breakdown?",
      },
      {
        user: "Yes send me the at-risk list",
        bee: "Here are the top 5 at-risk accounts by projected LTV loss:\n\n1. Acme Corp ($12,400 LTV) — usage down 60%\n2. BrightSide ($9,800 LTV) — support tickets spiking\n3. TechFlow ($8,200 LTV) — payment failed twice\n4. GreenLeaf ($6,100 LTV) — no login in 21 days\n5. BlueOcean ($5,400 LTV) — competitor mention in support chat\n\nWant me to draft personalized retention offers for each?",
      },
    ],
    taskCosts: [
      { task: "Weekly analytics dashboard", avgTokens: 20000, model: "Claude Sonnet 4.6", estimatedCost: 0.30 },
      { task: "Sales forecast report", avgTokens: 15000, model: "Claude Sonnet 4.6", estimatedCost: 0.22 },
      { task: "Churn risk analysis", avgTokens: 25000, model: "Claude Sonnet 4.6", estimatedCost: 0.38 },
    ],
    defaultModel: "anthropic/claude-sonnet-4",
  },
  {
    id: "market",
    name: "MarketBee",
    role: "CMA & Pricing",
    emoji: "🏠",
    variant: "cma",
    shortDesc: "Generates instant CMA reports and suggests optimal listing prices.",
    description:
      "MarketBee analyzes local comparable sales, market trends, and property features to generate professional Comparative Market Analysis (CMA) reports in seconds. Perfect for real estate agents who need fast, accurate pricing recommendations backed by real data.",
    basePrice: 0,
    color: "#22C55E",
    features: [
      "Instant CMA from any property address",
      "Comparable sales analysis with adjustments",
      "Price-per-sqft trend charts",
      "Days on market and absorption rate",
      "Branded PDF reports for clients",
    ],
    configs: [
      {
        key: "pdf_export",
        label: "PDF Export",
        description: "Generate branded PDF reports with your logo and contact info",
        defaultValue: true,
        priceModifier: 50,
      },
      {
        key: "auto_refresh",
        label: "Auto-Refresh",
        description: "Weekly market updates for tracked properties",
        defaultValue: false,
        priceModifier: 40,
      },
      {
        key: "mls",
        label: "MLS Integration",
        description: "Direct sync with your local MLS (RETS/RESO API)",
        defaultValue: false,
        priceModifier: 100,
      },
    ],
    examples: [
      {
        user: "742 Evergreen Terrace, Austin, TX 78723",
        bee: "Analyzing 742 Evergreen Terrace...\n\nCMA Report Summary:\n• Estimated Value: $485,000 – $512,000\n• Suggested List Price: $499,000\n• Confidence: High\n\nComparable Sales (last 90 days):\n1. 738 Evergreen — $490K, 1,750 sqft (10 DOM)\n2. 745 Maple — $475K, 1,680 sqft (18 DOM)\n3. 750 Oak — $515K, 1,920 sqft (5 DOM)\n\nMarket Trend: +3.2% vs last quarter\nAverage DOM: 12 days\n\nWant me to generate a full PDF report?",
      },
      {
        user: "What should I list my condo for? 2BR, 1,100 sqft, downtown",
        bee: "I'd be happy to help! To generate an accurate CMA, I'll need the specific address. Once you provide it, I can pull recent comps in your building and neighborhood, adjust for floor, view, and condition, and give you a data-backed list price recommendation. What's the address?",
      },
    ],
    taskCosts: [
      { task: "CMA report for 1 property", avgTokens: 12000, model: "Claude Sonnet 4.6", estimatedCost: 0.18 },
      { task: "Comparable sales analysis", avgTokens: 15000, model: "Claude Sonnet 4.6", estimatedCost: 0.22 },
      { task: "Branded PDF generation", avgTokens: 8000, model: "Gemini 2.5 Flash", estimatedCost: 0.05 },
    ],
    defaultModel: "anthropic/claude-sonnet-4",
  },
  // DEPARTMENT BEES — Engineering
  {
    id: "dev",
    name: "DevBee",
    role: "Senior Full-Stack Developer",
    emoji: "💻",
    shortDesc: "Builds production web apps, APIs, and 3D experiences.",
    description:
      "DevBee is your senior full-stack engineer. It builds React/Next.js apps, Three.js experiences, API integrations, and database schemas. It writes clean, tested, production-ready code.",
    basePrice: 0,
    color: "#6366F1",
    features: [
      "React / Next.js / Vite web apps",
      "Three.js / R3F 3D experiences",
      "TypeScript full-stack features",
      "REST / GraphQL / WebSocket APIs",
      "Database schema design",
    ],
    configs: [],
    examples: [
      { user: "Build a landing page with a 3D hero section", bee: "Setting up React + Vite + Tailwind + Three.js. I'll create a responsive landing page with an interactive 3D element in the hero section. ETA: 2 hours." },
      { user: "Add Stripe checkout to my site", bee: "Integrating Stripe Elements for secure checkout. I'll handle the frontend payment form, backend webhook verification, and order confirmation flow." },
    ],
    taskCosts: [
      { task: "Build homepage component", avgTokens: 5000, model: "DeepSeek V4 Flash (free)", estimatedCost: 0.00 },
      { task: "Debug + fix production bug", avgTokens: 8000, model: "Claude Sonnet 4.6", estimatedCost: 0.25 },
      { task: "Full website (5 pages)", avgTokens: 40000, model: "Claude Sonnet 4.6", estimatedCost: 1.20 },
    ],
    defaultModel: "deepseek/deepseek-v4-flash:free",
  },
  {
    id: "design",
    name: "DesignBee",
    role: "UI/UX Designer",
    emoji: "🎨",
    shortDesc: "Designs interfaces, systems, and brand experiences.",
    description:
      "DesignBee creates dark luxury SaaS designs, design systems, wireframes, and architecture diagrams. It produces HTML prototypes and Excalidraw diagrams.",
    basePrice: 0,
    color: "#EC4899",
    features: [
      "Dark luxury SaaS landing pages",
      "Design system tokens (DESIGN.md)",
      "Architecture diagrams",
      "Excalidraw wireframes",
      "Multi-variant A/B mockups",
    ],
    configs: [],
    examples: [
      { user: "Design a dark theme landing page for my SaaS", bee: "Creating a dark luxury landing page with gold accents, glassmorphism cards, and micro-interactions. I'll deliver 3 concept variants in HTML." },
      { user: "Make a design system for my app", bee: "Building a complete design system with color tokens, typography scale, spacing system, and component library in DESIGN.md format." },
    ],
    taskCosts: [
      { task: "Homepage mockup (desktop + mobile)", avgTokens: 7000, model: "Claude Sonnet 4.6", estimatedCost: 0.20 },
      { task: "Design system JSON", avgTokens: 5000, model: "Claude Sonnet 4.6", estimatedCost: 0.15 },
      { task: "Moodboard (5 images)", avgTokens: 0, model: "Gemini Flash Image", estimatedCost: 0.01 },
    ],
    defaultModel: "anthropic/claude-sonnet-4",
  },
  {
    id: "qa",
    name: "QABee",
    role: "QA Automation Engineer",
    emoji: "🐞",
    shortDesc: "Tests, audits, and ensures your product is bulletproof.",
    description:
      "QABee runs Lighthouse performance audits, Playwright E2E tests, cross-browser compatibility checks, security scans, and root cause analysis on bugs.",
    basePrice: 0,
    color: "#14B8A6",
    features: [
      "Lighthouse performance audits",
      "Playwright E2E test suites",
      "Cross-browser compatibility",
      "Security scanning (secrets, XSS)",
      "Bug root cause analysis",
    ],
    configs: [],
    examples: [
      { user: "Audit my website performance", bee: "Running Lighthouse audit across Desktop and Mobile. Checking Core Web Vitals, accessibility, and best practices. Full report with remediation steps." },
      { user: "Why is my login form broken?", bee: "Analyzing the login flow. Checking form validation, API responses, error handling, and browser console. I'll trace the root cause and propose a fix." },
    ],
    taskCosts: [
      { task: "Lighthouse audit + report", avgTokens: 5000, model: "Claude Sonnet 4.6", estimatedCost: 0.15 },
      { task: "Bug root cause analysis", avgTokens: 10000, model: "Claude Sonnet 4.6", estimatedCost: 0.30 },
    ],
    defaultModel: "anthropic/claude-sonnet-4",
  },
];

// SaaS subscription tiers (legacy — kept for flat-rate option)
export interface Tier {
  id: string;
  name: string;
  beeSlots: number;
  monthlyPrice: number;
  yearlyPrice: number;
  features: string[];
  cta: string;
  featured: boolean;
}

export const tiers: Tier[] = [
  {
    id: "starter",
    name: "Honey Starter",
    beeSlots: 2,
    monthlyPrice: 499,
    yearlyPrice: 4990,
    features: [
      "1 project, up to 5 tasks",
      "Website or app build",
      "Google Drive delivery",
      "Telegram updates",
      "14-day revision window",
    ],
    cta: "Start a Project",
    featured: false,
  },
  {
    id: "growth",
    name: "Worker Hive",
    beeSlots: 5,
    monthlyPrice: 999,
    yearlyPrice: 9990,
    features: [
      "5 AI Bees of your choice",
      "Unlimited tasks",
      "Priority support",
      "Custom integrations",
      "Weekly strategy reviews",
      "Dedicated account manager",
    ],
    cta: "Start Free Trial",
    featured: true,
  },
  {
    id: "swarm",
    name: "Custom Swarm",
    beeSlots: -1,
    monthlyPrice: -1,
    yearlyPrice: -1,
    features: [
      "Unlimited AI Bees",
      "Custom model routing",
      "SLA guarantees",
      "On-premise option",
      "Quarterly business reviews",
      "White-label available",
    ],
    cta: "Contact Sales",
    featured: false,
  },
];
