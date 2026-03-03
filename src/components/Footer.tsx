import { Phone, Mail, MapPin, Instagram, MessageCircle, Send } from 'lucide-react';
import { useState } from 'react';

export function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 3000);
  };

  return (
    <footer style={{backgroundColor:'#111111'}} className="border-t border-[#333]">
      {/* Subscribe strip */}
      <div style={{backgroundColor:'#1D1D1D'}} className="py-10 border-b border-[#333]">
        <div className="container mx-auto px-4 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-white font-bold text-lg uppercase tracking-wide" style={{fontFamily:'Montserrat,sans-serif'}}>Подпишитесь на рассылку</p>
            <p className="text-[#B0B0B0] text-sm mt-1">Получайте информацию об эксклюзивных акциях и новых проектах</p>
          </div>
          <form onSubmit={handleSubscribe} className="flex gap-3 w-full max-w-md">
            <input
              type="email"
              placeholder="Ваш email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="input-dark flex-1 text-sm"
            />
            <button type="submit" className="btn-accent px-6 py-3 text-sm whitespace-nowrap">
              {subscribed ? 'Готово!' : 'Подписаться'}
            </button>
          </form>
        </div>
      </div>

      {/* Main footer */}
      <div className="container mx-auto px-4 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-sm flex items-center justify-center" style={{backgroundColor:'#E0C9B8'}}>
                <span className="font-black text-sm text-[#1A1A1A]">КС</span>
              </div>
              <span className="font-black text-white text-lg tracking-wide uppercase" style={{fontFamily:'Montserrat,sans-serif'}}>Кухни Сибири</span>
            </div>
            <p className="text-[#B0B0B0] text-sm leading-relaxed">
              Производство модульных кухонь под заказ в Иркутске. Качество, сроки, гарантия.
            </p>
            <div className="flex gap-3 pt-2">
              <a href="#" className="w-9 h-9 rounded-sm bg-[#242424] border border-[#333] flex items-center justify-center text-[#B0B0B0] hover:text-[#E0C9B8] hover:border-[#E0C9B8] transition-all">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://wa.me/79041230123" className="w-9 h-9 rounded-sm bg-[#242424] border border-[#333] flex items-center justify-center text-[#B0B0B0] hover:text-[#25D366] hover:border-[#25D366] transition-all">
                <MessageCircle className="w-4 h-4" />
              </a>
              <a href="#" className="w-9 h-9 rounded-sm bg-[#242424] border border-[#333] flex items-center justify-center text-[#B0B0B0] hover:text-[#0088cc] hover:border-[#0088cc] transition-all">
                <Send className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-white font-bold uppercase tracking-wider text-xs mb-5" style={{fontFamily:'Montserrat,sans-serif'}}>Навигация</p>
            <ul className="space-y-3">
              {['О компании','Реализованные проекты','Калькулятор','Материалы','Этапы работы','FAQ','Консультация'].map(item => (
                <li key={item}>
                  <a href="#" className="text-[#B0B0B0] text-sm hover:text-[#E0C9B8] transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <p className="text-white font-bold uppercase tracking-wider text-xs mb-5" style={{fontFamily:'Montserrat,sans-serif'}}>Продукция</p>
            <ul className="space-y-3">
              {['Кухни на заказ','Шкафы-купе','Гардеробные системы','Детские комнаты','Универсальные шкафы','Прихожие'].map(item => (
                <li key={item}>
                  <a href="#" className="text-[#B0B0B0] text-sm hover:text-[#E0C9B8] transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <p className="text-white font-bold uppercase tracking-wider text-xs mb-5" style={{fontFamily:'Montserrat,sans-serif'}}>Контакты</p>
            <div className="space-y-4">
              <a href="tel:89041230123" className="flex items-start gap-3 text-[#B0B0B0] hover:text-[#E0C9B8] transition-colors">
                <Phone className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span className="text-sm">8 (904) 123-01-23</span>
              </a>
              <a href="mailto:info@kuhni-sibiri.ru" className="flex items-start gap-3 text-[#B0B0B0] hover:text-[#E0C9B8] transition-colors">
                <Mail className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span className="text-sm">info@kuhni-sibiri.ru</span>
              </a>
              <div className="flex items-start gap-3 text-[#B0B0B0]">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span className="text-sm">г. Иркутск, ул. Советская, 55</span>
              </div>
              <p className="text-[#B0B0B0] text-xs pl-7">Пн–Пт: 9:00–19:00 · Сб: 10:00–16:00</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#333] py-5">
        <div className="container mx-auto px-4 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#666]">
          <p>© 2024 Кухни Сибири. Все права защищены.</p>
          <div className="flex gap-5">
            <a href="#" className="hover:text-[#B0B0B0] transition-colors">Политика конфиденциальности</a>
            <a href="#" className="hover:text-[#B0B0B0] transition-colors">Оферта</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
