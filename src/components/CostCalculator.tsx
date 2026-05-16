import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calculator, Info, ArrowRight, Sparkles, Zap, Palette, Code, FileText, Video, Music, BarChart3, Globe, Shield, Apple, Check } from "lucide-react";

interface TaskPreset {
  bee: string;
  task: string;
  model: string;
  modelCost: number;
  tokens: number;
  frequency: string;
}

const PRESETS: TaskPreset[] = [
  { bee: "DesignBee", task: "Website mockup (desktop + mobile)", model: "Claude Sonnet 4.6", modelCost: 0.20, tokens: 7000, frequency: "one-time" },
  { bee: "DevBee", task: "Build homepage component", model: "DeepSeek V4 Flash (free)", modelCost: 0.00, tokens: 5000, frequency: "one-time" },
  { bee: "ContentBee", task: "Write 1000-word blog post", model: "Claude Sonnet 4.6", modelCost: 0.18, tokens: 6000, frequency: "weekly" },
  { bee: "ContentBee", task: "Write 3 Instagram captions", model: "Llama 3.3 70B (free)", modelCost: 0.00, tokens: 1500, frequency: "weekly" },
  { bee: "InfographicBee", task: "Generate brand moodboard (5 images)", model: "Gemini Flash Image", modelCost: 0.01, tokens: 0, frequency: "one-time" },
  { bee: "VideoBee", task: "Create 5-sec promo video", model: "ComfyUI (local)", modelCost: 0.00, tokens: 0, frequency: "monthly" },
  { bee: "AudioBee", task: "Generate background music (2 min)", model: "AudioCraft (local)", modelCost: 0.00, tokens: 0, frequency: "monthly" },
  { bee: "SocialBee", task: "Write 10 social posts per month", model: "Llama 3.3 70B (free)", modelCost: 0.00, tokens: 3000, frequency: "monthly" },
  { bee: "ResearchBee", task: "Competitor analysis (5 competitors)", model: "Llama 3.3 70B (free)", modelCost: 0.00, tokens: 4000, frequency: "monthly" },
  { bee: "DevBee", task: "Debug code + fix bug", model: "Claude Sonnet 4.6", modelCost: 0.25, tokens: 8000, frequency: "weekly" },
  { bee: "SecurityBee", task: "Security vulnerability scan", model: "Claude Opus 4", modelCost: 1.50, tokens: 15000, frequency: "monthly" },
  { bee: "QABee", task: "Lighthouse performance audit", model: "Claude Sonnet 4.6", modelCost: 0.15, tokens: 5000, frequency: "monthly" },
  { bee: "AdminBee", task: "Notion workspace setup", model: "Llama 3.3 70B (free)", modelCost: 0.00, tokens: 2000, frequency: "one-time" },
  { bee: "EmailBee", task: "Write email sequence (5 emails)", model: "Gemini 2.5 Flash", modelCost: 0.05, tokens: 3000, frequency: "monthly" },
];

const FREQUENCY_MULTIPLIERS: Record<string, number> = {
  "one-time": 1,
  "weekly": 4.33,
  "monthly": 1,
};

const BEE_ICONS: Record<string, React.ReactNode> = {
  DesignBee: <Palette size={16} />,
  DevBee: <Code size={16} />,
  ContentBee: <FileText size={16} />,
  InfographicBee: <Sparkles size={16} />,
  VideoBee: <Video size={16} />,
  AudioBee: <Music size={16} />,
  SocialBee: <Globe size={16} />,
  ResearchBee: <BarChart3 size={16} />,
  SecurityBee: <Shield size={16} />,
  QABee: <Zap size={16} />,
  AdminBee: <Apple size={16} />,
  EmailBee: <FileText size={16} />,
};

export default function CostCalculator() {
  const [selectedTasks, setSelectedTasks] = useState<Set<number>>(new Set());
  const [showDetails, setShowDetails] = useState(false);

  const toggleTask = (index: number) => {
    setSelectedTasks((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  const selectedPresets = useMemo(
    () => Array.from(selectedTasks).map((i) => PRESETS[i]),
    [selectedTasks]
  );

  const totals = useMemo(() => {
    let modelCost = 0;
    let serviceFee = 0;
    selectedPresets.forEach((p) => {
      const mult = FREQUENCY_MULTIPLIERS[p.frequency] || 1;
      const cost = p.modelCost * mult;
      modelCost += cost;
      serviceFee += cost * 0.30;
    });
    return {
      modelCost,
      serviceFee,
      total: modelCost + serviceFee,
      setup: selectedTasks.size > 0 ? 299 : 0,
      grandTotal: modelCost + serviceFee + (selectedTasks.size > 0 ? 299 : 0),
    };
  }, [selectedPresets, selectedTasks]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="rounded-2xl border border-white/10 bg-[#0a0a0a]/90 overflow-hidden"
    >
      {/* Header */}
      <div className="border-b border-white/10 p-6 md:p-8">
        <div className="flex items-center gap-3 mb-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-nectar-honey/10 text-nectar-honey">
            <Calculator size={20} />
          </div>
          <div>
            <h3 className="text-xl font-display font-medium text-white">Cost Calculator</h3>
            <p className="text-sm text-gray-400">Select tasks to see your real price</p>
          </div>
        </div>
        <p className="text-sm text-gray-500">
          We pass through AI model costs at zero markup. You only pay a 30% service fee for orchestration and quality review.
        </p>
      </div>

      <div className="grid lg:grid-cols-[1fr_380px]">
        {/* Task List */}
        <div className="p-6 md:p-8 border-b lg:border-b-0 lg:border-r border-white/10 max-h-[600px] overflow-y-auto">
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm font-medium text-gray-400 uppercase tracking-wider">Common Tasks</p>
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="flex items-center gap-1.5 text-xs text-nectar-honey hover:text-nectar-glow transition-colors"
            >
              <Info size={14} />
              {showDetails ? "Hide model info" : "Show model info"}
            </button>
          </div>

          <div className="space-y-2">
            {PRESETS.map((preset, i) => {
              const isSelected = selectedTasks.has(i);
              const mult = FREQUENCY_MULTIPLIERS[preset.frequency] || 1;
              const monthlyCost = preset.modelCost * mult;
              const totalWithFee = monthlyCost * 1.30;

              return (
                <button
                  key={i}
                  onClick={() => toggleTask(i)}
                  className={`w-full text-left rounded-xl border p-3 transition-all ${
                    isSelected
                      ? "border-nectar-honey/40 bg-nectar-honey/5"
                      : "border-white/5 bg-white/[0.02] hover:border-white/10 hover:bg-white/[0.04]"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-all ${
                        isSelected ? "border-nectar-honey bg-nectar-honey" : "border-white/20"
                      }`}
                    >
                      {isSelected && <Check size={12} className="text-black" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-nectar-honey">{BEE_ICONS[preset.bee] || <Zap size={16} />}</span>
                        <span className="text-sm font-medium text-white">{preset.task}</span>
                      </div>
                      <AnimatePresence>
                        {showDetails && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <p className="text-xs text-gray-500 mt-1">
                              Model: {preset.model} · {preset.tokens > 0 ? `${preset.tokens.toLocaleString()} tokens` : "variable"} · {preset.frequency}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                      <div className="flex items-center gap-2 mt-1.5">
                        <span className="text-xs text-gray-400">
                          AI cost: ${monthlyCost.toFixed(2)}/mo
                        </span>
                        <span className="text-xs text-nectar-honey/70">
                          +30% = ${totalWithFee.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Summary */}
        <div className="p-6 md:p-8 bg-white/[0.02]">
          <p className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-4">Your Estimate</p>

          {selectedTasks.size === 0 ? (
            <div className="text-center py-12">
              <Calculator size={32} className="mx-auto text-gray-600 mb-3" />
              <p className="text-gray-500 text-sm">Select tasks to see pricing</p>
              <p className="text-gray-600 text-xs mt-1">Most tasks use free AI models</p>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Setup */}
              <div className="flex items-center justify-between py-2 border-b border-white/5">
                <div className="flex items-center gap-2">
                  <Sparkles size={14} className="text-nectar-honey" />
                  <span className="text-sm text-gray-300">One-time setup</span>
                </div>
                <span className="text-sm font-medium text-white">${totals.setup}</span>
              </div>

              {/* Model costs */}
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">AI model costs (monthly)</span>
                  <span className="text-gray-300">${totals.modelCost.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Service fee (30%)</span>
                  <span className="text-gray-300">${totals.serviceFee.toFixed(2)}</span>
                </div>
              </div>

              {/* Total */}
              <div className="rounded-xl border border-nectar-honey/20 bg-nectar-honey/5 p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-400">Monthly total</span>
                  <span className="text-2xl font-display font-medium text-nectar-honey">
                    ${totals.total.toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-white/5">
                  <span className="text-sm text-gray-300">First month (with setup)</span>
                  <span className="text-xl font-display text-white">${totals.grandTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Comparison */}
              <div className="rounded-lg border border-white/5 bg-white/[0.02] p-3">
                <p className="text-xs text-gray-500 mb-2">vs. Traditional Agency</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Agency estimate</span>
                  <span className="text-sm text-gray-500 line-through">~$2,500/mo</span>
                </div>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-sm text-gray-400">Your savings</span>
                  <span className="text-sm font-medium text-green-400">
                    {totals.total > 0 ? `${Math.round((1 - totals.total / 2500) * 100)}%` : "--"}
                  </span>
                </div>
              </div>

              {/* Breakdown */}
              <div className="space-y-1.5 pt-2">
                {selectedPresets.slice(0, 5).map((p, i) => (
                  <div key={i} className="flex items-center justify-between text-xs">
                    <span className="text-gray-500 truncate max-w-[200px]">{p.task}</span>
                    <span className="text-gray-400">
                      ${(p.modelCost * FREQUENCY_MULTIPLIERS[p.frequency] * 1.30).toFixed(2)}
                    </span>
                  </div>
                ))}
                {selectedPresets.length > 5 && (
                  <p className="text-xs text-gray-600">+{selectedPresets.length - 5} more tasks</p>
                )}
              </div>

              <a
                href="#contact"
                className="flex items-center justify-center gap-2 w-full rounded-xl bg-nectar-honey py-3 text-sm font-medium text-nectar-black hover:bg-nectar-glow transition-colors"
              >
                Start with this plan <ArrowRight size={16} />
              </a>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
