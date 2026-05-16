import { motion } from "framer-motion";
import { ArrowRight, Check, Zap, DollarSign, Shield } from "lucide-react";
import Navigation from "./Navigation";
import CostCalculator from "./CostCalculator";

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-nectar-black text-white selection:bg-nectar-honey selection:text-nectar-black">
      <Navigation activePage="pricing" />

      <main className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_24%_12%,rgba(245,183,0,0.18),transparent_26%),radial-gradient(circle_at_82%_20%,rgba(255,209,102,0.09),transparent_28%)]" />
        <div className="absolute inset-0 pointer-events-none opacity-[0.08] [background-image:linear-gradient(30deg,#f5b700_12%,transparent_12.5%,transparent_87%,#f5b700_87.5%,#f5b700),linear-gradient(150deg,#f5b700_12%,transparent_12.5%,transparent_87%,#f5b700_87.5%,#f5b700),linear-gradient(30deg,#f5b700_12%,transparent_12.5%,transparent_87%,#f5b700_87.5%,#f5b700),linear-gradient(150deg,#f5b700_12%,transparent_12.5%,transparent_87%,#f5b700_87.5%,#f5b700)] [background-position:0_0,0_0,34px_60px,34px_60px] [background-size:68px_120px]" />

        {/* Hero */}
        <section className="relative flex min-h-[92vh] items-center px-6 pb-20 pt-32 md:px-24 md:pt-40">
          <div className="grid w-full gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-3xl"
            >
              <p className="mb-4 font-mono text-sm uppercase tracking-widest text-nectar-honey">Transparent Pricing</p>
              <h1 className="mb-6 font-display text-5xl font-medium leading-tight tracking-tight text-white md:text-7xl">
                You pay what we pay. <br />
                <span className="text-nectar-honey">Plus 30%.</span>
              </h1>
              <p className="max-w-2xl text-lg font-light leading-relaxed text-gray-300 md:text-xl">
                No hidden margins. No bundled hours. No monthly minimums. 
                We pass through AI model costs at zero markup. You pay a 30% service fee for orchestration, file management, and quality review.
              </p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <a href="#calculator" className="inline-flex items-center justify-center gap-2 rounded-full bg-nectar-honey px-8 py-4 font-medium text-nectar-black drop-shadow-[0_0_18px_rgba(245,183,0,0.38)] transition-colors hover:bg-nectar-glow">
                  Calculate Your Cost <ArrowRight size={18} />
                </a>
                <a href="/#contact" className="inline-flex items-center justify-center rounded-full border border-white/20 px-8 py-4 font-medium text-white backdrop-blur transition-colors hover:bg-white/5">
                  Talk to Sales
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="rounded-lg border border-nectar-honey/30 bg-[#0b0b0b]/80 p-6 shadow-[0_0_45px_rgba(245,183,0,0.12)] backdrop-blur"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-5">
                <div>
                  <p className="text-sm uppercase tracking-widest text-gray-500">Website build starts at</p>
                  <p className="mt-2 font-display text-5xl text-nectar-honey">$299</p>
                  <p className="text-sm text-gray-500">setup + $0–$5 per task</p>
                </div>
                <DollarSign className="text-nectar-honey" size={38} />
              </div>
              <div className="grid gap-4 pt-6 text-sm text-gray-300 sm:grid-cols-3">
                <div><p className="font-display text-3xl text-white">$0</p><p className="mt-1">for most tasks</p></div>
                <div><p className="font-display text-3xl text-white">30%</p><p className="mt-1">service fee only</p></div>
                <div><p className="font-display text-3xl text-white">100%</p><p className="mt-1">cost transparent</p></div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* How pricing works */}
        <section className="relative px-6 py-20 md:px-24 border-b border-white/5">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <p className="text-nectar-honey font-mono tracking-widest text-sm uppercase mb-4">How It Works</p>
              <h2 className="text-4xl md:text-5xl font-display mb-4">Three numbers. Total transparency.</h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                No "contact us for pricing." No opaque bundles. Every penny is visible.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: DollarSign,
                  title: "Setup Fee",
                  price: "$299",
                  desc: "One-time. Covers Telegram bot setup, Google Drive integration, and brand intake. This is the ONLY fixed fee.",
                },
                {
                  icon: Zap,
                  title: "AI Model Cost",
                  price: "$0–$5",
                  desc: "Per task. We use free models when possible (Llama, DeepSeek, Qwen). For premium quality, we use Claude or GPT — at cost.",
                },
                {
                  icon: Shield,
                  title: "Service Fee",
                  price: "30%",
                  desc: "On top of model cost. Covers orchestration, file management, quality review, and our human oversight.",
                },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="relative rounded-2xl border border-white/10 bg-white/[0.03] p-8 text-center"
                >
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl border border-nectar-honey/20 bg-nectar-honey/10 text-nectar-honey mb-6">
                    <item.icon size={24} />
                  </div>
                  <p className="text-sm text-gray-400 uppercase tracking-wider mb-2">{item.title}</p>
                  <p className="text-4xl font-display text-white mb-4">{item.price}</p>
                  <p className="text-sm text-gray-400 leading-relaxed">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Cost Calculator */}
        <section id="calculator" className="relative px-6 py-20 md:px-24">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <p className="text-nectar-honey font-mono tracking-widest text-sm uppercase mb-4">Live Calculator</p>
              <h2 className="text-4xl md:text-5xl font-display mb-4">Build your estimate.</h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Select the tasks you need. See exactly what each one costs. No surprises.
              </p>
            </motion.div>
            <CostCalculator />
          </div>
        </section>

        {/* Model transparency */}
        <section className="relative px-6 py-20 md:px-24 border-b border-white/5">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <p className="text-nectar-honey font-mono tracking-widest text-sm uppercase mb-4">Model Transparency</p>
              <h2 className="text-4xl md:text-5xl font-display mb-4">We route to the best model for your task.</h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Free models first. Premium only when needed. You always see which model was used and what it cost.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-4">
              {[
                { model: "Llama 3.3 70B", provider: "Meta (Free)", cost: "$0.00/M tokens", tasks: "General chat, social posts, summaries, simple code", tier: "Free" },
                { model: "DeepSeek V4 Flash", provider: "DeepSeek (Free)", cost: "$0.00/M tokens", tasks: "Code generation, debugging, technical writing", tier: "Free" },
                { model: "Qwen3 Coder 480B", provider: "Qwen (Free)", cost: "$0.00/M tokens", tasks: "Complex coding, refactoring, architecture", tier: "Free" },
                { model: "Claude Sonnet 4.6", provider: "Anthropic", cost: "$3.00/M tokens", tasks: "Design, creative writing, code review, debugging", tier: "Quality" },
                { model: "Gemini 2.5 Flash", provider: "Google", cost: "$0.50/M tokens", tasks: "Long context, multimodal, email, scheduling", tier: "Balanced" },
                { model: "Claude Opus 4", provider: "Anthropic", cost: "$15.00/M tokens", tasks: "Maximum reasoning, security audits, critical code", tier: "Premium" },
                { model: "GPT-4o", provider: "OpenAI", cost: "$5.00/M tokens", tasks: "Vision, structured outputs, general purpose", tier: "Quality" },
                { model: "Gemini Flash Image", provider: "Google", cost: "$0.002/image", tasks: "Image generation, moodboards, graphics", tier: "Free-ish" },
              ].map((m, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="flex items-center gap-4 rounded-xl border border-white/5 bg-white/[0.02] p-4 hover:border-white/10 transition-colors"
                >
                  <div className={`shrink-0 rounded-lg px-2.5 py-1 text-xs font-medium ${
                    m.tier === "Free" ? "bg-green-500/10 text-green-400" :
                    m.tier === "Free-ish" ? "bg-green-500/10 text-green-400" :
                    m.tier === "Balanced" ? "bg-blue-500/10 text-blue-400" :
                    m.tier === "Quality" ? "bg-nectar-honey/10 text-nectar-honey" :
                    "bg-red-500/10 text-red-400"
                  }`}>
                    {m.tier}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-white">{m.model}</span>
                      <span className="text-xs text-gray-500">{m.provider}</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-0.5">{m.tasks}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-medium text-white">{m.cost}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison table */}
        <section className="relative px-6 py-20 md:px-24 border-b border-white/5">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <p className="text-nectar-honey font-mono tracking-widest text-sm uppercase mb-4">Compare</p>
              <h2 className="text-4xl md:text-5xl font-display mb-4">See how we stack up.</h2>
            </motion.div>

            <div className="rounded-2xl border border-white/10 overflow-hidden">
              <div className="grid grid-cols-5 gap-4 p-4 text-sm font-medium text-gray-400 border-b border-white/10 bg-white/[0.02]">
                <span>Service</span>
                <span className="text-center">Website</span>
                <span className="text-center">Blog Post</span>
                <span className="text-center">Social Posts</span>
                <span className="text-center">Monthly Min</span>
              </div>
              {[
                { name: "Traditional Agency", website: "$3,000", blog: "$300", social: "$800/mo", min: "$1,000/mo", highlight: false },
                { name: "Freelancer (Upwork)", website: "$1,500", blog: "$100", social: "$400/mo", min: "$400/mo", highlight: false },
                { name: "AI Tools (Jasper)", website: "DIY", blog: "$0 (your time)", social: "$0 (your time)", min: "$99/mo", highlight: false },
                { name: "NECTAR.AI", website: "$299", blog: "$0.23", social: "$0/mo", min: "$0", highlight: true },
              ].map((row, i) => (
                <div
                  key={i}
                  className={`grid grid-cols-5 gap-4 p-4 text-sm ${
                    row.highlight 
                      ? "bg-nectar-honey/5 border-l-2 border-nectar-honey" 
                      : "border-b border-white/5"
                  }`}
                >
                  <span className={row.highlight ? "font-medium text-nectar-honey" : "text-gray-300"}>{row.name}</span>
                  <span className="text-center text-gray-400">{row.website}</span>
                  <span className="text-center text-gray-400">{row.blog}</span>
                  <span className="text-center text-gray-400">{row.social}</span>
                  <span className="text-center text-gray-400">{row.min}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Old pricing (for reference) */}
        <section className="relative px-6 py-20 md:px-24">
          <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end max-w-5xl mx-auto">
            <div className="max-w-3xl">
              <p className="mb-4 font-mono text-sm uppercase tracking-widest text-nectar-honey">Hive Plans</p>
              <h2 className="font-display text-4xl font-medium tracking-tight md:text-5xl">Prefer a predictable monthly plan?</h2>
              <p className="mt-4 text-gray-400">
                We still offer flat-rate Hive plans if you prefer not to think about per-task costs. 
                Same Bees, same quality, bundled for convenience.
              </p>
            </div>
          </div>

          <div className="grid gap-5 lg:grid-cols-3 max-w-5xl mx-auto">
            {[
              {
                name: "Honey Starter",
                price: "$499",
                period: "/project",
                bees: "1 project, up to 5 tasks",
                features: [
                  "Website or app build",
                  "Up to 5 Bee tasks included",
                  "Google Drive delivery",
                  "Telegram updates",
                  "14-day revision window",
                ],
                cta: "Start a Project",
                featured: false,
              },
              {
                name: "Worker Hive",
                price: "$999",
                period: "/mo",
                bees: "5 Bees, unlimited tasks",
                features: [
                  "5 AI Bees of your choice",
                  "Unlimited tasks (within reason)",
                  "Priority support",
                  "Custom integrations",
                  "Weekly strategy reviews",
                  "Dedicated account manager",
                ],
                cta: "Start Free Trial",
                featured: true,
              },
              {
                name: "Custom Swarm",
                price: "Let's talk",
                period: "",
                bees: "Unlimited Bees, custom SLA",
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
            ].map((tier) => (
              <motion.article
                key={tier.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6 }}
                className={`rounded-lg border p-6 ${
                  tier.featured
                    ? "border-nectar-honey bg-nectar-honey text-nectar-black shadow-[0_0_36px_rgba(245,183,0,0.24)]"
                    : "border-white/10 bg-[#0d0d0d]/90 text-white"
                }`}
              >
                <div className="mb-8 flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-display text-2xl font-medium">{tier.name}</h3>
                    <p className={`mt-2 text-sm ${tier.featured ? "text-black/70" : "text-gray-400"}`}>
                      {tier.bees}
                    </p>
                  </div>
                  {tier.featured && <span className="rounded-full bg-black/10 px-3 py-1 text-xs font-semibold">Most Popular</span>}
                </div>
                <div className="mb-8">
                  <p className="font-display text-5xl font-semibold">{tier.price}</p>
                  <p className={`mt-1 text-sm ${tier.featured ? "text-black/70" : "text-gray-500"}`}>{tier.period}</p>
                </div>
                <ul className="mb-8 space-y-3">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex gap-3 text-sm">
                      <Check className="mt-0.5 shrink-0" size={17} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="/#contact"
                  className={`block w-full rounded-full py-3 text-center font-medium transition-colors ${
                    tier.featured ? "bg-black text-white hover:bg-black/80" : "border border-white/20 text-white hover:bg-white/5"
                  }`}
                >
                  {tier.cta}
                </a>
              </motion.article>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="relative px-6 py-20 md:px-24 border-b border-white/5">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <p className="text-nectar-honey font-mono tracking-widest text-sm uppercase mb-4">FAQ</p>
              <h2 className="text-4xl md:text-5xl font-display mb-4">Pricing questions.</h2>
            </motion.div>

            <div className="space-y-4">
              {[
                {
                  q: "Why is this so cheap?",
                  a: "We use free AI models (Llama, DeepSeek, Qwen) for 80% of tasks. These models are as good as paid ones for most work. When we need premium quality, we use Claude or GPT — and you pay exactly what they cost us, plus 30%."
                },
                {
                  q: "Can I really get a website for $299?",
                  a: "Yes. The $299 setup covers bot configuration, Google Drive integration, and project setup. The actual AI tasks to build a 5-page website cost about $2.24 in model fees. Compare that to $2,500–$5,000 from an agency."
                },
                {
                  q: "What's the catch?",
                  a: "There's no catch. Modern free AI models are incredibly capable. The hard part isn't the AI — it's orchestrating multiple AI workers (Bees), managing file delivery, and ensuring quality. That's what the 30% service fee covers."
                },
                {
                  q: "Do I own my files?",
                  a: "100%. Everything lives in YOUR Google Drive. We literally cannot access your files after you revoke permissions. You own everything."
                },
                {
                  q: "What if the AI does bad work?",
                  a: "Every deliverable is reviewed. If quality is poor, we retry with a better model at our cost, not yours. You only pay for approved work."
                },
                {
                  q: "How do I control costs?",
                  a: "Set daily/weekly/monthly caps in your Telegram bot. We warn you at 80% of your limit. Hard stop at 100%. You'll never get a surprise bill."
                },
              ].map((faq, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="rounded-xl border border-white/5 bg-white/[0.02] p-6"
                >
                  <h3 className="text-lg font-medium text-white mb-2">{faq.q}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{faq.a}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="relative px-6 pb-24 pt-12 md:px-24">
          <div className="rounded-lg border border-white/10 bg-[#0b0b0b]/90 p-8 text-center md:p-12 max-w-4xl mx-auto">
            <p className="mb-4 font-mono text-sm uppercase tracking-widest text-nectar-honey">Ready when you are</p>
            <h2 className="mx-auto max-w-3xl font-display text-4xl font-medium tracking-tight md:text-6xl">
              Start with one task. Let the hive grow from there.
            </h2>
            <div className="mt-10 flex flex-col gap-4 justify-center sm:flex-row">
              <a href="/" className="inline-flex items-center justify-center gap-2 rounded-full bg-nectar-honey px-8 py-4 font-medium text-nectar-black transition-colors hover:bg-nectar-glow">
                Meet the Bees <ArrowRight size={18} />
              </a>
              <a href="/#contact" className="inline-flex items-center justify-center rounded-full border border-white/20 px-8 py-4 font-medium text-white backdrop-blur transition-colors hover:bg-white/5">
                Book Free Consultation
              </a>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
