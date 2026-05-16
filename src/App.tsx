import { useState } from "react";
import type { Bee } from "./data/bees";
import Navigation from "./components/Navigation";
import CanvasScene from "./components/CanvasScene";
import BeeConfigurator from "./components/BeeConfigurator";
import PricingPage from "./components/PricingPage";
import Overlay from "./components/overlays/Overlay";

export default function App() {
  const [selectedBee, setSelectedBee] = useState<Bee | null>(null);

  if (/^\/?pricing\/?$/i.test(window.location.pathname)) {
    return <PricingPage />;
  }

  return (
    <div className="w-full min-h-screen bg-nectar-black selection:bg-nectar-honey selection:text-nectar-black font-sans relative">
      <Navigation />
      <BeeConfigurator bee={selectedBee} onClose={() => setSelectedBee(null)} />
      <CanvasScene />
      <Overlay onSelectBee={setSelectedBee} />
    </div>
  );
}
