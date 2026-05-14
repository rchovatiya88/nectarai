import { motion } from "framer-motion";
import { ArrowRight, Bot, Check, Clock, Cpu, Gauge, Sparkles } from "lucide-react";
import Navigation from "./Navigation";

const workSteps = [
  {
    icon: Gauge,
    title: "Map the hive",
    desc: "We audit your sales, support, operations, and delivery workflow to find the highest-value AI leverage points.",
  },
  {
    icon: Bot,
    title: "Build AI workers",
    desc: "We design agents, automations, sites, apps, and integrations that handle repeatable work with human oversight.",
  },
  {
    icon: Cpu,
    title: "Connect the stack",
    desc: "Your AI systems plug into the tools you already use, from CRM and forms to inboxes, calendars, dashboards, and docs.",
  },
  {
    icon: Sparkles,
    title: "Optimize the yield",
    desc: "We measure saved hours, faster responses, better lead flow, and revenue impact, then keep refining the system.",
  },
];

const plans = [
  {
    name: "Starter Comb",
    hours: "20 hrs",
    price: "$1,200",
    note: "$60/hr",
    desc: "A focused sprint for one high-impact AI workflow or conversion upgrade.",
    features: ["AI opportunity audit", "One automation or landing flow", "Prompt and workflow setup", "Launch handoff"],
  },
  {
    name: "Growth Hive",
    hours: "40 hrs",
    price: "$2,400",
    note: "$60/hr",
    desc: "Best for businesses ready to connect multiple customer and operations workflows.",
    features: ["AI strategy roadmap", "Two to three AI workflows", "Website or app improvements", "Weekly build reviews"],
    featured: true,
  },
  {
    name: "Agency Swarm",
    hours: "80 hrs",
    price: "$4,800",
    note: "$60/hr",
    desc: "A deeper build cycle for AI-enabled sales, support, marketing, and internal tools.",
    features: ["Full AI systems design", "Custom app or dashboard build", "Automation stack integration", "Optimization and training"],
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-nectar-black text-white selection:bg-nectar-honey selection:text-nectar-black">
      <Navigation activePage="pricing" />

      <main className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_24%_12%,rgba(245,183,0,0.18),transparent_26%),radial-gradient(circle_at_82%_20%,rgba(255,209,102,0.09),transparent_28%)]" />
        <div className="absolute inset-0 pointer-events-none opacity-[0.08] [background-image:linear-gradient(30deg,#f5b700_12%,transparent_12.5%,transparent_87%,#f5b700_87.5%,#f5b700),linear-gradient(150deg,#f5b700_12%,transparent_12.5%,transparent_87%,#f5b700_87.5%,#f5b700),linear-gradient(30deg,#f5b700_12%,transparent_12.5%,transparent_87%,#f5b700_87.5%,#f5b700),linear-gradient(150deg,#f5b700_12%,transparent_12.5%,transparent_87%,#f5b700_87.5%,#f5b700)] [background-position:0_0,0_0,34px_60px,34px_60px] [background-size:68px_120px]" />

        <section className="relative flex min-h-[92vh] items-center px-6 pb-20 pt-32 md:px-24 md:pt-40">
          <div className="grid w-full gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-3xl"
            >
              <p className="mb-4 font-mono text-sm uppercase tracking-widest text-nectar-honey">Pricing</p>
              <h1 className="mb-6 font-display text-5xl font-medium leading-tight tracking-tight text-white md:text-7xl">
                AI agency work, priced by the hour.
              </h1>
              <p className="max-w-2xl text-lg font-light leading-relaxed text-gray-300 md:text-xl">
                Nectar.AI works like a specialist AI build team for small businesses. We use automation, agents,
                websites, and apps to turn manual work into repeatable systems at a clear $60/hr baseline.
              </p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <a
                  href="/#contact"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-nectar-honey px-8 py-4 font-medium text-nectar-black drop-shadow-[0_0_18px_rgba(245,183,0,0.38)] transition-colors hover:bg-nectar-glow"
                >
                  Book a build call <ArrowRight size={18} />
                </a>
                <a
                  href="#pricing"
                  className="inline-flex items-center justify-center rounded-full border border-white/20 px-8 py-4 font-medium text-white backdrop-blur transition-colors hover:bg-white/5"
                >
                  View packages
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
                  <p className="text-sm uppercase tracking-widest text-gray-500">Baseline rate</p>
                  <p className="mt-2 font-display text-5xl text-nectar-honey">$60</p>
                </div>
                <Clock className="text-nectar-honey" size={38} />
              </div>
              <div className="grid gap-4 pt-6 text-sm text-gray-300 sm:grid-cols-3">
                <div>
                  <p className="font-display text-3xl text-white">20+</p>
                  <p className="mt-1">hour focused sprints</p>
                </div>
                <div>
                  <p className="font-display text-3xl text-white">24/7</p>
                  <p className="mt-1">AI workflows after launch</p>
                </div>
                <div>
                  <p className="font-display text-3xl text-white">1:1</p>
                  <p className="mt-1">strategy and build reviews</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="relative px-6 py-20 md:px-24" id="how-it-works">
          <div className="mb-12 max-w-3xl">
            <p className="mb-4 font-mono text-sm uppercase tracking-widest text-nectar-honey">AI as leverage</p>
            <h2 className="font-display text-4xl font-medium tracking-tight md:text-6xl">How this agency works.</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {workSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.article
                  key={step.title}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.55, delay: index * 0.08 }}
                  className="rounded-lg border border-white/10 bg-[#101010]/80 p-6 transition-colors hover:border-nectar-honey/50 hover:bg-white/[0.06]"
                >
                  <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-full border border-nectar-honey/30 bg-black/60 text-nectar-honey">
                    <Icon size={22} />
                  </div>
                  <h3 className="mb-3 text-xl font-medium text-white">{step.title}</h3>
                  <p className="font-light leading-relaxed text-gray-400">{step.desc}</p>
                </motion.article>
              );
            })}
          </div>
        </section>

        <section className="relative px-6 py-20 md:px-24" id="pricing">
          <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-3xl">
              <p className="mb-4 font-mono text-sm uppercase tracking-widest text-nectar-honey">Packages</p>
              <h2 className="font-display text-4xl font-medium tracking-tight md:text-6xl">Choose your build capacity.</h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-gray-400">
              All packages use the same $60/hr structure. Scope can flex up or down after the first strategy call.
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {plans.map((plan) => (
              <motion.article
                key={plan.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6 }}
                className={`rounded-lg border p-6 ${
                  plan.featured
                    ? "border-nectar-honey bg-nectar-honey text-nectar-black shadow-[0_0_36px_rgba(245,183,0,0.24)]"
                    : "border-white/10 bg-[#0d0d0d]/90 text-white"
                }`}
              >
                <div className="mb-8 flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-display text-2xl font-medium">{plan.name}</h3>
                    <p className={`mt-2 text-sm ${plan.featured ? "text-black/70" : "text-gray-400"}`}>{plan.desc}</p>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${plan.featured ? "bg-black/10" : "bg-white/5 text-nectar-honey"}`}>
                    {plan.hours}
                  </span>
                </div>
                <div className="mb-8">
                  <p className="font-display text-5xl font-semibold">{plan.price}</p>
                  <p className={`mt-1 text-sm ${plan.featured ? "text-black/70" : "text-gray-500"}`}>{plan.note}</p>
                </div>
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex gap-3 text-sm">
                      <Check className="mt-0.5 shrink-0" size={17} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="relative px-6 pb-24 pt-12 md:px-24">
          <div className="rounded-lg border border-white/10 bg-[#0b0b0b]/90 p-8 text-center md:p-12">
            <p className="mb-4 font-mono text-sm uppercase tracking-widest text-nectar-honey">Ready when you are</p>
            <h2 className="mx-auto max-w-3xl font-display text-4xl font-medium tracking-tight md:text-6xl">
              Start with one workflow, then let the hive expand.
            </h2>
            <a
              href="/#contact"
              className="mt-10 inline-flex items-center justify-center gap-2 rounded-full bg-nectar-honey px-8 py-4 font-medium text-nectar-black transition-colors hover:bg-nectar-glow"
            >
              Plan my AI build <ArrowRight size={18} />
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
