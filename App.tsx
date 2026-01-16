import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { Services } from './components/Services';
import { WhyUs } from './components/WhyUs';
import { Footer } from './components/Footer';
import { Scene } from './components/Scene';

function App() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 transition-colors duration-500">
      <Navbar />
      
      <main className="relative">
        {/* 3D Scene Background - Fixed position to stay behind content but interactive */}
        <div className="fixed top-0 left-0 w-full h-screen z-0">
           <Scene />
        </div>

        {/* Content Sections - relative z-10 to sit above 3D scene where needed, or let 3D show through via transparency */}
        <Hero />
        <Features />
        <Services />
        <WhyUs />
      </main>

      <Footer />
    </div>
  );
}

export default App;