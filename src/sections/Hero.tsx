import { useState } from 'react';
import { ChevronRight, Check } from 'lucide-react';

export function Hero() {
  const [form, setForm] = useState({ name: '', phone: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: '', phone: '' });
    setTimeout(() => setSent(false), 4000);
  };

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* BG */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/images/hero-bg.jpg')" }} />
        <div className="absolute inset-0" style={{background:'linear-gradient(135deg, rgba(26,26,26,0.92) 0%, rgba(26,26,26,0.75) 60%, rgba(26,26,26,0.50) 100%)'}} />
      </div>

      {/* Декор линии */}
      <div className="absolute right-0 top-1/4 w-px h-64 hidden xl:block" style={{background:'linear-gradient(to bottom, transparent, rgba(224,201,184,0.3), transparent)'}} />

      <div className="relative z-10 container mx-auto px-4 lg:px-8 pt-28 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <div className="space-y-8">
            <div className="space-y-2">
              <p className="section-label">Иркутск • Производство кухонь</p>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black uppercase leading-none tracking-tight" style={{fontFamily:'Montserrat,sans-serif'}}>
                КУХНИ
              </h1>
              <p className="text-xl sm:text-2xl font-medium text-[#E0C9B8] uppercase tracking-wider" style={{fontFamily:'Montserrat,sans-serif'}}>
                Модульная архитектура<br />сердца дома
              </p>
              <p className="text-[#B0B0B0] text-base max-w-lg pt-2 leading-relaxed">
                Создаём кухни, которые объединяют пространство и комфорт. Индивидуальный подход, собственное производство, гарантия 2 года.
              </p>
            </div>

            {/* Benefits */}
            <div className="grid grid-cols-2 gap-3">
              {[
                '50+ сотрудников в команде',
                'Срок изготовления 30 дней',
                'Бесплатный замер и 3D-проект',
                'Гарантия 2 года на продукцию',
              ].map((b, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{backgroundColor:'rgba(224,201,184,0.2)', border:'1px solid #E0C9B8'}}>
                    <Check className="w-3 h-3" style={{color:'#E0C9B8'}} />
                  </div>
                  <span className="text-sm text-[#B0B0B0]">{b}</span>
                </div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <button onClick={() => scrollTo('#calculator')} className="btn-accent flex items-center gap-2">
                Рассчитать стоимость <ChevronRight className="w-4 h-4" />
              </button>
              <button onClick={() => scrollTo('#portfolio')} className="btn-outline">
                Смотреть проекты
              </button>
            </div>

            {/* Stats */}
            <div className="flex gap-8 pt-2 border-t border-[#333]">
              {[['500+','проектов'],['8 лет','опыта'],['30 дн','срок'],['2 г.','гарантия']].map(([v,l]) => (
                <div key={l}>
                  <p className="text-2xl font-black" style={{color:'#E0C9B8', fontFamily:'Montserrat,sans-serif'}}>{v}</p>
                  <p className="text-xs text-[#B0B0B0] mt-0.5">{l}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — form */}
          <div className="hidden lg:block">
            <div className="rounded-xl p-8 max-w-sm ml-auto" style={{backgroundColor:'rgba(36,36,36,0.9)', border:'1px solid #333', backdropFilter:'blur(10px)'}}>
              {sent ? (
                <div className="text-center py-8">
                  <div className="w-14 h-14 rounded-full mx-auto mb-4 flex items-center justify-center" style={{backgroundColor:'rgba(224,201,184,0.15)', border:'1px solid #E0C9B8'}}>
                    <Check className="w-7 h-7" style={{color:'#E0C9B8'}} />
                  </div>
                  <h3 className="text-white font-bold text-xl mb-2">Заявка отправлена!</h3>
                  <p className="text-[#B0B0B0] text-sm">Мы свяжемся с вами в ближайшее время</p>
                </div>
              ) : (
                <>
                  <h3 className="text-white font-bold text-xl uppercase tracking-wide mb-1" style={{fontFamily:'Montserrat,sans-serif'}}>Оставить заявку</h3>
                  <p className="text-[#B0B0B0] text-sm mb-6">Получите бесплатный 3D-проект вашей кухни</p>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <input type="text" placeholder="Ваше имя" value={form.name}
                      onChange={e => setForm({...form, name: e.target.value})}
                      className="input-dark" required />
                    <input type="tel" placeholder="+7 (___) ___-__-__" value={form.phone}
                      onChange={e => setForm({...form, phone: e.target.value})}
                      className="input-dark" required />
                    <button type="submit" className="btn-accent w-full">Получить расчёт</button>
                  </form>
                  <p className="text-[#555] text-xs text-center mt-4">Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности</p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[#555]">
        <span className="text-xs tracking-widest uppercase">Листайте</span>
        <div className="w-px h-10" style={{background:'linear-gradient(to bottom, #555, transparent)'}} />
      </div>
    </section>
  );
}
