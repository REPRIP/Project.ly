import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Features } from './components/Features';
import { Services } from './components/Services';
import { WhyUs } from './components/WhyUs';
import { Footer } from './components/Footer';
import { Pricing } from './components/Pricing';
import { Testimonials } from './components/Testimonials';
import { ContactWizard } from './components/ContactWizard';

function App() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  const openContact = () => setIsContactOpen(true);

  return (
    <div className="min-h-screen">
      <Navbar onOpenContact={openContact} />

      <main className="relative">
        {/* Hero now contains the 3D Scene internally */}
        <Hero onOpenContact={openContact} />
        <Features />
        <Services />
        <WhyUs />
        <Testimonials />
        <Pricing onOpenContact={openContact} />
        <ContactWizard isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />
      </main>

      <Footer />
    </div>
  );
}

export default App;