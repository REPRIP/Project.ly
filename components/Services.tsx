import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

const services = [
  {
    category: "Web Applications",
    title: "Modular SaaS Platforms",
    description: "High-performance single-page applications built with React and Next.js. Optimized for SEO, accessibility, and complex state management."
  },
  {
    category: "Internal Tools",
    title: "Data Dashboards & Admin Panels",
    description: "Secure, role-based internal systems to visualize data and manage operations. Integrated directly with your existing database architecture."
  },
  {
    category: "AI Integration",
    title: "AI-Powered Interfaces",
    description: "Seamless integration of LLMs (Gemini, GPT) and vector databases into consumer-facing products for intelligent search and automation."
  },
  {
    category: "Prototyping",
    title: "MVPs & Proof-of-Concepts",
    description: "Rapidly developed, scalable initial versions of your product designed to validate market hypotheses without accumulating technical debt."
  }
];

export const Services: React.FC = () => {
  return (
    <section id="services" className="py-24 bg-zinc-50 dark:bg-zinc-900 relative z-10 border-y border-zinc-200 dark:border-zinc-800">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-brand-600 dark:text-brand-400 font-mono text-sm font-medium tracking-wider uppercase mb-2 block">
              Capabilities
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white">
              What We Build
            </h2>
          </div>
          <button className="text-zinc-900 dark:text-white font-medium flex items-center gap-2 hover:gap-3 transition-all">
            View Case Studies <ArrowUpRight size={18} />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="group relative p-8 md:p-12 bg-white dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 hover:border-brand-500/30 transition-all overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowUpRight className="text-zinc-400 dark:text-zinc-600" />
              </div>
              <span className="text-xs font-mono text-zinc-400 dark:text-zinc-500 mb-4 block">
                0{index + 1} / {service.category}
              </span>
              <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-4">
                {service.title}
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {service.description}
              </p>
              
              {/* Subtle hover effect background */}
              <div className="absolute inset-0 bg-gradient-to-tr from-zinc-100 to-transparent dark:from-zinc-900 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};