import { Phone, Mail, MapPin, Instagram, Send, MessageCircle } from 'lucide-react';
import { getConfig } from '@/config';

export function Footer() {
  const config = getConfig();
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: 'Каталог',
      links: [
        { label: 'Кухни', href: '#catalog' },
        { label: 'Шкафы-купе', href: '#catalog' },
        { label: 'Гардеробные', href: '#catalog' },
        { label: 'Другая мебель', href: '#catalog' },
      ],
    },
    {
      title: 'Информация',
      links: [
        { label: 'О компании', href: '#about' },
        { label: 'Портфолио', href: '#portfolio' },
        { label: 'Процесс работы', href: '#process' },
        { label: 'Отзывы', href: '#testimonials' },
      ],
    },
    {
      title: 'Клиентам',
      links: [
        { label: 'Доставка и сборка', href: '#process' },
        { label: 'Гарантия', href: '#faq' },
        { label: 'Оплата', href: '#faq' },
        { label: 'Вопросы и ответы', href: '#faq' },
      ],
    },
  ];

  return (
    <footer className="bg-[#050D1A] border-t border-white/10">
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Логотип и контакты */}
          <div className="lg:col-span-2">
            <a href="#" className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
                <span className="text-white font-bold text-xl">КС</span>
              </div>
              <div>
                <span className="text-2xl font-serif font-semibold text-white">
                  Кухни <span className="text-emerald-400">Сибири</span>
                </span>
              </div>
            </a>
            <p className="text-white/60 mb-6 max-w-sm">
              Производство премиальной мебели на заказ в Иркутске. Индивидуальный дизайн, качественные материалы, гарантия 2 года.
            </p>

            <div className="space-y-3">
              <a
                href={`tel:${config.phone}`}
                className="flex items-center gap-3 text-white hover:text-emerald-400 transition-colors"
              >
                <Phone className="w-5 h-5 text-emerald-400" />
                <span>{config.phoneFormatted}</span>
              </a>
              <a
                href={`mailto:${config.email}`}
                className="flex items-center gap-3 text-white hover:text-emerald-400 transition-colors"
              >
                <Mail className="w-5 h-5 text-emerald-400" />
                <span>{config.email}</span>
              </a>
              <div className="flex items-center gap-3 text-white/60">
                <MapPin className="w-5 h-5 text-emerald-400" />
                <span>{config.address}</span>
              </div>
            </div>
          </div>

          {/* Ссылки */}
          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className="text-white font-medium mb-4">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-white/60 hover:text-emerald-400 transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Нижняя часть */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/40 text-sm">
            © {currentYear} {config.siteName}. Все права защищены.
          </p>

          {/* Социальные сети */}
          <div className="flex gap-4">
            {config.social.instagram && (
              <a
                href={config.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-emerald-500/20 transition-colors"
              >
                <Instagram className="w-5 h-5 text-white/60" />
              </a>
            )}
            {config.social.telegram && (
              <a
                href={config.social.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-emerald-500/20 transition-colors"
              >
                <Send className="w-5 h-5 text-white/60" />
              </a>
            )}
            {config.social.whatsapp && (
              <a
                href={config.social.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-emerald-500/20 transition-colors"
              >
                <MessageCircle className="w-5 h-5 text-white/60" />
              </a>
            )}
          </div>

          <div className="flex gap-6 text-sm">
            <a href="#" className="text-white/40 hover:text-white transition-colors">
              Политика конфиденциальности
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
