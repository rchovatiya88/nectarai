import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Home, TrendingUp, DollarSign, BarChart3, FileText, MapPin, Search, Loader2, Bed, Bath, Square, Calendar, ArrowUpRight } from "lucide-react";

interface Comp {
  address: string;
  price: number;
  sqft: number;
  beds: number;
  baths: number;
  dom: number;
  soldDate: string;
  distance: string;
  similarity: number;
}

interface CMAReport {
  subjectAddress: string;
  subjectBeds: number;
  subjectBaths: number;
  subjectSqft: number;
  subjectLot: number;
  lowValue: number;
  highValue: number;
  suggestedPrice: number;
  pricePerSqft: number;
  avgDom: number;
  marketTrend: number;
  comps: Comp[];
  confidence: "High" | "Medium" | "Low";
}

function generateMockCMA(
  address: string,
  beds: number,
  baths: number,
  sqft: number
): CMAReport {
  const basePrice = sqft * (230 + Math.random() * 120);
  const suggestedPrice = Math.round(basePrice / 1000) * 1000;
  const lowValue = Math.round((basePrice * 0.94) / 1000) * 1000;
  const highValue = Math.round((basePrice * 1.06) / 1000) * 1000;
  const pricePerSqft = Math.round(basePrice / sqft);

  const streetNames = ["Maple", "Oak", "Pine", "Cedar", "Elm", "Birch", "Willow", "Aspen"];
  const streetNums = [748, 752, 738, 745, 760, 725, 770, 735];

  const comps: Comp[] = Array.from({ length: 5 }, (_, i) => {
    const compSqft = sqft + Math.floor((Math.random() - 0.5) * 400);
    const compPrice = basePrice * (0.92 + Math.random() * 0.16);
    return {
      address: `${streetNums[i]} ${streetNames[i]} St`,
      price: Math.round(compPrice / 1000) * 1000,
      sqft: compSqft,
      beds: beds + Math.floor((Math.random() - 0.5) * 2),
      baths: baths + Math.floor((Math.random() - 0.5) * 2),
      dom: Math.floor(5 + Math.random() * 25),
      soldDate: new Date(Date.now() - (i + 1) * 18 * 86400000).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
      }),
      distance: `${(0.1 + Math.random() * 0.8).toFixed(1)} mi`,
      similarity: Math.max(60, Math.min(98, Math.round(95 - i * 6 + Math.random() * 8))),
    };
  });

  return {
    subjectAddress: address,
    subjectBeds: beds,
    subjectBaths: baths,
    subjectSqft: sqft,
    subjectLot: Math.round(5000 + Math.random() * 15000),
    lowValue,
    highValue,
    suggestedPrice,
    pricePerSqft,
    avgDom: Math.round(comps.reduce((s, c) => s + c.dom, 0) / comps.length),
    marketTrend: parseFloat((Math.random() * 6 - 1).toFixed(1)),
    comps,
    confidence: basePrice > 400000 ? "High" : "Medium",
  };
}

function formatCurrency(n: number) {
  return `$${n.toLocaleString()}`;
}

export default function CMADemo({ beeColor }: { beeColor: string }) {
  const [address, setAddress] = useState("");
  const [beds, setBeds] = useState(3);
  const [baths, setBaths] = useState(2);
  const [sqft, setSqft] = useState(1800);
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<CMAReport | null>(null);

  const handleGenerate = () => {
    if (!address.trim()) return;
    setLoading(true);
    setReport(null);
    setTimeout(() => {
      setReport(generateMockCMA(address.trim(), beds, baths, sqft));
      setLoading(false);
    }, 1800);
  };

  return (
    <div className="space-y-6">
      {!report ? (
        <div className="max-w-xl mx-auto">
          <div className="text-center mb-8">
            <div
              className="inline-flex items-center justify-center w-12 h-12 rounded-2xl mb-4"
              style={{ backgroundColor: `${beeColor}15`, border: `1px solid ${beeColor}30` }}
            >
              <Home size={24} style={{ color: beeColor }} />
            </div>
            <h3 className="text-xl font-display text-white mb-2">Generate a CMA Report</h3>
            <p className="text-gray-400 text-sm">
              Enter any property address and basic specs. MarketBee will instantly analyze comparable sales and suggest an optimal list price.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">
                <MapPin size={14} className="inline mr-1" /> Property Address
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="742 Evergreen Terrace, Austin, TX 78723"
                className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white placeholder-gray-600 outline-none focus:border-white/20"
              />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  <Bed size={14} className="inline mr-1" /> Beds
                </label>
                <select
                  value={beds}
                  onChange={(e) => setBeds(Number(e.target.value))}
                  className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none focus:border-white/20"
                >
                  {[1, 2, 3, 4, 5, 6].map((n) => (
                    <option key={n} value={n} className="bg-[#0a0a0a]">
                      {n}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  <Bath size={14} className="inline mr-1" /> Baths
                </label>
                <select
                  value={baths}
                  onChange={(e) => setBaths(Number(e.target.value))}
                  className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none focus:border-white/20"
                >
                  {[1, 1.5, 2, 2.5, 3, 3.5, 4].map((n) => (
                    <option key={n} value={n} className="bg-[#0a0a0a]">
                      {n}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  <Square size={14} className="inline mr-1" /> Sq Ft
                </label>
                <input
                  type="number"
                  value={sqft}
                  onChange={(e) => setSqft(Number(e.target.value))}
                  className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none focus:border-white/20"
                  step={50}
                />
              </div>
            </div>

            <button
              onClick={handleGenerate}
              disabled={!address.trim() || loading}
              className="w-full rounded-xl py-3.5 font-medium text-black transition-all hover:brightness-110 disabled:opacity-40 flex items-center justify-center gap-2"
              style={{ backgroundColor: beeColor }}
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" /> Analyzing market data...
                </>
              ) : (
                <>
                  <Search size={18} /> Generate CMA Report
                </>
              )}
            </button>
          </div>

          <div className="mt-8 rounded-xl border border-white/5 bg-white/[0.02] p-4">
            <p className="text-xs text-gray-500 leading-relaxed">
              <span className="text-nectar-honey">Note:</span> This demo generates realistic mock data based on your inputs. In production, MarketBee connects to MLS databases via RESO Web API, public records, and proprietary valuation models to provide actual comparable sales and real-time pricing recommendations.
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-6 animate-in fade-in duration-500">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <FileText size={16} style={{ color: beeColor }} />
                <span className="text-sm text-gray-400">CMA Report</span>
              </div>
              <h3 className="text-2xl font-display text-white">{report.subjectAddress}</h3>
              <div className="flex items-center gap-4 mt-2 text-sm text-gray-400">
                <span>{report.subjectBeds} bed</span>
                <span>{report.subjectBaths} bath</span>
                <span>{report.subjectSqft.toLocaleString()} sqft</span>
                <span>{(report.subjectLot / 43560).toFixed(2)} acre lot</span>
              </div>
            </div>
            <div
              className="px-3 py-1.5 rounded-full text-xs font-medium text-black"
              style={{ backgroundColor: beeColor }}
            >
              {report.confidence} Confidence
            </div>
          </div>

          {/* Value Range */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 text-center">
              <p className="text-sm text-gray-400 mb-1">Low Estimate</p>
              <p className="text-2xl font-display text-white">{formatCurrency(report.lowValue)}</p>
            </div>
            <div
              className="rounded-2xl border p-5 text-center"
              style={{ borderColor: `${beeColor}40`, backgroundColor: `${beeColor}08` }}
            >
              <p className="text-sm mb-1" style={{ color: beeColor }}>Suggested List Price</p>
              <p className="text-3xl font-display text-white">{formatCurrency(report.suggestedPrice)}</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 text-center">
              <p className="text-sm text-gray-400 mb-1">High Estimate</p>
              <p className="text-2xl font-display text-white">{formatCurrency(report.highValue)}</p>
            </div>
          </div>

          {/* Market Stats */}
          <div className="grid grid-cols-3 gap-4">
            <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
              <div className="flex items-center gap-2 text-gray-400 text-xs mb-1">
                <DollarSign size={12} /> Price / Sq Ft
              </div>
              <p className="text-xl font-display text-white">${report.pricePerSqft}</p>
            </div>
            <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
              <div className="flex items-center gap-2 text-gray-400 text-xs mb-1">
                <Calendar size={12} /> Avg Days on Mkt
              </div>
              <p className="text-xl font-display text-white">{report.avgDom}</p>
            </div>
            <div className="rounded-xl border border-white/5 bg-white/[0.02] p-4">
              <div className="flex items-center gap-2 text-gray-400 text-xs mb-1">
                <TrendingUp size={12} /> 90-Day Trend
              </div>
              <p className={`text-xl font-display ${report.marketTrend >= 0 ? "text-green-400" : "text-red-400"}`}>
                {report.marketTrend >= 0 ? "+" : ""}{report.marketTrend}%
              </p>
            </div>
          </div>

          {/* Comparable Sales */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-display text-white">Comparable Sales</h4>
              <span className="text-xs text-gray-500">Last 90 days</span>
            </div>
            <div className="space-y-3">
              {report.comps.map((comp, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="rounded-xl border border-white/5 bg-white/[0.02] p-4"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-xs font-medium text-black"
                        style={{ backgroundColor: beeColor }}
                      >
                        {i + 1}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">{comp.address}</p>
                        <p className="text-xs text-gray-500">{comp.distance} away • Sold {comp.soldDate}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-display text-white">{formatCurrency(comp.price)}</p>
                      <p className="text-xs text-gray-500">{Math.round(comp.price / comp.sqft)}/sqft</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-xs text-gray-400 mb-2">
                    <span>{comp.beds} bed</span>
                    <span>{comp.baths} bath</span>
                    <span>{comp.sqft.toLocaleString()} sqft</span>
                    <span>{comp.dom} DOM</span>
                  </div>

                  {/* Similarity bar */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500 w-16">Match {comp.similarity}%</span>
                    <div className="flex-1 h-1.5 rounded-full bg-white/5 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${comp.similarity}%` }}
                        transition={{ delay: 0.3 + i * 0.1, duration: 0.6 }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: beeColor }}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Price Distribution */}
          <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-5">
            <h4 className="text-sm font-medium text-gray-400 mb-4 flex items-center gap-2">
              <BarChart3 size={14} /> Price Distribution of Comps
            </h4>
            <div className="flex items-end gap-2 h-32 px-2">
              {report.comps.map((comp, i) => {
                const maxPrice = Math.max(...report.comps.map((c) => c.price));
                const heightPct = (comp.price / maxPrice) * 100;
                return (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <span className="text-[10px] text-gray-500">{(comp.price / 1000).toFixed(0)}k</span>
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${heightPct}%` }}
                      transition={{ delay: 0.4 + i * 0.1, duration: 0.5, type: "spring" }}
                      className="w-full rounded-t-md"
                      style={{ backgroundColor: i === 2 ? beeColor : `${beeColor}40` }}
                    />
                    <span className="text-[10px] text-gray-500 truncate w-full text-center">{String.fromCharCode(65 + i)}</span>
                  </div>
                );
              })}
            </div>
            <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
              <span>Comp A-E = Active comps</span>
              <span>Highlighted = Most similar</span>
            </div>
          </div>

          {/* Footer actions */}
          <div className="flex gap-3">
            <button
              onClick={() => setReport(null)}
              className="flex-1 rounded-xl border border-white/10 bg-white/[0.03] py-3 text-sm text-white transition-colors hover:bg-white/5"
            >
              New Analysis
            </button>
            <button
              className="flex-1 rounded-xl py-3 text-sm font-medium text-black transition-all hover:brightness-110 flex items-center justify-center gap-2"
              style={{ backgroundColor: beeColor }}
              onClick={() => alert("PDF export would generate a branded report with your logo and contact info.")}
            >
              <FileText size={16} /> Export PDF
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
