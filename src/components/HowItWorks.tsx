import { motion } from "framer-motion";
import { Search, Settings, Rocket } from "lucide-react";

const steps = [
  {
    num: "01",
    icon: Search,
    title: "Choose Your Bee",
    desc: "Browse 15+ specialized AI employees. Each Bee is trained for a specific job. Pick what you need, pay per task, no monthly minimums.",
  },
  {
    num: "02",
    icon: Settings,
    title: "Configure & Deploy",
    desc: "Set your budget cap, see a live demo, and connect your Google Drive. Your Bee starts immediately. We use free AI models when possible.",
  },
  {
    num: "03",
    icon: Rocket,
    title: "Pay As You Go",
    desc: "You pay what the AI costs us — plus 30%. Most tasks are free. Set daily/weekly caps in Telegram. Full cost transparency on every receipt.",
  },
];

export default function HowItWorks() {
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
          How It Works
        </p>
        <h2 className="text-4xl md:text-5xl font-display mb-4">
          Hire AI talent in minutes, not months.
        </h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Traditional agencies charge $2,500 for what we deliver for $301. Same quality, 1/10th the price, full transparency.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {steps.map((step, i) => (
          <motion.div
            key={step.num}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.15 }}
            className="relative rounded-2xl border border-white/10 bg-white/[0.03] p-8 hover:bg-white/[0.05] transition-all group"
          >
            <div className="absolute -top-4 left-8">
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-nectar-honey text-nectar-black font-bold text-sm">
                {step.num}
              </span>
            </div>
            <div className="mt-4 mb-6">
              <step.icon size={32} className="text-nectar-honey" />
            </div>
            <h3 className="text-xl font-medium text-white mb-3">{step.title}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">{step.desc}</p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6 }}
        className="text-center mt-12"
      >
        <a
          href="#bees"
          className="inline-flex items-center gap-2 px-8 py-4 bg-nectar-honey hover:bg-nectar-glow text-nectar-black font-medium transition-all rounded-full"
        >
          Browse the Hive <Rocket size={18} />
        </a>
      </motion.div>
    </div>
  );
}
