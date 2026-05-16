import { motion } from "framer-motion";
import { Code, Palette, PenTool, ShieldCheck, Briefcase, BrainCircuit } from "lucide-react";

const teamBees = [
  {
    name: "DevBee",
    role: "Senior Full-Stack Developer",
    icon: Code,
    emoji: "👨‍💻",
    bio: "Ships production code while you sleep.",
    price: "$499/mo",
    dept: "Engineering",
    skills: ["React", "Three.js", "APIs", "TypeScript"],
  },
  {
    name: "DesignBee",
    role: "UI/UX Designer",
    icon: Palette,
    emoji: "🎨",
    bio: "Turns ideas into pixel-perfect interfaces.",
    price: "$449/mo",
    dept: "Creative",
    skills: ["Figma", "Design Systems", "Prototyping"],
  },
  {
    name: "ContentBee",
    role: "Copywriter & Strategist",
    icon: PenTool,
    emoji: "✍️",
    bio: "Writes copy that converts browsers to buyers.",
    price: "$349/mo",
    dept: "Creative",
    skills: ["SEO", "Blogs", "Email", "Conversion"],
  },
  {
    name: "QABee",
    role: "QA Automation Engineer",
    icon: ShieldCheck,
    emoji: "🧪",
    bio: "Catches bugs before your customers do.",
    price: "$349/mo",
    dept: "Engineering",
    skills: ["Playwright", "Lighthouse", "Security"],
  },
  {
    name: "AdminBee",
    role: "Executive Assistant",
    icon: Briefcase,
    emoji: "📋",
    bio: "Runs your ops so you can run your business.",
    price: "$399/mo",
    dept: "Operations",
    skills: ["Notion", "Airtable", "CRM", "Calendar"],
  },
  {
    name: "MLBee",
    role: "ML/AI Engineer",
    icon: BrainCircuit,
    emoji: "🧠",
    bio: "Builds AI that thinks faster than competitors.",
    price: "$799/mo",
    dept: "Engineering",
    skills: ["Fine-tuning", "RAG", "vLLM", "Benchmarks"],
  },
];

export default function TeamSection() {
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
          The Team
        </p>
        <h2 className="text-4xl md:text-5xl font-display mb-4">
          Meet Your AI Workforce.
        </h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          Specialized talent. Available 24/7. Hired by the month. No burnout, no benefits, no backfill.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {teamBees.map((bee, i) => (
          <motion.div
            key={bee.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="group rounded-2xl border border-white/10 bg-white/[0.03] p-6 hover:bg-white/[0.05] transition-all hover:border-white/20"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-white/10 bg-black/40 text-2xl">
                {bee.emoji}
              </div>
              <span className="text-xs font-mono text-gray-500 uppercase tracking-wider">
                {bee.dept}
              </span>
            </div>
            <h3 className="text-lg font-medium text-white mb-1">{bee.name}</h3>
            <p className="text-nectar-honey text-sm mb-2">{bee.role}</p>
            <p className="text-gray-400 text-sm mb-4">{bee.bio}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {bee.skills.map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-white/5 bg-white/[0.04] px-2 py-0.5 text-xs text-gray-400"
                >
                  {s}
                </span>
              ))}
            </div>
            <div className="flex items-center justify-between pt-4 border-t border-white/5">
              <span className="text-nectar-honey font-bold">{bee.price}</span>
              <span className="text-xs text-gray-500">monthly retainer</span>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        className="text-center mt-10"
      >
        <p className="text-gray-500 text-sm">
          + 9 more Bees including VideoBee, AudioBee, SecurityBee, SocialBee, ResearchBee, and more.
        </p>
      </motion.div>
    </div>
  );
}
