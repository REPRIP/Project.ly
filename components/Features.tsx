import React, { useRef } from 'react';
import { Cpu, Layers, GitMerge, FileCode, Rocket, CircleDashed, CheckCircle2 } from 'lucide-react';
import { motion, useScroll, useSpring } from 'framer-motion';

const steps = [
  {
    icon: <Cpu size={20} />,
    title: "Technical Discovery",
    id: "01_DISCOVERY",
    description: "We audit requirements to identify edge cases, security constraints, and scalability needs before writing a single line of code."
  },
  {
    icon: <Layers size={20} />,
    title: "System Architecture",
    id: "02_DESIGN",
    description: "Decoupled systems design. We model data layers and frontend state independently to ensure resilience and maintainability."
  },
  {
    icon: <GitMerge size={20} />,
    title: "Iterative Development",
    id: "03_BUILD",
    description: "Rapid sprints with transparent version control. Features are deployed to preview environments for real-time feedback."
  },
  {
    icon: <FileCode size={20} />,
    title: "Documentation",
    id: "04_HANDOFF",
    description: "Clear, comprehensive technical documentation. We ensure your team can easily maintain and extend the codebase."
  },
  {
    icon: <Rocket size={20} />,
    title: "Production Launch",
    id: "05_DEPLOY",
    description: "Automated CI/CD pipelines deployment to global edge networks, ensuring low latency and high availability."
  }
];

interface ProcessNodeProps {
  step: typeof steps[0];
  index: number;
  isEven: boolean;
}

const ProcessNode: React.FC<ProcessNodeProps> = ({ step, index, isEven }) => {
  return (
    <div className={`flex flex-col md:flex-row md:items-center justify-between w-full mb-12 md:mb-24 relative ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'}`}>

      {/* The Content Card */}
      <motion.div
        initial={{ opacity: 0, x: isEven ? -50 : 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className={`w-full md:w-5/12 relative group mb-8 md:mb-0`}
      >
        <div className={`
          hidden md:block absolute top-6 ${isEven ? '-right-3' : '-left-3'} w-3 h-px bg-zinc-300 dark:bg-zinc-700
          transition-colors duration-500 group-hover:bg-neon-blue
        `}></div>

        <div className="relative p-6 rounded-xl bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm border border-zinc-200 dark:border-zinc-800 hover:border-neon-blue/50 dark:hover:border-neon-blue/50 transition-all duration-300 shadow-sm hover:shadow-xl hover:shadow-neon-blue/10">
          {/* Tech Header */}
          <div className="flex items-center justify-between mb-4 border-b border-zinc-100 dark:border-zinc-800 pb-3">
            <span className="font-mono text-xs text-neon-blue dark:text-neon-blue tracking-wider">
              {step.id}
            </span>
            <div className="flex gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-zinc-300 dark:bg-zinc-700"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-zinc-300 dark:bg-zinc-700"></div>
            </div>
          </div>

          <h3 className="text-lg md:text-xl font-bold text-zinc-900 dark:text-white mb-2 flex items-center gap-2">
            <span className="text-zinc-400 group-hover:text-neon-blue transition-colors">
              {step.icon}
            </span>
            {step.title}
          </h3>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            {step.description}
          </p>
        </div>
      </motion.div>

      {/* The Central Node Indicator - Hidden on mobile, or could be adjusted */}
      <div className="hidden md:flex relative z-10 items-center justify-center w-12 h-12">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          className="w-4 h-4 bg-zinc-100 dark:bg-zinc-950 border-2 border-zinc-300 dark:border-zinc-700 rounded-full z-10"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.2 }}
            className="w-full h-full bg-neon-green rounded-full origin-center"
          />
        </motion.div>

        {/* Glowing halo behind active node */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          className="absolute inset-0 bg-neon-green/30 blur-xl rounded-full"
        />
      </div>

      {/* Spacer for the other side */}
      <div className="hidden md:block w-5/12"></div>
    </div>
  );
};

export const Features: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 20%", "end 80%"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section id="process" className="py-16 md:py-32 relative z-10 overflow-hidden">
      {/* Background Gradient Mesh */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute left-1/2 top-0 -translate-x-1/2 w-px h-full bg-gradient-to-b from-transparent via-zinc-200 dark:via-zinc-800 to-transparent"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6" ref={containerRef}>
        <div className="mb-24 text-center max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neon-blue/10 border border-neon-blue/20 text-neon-blue text-xs font-mono mb-6"
          >
            <CircleDashed size={12} className="animate-spin-slow" />
            <span>ESTABLISHED_PROCESS</span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-6 tracking-tight">
            Development <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-green">Workflow</span>
          </h2>
          <p className="text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed">
            A structured, transparent approach to building scalable software.
          </p>
        </div>

        <div className="relative">
          {/* The Main Vertical Bus Line - Hidden on Mobile */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-zinc-200 dark:bg-zinc-800" />

          {/* The Active Filling Line - Hidden on Mobile */}
          <motion.div
            style={{ scaleY, transformOrigin: "top" }}
            className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 bg-gradient-to-b from-neon-blue via-neon-green to-neon-blue shadow-[0_0_20px_rgba(0,243,255,0.5)]"
          />

          {/* Steps */}
          <div className="relative z-10">
            {steps.map((step, index) => (
              <ProcessNode
                key={index}
                step={step}
                index={index}
                isEven={index % 2 === 0}
              />
            ))}
          </div>

          {/* End Node */}
          <div className="flex justify-center relative z-10 pt-8">
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, margin: "0px" }}
              className="flex flex-col items-center gap-4"
            >
              <div className="w-8 h-8 rounded-full bg-zinc-900 dark:bg-white flex items-center justify-center text-white dark:text-zinc-900 shadow-lg shadow-neon-green/20">
                <CheckCircle2 size={16} />
              </div>
              <span className="font-mono text-xs text-zinc-500 dark:text-zinc-400 tracking-widest">READY_FOR_GTM</span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};