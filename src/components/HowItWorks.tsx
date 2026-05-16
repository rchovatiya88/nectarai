import { motion } from "framer-motion";
import { Search, Settings, Rocket } from "lucide-react";

const steps = [
  {
    num: "01",
    icon: Search,
    title: "Choose Your Bee",
    desc: "Browse 15+ specialized AI employees. Each Bee is trained for a specific job — from engineering to content to research.",
  },
  {
    num: "02",
    icon: Settings,
    title: "Configure & Deploy",
    desc: "Set addons, see a live demo, and customize workflows. Your Bee connects to your existing tools in under an hour.",
  },
  {
    num: "03",
    icon: Rocket,
    title: "Scale Without Hiring",
    desc: "Add more Bees anytime. Upgrade from a single worker to a full Hive. No interviews. No salaries. No turnover.",
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
          Traditional hiring takes 6 weeks and costs $15K per role. Our Bees start the same day.
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
