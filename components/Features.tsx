import React from 'react';
import { Cpu, Layers, GitMerge, FileCode, Rocket } from 'lucide-react';
import { motion } from 'framer-motion';

const steps = [
  {
    icon: <Cpu size={24} />,
    title: "AI-Assisted Discovery",
    description: "We use proprietary AI models to audit requirements, identifying edge cases and technical constraints before a single line of code is written."
  },
  {
    icon: <Layers size={24} />,
    title: "Architecture-First Design",
    description: "Systems are modeled for modularity. We decouple frontend, backend, and data layers to ensure independent scalability and maintainability."
  },
  {
    icon: <GitMerge size={24} />,
    title: "Iterative Development",
    description: "Rapid sprints with transparent version control. You see the product evolve in real-time environments, not just static mockups."
  },
  {
    icon: <FileCode size={24} />,
    title: "Documentation & Transfer",
    description: "We believe in explainable code. Comprehensive technical documentation and knowledge transfer sessions are standard deliverables."
  },
  {
    icon: <Rocket size={24} />,
    title: "Deployment & Scale",
    description: "Production-ready infrastructure setup on AWS, Vercel, or GCP, optimized for performance, security, and global availability."
  }
];

export const Features: React.FC = () => {
  return (
    <section id="process" className="py-24 bg-white dark:bg-zinc-950 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-16 md:max-w-2xl">
          <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-white mb-6">
            Engineering Precision, <br />
            <span className="text-zinc-500">From Day One.</span>
          </h2>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Our process eliminates ambiguity. By combining rigorous architectural planning with agile execution, we ship robust software that grows with your business.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="p-8 rounded-2xl bg-zinc-50 dark:bg-zinc-900/50 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors group"
            >
              <div className="w-12 h-12 rounded-lg bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center text-zinc-900 dark:text-white mb-6 group-hover:scale-110 transition-transform duration-300">
                {step.icon}
              </div>
              <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-3">
                {step.title}
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-sm">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};