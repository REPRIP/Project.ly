import React, { useRef } from 'react';
import { Check, Zap, Code, Bot } from 'lucide-react';
import { motion, useInView } from 'framer-motion';

const plans = [
    {
        name: "Frontend Only",
        price: "Custom",
        description: "Perfect for giving your business a stunning new look.",
        icon: <Code size={24} />,
        features: [
            "Responsive Design",
            "Interactive UI/UX",
            "Performance Optimization",
            "SEO Best Practices",
            "Modern Animations"
        ],
        highlight: false
    },
    {
        name: "Frontend + Backend",
        price: "Custom",
        description: "Full-stack solutions for robust applications.",
        icon: <Zap size={24} />,
        features: [
            "All Frontend Features",
            "Database Integration",
            "API Development",
            "Authentication & Security",
            "Admin Dashboard"
        ],
        highlight: false
    },
    {
        name: "AI Integration",
        price: "Custom",
        description: "Supercharge your app with intelligent features.",
        icon: <Bot size={24} />,
        features: [
            "All Full-stack Features",
            "LLM Integration",
            "Intelligent Chatbots",
            "Automated Workflows",
            "Data Analysis"
        ],
        highlight: true
    }
];

export const Pricing: React.FC<{ onOpenContact: () => void }> = ({ onOpenContact }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    return (
        <section id="pricing" className="py-24 relative overflow-hidden bg-zinc-50 dark:bg-zinc-950/50">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-zinc-300 dark:via-zinc-700 to-transparent"></div>
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-zinc-300 dark:via-zinc-700 to-transparent"></div>

            <div className="max-w-7xl mx-auto px-6 relative z-10" ref={ref}>
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5 }}
                        className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-6"
                    >
                        Flexible <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-green">Schemes</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={isInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="text-lg text-zinc-600 dark:text-zinc-400"
                    >
                        Choose the package that fits your project needs. Transparent pricing for exceptional results.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {plans.map((plan, index) => (
                        <motion.div
                            key={plan.name}
                            initial={{ opacity: 0, y: 30 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
                            className={`relative p-6 md:p-8 rounded-2xl border transition-all duration-300 group backdrop-blur-md
                ${plan.highlight
                                    ? 'bg-zinc-900/90 dark:bg-zinc-900/90 border-neon-blue shadow-lg shadow-neon-blue/20'
                                    : 'bg-white/50 dark:bg-zinc-900/40 border-zinc-200 dark:border-zinc-800 hover:border-neon-blue/30 dark:hover:border-neon-blue/30'
                                }
              `}
                        >
                            {plan.highlight && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-neon-blue to-neon-green text-zinc-900 text-xs font-bold rounded-full tracking-wider">
                                    MOST POPULAR
                                </div>
                            )}

                            <div className="mb-6">
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 
                  ${plan.highlight ? 'bg-zinc-800 text-neon-green' : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white group-hover:text-neon-blue transition-colors'}
                `}>
                                    {plan.icon}
                                </div>
                                <h3 className={`text-2xl font-bold mb-2 ${plan.highlight ? 'text-white' : 'text-zinc-900 dark:text-white'}`}>
                                    {plan.name}
                                </h3>
                                <p className={`text-sm ${plan.highlight ? 'text-zinc-400' : 'text-zinc-600 dark:text-zinc-400'}`}>
                                    {plan.description}
                                </p>
                            </div>

                            <div className="mb-6">
                                <span className={`text-4xl font-bold ${plan.highlight ? 'text-white' : 'text-zinc-900 dark:text-white'}`}>
                                    {plan.price}
                                </span>
                            </div>

                            <ul className="space-y-4 mb-8">
                                {plan.features.map((feature, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <Check size={18} className={`mt-0.5 ${plan.highlight ? 'text-neon-green' : 'text-neon-blue'}`} />
                                        <span className={`text-sm ${plan.highlight ? 'text-zinc-300' : 'text-zinc-600 dark:text-zinc-400'}`}>
                                            {feature}
                                        </span>
                                    </li>
                                ))}
                            </ul>

                            <button onClick={onOpenContact} className={`w-full py-3 rounded-xl font-semibold transition-all duration-300
                ${plan.highlight
                                    ? 'bg-gradient-to-r from-neon-blue to-neon-green text-zinc-900 hover:opacity-90'
                                    : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white hover:bg-zinc-200 dark:hover:bg-zinc-700'
                                }
              `}>
                                Get Started
                            </button>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
