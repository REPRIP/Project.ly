import React, { useRef } from 'react';
import { ArrowUpRight, BarChart3, Database, Globe2, Layers } from 'lucide-react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';

const services = [
  {
    category: "Web Applications",
    title: "Modular SaaS Platforms",
    description: "High-performance single-page applications built with React and Next.js. We architect for modularity, allowing your product to scale from MVP to Enterprise without a rewrite.",
    icon: <Globe2 className="w-full h-full text-neon-blue" />,
    color: "bg-zinc-50 dark:bg-zinc-900/40",
    border: "border-neon-blue/20 dark:border-neon-blue/20",
    tags: ["Next.js", "React", "Node.js", "PostgreSQL"]
  },
  {
    category: "Internal Tools",
    title: "Data Dashboards & Admin Panels",
    description: "Secure, role-based internal systems. We build the control centers for your business operations, integrating directly with your existing database architecture for real-time insights.",
    icon: <BarChart3 className="w-full h-full text-neon-green" />,
    color: "bg-zinc-50 dark:bg-zinc-900/40",
    border: "border-neon-green/20 dark:border-neon-green/20",
    tags: ["Recharts", "TanStack Table", "Supabase", "Redis"]
  },
  {
    category: "AI Integration",
    title: "AI-Powered Interfaces",
    description: "Seamless integration of LLMs and vector databases. We build 'chat with data' features, semantic search, and automated workflows that feel magical to your users.",
    icon: <Database className="w-full h-full text-white" />,
    color: "bg-zinc-50 dark:bg-zinc-900/40",
    border: "border-zinc-200 dark:border-zinc-700",
    tags: ["OpenAI", "LangChain", "Pinecone", "Edge Functions"]
  },
  {
    category: "Prototyping",
    title: "MVPs & Proof-of-Concepts",
    description: "Validate fast. We deliver rapidly developed, scalable initial versions of your product designed to test market hypotheses without accumulating technical debt.",
    icon: <Layers className="w-full h-full text-neon-blue" />,
    color: "bg-zinc-50 dark:bg-zinc-900/40",
    border: "border-neon-blue/20 dark:border-neon-blue/20",
    tags: ["Figma", "Tailwind", "Vercel", "tRPC"]
  }
];

interface CardProps {
  i: number;
  service: typeof services[0];
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
}

const Card: React.FC<CardProps> = ({ i, service, progress, range, targetScale }) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'start start']
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1]);
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div ref={container} className="h-screen flex items-center justify-center sticky top-0">
      <motion.div
        style={{ scale, top: `calc(-5vh + ${i * 25}px)` }}
        className={`flex flex-col relative -top-[25%] h-auto min-h-[500px] md:h-[500px] w-[90%] md:w-[1000px] rounded-3xl p-6 md:p-12 border ${service.border} ${service.color} backdrop-blur-md shadow-2xl origin-top transition-colors will-change-transform`}
      >
        <div className="flex flex-col h-full justify-between">
          {/* Header */}
          <div className="flex justify-between items-start">
            <div>
              <span className="inline-block px-3 py-1 rounded-full bg-white/50 dark:bg-black/20 border border-black/5 dark:border-white/10 text-xs font-mono mb-4 backdrop-blur-md">
                0{i + 1} / {service.category}
              </span>
              <h2 className="text-3xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-6">
                {service.title}
              </h2>
            </div>
            <div className="p-4 rounded-2xl bg-white/50 dark:bg-white/5 border border-white/20 dark:border-white/10 w-16 h-16 md:w-20 md:h-20 flex items-center justify-center">
              {service.icon}
            </div>
          </div>

          {/* Body */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-end">
            <p className="text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed">
              {service.description}
            </p>
            <div className="flex flex-col gap-4">
              <span className="text-xs font-mono uppercase text-zinc-500 tracking-wider">Tech Stack</span>
              <div className="flex flex-wrap gap-2">
                {service.tags.map((tag, idx) => (
                  <span key={idx} className="px-3 py-1 bg-white dark:bg-black/40 rounded-md text-sm font-medium text-zinc-600 dark:text-zinc-400 border border-black/5 dark:border-white/5">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export const Services: React.FC = () => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end end']
  })

  return (
    <section id="services" ref={container} className="bg-zinc-50 dark:bg-zinc-950 relative z-10">
      <div className="max-w-7xl mx-auto px-6 pt-20 md:pt-32 pb-16">
        <h2 className="text-4xl md:text-6xl font-bold text-zinc-900 dark:text-white mb-8 text-center">
          Capabilities
        </h2>
        <p className="text-xl text-zinc-500 text-center max-w-2xl mx-auto mb-24">
          We don't just build websites; we engineer digital ecosystems. Explore our core services below.
        </p>
      </div>

      <div className="pb-[20vh]">
        {services.map((service, i) => {
          const targetScale = 1 - ((services.length - i) * 0.05);
          return (
            <Card
              key={i}
              i={i}
              service={service}
              progress={scrollYProgress}
              range={[i * .25, 1]}
              targetScale={targetScale}
            />
          )
        })}
      </div>
    </section>
  );
};