import React from 'react';
import { ExternalLink, Github } from 'lucide-react';
import { motion } from 'framer-motion';

const projects = [
    {
        title: "E-Commerce Dashboard",
        description: "A comprehensive analytics dashboard for online retailers with real-time data visualization.",
        tech: ["React", "TypeScript", "Tailwind", "Recharts"],
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop"
    },
    {
        title: "AI Content Generator",
        description: "SaaS platform leveraging LLMs to help marketers create high-converting copy in seconds.",
        tech: ["Next.js", "OpenAI API", "PostgreSQL", "Stripe"],
        image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2532&auto=format&fit=crop"
    },
    {
        title: "HealthTech Mobile App",
        description: "Cross-platform mobile application for patient monitoring and telemedicine appointments.",
        tech: ["React Native", "Firebase", "WebRTC", "Node.js"],
        image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=2070&auto=format&fit=crop"
    }
];

export const Testimonials: React.FC = () => {
    return (
        <section id="work" className="py-24 bg-white dark:bg-zinc-950">
            <div className="max-w-7xl mx-auto px-6">
                <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
                    <div className="max-w-2xl">
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="inline-block px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 text-xs font-mono mb-4"
                        >
                            FEATURED_WORK
                        </motion.div>
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-4"
                        >
                            Previous <span className="text-zinc-400">Projects</span>
                        </motion.h2>
                    </div>
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        <button className="flex items-center gap-2 text-neon-blue hover:text-neon-green transition-colors font-mono text-sm group">
                            VIEW_ALL_ARCHIVE <ExternalLink size={14} className="group-hover:translate-x-1 transition-transform" />
                        </button>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 + 0.2 }}
                            className="group relative rounded-2xl overflow-hidden bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800"
                        >
                            {/* Image Container */}
                            <div className="aspect-[4/3] overflow-hidden relative">
                                <div className="absolute inset-0 bg-zinc-900/20 group-hover:bg-zinc-900/0 transition-colors z-10" />
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                                />
                            </div>

                            {/* Content */}
                            <div className="p-6 relative z-20">
                                <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2 group-hover:text-neon-blue transition-colors">
                                    {project.title}
                                </h3>
                                <p className="text-zinc-600 dark:text-zinc-400 text-sm mb-4 line-clamp-2">
                                    {project.description}
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {project.tech.map((t, i) => (
                                        <span key={i} className="px-2 py-1 rounded-md bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 text-xs font-medium">
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
