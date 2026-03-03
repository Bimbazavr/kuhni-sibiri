import { useState } from 'react';
import { Phone, Check } from 'lucide-react';

export function Consultation() {
  const [phone, setPhone] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setPhone('');
    setTimeout(() => setSent(false), 5000);
  };

  return (
    <section id="consultation" className="py-24 relative overflow-hidden" style={{backgroundColor:'#111111'}}>
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <p className="section-label">Бесплатно</p>
            <h2 className="section-title mb-6">БЕСПЛАТНАЯ <span>КОНСУЛЬТАЦИЯ</span></h2>
            <p className="text-[#B0B0B0] text-base leading-relaxed mb-8 max-w-md">
              Оставьте номер телефона — перезвоним в течение 15 минут. Ответим на все вопросы, обсудим ваши пожелания и примерный бюджет.
            </p>

            <div className="space-y-4 mb-10">
              {['Бесплатный выезд замерщика','3D-проект кухни в подарок','Расчёт стоимости за 24 часа','Фиксация цены в договоре'].map((item, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0" style={{backgroundColor:'rgba(224,201,184,0.15)', border:'1px solid #E0C9B8'}}>
                    <Check className="w-3 h-3" style={{color:'#E0C9B8'}} />
                  </div>
                  <span className="text-[#B0B0B0] text-sm">{item}</span>
                </div>
              ))}
            </div>

            {sent ? (
              <div className="rounded-xl p-6 flex items-center gap-4" style={{backgroundColor:'rgba(224,201,184,0.1)', border:'1px solid #E0C9B8'}}>
                <div className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0" style={{backgroundColor:'#E0C9B8'}}>
                  <Check className="w-6 h-6 text-[#1A1A1A]" />
                </div>
                <div>
                  <p className="text-white font-bold">Заявка принята!</p>
                  <p className="text-[#B0B0B0] text-sm">Перезвоним вам в течение 15 минут</p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md">
                <input type="tel" placeholder="+7 (___) ___-__-__" value={phone}
                  onChange={e => setPhone(e.target.value)} required className="input-dark flex-1" />
                <button type="submit" className="btn-accent flex items-center gap-2 whitespace-nowrap">
                  <Phone className="w-4 h-4" /> Отправить
                </button>
              </form>
            )}
            <p className="text-[#444] text-xs mt-3">Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности</p>
          </div>

          {/* Right */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden aspect-[4/3]" style={{backgroundColor:'#242424'}}>
              <img src="./images/portfolio/kitchen-3.jpg" alt="Бесплатная консультация"
                className="w-full h-full object-cover opacity-75" />
              <div className="absolute inset-0" style={{background:'linear-gradient(135deg, transparent 50%, rgba(26,26,26,0.8))'}} />
              <div className="absolute top-6 right-6 rounded-xl p-4" style={{backgroundColor:'rgba(224,201,184,0.95)'}}>
                <p className="font-black text-3xl text-[#1A1A1A]" style={{fontFamily:'Montserrat,sans-serif'}}>15 мин</p>
                <p className="text-[#1A1A1A] text-xs font-medium">время ответа</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
