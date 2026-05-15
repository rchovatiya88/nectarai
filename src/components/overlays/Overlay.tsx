import { motion } from "framer-motion";
import { Scroll } from "@react-three/drei";
import { ArrowRight, Bot, Zap, TrendingUp, Users, Clock, Hash } from "lucide-react";
import { bees } from "../../data/bees";
import ContactForm from "../ContactForm";
import type { Bee } from "../../data/bees";

interface OverlayProps {
  onSelectBee: (bee: Bee) => void;
}

export default function Overlay({ onSelectBee }: OverlayProps) {
  return (
    <Scroll html style={{ width: "100%", height: "100%" }}>
        {/* We have 7 pages of height */}

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
              Hire AI Employees That <br />
              <span className="text-nectar-honey">Never Clock Out.</span>
            </h1>
            <p className="text-gray-400 text-lg md:text-xl mb-10 max-w-xl font-light leading-relaxed">
              Nectar.ai provides AI Bees — dedicated workers for customer support, lead
              generation, content, scheduling, and more. Starting at $199/month.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#bees"
                className="px-8 py-4 bg-nectar-honey hover:bg-nectar-glow text-nectar-black font-medium transition-all rounded-full drop-shadow-[0_0_15px_rgba(245,183,0,0.4)] text-center flex items-center justify-center gap-2"
              >
                Meet the Bees <ArrowRight size={18} />
              </a>
              <a
                href="#contact"
                className="px-8 py-4 border border-white/20 hover:bg-white/5 text-white font-medium transition-all rounded-full backdrop-blur-sm text-center"
              >
                Book Free Demo
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
              <span className="text-white font-medium">drowning in busywork.</span>
            </h2>
            <div className="grid gap-6 text-left">
              {[
                { icon: Clock, text: "40+ hours/week on repetitive tasks" },
                { icon: Users, text: "Can't afford to hire full-time staff" },
                { icon: Hash, text: "Leads slip through the cracks" },
                { icon: Zap, text: "Competitors are already using AI" },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  <item.icon size={24} className="text-nectar-honey shrink-0" />
                  <span className="text-gray-300 text-lg">{item.text}</span>
                </div>
              ))}
            </div>
            <p className="mt-8 text-nectar-honey font-medium">
              AI Bees do the work so you can focus on growth.
            </p>
          </motion.div>
        </section>

        {/* SECTION 3: BEE MARKETPLACE */}
        <section className="min-h-screen w-full flex flex-col justify-center px-10 md:px-24 py-20" id="bees">
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
              and start your 14-day free trial.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {bees.map((bee, i) => (
                <motion.div
                  key={bee.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  onClick={() => onSelectBee(bee)}
                  className="group relative cursor-pointer rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-all hover:border-white/20 hover:bg-white/[0.05]"
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
                      ${bee.basePrice}/mo
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

        {/* SECTION 4: HOW IT WORKS */}
        <section className="h-screen w-full flex flex-col justify-center px-10 md:px-24" id="process">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            <p className="text-nectar-honey font-mono tracking-widest text-sm mb-4 uppercase">
              Onboarding
            </p>
            <h2 className="text-4xl md:text-6xl font-display mb-16">From signup to swarm in 48 hours.</h2>

            <div className="space-y-12 border-l border-white/10 pl-8 md:pl-16 relative">
              <div className="absolute left-[-1px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-nectar-honey/0 via-nectar-honey to-nectar-honey/0" />

              {[
                {
                  step: "01",
                  title: "Pick Your Bees",
                  desc: "Browse the hive and select the Bees your business needs most. Start with one or adopt a full swarm.",
                },
                {
                  step: "02",
                  title: "Configure & Train",
                  desc: "We connect your Bees to your systems — docs, CRM, calendar, website. They learn your business in hours, not weeks.",
                },
                {
                  step: "03",
                  title: "Go Live",
                  desc: "Your Bees start working 24/7. You monitor, tweak, and scale. We optimize and add new capabilities monthly.",
                },
              ].map((item, i) => (
                <div key={i} className="relative">
                  <div className="absolute -left-[54px] md:-left-[86px] top-1 text-nectar-honey font-mono text-sm">
                    {item.step}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-medium mb-3">{item.title}</h3>
                  <p className="text-gray-400 text-lg max-w-xl font-light">{item.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* SECTION 5: REAL RESULTS */}
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

        {/* SECTION 6: TESTIMONIAL */}
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

        {/* SECTION 7: CTA / CONTACT */}
        <section className="h-screen w-full flex flex-col justify-center items-center text-center px-10 md:px-24 bg-[#050505]/80" id="contact">
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
              with a free 14-day trial.
            </p>

            <ContactForm />
          </motion.div>
        </section>
      </Scroll>
  );
}
