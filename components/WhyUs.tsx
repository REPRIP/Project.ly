import React from 'react';
import { ShieldCheck, Code2, Scale } from 'lucide-react';

export const WhyUs: React.FC = () => {
  return (
    <section id="philosophy" className="py-24 bg-white dark:bg-zinc-950 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold text-zinc-900 dark:text-white mb-8 leading-tight">
              Transparent Systems, <br />
              <span className="text-zinc-400 dark:text-zinc-600">Explainable Code.</span>
            </h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-8 leading-relaxed">
              We reject the "black box" agency model. You own the code, the documentation, and the intellectual property. Our goal is to build systems your internal team can understand, maintain, and extend.
            </p>
            
            <div className="space-y-6">
              {[
                { icon: Code2, label: "Clean, Typed Codebase (TypeScript)" },
                { icon: ShieldCheck, label: "Security & Compliance First" },
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

          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 blur-3xl opacity-20 rounded-full" />
            <div className="relative bg-zinc-900 border border-zinc-800 rounded-xl p-6 shadow-2xl font-mono text-sm overflow-hidden">
                <div className="flex gap-2 mb-4">
                    <div className="w-3 h-3 rounded-full bg-red-500/20"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/20"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/20"></div>
                </div>
                <div className="text-zinc-400">
                    <p><span className="text-purple-400">interface</span> <span className="text-yellow-200">SystemModule</span> {'{'}</p>
                    <p className="pl-4"><span className="text-blue-400">id</span>: <span className="text-green-400">string</span>;</p>
                    <p className="pl-4"><span className="text-blue-400">architecture</span>: <span className="text-green-400">'monolith'</span> | <span className="text-green-400">'microservices'</span>;</p>
                    <p className="pl-4"><span className="text-blue-400">scalable</span>: <span className="text-blue-400">boolean</span>;</p>
                    <p className="pl-4"><span className="text-blue-400">documentation</span>: <span className="text-blue-400">Document</span>[];</p>
                    <p>{'}'}</p>
                    <br/>
                    <p><span className="text-purple-400">const</span> <span className="text-yellow-200">initProject</span> = (<span className="text-orange-300">specs</span>: <span className="text-yellow-200">Requirements</span>) =&gt; {'{'}</p>
                    <p className="pl-4 text-zinc-500">// AI-assisted analysis initialized...</p>
                    <p className="pl-4"><span className="text-purple-400">return</span> <span className="text-purple-400">new</span> <span className="text-yellow-200">Architecture</span>(specs);</p>
                    <p>{'}'}</p>
                </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};