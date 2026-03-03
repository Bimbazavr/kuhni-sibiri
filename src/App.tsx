import { useEffect } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Hero } from '@/sections/Hero';
import { QualityReliability } from '@/sections/QualityReliability';
import { Portfolio } from '@/sections/Portfolio';
import { CatalogDownload } from '@/sections/CatalogDownload';
import { Calculator } from '@/sections/Calculator';
import { Advantages } from '@/sections/Advantages';
import { MaterialsTabs } from '@/sections/MaterialsTabs';
import { Process } from '@/sections/Process';
import { Testimonials } from '@/sections/Testimonials';
import { FAQ } from '@/sections/FAQ';
import { Consultation } from '@/sections/Consultation';
import { Crosssell } from '@/sections/Crosssell';
import './App.css';

function App() {
  useEffect(() => {
    document.title = 'Кухни на заказ в Иркутске | Кухни Сибири — производство мебели';

    // Schema.org
    const schema = document.createElement('script');
    schema.type = 'application/ld+json';
    schema.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: 'Кухни Сибири',
      description: 'Производство кухонь на заказ в Иркутске. Бесплатный замер и 3D-проект.',
      url: window.location.origin,
      telephone: '+79041230123',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Иркутск',
        addressRegion: 'Иркутская область',
        addressCountry: 'RU',
      },
      openingHours: 'Mo-Fr 09:00-19:00, Sa 10:00-16:00',
      priceRange: '$$$$',
    });
    document.head.appendChild(schema);
    return () => { document.head.removeChild(schema); };
  }, []);

  return (
    <div style={{backgroundColor:'#1A1A1A', minHeight:'100vh'}}>
      <Header />
      <main>
        <Hero />
        <QualityReliability />
        <Portfolio />
        <CatalogDownload />
        <Calculator />
        <Advantages />
        <MaterialsTabs />
        <Process />
        <Testimonials />
        <FAQ />
        <Consultation />
        <Crosssell />
      </main>
      <Footer />
    </div>
  );
}

export default App;
