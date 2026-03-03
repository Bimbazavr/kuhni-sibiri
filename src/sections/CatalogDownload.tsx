import { Download, MessageCircle, ChevronRight } from 'lucide-react';
import { useState } from 'react';

export function CatalogDownload() {
  const [phone, setPhone] = useState('');
  const [sent, setSent] = useState(false);

  const handleWA = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <section className="relative py-20 overflow-hidden">
      {/* BG */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url('/images/about/materials.jpg')" }} />
        <div className="absolute inset-0" style={{background:'rgba(26,26,26,0.88)'}} />
      </div>

      <div className="relative z-10 container mx-auto px-4 lg:px-8">
        <div className="max-w-2xl mx-auto text-center">
          <p className="section-label">Бесплатно</p>
          <h2 className="section-title mb-4">НЕ СМОГЛИ <span>ПОДОБРАТЬ</span> ВАРИАНТ?</h2>
          <p className="text-[#B0B0B0] text-base mb-10 leading-relaxed">
            Скачайте каталог кухонь 2024 — более 200 готовых дизайн-проектов с ценами, планировками и материалами. Или получите его прямо в WhatsApp.
          </p>

          <form onSubmit={handleWA} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-6">
            <div className="flex flex-1 items-center rounded-sm overflow-hidden" style={{backgroundColor:'#333', border:'1px solid #444'}}>
              <span className="px-3 text-[#B0B0B0] text-sm flex-shrink-0">🇷🇺 +7</span>
              <input
                type="tel"
                placeholder="(___) ___-__-__"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                required
                className="flex-1 px-3 py-3 bg-transparent text-white text-sm outline-none"
              />
            </div>
            <button type="submit" className="btn-accent flex items-center gap-2 text-sm px-5 py-3 whitespace-nowrap">
              <MessageCircle className="w-4 h-4" />
              {sent ? 'Отправлено!' : 'Получить в WhatsApp'}
            </button>
          </form>

          <button className="btn-outline flex items-center gap-2 mx-auto text-sm">
            <Download className="w-4 h-4" />
            Скачать каталог PDF
            <ChevronRight className="w-4 h-4" />
          </button>

          <p className="text-[#555] text-xs mt-5">Без спама. Только полезные материалы и акции.</p>
        </div>
      </div>
    </section>
  );
}
