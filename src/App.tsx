import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { CustomCursor } from './components/CustomCursor';
import { Marquee } from './components/Marquee';

export default function App() {
  return (
    <div className="min-h-screen bg-brand-dark text-brand-light selection:bg-brand-emerald/30 selection:text-brand-light">
      <CustomCursor />
      <Navbar />
      
      <main>
        <Hero />
        <Marquee />
        <Services />
        <About />
        <Contact />
      </main>
      
      <Footer />
    </div>
  );
}
