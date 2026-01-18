import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { Services } from './components/Services';
import { WhyUs } from './components/WhyUs';
import { Footer } from './components/Footer';
import { Pricing } from './components/Pricing';
import { Testimonials } from './components/Testimonials';

function App() {
  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="relative">
        {/* Hero now contains the 3D Scene internally */}
        <Hero />
        <Features />
        <Services />
        <WhyUs />
        <Pricing />
        <Testimonials />
      </main>

      <Footer />
    </div>
  );
}

export default App;