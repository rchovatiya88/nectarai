import { Scroll } from "@react-three/drei";
import { motion } from "framer-motion";

export default function Overlay() {
  return (
    <Scroll html style={{ width: "100%", height: "100%" }}>
      {/* 
        The Scroll component automatically matches HTML scroll to 3D scroll.
        We have 7 pages of height.
      */}
      
      {/* SECTION 1: HERO */}
      <section className="h-screen w-full flex flex-col justify-center px-10 md:px-24">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="max-w-2xl"
        >
          <p className="text-nectar-honey font-mono tracking-widest text-sm mb-4 uppercase">Nectar.AI</p>
          <h1 className="text-5xl md:text-7xl font-display font-medium tracking-tight leading-tight mb-6 text-white drop-shadow-2xl">
            Your AI <br/> Workforce Has <br/> Arrived.
          </h1>
          <p className="text-gray-400 text-lg md:text-xl mb-10 max-w-lg font-light leading-relaxed">
            Nectar.ai builds AI systems, websites, and apps that grow your business while you sleep.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="px-8 py-4 bg-nectar-honey hover:bg-nectar-glow text-nectar-black font-medium transition-all rounded-full drop-shadow-[0_0_15px_rgba(245,183,0,0.4)]">
              Get My AI Strategy
            </button>
            <button className="px-8 py-4 border border-white/20 hover:bg-white/5 text-white font-medium transition-all rounded-full backdrop-blur-sm">
              See How It Works
            </button>
          </div>
        </motion.div>
      </section>

      {/* SECTION 2: PROBLEM */}
      <section className="h-screen w-full flex flex-col justify-center items-end px-10 md:px-24 text-right">
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="max-w-xl"
        >
          <h2 className="text-4xl md:text-5xl font-display mb-8 text-gray-300">
            Small businesses are <span className="text-white font-medium">overwhelmed.</span>
          </h2>
          <ul className="text-gray-500 text-xl md:text-2xl font-light space-y-4">
            <li>Too many tools.</li>
            <li>Not enough time.</li>
            <li>No automation.</li>
            <li>Missed customers.</li>
          </ul>
          <p className="mt-8 text-nectar-amber">When the bees stop working, the business stagnates.</p>
        </motion.div>
      </section>

      {/* SECTION 3: THE NECTAR SYSTEM */}
      <section className="h-screen w-full flex flex-col justify-center px-10 md:px-24">
         <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-4xl md:text-6xl font-display mb-12">The Nectar System</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
             {[
               { title: "Website Builder Bee", desc: "High-converting, AI-driven websites." },
               { title: "Marketing Automation Bee", desc: "Targeted campaigns that run themselves." },
               { title: "Lead Generation Bee", desc: "Captures and qualifies inbound traffic 24/7." },
               { title: "Customer Support Bee", desc: "Instant, intelligent answers for your clients." },
               { title: "App Development Bee", desc: "Custom internal tools to scale operations." },
             ].map((agent, i) => (
                <div key={i} className="bg-[#111]/80 border border-white/10 p-6 rounded-2xl hover:bg-white/10 hover:border-nectar-honey/50 transition-all cursor-pointer group">
                  <div className="w-12 h-12 rounded-full bg-black/50 border border-nectar-honey/30 flex items-center justify-center mb-6 group-hover:shadow-[0_0_20px_rgba(245,183,0,0.5)] transition-shadow">
                    <div className="w-4 h-4 bg-nectar-honey rounded-full animate-pulse" />
                  </div>
                  <h3 className="text-xl font-medium mb-2 text-white">{agent.title}</h3>
                  <p className="text-gray-400 font-light">{agent.desc}</p>
                </div>
             ))}
          </div>
        </motion.div>
      </section>

      {/* SECTION 4: TRANSFORMATION */}
      <section className="h-screen w-full flex flex-col justify-center items-center text-center px-10 md:px-24">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-5xl md:text-7xl font-display mb-6">Effort to <span className="text-nectar-honey italic">Revenue</span></h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-16 font-light">
            Like a hive turning nectar into gold, our AI agents transform raw data and operations into scalable business growth.
          </p>
          
          <div className="flex flex-wrap justify-center gap-8 md:gap-16">
            {[
              { label: "Leads Captured", val: "+340%" },
              { label: "Hours Saved/Mo", val: "120+" },
              { label: "Conversion Rate", val: "x3.5" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-4xl md:text-6xl font-display font-medium text-white mb-2">{stat.val}</div>
                <div className="text-nectar-amber font-mono tracking-widest text-sm uppercase">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* SECTION 5: HOW IT WORKS */}
      <section className="h-screen w-full flex flex-col justify-center px-10 md:px-24">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <p className="text-nectar-honey font-mono tracking-widest text-sm mb-4 uppercase">Process</p>
          <h2 className="text-4xl md:text-6xl font-display mb-16">How the swarm works.</h2>
          
          <div className="space-y-12 border-l border-white/10 pl-8 md:pl-16 relative">
            <div className="absolute left-[-1px] top-0 bottom-0 w-[2px] bg-gradient-to-b from-nectar-honey/0 via-nectar-honey to-nectar-honey/0" />
            
            {[
              { step: "01", title: "Discover", desc: "We scan your business ecology to find where you're losing time and money." },
              { step: "02", title: "Build", desc: "Our engineers construct dedicated AI agents tailored to your exact workflows." },
              { step: "03", title: "Grow", desc: "The agents deploy, working tirelessly 24/7. You watch the revenue compound." },
            ].map((item, i) => (
              <div key={i} className="relative">
                <div className="absolute -left-[54px] md:-left-[86px] top-1 text-nectar-honey font-mono text-sm">{item.step}</div>
                <h3 className="text-2xl md:text-3xl font-medium mb-3">{item.title}</h3>
                <p className="text-gray-400 text-lg max-w-xl font-light">{item.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* SECTION 6: SOCIAL PROOF */}
      <section className="h-[100vh] w-full flex flex-col justify-center items-end px-10 md:px-24 text-right">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="max-w-2xl"
        >
          <h2 className="text-3xl md:text-5xl font-display mb-12">Trusted by founders who value their time.</h2>
          
          <div className="space-y-6">
            <div className="bg-[#0a0a0a]/90 border border-white/10 p-8 rounded-2xl text-left shadow-2xl inline-block -ml-20 mb-4 z-10 relative">
              <p className="text-lg italic text-gray-300 mb-6">"Nectar.ai replaced a full customer service team. The AI replies instantly and accurately, and we saved $80k a year."</p>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gradient-to-br from-white/20 to-white/5 rounded-full" />
                <div>
                  <div className="text-white font-medium">Sarah Jenkins</div>
                  <div className="text-nectar-amber text-sm tracking-wide">CEO, Bloom Retail</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* SECTION 7: CTA */}
      <section className="h-screen w-full flex flex-col justify-center items-center text-center px-10 md:px-24 bg-[#050505]/80">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="max-w-3xl w-full"
        >
          <h2 className="text-5xl md:text-7xl font-display text-white mb-6">Let AI Do The Work.</h2>
          <p className="text-xl text-gray-400 font-light mb-12">
            We don't sell software. We build AI employees for your business.
          </p>
          
          <form className="max-w-md mx-auto space-y-4 text-left" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-4">
              <input type="text" placeholder="Name" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-nectar-honey transition-colors" />
              <input type="email" placeholder="Work Email" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-nectar-honey transition-colors" />
              <textarea placeholder="Biggest Business Problem" rows={3} className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-nectar-honey transition-colors resize-none" />
            </div>
            <button className="w-full mt-6 px-8 py-5 bg-nectar-honey hover:bg-nectar-glow text-nectar-black font-medium transition-all rounded-xl drop-shadow-[0_0_20px_rgba(245,183,0,0.3)] text-lg">
              Book Free AI Growth Call
            </button>
          </form>
        </motion.div>
      </section>

    </Scroll>
  );
}
