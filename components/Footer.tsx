import React from 'react';
import { ArrowUpRight, Github, Twitter, Linkedin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-zinc-50 dark:bg-zinc-950 pt-24 pb-12 border-t border-zinc-200 dark:border-zinc-800 relative z-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">
              Ready to build something <br />
              <span className="text-zinc-500">exceptional?</span>
            </h3>
            <button className="bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 px-8 py-4 rounded-lg font-bold text-lg hover:opacity-90 transition-opacity w-full md:w-auto">
              Schedule Consultation
            </button>
          </div>
          
          <div>
            <h4 className="font-bold text-zinc-900 dark:text-white mb-4">Studio</h4>
            <ul className="space-y-3 text-sm text-zinc-600 dark:text-zinc-400">
              <li><a href="#" className="hover:text-brand-500 transition-colors">Work</a></li>
              <li><a href="#" className="hover:text-brand-500 transition-colors">Services</a></li>
              <li><a href="#" className="hover:text-brand-500 transition-colors">About</a></li>
              <li><a href="#" className="hover:text-brand-500 transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-zinc-900 dark:text-white mb-4">Connect</h4>
            <div className="flex gap-4">
               <a href="#" className="text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"><Twitter size={20} /></a>
               <a href="#" className="text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"><Github size={20} /></a>
               <a href="#" className="text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"><Linkedin size={20} /></a>
            </div>
            <p className="mt-6 text-xs text-zinc-500">
                &copy; {new Date().getFullYear()} Project.ly Inc.<br/>
                All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};