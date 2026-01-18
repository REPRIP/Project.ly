import React, { useState, useEffect } from 'react';
import { ShieldCheck, Code2, Scale } from 'lucide-react';

const CODE_SNIPPETS = [
  {
    language: "TypeScript",
    file: "system.interface.ts",
    color: "text-neon-blue",
    code: `interface SystemModule {
  id: string;
  architecture: 'monolith' | 'microservices';
  scalable: boolean;
  
  init(): Promise<void> {
    // Exact initialization logic
    return this.loadConfig();
  }
}`
  },
  {
    language: "Python",
    file: "analytics.py",
    color: "text-neon-green",
    code: `def analyze_metrics(data: dict):
    """
    Process system telemetry
    """
    trends = calculate_trends(data)
    anomalies = detect_outliers(trends)
    
    return [a for a in anomalies if a.severity > 0.8]`
  },
  {
    language: "Rust",
    file: "performance.rs",
    color: "text-white",
    code: `struct ComputeNode {
    id: u64,
    active: bool,
}

impl ComputeNode {
    fn new() -> Self {
        // Optimized allocation
        ComputeNode { 
            id: generate_id(), 
            active: true 
        }
    }
}`
  },
  {
    language: "Go",
    file: "concurrency.go",
    color: "text-cyan-200",
    code: `func spawnWorker(id int, jobs <-chan Job) {
    for j := range jobs {
        // Efficient concurrency
        log.Printf("Worker %d processing", id)
        process(j)
    }
    wg.Done()
}`
  }
];

export const WhyUs: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);
  const [blink, setBlink] = useState(true);

  // Blinking cursor effect - independent interval
  useEffect(() => {
    const interval = setInterval(() => {
      setBlink(b => !b);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  // Typing logic
  useEffect(() => {
    if (subIndex === CODE_SNIPPETS[index].code.length + 1 && !reverse) {
      const timeout = setTimeout(() => {
        setReverse(true);
      }, 3000); // Wait before deleting
      return () => clearTimeout(timeout);
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % CODE_SNIPPETS.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, reverse ? 25 : 50);

    return () => clearTimeout(timeout);
  }, [subIndex, index, reverse]); // Removed 'blink' dependency to prevent unnecessary re-renders of this effect

  const currentSnippet = CODE_SNIPPETS[index];
  const displayedCode = currentSnippet.code.substring(0, subIndex);

  return (
    <section id="philosophy" className="py-24 bg-white dark:bg-zinc-950 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-8 leading-tight">
              Transparent Systems, <br />
              <span className="text-zinc-400 dark:text-zinc-600">Auditable Code.</span>
            </h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-8 leading-relaxed">
              We reject the "black box" agency model. You own the code, the documentation, and the intellectual property. Our goal is to build systems your internal team can understand, maintain, and extend.
            </p>

            <div className="space-y-6">
              {[
                { icon: Code2, label: "Clean, Typed Codebase (TypeScript)" },
                { icon: ShieldCheck, label: "Security & Compliance Standards" },
                { icon: Scale, label: "Scalable Modular Architecture" }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="p-2 rounded bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100">
                    <item.icon size={20} />
                  </div>
                  <span className="font-medium text-zinc-800 dark:text-zinc-200">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative group">
            <div className={`absolute inset-0 bg-gradient-to-r ${index === 0 ? 'from-neon-blue to-cyan-600' : index === 1 ? 'from-neon-green to-lime-600' : 'from-zinc-500 to-zinc-700'} blur-3xl opacity-20 rounded-full transition-colors duration-1000`} />

            <div className="relative bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl overflow-hidden min-h-[340px] flex flex-col">
              {/* Terminal Header */}
              <div className="flex items-center justify-between px-4 py-3 bg-zinc-900/50 border-b border-zinc-800">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-zinc-700"></div>
                  <div className="w-3 h-3 rounded-full bg-zinc-700"></div>
                  <div className="w-3 h-3 rounded-full bg-zinc-700"></div>
                </div>
                <div className="text-xs font-mono text-zinc-500 flex items-center gap-2">
                  <Code2 size={12} />
                  {currentSnippet.file}
                </div>
                <div className="w-8"></div> {/* Spacer for centering */}
              </div>

              {/* Code Area */}
              <div className="p-6 font-mono text-sm overflow-x-auto flex-1 relative custom-scrollbar">
                <pre className="whitespace-pre-wrap break-words">
                  <code className={currentSnippet.color}>
                    {displayedCode}
                  </code>
                  <span className={`${blink ? 'opacity-100' : 'opacity-0'} inline-block w-2 h-4 bg-neon-green ml-1 align-middle transition-opacity duration-100`}></span>
                </pre>

                {/* Language Badge */}
                <div className="absolute bottom-4 right-4">
                  <span className={`text-xs font-bold px-2 py-1 rounded bg-zinc-800 ${currentSnippet.color} opacity-80`}>
                    {currentSnippet.language}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};