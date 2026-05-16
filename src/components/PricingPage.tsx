import { motion } from "framer-motion";
import { ArrowRight, Check, Clock } from "lucide-react";
import Navigation from "./Navigation";
import { tiers } from "../data/bees";

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-nectar-black text-white selection:bg-nectar-honey selection:text-nectar-black">
      <Navigation activePage="pricing" />

      <main className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_24%_12%,rgba(245,183,0,0.18),transparent_26%),radial-gradient(circle_at_82%_20%,rgba(255,209,102,0.09),transparent_28%)]" />
        <div className="absolute inset-0 pointer-events-none opacity-[0.08] [background-image:linear-gradient(30deg,#f5b700_12%,transparent_12.5%,transparent_87%,#f5b700_87.5%,#f5b700),linear-gradient(150deg,#f5b700_12%,transparent_12.5%,transparent_87%,#f5b700_87.5%,#f5b700),linear-gradient(30deg,#f5b700_12%,transparent_12.5%,transparent_87%,#f5b700_87.5%,#f5b700),linear-gradient(150deg,#f5b700_12%,transparent_12.5%,transparent_87%,#f5b700_87.5%,#f5b700)] [background-position:0_0,0_0,34px_60px,34px_60px] [background-size:68px_120px]" />

        <section className="relative flex min-h-[92vh] items-center px-6 pb-20 pt-32 md:px-24 md:pt-40">
          <div className="grid w-full gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="max-w-3xl"
            >
              <p className="mb-4 font-mono text-sm uppercase tracking-widest text-nectar-honey">Pricing</p>
              <h1 className="mb-6 font-display text-5xl font-medium leading-tight tracking-tight text-white md:text-7xl">
                Pay per Bee. <br />
                <span className="text-nectar-honey">Scale your hive.</span>
              </h1>
              <p className="max-w-2xl text-lg font-light leading-relaxed text-gray-300 md:text-xl">
                No hourly billing, no hidden fees. Each Bee is a flat monthly subscription. Add or remove Bees anytime. Start with a 14-day free trial.
              </p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <a href="/" className="inline-flex items-center justify-center gap-2 rounded-full bg-nectar-honey px-8 py-4 font-medium text-nectar-black drop-shadow-[0_0_18px_rgba(245,183,0,0.38)] transition-colors hover:bg-nectar-glow">
                  Browse the Hive <ArrowRight size={18} />
                </a>
                <a href="/#contact" className="inline-flex items-center justify-center rounded-full border border-white/20 px-8 py-4 font-medium text-white backdrop-blur transition-colors hover:bg-white/5">
                  Talk to Sales
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="rounded-lg border border-nectar-honey/30 bg-[#0b0b0b]/80 p-6 shadow-[0_0_45px_rgba(245,183,0,0.12)] backdrop-blur"
            >
              <div className="flex items-center justify-between border-b border-white/10 pb-5">
                <div>
                  <p className="text-sm uppercase tracking-widest text-gray-500">Bees start at</p>
                  <p className="mt-2 font-display text-5xl text-nectar-honey">$199</p>
                  <p className="text-sm text-gray-500">/mo per Bee</p>
                </div>
                <Clock className="text-nectar-honey" size={38} />
              </div>
              <div className="grid gap-4 pt-6 text-sm text-gray-300 sm:grid-cols-3">
                <div><p className="font-display text-3xl text-white">14</p><p className="mt-1">day free trial</p></div>
                <div><p className="font-display text-3xl text-white">24/7</p><p className="mt-1">always-on workers</p></div>
                <div><p className="font-display text-3xl text-white">0</p><p className="mt-1">setup fees</p></div>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="relative px-6 py-20 md:px-24" id="pricing">
          <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-3xl">
              <p className="mb-4 font-mono text-sm uppercase tracking-widest text-nectar-honey">Hive Plans</p>
              <h2 className="font-display text-4xl font-medium tracking-tight md:text-6xl">Choose your swarm size.</h2>
            </div>
            <p className="max-w-sm text-sm leading-relaxed text-gray-400">
              All plans include onboarding, training, and ongoing optimization. No contracts. Cancel anytime.
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {tiers.map((tier) => (
              <motion.article
                key={tier.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6 }}
                className={`rounded-lg border p-6 ${
                  tier.featured
                    ? "border-nectar-honey bg-nectar-honey text-nectar-black shadow-[0_0_36px_rgba(245,183,0,0.24)]"
                    : "border-white/10 bg-[#0d0d0d]/90 text-white"
                }`}
              >
                <div className="mb-8 flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-display text-2xl font-medium">{tier.name}</h3>
                    <p className={`mt-2 text-sm ${tier.featured ? "text-black/70" : "text-gray-400"}`}>
                      {tier.beeSlots === -1 ? "Unlimited AI Bees" : `${tier.beeSlots} AI Bees`}
                    </p>
                  </div>
                  {tier.featured && <span className="rounded-full bg-black/10 px-3 py-1 text-xs font-semibold">Most Popular</span>}
                </div>
                <div className="mb-8">
                  {tier.monthlyPrice > 0 ? (
                    <>
                      <p className="font-display text-5xl font-semibold">${tier.monthlyPrice}</p>
                      <p className={`mt-1 text-sm ${tier.featured ? "text-black/70" : "text-gray-500"}`}>
                        /mo (or ${Math.round(tier.yearlyPrice / 12)}/mo billed yearly)
                      </p>
                    </>
                  ) : (
                    <>
                      <p className="font-display text-5xl font-semibold">Custom</p>
                      <p className={`mt-1 text-sm ${tier.featured ? "text-black/70" : "text-gray-500"}`}>Contact us for pricing</p>
                    </>
                  )}
                </div>
                <ul className="mb-8 space-y-3">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex gap-3 text-sm">
                      <Check className="mt-0.5 shrink-0" size={17} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href={tier.monthlyPrice > 0 ? "/#contact" : "/#contact"}
                  className={`block w-full rounded-full py-3 text-center font-medium transition-colors ${
                    tier.featured ? "bg-black text-white hover:bg-black/80" : "border border-white/20 text-white hover:bg-white/5"
                  }`}
                >
                  {tier.cta}
                </a>
              </motion.article>
            ))}
          </div>
        </section>

        <section className="relative px-6 pb-24 pt-12 md:px-24">
          <div className="rounded-lg border border-white/10 bg-[#0b0b0b]/90 p-8 text-center md:p-12">
            <p className="mb-4 font-mono text-sm uppercase tracking-widest text-nectar-honey">Ready when you are</p>
            <h2 className="mx-auto max-w-3xl font-display text-4xl font-medium tracking-tight md:text-6xl">
              Start with one Bee. Let the hive grow from there.
            </h2>
            <a href="/" className="mt-10 inline-flex items-center justify-center gap-2 rounded-full bg-nectar-honey px-8 py-4 font-medium text-nectar-black transition-colors hover:bg-nectar-glow">
              Meet the Bees <ArrowRight size={18} />
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
