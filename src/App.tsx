import { useEffect } from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Hero } from '@/sections/Hero';
import { Categories } from '@/sections/Categories';
import { Portfolio } from '@/sections/Portfolio';
import { Process } from '@/sections/Process';
import { Testimonials } from '@/sections/Testimonials';
import { About } from '@/sections/About';
import { FAQ } from '@/sections/FAQ';
import { Contacts } from '@/sections/Contacts';
import { getConfig } from '@/config';
import './App.css';

function App() {
  // SEO оптимизация
  useEffect(() => {
    const config = getConfig();
    
    // Установка title
    document.title = config.seo.title;
    
    // Установка meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', config.seo.description);
    
    // Установка meta keywords
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (!metaKeywords) {
      metaKeywords = document.createElement('meta');
      metaKeywords.setAttribute('name', 'keywords');
      document.head.appendChild(metaKeywords);
    }
    metaKeywords.setAttribute('content', config.seo.keywords.join(', '));
    
    // Open Graph meta tags
    const ogTags = [
      { property: 'og:title', content: config.seo.title },
      { property: 'og:description', content: config.seo.description },
      { property: 'og:type', content: 'website' },
      { property: 'og:locale', content: 'ru_RU' },
      { property: 'og:image', content: config.seo.ogImage },
    ];
    
    ogTags.forEach(({ property, content }) => {
      let meta = document.querySelector(`meta[property="${property}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute('property', property);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    });
    
    // Schema.org микроразметка для локального бизнеса
    const schemaScript = document.createElement('script');
    schemaScript.type = 'application/ld+json';
    schemaScript.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      name: config.siteName,
      description: config.siteDescription,
      url: window.location.origin,
      telephone: config.phone,
      email: config.email,
      address: {
        '@type': 'PostalAddress',
        addressLocality: config.city,
        addressRegion: config.region,
        streetAddress: config.address,
        addressCountry: 'RU',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: config.contacts.mapCoordinates.lat,
        longitude: config.contacts.mapCoordinates.lng,
      },
      openingHours: 'Mo-Fr 09:00-19:00, Sa 10:00-16:00',
      priceRange: '$$$$',
      image: config.seo.ogImage,
    });
    document.head.appendChild(schemaScript);
    
    return () => {
      document.head.removeChild(schemaScript);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#050D1A]">
      <Header />
      <main>
        <Hero />
        <Categories />
        <Portfolio />
        <Process />
        <Testimonials />
        <About />
        <FAQ />
        <Contacts />
      </main>
      <Footer />
    </div>
  );
}

export default App;
