import { motion } from "framer-motion";
import { Quote, TrendingUp, Clock, Users } from "lucide-react";

const cases = [
  {
    name: "Sarah Mitchell",
    title: "Solo Real Estate Agent",
    location: "Austin, TX",
    initials: "SM",
    gradient: "from-emerald-400 to-green-600",
    quote:
      "I was spending 18 hours a week on paperwork, scheduling, and follow-ups. Now HoneyBee handles my client communication, ClockBee manages all my showings, and ScoutBee qualifies leads before they ever reach me. I closed 3 more deals last month because I was actually in front of clients instead of in front of a screen.",
    bees: ["HoneyBee", "ClockBee", "ScoutBee"],
    before: { label: "Admin hours/week", val: "18+ hrs" },
    after: { label: "Admin hours/week", val: "2 hrs" },
    metrics: [
      { icon: Clock, label: "Time Saved", val: "16 hrs/week" },
      { icon: TrendingUp, label: "More Closings", val: "+3/month" },
      { icon: Users, label: "Lead Qualification", val: "100% automated" },
    ],
    cost: "$899/mo",
    replaced: "$4,200/mo VA team",
  },
  {
    name: "Marcus Chen",
    title: "E-commerce Founder",
    location: "Dropshipping, Shopify",
    initials: "MC",
    gradient: "from-nectar-honey to-nectar-amber",
    quote:
      "We had zero marketing presence. No blog, no social, no email list. In 30 days ContentBee wrote 12 blog posts, SocialBee grew our Instagram from 200 to 12K followers, and BuzzBee automated our email campaigns. Revenue jumped 340%. I didn't hire a single person.",
    bees: ["ContentBee", "SocialBee", "BuzzBee"],
    before: { label: "Monthly revenue", val: "$12K/mo" },
    after: { label: "Monthly revenue", val: "$52K/mo" },
    metrics: [
      { icon: TrendingUp, label: "Revenue Growth", val: "+340%" },
      { icon: Users, label: "Social Following", val: "12K → 60x" },
      { icon: Clock, label: "Content Output", val: "12 posts/mo" },
    ],
    cost: "$1,047/mo",
    replaced: "$8,000/mo agency",
  },
];

export default function CaseStudies() {
  return (
    <div className="w-full">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <p className="text-nectar-honey font-mono tracking-widest text-sm uppercase mb-4">
          Case Studies
        </p>
        <h2 className="text-4xl md:text-5xl font-display mb-4">
          Real Businesses. Real Results.
        </h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          See how founders replaced hiring headaches with Hive power.
        </p>
      </motion.div>

      <div className="space-y-12">
        {cases.map((c, i) => (
          <motion.div
            key={c.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: i * 0.2 }}
            className="rounded-3xl border border-white/10 bg-white/[0.02] overflow-hidden"
          >
            <div className="grid md:grid-cols-2 gap-0">
              {/* Left: Story */}
              <div className="p-8 md:p-10">
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${c.gradient} flex items-center justify-center text-black font-bold`}>
                    {c.initials}
                  </div>
                  <div>
                    <h3 className="text-white font-medium">{c.name}</h3>
                    <p className="text-gray-400 text-sm">
                      {c.title} · {c.location}
                    </p>
                  </div>
                </div>

                <div className="mb-6">
                  <Quote size={24} className="text-nectar-honey mb-3" />
                  <p className="text-gray-300 leading-relaxed italic">“{c.quote}”</p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {c.bees.map((b) => (
                    <span
                      key={b}
                      className="rounded-full px-3 py-1 text-xs font-medium bg-nectar-honey/10 text-nectar-honey border border-nectar-honey/20"
                    >
                      {b}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right: Metrics */}
              <div className="p-8 md:p-10 border-t md:border-t-0 md:border-l border-white/10 bg-white/[0.02]">
                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div>
                    <p className="text-gray-500 text-xs uppercase tracking-wider mb-2">Before</p>
                    <p className="text-xl font-display text-gray-400">{c.before.val}</p>
                    <p className="text-gray-500 text-sm">{c.before.label}</p>
                  </div>
                  <div>
                    <p className="text-nectar-honey text-xs uppercase tracking-wider mb-2">After</p>
                    <p className="text-xl font-display text-nectar-honey">{c.after.val}</p>
                    <p className="text-gray-400 text-sm">{c.after.label}</p>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  {c.metrics.map((m, j) => (
                    <div key={j} className="flex items-center gap-3">
                      <m.icon size={18} className="text-nectar-honey shrink-0" />
                      <div>
                        <p className="text-white font-medium">{m.val}</p>
                        <p className="text-gray-500 text-xs">{m.label}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-6 border-t border-white/10 flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-white">{c.cost}</p>
                    <p className="text-gray-400 text-sm">Hive cost</p>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-400 text-sm line-through">{c.replaced}</p>
                    <p className="text-nectar-honey text-xs font-medium">REPLACED</p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
