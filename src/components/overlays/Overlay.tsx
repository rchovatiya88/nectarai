import { motion } from "framer-motion";
import { ArrowRight, Bot, Zap, Users, Clock, Hash } from "lucide-react";
import { bees } from "../../data/bees";
import ContactForm from "../ContactForm";
import HowItWorks from "../HowItWorks";
import TeamSection from "../TeamSection";
import CaseStudies from "../CaseStudies";
import type { Bee } from "../../data/bees";

interface OverlayProps {
  onSelectBee: (bee: Bee) => void;
}

const faqs = [
  {
    q: "Are these real people or just chatbots?",
    a: "Bees are autonomous AI agents — not humans, but not generic chatbots either. Each Bee is specialized, trained on your data, and capable of performing real work: writing code, answering emails, generating reports, managing schedules. They don't sleep, don't take vacation, and don't quit.",
  },
  {
    q: "What if the AI makes a mistake?",
    a: "Every Bee has confidence thresholds and human escalation built in. If a task is ambiguous or high-stakes, the Bee flags it for your review. You set the autonomy level: from 'draft everything for approval' to 'handle it completely.'",
  },
  {
    q: "How is this different from Upwork or Fiverr?",
    a: "Freelancers charge $50–$150/hour, take days to respond, and disappear mid-project. Bees cost $0–$2 per task (AI cost + 30% fee), respond in seconds, and never ghost you. A full website build starts at $299 vs $2,500+ from an agency.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes. Monthly subscriptions cancel anytime with 7 days notice. Annual plans have a 30-day money-back guarantee. No lock-in, no cancellation fees.",
  },
  {
    q: "Do I need technical knowledge to use this?",
    a: "No. Most Bees integrate with tools you already use: Gmail, Slack, WordPress, Shopify, Notion, Airtable. Setup takes under an hour. If you can use a smartphone, you can manage a Bee.",
  },
];

export default function Overlay({ onSelectBee }: OverlayProps) {
  return (
    <div className="relative z-10 pointer-events-none">
        {/* SECTION 1: HERO */}
        <section className="h-screen w-full flex flex-col justify-center px-10 md:px-24">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="max-w-3xl"
          >
            <div className="mb-6 flex items-center gap-3">
              <span className="text-4xl">🐝</span>
              <p className="text-nectar-honey font-mono tracking-widest text-sm uppercase">
                NECTAR.AI
              </p>
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-medium tracking-tight leading-tight mb-6 text-white drop-shadow-2xl">
              AI Employees That Cost <br />
              <span className="text-nectar-honey">Pennies, Not Paychecks.</span>
            </h1>
            <p className="text-gray-400 text-lg md:text-xl mb-10 max-w-xl font-light leading-relaxed">
              Nectar.ai dispatches specialized AI workers (Bees) for your business tasks.
              You pay what the AI costs us — plus 30%. Most tasks are free.
              A full website starts at $299.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#bees"
                className="px-8 py-4 bg-nectar-honey hover:bg-nectar-glow text-nectar-black font-medium transition-all rounded-full drop-shadow-[0_0_15px_rgba(245,183,0,0.4)] text-center flex items-center justify-center gap-2 pointer-events-auto"
              >
                Meet the Bees <ArrowRight size={18} />
              </a>
              <a
                href="/pricing"
                className="px-8 py-4 border border-white/20 hover:bg-white/5 text-white font-medium transition-all rounded-full backdrop-blur-sm text-center pointer-events-auto"
              >
                See How Pricing Works
              </a>
            </div>
          </motion.div>
        </section>

        {/* SECTION 2: WHY BUSINESSES NEED BEES */}
        <section className="h-screen w-full flex flex-col justify-center items-end px-10 md:px-24 text-right">
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="max-w-xl"
          >
            <h2 className="text-4xl md:text-5xl font-display mb-8 text-gray-300">
              Small businesses are{" "}
              <span className="text-white font-medium">overpaying for basic work.</span>
            </h2>
            <div className="grid gap-6 text-left">
              {[
                { icon: Clock, text: "Agencies charge $3,000 for websites that cost $20 in AI compute" },
                { icon: Users, text: "Freelancers bill $100/hour for tasks AI does in seconds" },
                { icon: Hash, text: "AI tools charge monthly but still require you to do the work" },
                { icon: Zap, text: "No one shows you what the AI actually costs" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  <item.icon size={24} className="text-nectar-honey shrink-0" />
                  <span className="text-gray-300 text-lg">{item.text}</span>
                </div>
              ))}
            </div>
            <p className="mt-8 text-nectar-honey font-medium">
              NECTAR.AI passes through AI costs at zero markup. You see every penny.
            </p>
          </motion.div>
        </section>

        {/* SECTION 3: BEE MARKETPLACE */}
        <section className="min-h-screen w-full flex flex-col justify-center px-10 md:px-24 py-20 pointer-events-auto" id="bees">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="mb-4 flex items-center gap-3">
              <Bot size={20} className="text-nectar-honey" />
              <p className="text-nectar-honey font-mono tracking-widest text-sm uppercase">
                The Hive
              </p>
            </div>
            <h2 className="text-4xl md:text-6xl font-display mb-4">
              Hire Your First AI Employee.
            </h2>
            <p className="mb-12 max-w-2xl text-lg text-gray-400">
              Each Bee is trained for a specific job. Click one to configure, see a live demo,
              and start your first task. Pay only for what you use.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {bees.map((bee, i) => (
                <motion.div
                  key={bee.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  onClick={(e) => { e.stopPropagation(); onSelectBee(bee); }}
                  className="group relative cursor-pointer rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-all hover:border-white/20 hover:bg-white/[0.05] pointer-events-auto"
                  style={{ boxShadow: `0 0 0 0 ${bee.color}00` }}
                  whileHover={{ scale: 1.02 }}
                >
                  <div
                    className="absolute inset-0 rounded-2xl opacity-0 transition-opacity group-hover:opacity-100"
                    style={{
                      boxShadow: `inset 0 0 30px -10px ${bee.color}40`,
                    }}
                  />
                  <div className="relative mb-6 flex h-14 w-14 items-center justify-center rounded-xl border border-white/10 bg-black/40 text-2xl">
                    {bee.emoji}
                  </div>
                  <div className="relative mb-2 flex items-center gap-3">
                    <h3 className="text-xl font-medium text-white">{bee.name}</h3>
                    <span
                      className="rounded-full px-2 py-0.5 text-xs font-medium text-black"
                      style={{ backgroundColor: bee.color }}
                    >
                      {bee.taskCosts && bee.taskCosts.length > 0
                        ? `$${bee.taskCosts[0].estimatedCost.toFixed(2)}+ /task`
                        : "From $0"}
                    </span>
                  </div>
                  <p className="relative mb-4 text-sm text-gray-400">{bee.shortDesc}</p>
                  <div className="relative flex flex-wrap gap-2">
                    {bee.features.slice(0, 3).map((f) => (
                      <span
                        key={f}
                        className="rounded-full border border-white/5 bg-white/[0.04] px-2.5 py-1 text-xs text-gray-400"
                      >
                        {f}
                      </span>
                    ))}
                    {bee.features.length > 3 && (
                      <span className="rounded-full border border-white/5 bg-white/[0.04] px-2.5 py-1 text-xs text-gray-500">
                        +{bee.features.length - 3} more
                      </span>
                    )}
                  </div>
                  <div className="relative mt-5 flex items-center gap-2 text-sm font-medium transition-colors" style={{ color: bee.color }}>
                    Configure & Demo <ArrowRight size={14} />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* SECTION 4: MEET THE TEAM */}
        <section className="min-h-screen w-full flex flex-col justify-center px-10 md:px-24 py-20" id="team">
          <TeamSection />
        </section>

        {/* SECTION 5: HOW IT WORKS */}
        <section className="min-h-screen w-full flex flex-col justify-center px-10 md:px-24 py-20" id="process">
          <HowItWorks />
        </section>

        {/* SECTION 6: REAL RESULTS */}
        <section className="h-screen w-full flex flex-col justify-center items-center text-center px-10 md:px-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
          >
            <h2 className="text-5xl md:text-7xl font-display mb-6">
              Real Bees. <span className="text-nectar-honey">Real Results.</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-16 font-light">
              Our clients measure ROI in hours saved and revenue gained. Here is what the hive delivers.
            </p>

            <div className="flex flex-wrap justify-center gap-8 md:gap-16">
              {[
                { label: "Hours Saved / Month", val: "200+" },
                { label: "Avg Response Time", val: "< 2 min" },
                { label: "Lead Conversion Lift", val: "+85%" },
                { label: "Customer Satisfaction", val: "4.9/5" },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-4xl md:text-6xl font-display font-medium text-white mb-2">
                    {stat.val}
                  </div>
                  <div className="text-nectar-honey font-mono tracking-widest text-sm uppercase">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* SECTION 7: CASE STUDIES */}
        <section className="min-h-screen w-full flex flex-col justify-center px-10 md:px-24 py-20" id="stories">
          <CaseStudies />
        </section>

        {/* SECTION 8: TESTIMONIALS */}
        <section className="h-[100vh] w-full flex flex-col justify-center items-end px-10 md:px-24 text-right" id="work">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="max-w-2xl"
          >
            <h2 className="text-3xl md:text-5xl font-display mb-12">Trusted by founders who value their time.</h2>

            <div className="space-y-6 text-left">
              <div className="bg-[#0a0a0a]/90 border border-white/10 p-8 rounded-2xl shadow-2xl relative z-10">
                <p className="text-lg italic text-gray-300 mb-6">
                  "We hired HoneyBee for customer support and ScoutBee for lead qualification. In 3
                  weeks, we cut our response time from 6 hours to under 2 minutes and booked 40%
                  more demos. Best investment we've made this year."
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-nectar-honey to-nectar-amber rounded-full shrink-0" />
                  <div>
                    <div className="text-white font-medium">Marcus Chen</div>
                    <div className="text-nectar-amber text-sm tracking-wide">
                      Founder, Velora Logistics
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-[#0a0a0a]/90 border border-white/10 p-8 rounded-2xl shadow-2xl relative z-10">
                <p className="text-lg italic text-gray-300 mb-6">
                  "I was skeptical about 'AI employees' but InkBee writes better blog posts than
                  my last freelancer — and it publishes them automatically. We went from 2 posts a
                  month to 3 a week without me touching WordPress."
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-nectar-honey to-nectar-amber rounded-full shrink-0" />
                  <div>
                    <div className="text-white font-medium">Aisha Patel</div>
                    <div className="text-nectar-amber text-sm tracking-wide">
                      CMO, GreenLeaf Wellness
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>

        {/* SECTION 9: FAQ */}
        <section className="min-h-screen w-full flex flex-col justify-center px-10 md:px-24 py-20" id="faq">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="text-center mb-16">
              <p className="text-nectar-honey font-mono tracking-widest text-sm uppercase mb-4">
                FAQ
              </p>
              <h2 className="text-4xl md:text-5xl font-display mb-4">
                Questions? Answered.
              </h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                Everything you need to know before hiring your first Bee.
              </p>
            </div>

            <div className="max-w-3xl mx-auto space-y-4">
              {faqs.map((faq, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
                >
                  <h3 className="text-white font-medium mb-2">{faq.q}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{faq.a}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* SECTION 10: CTA / CONTACT */}
        <section className="h-screen w-full flex flex-col justify-center items-center text-center px-10 md:px-24 bg-[#050505]/80 pointer-events-auto" id="contact">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="max-w-xl w-full"
          >
            <h2 className="text-5xl md:text-7xl font-display text-white mb-6">
              Ready to Build Your Hive?
            </h2>
            <p className="text-xl text-gray-400 font-light mb-10">
              Tell us about your business. We'll recommend the right Bees and get you started
              with a free setup consultation.
            </p>

            <ContactForm />
          </motion.div>
        </section>
      </div>
  );
}
