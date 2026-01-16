import React from 'react';
import { ArrowRight, ChevronRight, Terminal } from 'lucide-react';
import { motion } from 'framer-motion';

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 w-full relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        <div className="flex flex-col justify-center">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 w-fit mb-8"
            >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                </span>
                <span className="text-xs font-mono font-medium text-zinc-600 dark:text-zinc-400">
                    Accepting new projects for Q4
                </span>
            </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold tracking-tight text-zinc-900 dark:text-white leading-[1.1] mb-6"
          >
            We Build <br className="hidden md:block" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 to-violet-500">
              Explainable
            </span>, <br />
            Modular Web Products.
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 max-w-lg leading-relaxed mb-8"
          >
            Project.ly combines AI-assisted discovery with architecture-first engineering to deliver scalable, transparent, and future-ready digital platforms.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <button className="h-12 px-6 rounded-lg bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
              Start a Project <ArrowRight size={16} />
            </button>
            <button className="h-12 px-6 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 font-semibold hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-colors flex items-center justify-center gap-2">
              <Terminal size={16} /> View Methodology
            </button>
          </motion.div>

          {/* Trust indicators */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-16 pt-8 border-t border-zinc-200 dark:border-zinc-800"
          >
            <p className="text-sm text-zinc-500 font-mono mb-4">POWERING NEXT-GEN COMPANIES</p>
            <div className="flex gap-8 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                {/* Abstract Logos as placeholders */}
                <div className="h-6 w-24 bg-zinc-400/20 rounded"></div>
                <div className="h-6 w-24 bg-zinc-400/20 rounded"></div>
                <div className="h-6 w-24 bg-zinc-400/20 rounded"></div>
            </div>
          </motion.div>
        </div>
        
        {/* Right side is intentionally empty in DOM to let the 3D scene shine through, 
            but we can add some floating UI elements to interact with depth */}
        <div className="hidden lg:flex items-center justify-center relative pointer-events-none">
            {/* The 3D scene is fixed in background, but we can have overlays here if needed */}
        </div>

      </div>
      
      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-zinc-400"
      >
        <span className="text-xs font-mono uppercase tracking-widest">Explore</span>
        <div className="w-px h-12 bg-gradient-to-b from-zinc-400 to-transparent"></div>
      </motion.div>
    </section>
  );
};