import React from 'react';
import { ArrowRight, Terminal } from 'lucide-react';
import { motion } from 'framer-motion';
import { Scene } from './Scene';

export const Hero: React.FC<{ onOpenContact: () => void }> = ({ onOpenContact }) => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden bg-zinc-50 dark:bg-zinc-950">
      {/* 3D Scene Background - Scoped to Hero Section */}
      <div className="absolute inset-0 z-0">
        <Scene />
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 pointer-events-none">

        <div className="flex flex-col justify-center pointer-events-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100/80 dark:bg-zinc-900/80 backdrop-blur-md border border-zinc-200 dark:border-zinc-800 w-fit mb-8 shadow-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-green opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-neon-green"></span>
            </span>
            <span className="text-xs font-mono font-medium text-zinc-600 dark:text-zinc-400">
              System Architecture Studio
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-7xl font-bold tracking-tight text-zinc-900 dark:text-white leading-[1.1] mb-6 drop-shadow-sm"
          >
            We Build <br className="hidden md:block" />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-neon-blue to-neon-green">
              Scalable
            </span> <br />
            Digital Platforms.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 max-w-lg leading-relaxed mb-8 backdrop-blur-sm"
          >
            Project.ly engineers performant, type-safe web applications designed for scale. No black boxes, just clean, maintainable code.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <button onClick={onOpenContact} aria-label="Start a project" className="h-12 px-6 rounded-lg bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-lg shadow-neon-blue/20">
              Start a Project <ArrowRight size={16} />
            </button>
            <a href="#process" aria-label="View methodology" className="h-12 px-6 rounded-lg border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 font-semibold hover:bg-zinc-50 dark:hover:bg-zinc-900/50 backdrop-blur-sm transition-colors flex items-center justify-center gap-2 hover:border-neon-green/50">
              <Terminal size={16} /> View Methodology
            </a>
          </motion.div>
        </div>

        {/* Right side is intentionally empty to show the 3D scene */}
        <div className="hidden lg:flex items-center justify-center relative pointer-events-none">
        </div>

      </div>
    </section>
  );
};