import { useState, useEffect } from 'react';
import { Phone, Menu, X } from 'lucide-react';
import { getConfig } from '@/config';
import { useCustomImage } from '@/hooks/useCustomImage';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const config = getConfig();
  const logoSrc = useCustomImage('logo', '');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#catalog', label: 'Каталог' },
    { href: '#portfolio', label: 'Портфолио' },
    { href: '#process', label: 'Процесс' },
    { href: '#about', label: 'О нас' },
    { href: '#contacts', label: 'Контакты' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-black/95 backdrop-blur-md py-3 shadow-lg'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Логотип */}
          <a href="#" className="flex items-center gap-3">
            {logoSrc ? (
              <img
                src={logoSrc}
                alt={config.logo.alt}
                className="h-10 w-auto object-contain"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
                <span className="text-black font-bold text-lg">КС</span>
              </div>
            )}
            <div className="hidden sm:block">
              <span className="text-xl font-serif font-semibold text-white">
                Кухни <span className="text-amber-500">Сибири</span>
              </span>
              <p className="text-xs text-white/60">Премиум мебель на заказ</p>
            </div>
          </a>

          {/* Навигация - десктоп */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollToSection(link.href)}
                className="nav-link text-sm font-medium"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Контакты и CTA */}
          <div className="hidden lg:flex items-center gap-6">
            <a
              href={`tel:${config.phone}`}
              className="flex items-center gap-2 text-white hover:text-amber-400 transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span className="font-medium">{config.phoneFormatted}</span>
            </a>
            <button
              onClick={() => scrollToSection('#contacts')}
              className="btn-gold text-sm"
            >
              Вызвать замерщика
            </button>
          </div>

          {/* Мобильное меню - кнопка */}
          <button
            className="lg:hidden text-white p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Мобильное меню */}
      <div
        className={`lg:hidden fixed inset-0 top-[60px] bg-black/98 backdrop-blur-lg transition-all duration-300 ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
      >
        <nav className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link) => (
            <button
              key={link.href}
              onClick={() => scrollToSection(link.href)}
              className="text-2xl font-serif text-white hover:text-amber-400 transition-colors"
            >
              {link.label}
            </button>
          ))}
          <a
            href={`tel:${config.phone}`}
            className="flex items-center gap-2 text-amber-400 text-xl mt-4"
          >
            <Phone className="w-5 h-5" />
            <span>{config.phoneFormatted}</span>
          </a>
          <button
            onClick={() => scrollToSection('#contacts')}
            className="btn-gold mt-4"
          >
            Вызвать замерщика
          </button>
        </nav>
      </div>
    </header>
  );
}
