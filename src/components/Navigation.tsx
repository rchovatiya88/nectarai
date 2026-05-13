import { motion } from "framer-motion";

export default function Navigation() {
  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-10 md:px-24 py-8 pointer-events-auto mix-blend-difference"
    >
      <div className="text-2xl font-display font-bold tracking-tighter text-white">
        NECTAR<span className="text-nectar-honey">.AI</span>
      </div>
      
      <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
        <a href="#" className="hover:text-nectar-honey transition-colors">Services</a>
        <a href="#" className="hover:text-nectar-honey transition-colors">Process</a>
        <a href="#" className="hover:text-nectar-honey transition-colors">Work</a>
        <button className="px-6 py-2 border border-white/20 rounded-full hover:bg-white hover:text-nectar-black transition-all">
          Contact
        </button>
      </div>
      
      {/* Mobile menu button */}
      <button className="md:hidden flex flex-col gap-1.5 z-50">
        <div className="w-6 h-0.5 bg-white rounded-full"></div>
        <div className="w-6 h-0.5 bg-white rounded-full"></div>
      </button>
    </motion.nav>
  );
}
