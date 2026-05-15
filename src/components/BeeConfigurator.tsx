import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, MessageSquare, Sparkles, ChevronRight } from "lucide-react";
import type { Bee } from "../data/bees";

interface BeeConfiguratorProps {
  bee: Bee | null;
  onClose: () => void;
}

export default function BeeConfigurator({ bee, onClose }: BeeConfiguratorProps) {
  const [activeTab, setActiveTab] = useState<"overview" | "demo">("overview");
  const [selectedConfigs, setSelectedConfigs] = useState<Record<string, boolean>>({});
  const [demoMessages, setDemoMessages] = useState<{ role: "user" | "bee"; text: string }[]>([]);
  const [demoInput, setDemoInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Initialize configs from defaults
  useEffect(() => {
    if (bee) {
      const defaults: Record<string, boolean> = {};
      bee.configs.forEach((c) => (defaults[c.key] = c.defaultValue));
      setSelectedConfigs(defaults);

      // Seed demo with first example
      if (bee.examples.length > 0) {
        setDemoMessages([
          { role: "user", text: bee.examples[0].user },
          { role: "bee", text: bee.examples[0].bee },
        ]);
      }
    }
  }, [bee]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [demoMessages]);

  if (!bee) return null;

  const toggleConfig = (key: string) => {
    setSelectedConfigs((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const addOnPrice = bee.configs.reduce((sum, c) => {
    return selectedConfigs[c.key] ? sum + c.priceModifier : sum;
  }, 0);

  const totalPrice = bee.basePrice + addOnPrice;

  const handleDemoSend = async () => {
    if (!demoInput.trim()) return;
    const userMsg = demoInput.trim();
    setDemoMessages((prev) => [...prev, { role: "user", text: userMsg }]);
    setDemoInput("");
    setIsTyping(true);

    // Simulate AI response with fallback
    setTimeout(() => {
      const fallback = `As ${bee.name}, I'd be happy to help with that! In a real deployment, I'd connect to your business systems and provide a personalized response. For now, imagine me handling this 24/7 for your customers.`;
      setDemoMessages((prev) => [...prev, { role: "bee", text: fallback }]);
      setIsTyping(false);
    }, 1200);
  };

  const loadExample = (idx: number) => {
    if (bee.examples[idx]) {
      setDemoMessages([
        { role: "user", text: bee.examples[idx].user },
        { role: "bee", text: bee.examples[idx].bee },
      ]);
    }
  };

  return (
    <AnimatePresence>
      {bee && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0a] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{bee.emoji}</span>
                <div>
                  <h2 className="text-xl font-display font-medium text-white">{bee.name}</h2>
                  <p className="text-sm text-gray-400">{bee.role} Bee</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="grid h-10 w-10 place-items-center rounded-full border border-white/10 text-gray-400 transition-colors hover:bg-white/5 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-white/10 px-6">
              {(["overview", "demo"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`relative px-4 py-3 text-sm font-medium transition-colors ${
                    activeTab === tab ? "text-white" : "text-gray-500 hover:text-gray-300"
                  }`}
                >
                  {tab === "overview" ? "Configure" : "Live Demo"}
                  {activeTab === tab && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5"
                      style={{ backgroundColor: bee.color }}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Content */}
            <div className="overflow-y-auto p-6" style={{ maxHeight: "calc(90vh - 140px)" }}>
              {activeTab === "overview" ? (
                <div className="grid gap-8 md:grid-cols-[1fr_320px]">
                  {/* Left: Info + Features */}
                  <div>
                    <p className="mb-6 text-gray-300 leading-relaxed">{bee.description}</p>

                    <h3 className="mb-4 font-display text-lg text-white">What {bee.name} does:</h3>
                    <ul className="mb-8 space-y-3">
                      {bee.features.map((f) => (
                        <li key={f} className="flex items-start gap-3">
                          <div
                            className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
                            style={{ backgroundColor: `${bee.color}20` }}
                          >
                            <Check size={12} style={{ color: bee.color }} />
                          </div>
                          <span className="text-gray-300 text-sm">{f}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Config toggles */}
                    {bee.configs.length > 0 && (
                      <>
                        <h3 className="mb-4 font-display text-lg text-white">Add-ons:</h3>
                        <div className="space-y-3">
                          {bee.configs.map((config) => (
                            <label
                              key={config.key}
                              className={`flex cursor-pointer items-center gap-4 rounded-xl border p-4 transition-all ${
                                selectedConfigs[config.key]
                                  ? "border-white/20 bg-white/[0.04]"
                                  : "border-white/5 bg-white/[0.02] hover:border-white/10"
                              }`}
                            >
                              <div
                                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md border transition-all ${
                                  selectedConfigs[config.key]
                                    ? "border-transparent"
                                    : "border-white/20"
                                }`}
                                style={
                                  selectedConfigs[config.key]
                                    ? { backgroundColor: bee.color }
                                    : undefined
                                }
                              >
                                {selectedConfigs[config.key] && (
                                  <Check size={14} className="text-black" />
                                )}
                              </div>
                              <div className="flex-1" onClick={() => toggleConfig(config.key)}>
                                <p className="text-sm font-medium text-white">{config.label}</p>
                                <p className="text-xs text-gray-500">{config.description}</p>
                              </div>
                              <span
                                className="shrink-0 text-sm font-medium"
                                style={{ color: bee.color }}
                              >
                                +${config.priceModifier}/mo
                              </span>
                            </label>
                          ))}
                        </div>
                      </>
                    )}
                  </div>

                  {/* Right: Pricing card */}
                  <div className="h-fit rounded-xl border border-white/10 bg-white/[0.03] p-6">
                    <div className="mb-4">
                      <p className="text-xs uppercase tracking-widest text-gray-500">Monthly</p>
                      <div className="mt-1 flex items-baseline gap-1">
                        <span className="text-4xl font-display font-medium text-white">
                          ${totalPrice}
                        </span>
                        <span className="text-gray-500">/mo</span>
                      </div>
                    </div>

                    <div className="mb-6 space-y-2 text-sm">
                      <div className="flex justify-between text-gray-400">
                        <span>Base {bee.role}</span>
                        <span className="text-white">${bee.basePrice}</span>
                      </div>
                      {addOnPrice > 0 && (
                        <div className="flex justify-between text-gray-400">
                          <span>Add-ons</span>
                          <span style={{ color: bee.color }}>+${addOnPrice}</span>
                        </div>
                      )}
                      <div className="border-t border-white/10 pt-2 flex justify-between font-medium">
                        <span className="text-white">Total</span>
                        <span className="text-white">${totalPrice}/mo</span>
                      </div>
                    </div>

                    <button
                      className="w-full rounded-xl py-3 font-medium text-black transition-all hover:brightness-110"
                      style={{
                        backgroundColor: bee.color,
                        boxShadow: `0 0 24px ${bee.color}40`,
                      }}
                      onClick={() => {
                        const el = document.getElementById("contact");
                        el?.scrollIntoView({ behavior: "smooth" });
                        onClose();
                      }}
                    >
                      Configure & Subscribe
                    </button>
                    <p className="mt-3 text-center text-xs text-gray-500">
                      No credit card required. 14-day free trial.
                    </p>
                  </div>
                </div>
              ) : (
                /* Demo tab */
                <div className="grid gap-6 md:grid-cols-[1fr_280px]">
                  <div className="flex flex-col rounded-xl border border-white/10 bg-[#080808]">
                    <div className="flex items-center gap-2 border-b border-white/5 px-4 py-3">
                      <MessageSquare size={16} style={{ color: bee.color }} />
                      <span className="text-sm font-medium text-white">
                        Chat with {bee.name}
                      </span>
                      <span className="ml-auto flex h-2 w-2 rounded-full bg-green-500" />
                    </div>
                    <div ref={scrollRef} className="flex-1 space-y-4 p-4 overflow-y-auto" style={{ maxHeight: 380 }}>
                      {demoMessages.map((msg, i) => (
                        <div
                          key={i}
                          className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
                        >
                          <div
                            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                              msg.role === "bee"
                                ? "text-black"
                                : "bg-white/10 text-white"
                            }`}
                            style={msg.role === "bee" ? { backgroundColor: bee.color } : undefined}
                          >
                            {msg.role === "bee" ? bee.emoji : "You"}
                          </div>
                          <div
                            className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                              msg.role === "user"
                                ? "bg-white/10 text-white"
                                : "bg-white/[0.04] text-gray-200 border border-white/5"
                            }`}
                          >
                            {msg.text.split("\n").map((line, j) => (
                              <span key={j}>
                                {line}
                                {j < msg.text.split("\n").length - 1 && <br />}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                      {isTyping && (
                        <div className="flex gap-3">
                          <div
                            className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold text-black"
                            style={{ backgroundColor: bee.color }}
                          >
                            {bee.emoji}
                          </div>
                          <div className="flex items-center gap-1 rounded-2xl border border-white/5 bg-white/[0.04] px-4 py-2.5">
                            <span className="h-2 w-2 animate-bounce rounded-full bg-gray-500" style={{ animationDelay: "0ms" }} />
                            <span className="h-2 w-2 animate-bounce rounded-full bg-gray-500" style={{ animationDelay: "150ms" }} />
                            <span className="h-2 w-2 animate-bounce rounded-full bg-gray-500" style={{ animationDelay: "300ms" }} />
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="flex gap-2 border-t border-white/5 p-3">
                      <input
                        type="text"
                        placeholder={`Message ${bee.name}...`}
                        className="flex-1 rounded-lg bg-white/5 px-4 py-2.5 text-sm text-white placeholder-gray-500 outline-none focus:ring-1 focus:ring-white/20"
                        value={demoInput}
                        onChange={(e) => setDemoInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleDemoSend()}
                      />
                      <button
                        onClick={handleDemoSend}
                        className="grid h-10 w-10 place-items-center rounded-lg text-white transition-colors hover:bg-white/10"
                        style={{ backgroundColor: `${bee.color}30` }}
                      >
                        <ChevronRight size={18} style={{ color: bee.color }} />
                      </button>
                    </div>
                  </div>

                  {/* Example prompts */}
                  <div>
                    <h3 className="mb-4 font-display text-sm uppercase tracking-wider text-gray-500">
                      Try an example:
                    </h3>
                    <div className="space-y-3">
                      {bee.examples.map((ex, i) => (
                        <button
                          key={i}
                          onClick={() => loadExample(i)}
                          className="w-full rounded-lg border border-white/5 bg-white/[0.02] p-3 text-left text-sm text-gray-300 transition-all hover:border-white/10 hover:bg-white/[0.04]"
                        >
                          <Sparkles size={14} className="mb-2" style={{ color: bee.color }} />
                          {ex.user}
                        </button>
                      ))}
                    </div>
                    <p className="mt-4 text-xs text-gray-500 leading-relaxed">
                      This is a simulated demo. In production, {bee.name} would be connected to your actual systems and knowledge base.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
