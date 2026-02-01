import React, { useState, useEffect } from 'react';
import { ThemeToggle } from './ThemeToggle';
import { Menu, X, ArrowRight } from 'lucide-react';

export const Navbar: React.FC<{ onOpenContact: () => void }> = ({ onOpenContact }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Process', href: '#process' },
    { name: 'Services', href: '#services' },
    { name: 'Philosophy', href: '#philosophy' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
        ? 'bg-zinc-50/80 dark:bg-zinc-950/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800 py-3'
        : 'bg-transparent py-5'
        }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
            Project.ly
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          <div className="flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                {link.name}
              </a>
            ))}
          </div>
          <div className="h-4 w-px bg-zinc-300 dark:bg-zinc-700"></div>
          {/*<ThemeToggle /> */}
          <a
            href="https://project-thinkk.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-full text-sm font-bold bg-gradient-to-r from-neon-blue to-neon-green text-zinc-900 hover:opacity-90 transition-opacity shadow-lg shadow-neon-blue/20"
          >
            Chat with ThinkBuddy
          </a>
          <button onClick={onOpenContact} className="bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 px-4 py-2 rounded-full text-sm font-semibold hover:opacity-90 transition-opacity flex items-center gap-2">
            Start a Project <ArrowRight size={14} />
          </button>
        </div>

        {/* Mobile Toggle */}
        <div className="flex md:hidden items-center gap-4">
          <ThemeToggle />
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-zinc-900 dark:text-zinc-100 p-1"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-zinc-50 dark:bg-zinc-950 border-b border-zinc-200 dark:border-zinc-800 p-6 shadow-xl">
          <div className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-lg font-medium text-zinc-800 dark:text-zinc-200"
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                {link.name}
              </a>
            ))}
            <a
              href="https://project-thinkk.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-gradient-to-r from-neon-blue to-neon-green text-zinc-900 px-4 py-3 rounded-lg text-center font-bold mt-4"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Chat with ThinkBuddy
            </a>
            <button onClick={() => { onOpenContact(); setIsMobileMenuOpen(false); }} className="w-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 px-4 py-3 rounded-lg text-center font-semibold text-sm">
              Start a Project
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};