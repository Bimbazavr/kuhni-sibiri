import { useState, useEffect } from 'react';
import { Phone, Menu, X, MessageCircle } from 'lucide-react';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 80);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#quality', label: 'О компании' },
    { href: '#portfolio', label: 'Проекты' },
    { href: '#calculator', label: 'Калькулятор' },
    { href: '#process', label: 'Этапы' },
    { href: '#faq', label: 'FAQ' },
  ];

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
      isScrolled ? 'bg-[#1A1A1A]/95 backdrop-blur-md shadow-lg py-3' : 'bg-transparent py-5'
    }`}>
      <div className="container mx-auto px-4 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="flex items-center gap-3" onClick={() => window.scrollTo({top:0,behavior:'smooth'})}>
          <div className="w-9 h-9 rounded-sm flex items-center justify-center" style={{backgroundColor:'#E0C9B8'}}>
            <span className="font-black text-sm text-[#1A1A1A]">КС</span>
          </div>
          <div>
            <span className="font-black text-white text-lg tracking-wide uppercase" style={{fontFamily:'Montserrat,sans-serif'}}>
              Кухни Сибири
            </span>
            <p className="text-[10px] text-[#B0B0B0] tracking-wider uppercase">Иркутск • Производство</p>
          </div>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-7">
          {navLinks.map(l => (
            <button key={l.href} onClick={() => scrollTo(l.href)}
              className="text-sm font-medium text-[#B0B0B0] hover:text-[#E0C9B8] transition-colors tracking-wide">
              {l.label}
            </button>
          ))}
        </nav>

        {/* Right actions */}
        <div className="hidden lg:flex items-center gap-4">
          <a href="tel:89041230123" className="flex items-center gap-2 text-white hover:text-[#E0C9B8] transition-colors text-sm font-medium">
            <Phone className="w-4 h-4" />
            8 (904) 123-01-23
          </a>
          <a href="https://wa.me/79041230123" target="_blank" rel="noreferrer"
            className="flex items-center gap-2 text-[#25D366] hover:opacity-80 transition-opacity">
            <MessageCircle className="w-4 h-4" />
          </a>
          <button onClick={() => scrollTo('#consultation')} className="btn-accent text-sm px-5 py-2.5">
            Оставить заявку
          </button>
        </div>

        {/* Mobile toggle */}
        <button className="lg:hidden text-white p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      <div className={`lg:hidden fixed inset-0 top-[60px] transition-all duration-300 ${
        isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible pointer-events-none'
      }`} style={{background:'rgba(26,26,26,0.98)', backdropFilter:'blur(12px)'}}>
        <nav className="flex flex-col items-center justify-center h-full gap-8 px-8">
          {navLinks.map(l => (
            <button key={l.href} onClick={() => scrollTo(l.href)}
              className="text-2xl font-bold uppercase tracking-wider text-white hover:text-[#E0C9B8] transition-colors">
              {l.label}
            </button>
          ))}
          <a href="tel:89041230123" className="flex items-center gap-2 text-[#E0C9B8] text-xl mt-4">
            <Phone className="w-5 h-5" /> 8 (904) 123-01-23
          </a>
          <button onClick={() => scrollTo('#consultation')} className="btn-accent mt-2">
            Оставить заявку
          </button>
        </nav>
      </div>
    </header>
  );
}
