import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, Sparkles, ChevronRight } from "lucide-react";
import type { Bee } from "../data/bees";
import CMADemo from "./CMADemo";

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
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isCMA = bee?.variant === "cma";

  // Clear pending timeouts when bee changes or on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [bee]);

  // Initialize configs from defaults
  useEffect(() => {
    if (bee) {
      const defaults: Record<string, boolean> = {};
      bee.configs.forEach((c) => (defaults[c.key] = c.defaultValue));
      setSelectedConfigs(defaults);
      if (!isCMA && bee.examples.length > 0) {
        setDemoMessages([
          { role: "user", text: bee.examples[0].user },
          { role: "bee", text: bee.examples[0].bee },
        ]);
      }
    }
  }, [bee, isCMA]);

  // Reset tab on open
  useEffect(() => {
    if (bee) setActiveTab("overview");
  }, [bee?.id]);

  // Scroll chat
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [demoMessages, isTyping]);

  const toggleConfig = useCallback((key: string) => {
    setSelectedConfigs((prev) => ({ ...prev, [key]: !prev[key] }));
  }, []);

  const addOnPrice = bee?.configs.reduce(
    (sum, c) => (selectedConfigs[c.key] ? sum + c.priceModifier : sum),
    0
  ) ?? 0;

  const totalPrice = (bee?.basePrice ?? 0) + addOnPrice;

  const handleDemoSend = useCallback(() => {
    if (!bee || !demoInput.trim()) return;
    const userMsg = demoInput.trim();
    setDemoMessages((prev) => [...prev, { role: "user", text: userMsg }]);
    setDemoInput("");
    setIsTyping(true);

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      const fallback = `As ${bee.name}, I'd be happy to help with that! In a real deployment, I'd connect to your business systems and provide a personalized response. For now, imagine me handling this 24/7 for your customers.`;
      setDemoMessages((prev) => [...prev, { role: "bee", text: fallback }]);
      setIsTyping(false);
    }, 1200);
  }, [bee, demoInput]);

  const loadExample = useCallback((idx: number) => {
    if (bee?.examples[idx]) {
      setDemoMessages([
        { role: "user", text: bee.examples[idx].user },
        { role: "bee", text: bee.examples[idx].bee },
      ]);
    }
  }, [bee]);

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
                  {tab === "overview" ? "Configure" : isCMA ? "Try It Now" : "Live Demo"}
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
                              onClick={() => toggleConfig(config.key)}
                              className={`flex cursor-pointer items-center gap-4 rounded-xl border p-4 transition-all ${
                                selectedConfigs[config.key]
                                  ? "border-white/20 bg-white/[0.04]"
                                  : "border-white/5 bg-white/[0.02] hover:border-white/10"
                              }`}
                            >
                              <div
                                className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md border transition-all ${
                                  selectedConfigs[config.key] ? "border-transparent" : "border-white/20"
                                }`}
                                style={selectedConfigs[config.key] ? { backgroundColor: bee.color } : undefined}
                              >
                                {selectedConfigs[config.key] && <Check size={14} className="text-black" />}
                              </div>
                              <div className="flex-1">
                                <p className="text-sm font-medium text-white">{config.label}</p>
                                <p className="text-xs text-gray-500">{config.description}</p>
                              </div>
                              <span className="shrink-0 text-sm font-medium" style={{ color: bee.color }}>
                                +${config.priceModifier}/mo
                              </span>
                            </label>
                          ))}
                        </div>
                      </>
                    )}
                  </div>

                  {/* Right: Pricing Card */}
                  <div className="h-fit rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                    <div className="mb-6 text-center">
                      <div className="text-4xl font-display font-medium text-white">
                        ${totalPrice}
                        <span className="text-base font-normal text-gray-500">/mo</span>
                      </div>
                      {addOnPrice > 0 && (
                        <p className="mt-1 text-sm text-gray-500">
                          Base ${bee.basePrice} + ${addOnPrice} add-ons
                        </p>
                      )}
                    </div>

                    <button
                      onClick={() => alert(`Trial signup for ${bee.name} — coming to production soon!`)}
                      className="mb-4 w-full rounded-xl py-3 font-medium text-black transition-all hover:brightness-110"
                      style={{ backgroundColor: bee.color }}
                    >
                      Start 14-Day Free Trial
                    </button>
                    <p className="text-center text-xs text-gray-500">
                      No credit card required. Cancel anytime.
                    </p>

                    <div className="mt-6 space-y-2 border-t border-white/10 pt-6">
                      <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">What's included</p>
                      {bee.features.slice(0, 4).map((f) => (
                        <div key={f} className="flex items-center gap-2 text-sm text-gray-400">
                          <Check size={14} style={{ color: bee.color }} />
                          {f}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : isCMA ? (
                <CMADemo beeColor={bee.color} />
              ) : (
                <div className="grid gap-8 md:grid-cols-[1fr_280px]">
                  {/* Chat */}
                  <div className="flex flex-col h-[500px] rounded-2xl border border-white/10 bg-black/40 overflow-hidden">
                    <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
                      {demoMessages.map((msg, i) => (
                        <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                          <div
                            className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                              msg.role === "user"
                                ? "bg-white/10 text-white"
                                : "border border-white/10 bg-white/[0.03] text-gray-300"
                            }`}
                          >
                            {msg.text.split("\n").map((line, j) => (
                              <span key={j}>
                                {line}
                                <br />
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                      {isTyping && (
                        <div className="flex justify-start">
                          <div className="flex items-center gap-1 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
                            <div className="h-2 w-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: "0ms" }} />
                            <div className="h-2 w-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: "150ms" }} />
                            <div className="h-2 w-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: "300ms" }} />
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="border-t border-white/10 p-4">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={demoInput}
                          onChange={(e) => setDemoInput(e.target.value)}
                          onKeyDown={(e) => e.key === "Enter" && handleDemoSend()}
                          placeholder={`Message ${bee.name}...`}
                          className="flex-1 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm text-white placeholder-gray-500 outline-none focus:border-white/20"
                        />
                        <button
                          onClick={handleDemoSend}
                          className="rounded-xl border border-white/10 bg-white/[0.05] px-4 py-2.5 text-white transition-colors hover:bg-white/10"
                        >
                          <ChevronRight size={18} />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Example prompts */}
                  <div>
                    <p className="mb-3 text-sm font-medium text-gray-400">Try an example:</p>
                    <div className="space-y-2">
                      {bee.examples.map((ex, i) => (
                        <button
                          key={i}
                          onClick={() => loadExample(i)}
                          className="w-full rounded-xl border border-white/5 bg-white/[0.02] p-3 text-left text-sm text-gray-400 transition-colors hover:border-white/10 hover:bg-white/[0.04]"
                        >
                          &ldquo;{ex.user}&rdquo;
                        </button>
                      ))}
                    </div>
                    <div className="mt-6 rounded-xl border border-white/5 bg-white/[0.02] p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Sparkles size={14} style={{ color: bee.color }} />
                        <p className="text-xs font-medium text-gray-400">Demo Mode</p>
                      </div>
                      <p className="text-xs text-gray-500 leading-relaxed">
                        This is a simulated preview. A real {bee.name} would connect to your systems and provide personalized, context-aware responses based on your actual business data.
                      </p>
                    </div>
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
