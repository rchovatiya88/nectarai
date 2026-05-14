import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";

type NavigationProps = {
  activePage?: "home" | "pricing";
};

const navItems = [
  { label: "Services", href: "/#services" },
  { label: "Process", href: "/#process" },
  { label: "Work", href: "/#work" },
  { label: "Pricing", href: "/pricing" },
];

export default function Navigation({ activePage = "home" }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 md:px-24 py-6 md:py-8 pointer-events-auto"
    >
      <a href="/" className="text-2xl font-display font-bold tracking-tighter text-white mix-blend-difference">
        NECTAR<span className="text-nectar-honey">.AI</span>
      </a>
      
      <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
        {navItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className={`transition-colors hover:text-nectar-honey ${
              activePage === "pricing" && item.href === "/pricing" ? "text-nectar-honey" : ""
            }`}
          >
            {item.label}
          </a>
        ))}
        <a href="/#contact" className="px-6 py-2 border border-white/20 rounded-full hover:bg-white hover:text-nectar-black transition-all">
          Contact
        </a>
      </div>
      
      <button
        className="md:hidden z-50 grid h-10 w-10 place-items-center rounded-full border border-white/15 bg-black/50 text-white backdrop-blur"
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={isOpen}
        onClick={() => setIsOpen((current) => !current)}
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute left-4 right-4 top-20 rounded-lg border border-white/10 bg-[#080808]/95 p-4 shadow-2xl backdrop-blur md:hidden"
        >
          <div className="flex flex-col gap-2 text-sm font-medium text-gray-200">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-md px-4 py-3 transition-colors hover:bg-white/5 hover:text-nectar-honey"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <a
              href="/#contact"
              className="mt-2 rounded-md bg-nectar-honey px-4 py-3 text-center font-semibold text-nectar-black transition-colors hover:bg-nectar-glow"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </a>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}
