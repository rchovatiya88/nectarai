import { useMemo, useState } from "react";
import type { Bee } from "./data/bees";
import ParticleBackground from "./components/ParticleBackground";
import Navigation from "./components/Navigation";
import Overlay from "./components/overlays/Overlay";
import PricingPage from "./components/PricingPage";
import BeeConfigurator from "./components/BeeConfigurator";

export default function App() {
  const [selectedBee, setSelectedBee] = useState<Bee | null>(null);

  const isPricing = useMemo(
    () => /^\/?pricing\/?$/i.test(window.location.pathname),
    []
  );

  if (isPricing) {
    return <PricingPage />;
  }

  return (
    <div className="w-full min-h-screen bg-nectar-black selection:bg-nectar-honey selection:text-nectar-black font-sans relative">
      <ParticleBackground />
      <Navigation />

      <BeeConfigurator
        bee={selectedBee}
        onClose={() => setSelectedBee(null)}
      />

      <Overlay onSelectBee={setSelectedBee} />
    </div>
  );
}
