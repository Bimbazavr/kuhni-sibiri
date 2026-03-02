import { useState } from 'react';
import { Ruler, Clock, Shield, Palette, ChevronRight } from 'lucide-react';
import { getConfig } from '@/config';
import { useCustomImage } from '@/hooks/useCustomImage';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

const iconMap: Record<string, React.ElementType> = {
  ruler: Ruler,
  clock: Clock,
  shield: Shield,
  cube: Palette,
  palette: Palette,
  factory: Clock,
  truck: ChevronRight,
};

export function Hero() {
  const config = getConfig();
  const heroBg = useCustomImage('hero-bg', '/images/hero-bg.jpg');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', phone: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Здесь будет отправка формы
    setIsSubmitted(true);
    setTimeout(() => {
      setIsModalOpen(false);
      setIsSubmitted(false);
      setFormData({ name: '', phone: '' });
    }, 2000);
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Фоновое изображение с оверлеем */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${heroBg})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50" />
      </div>

      {/* Декоративные элементы */}
      <div className="absolute top-1/4 right-10 w-px h-40 bg-gradient-to-b from-transparent via-amber-500/50 to-transparent hidden lg:block" />
      <div className="absolute bottom-1/4 right-20 w-px h-60 bg-gradient-to-b from-transparent via-amber-500/30 to-transparent hidden lg:block" />

      {/* Контент */}
      <div className="relative z-10 container mx-auto px-4 lg:px-8 pt-32 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Левая колонка - текст */}
          <div className="space-y-8">
            <div className="space-y-4">
              <p className="text-amber-400 font-medium tracking-wider uppercase text-sm">
                {config.city} • {config.region}
              </p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-serif font-bold text-white leading-tight">
                <span className="text-gold-gradient">{config.utp.title}</span>
                <br />
                <span className="text-white">от производителя</span>
              </h1>
              <p className="text-lg sm:text-xl text-white/80 max-w-xl">
                {config.utp.subtitle}
              </p>
            </div>

            {/* Преимущества */}
            <div className="grid grid-cols-2 gap-4">
              {config.utp.benefits.map((benefit, index) => {
                const Icon = iconMap[benefit.icon] || Shield;
                return (
                  <div key={index} className="flex items-start gap-3">
                    <div className="icon-gold flex-shrink-0">
                      <Icon className="w-6 h-6 text-amber-400" />
                    </div>
                    <div>
                      <p className="text-white font-medium text-sm">{benefit.title}</p>
                      <p className="text-white/60 text-xs">{benefit.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* CTA кнопки */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => setIsModalOpen(true)}
                className="btn-gold flex items-center justify-center gap-2"
              >
                Получить дизайн-проект
                <ChevronRight className="w-5 h-5" />
              </button>
              <a
                href="#portfolio"
                className="px-8 py-4 border border-white/30 text-white rounded-sm hover:bg-white/10 transition-colors text-center"
              >
                Смотреть работы
              </a>
            </div>

            {/* Статистика */}
            <div className="flex gap-8 pt-4">
              <div>
                <p className="text-3xl font-serif font-bold text-amber-400">500+</p>
                <p className="text-white/60 text-sm">Проектов</p>
              </div>
              <div>
                <p className="text-3xl font-serif font-bold text-amber-400">8 лет</p>
                <p className="text-white/60 text-sm">Опыта</p>
              </div>
              <div>
                <p className="text-3xl font-serif font-bold text-amber-400">30 дн</p>
                <p className="text-white/60 text-sm">Срок</p>
              </div>
            </div>
          </div>

          {/* Правая колонка - форма */}
          <div className="hidden lg:block">
            <div className="glass rounded-lg p-8 max-w-md ml-auto">
              <h3 className="text-2xl font-serif text-white mb-2">
                Бесплатный расчет стоимости
              </h3>
              <p className="text-white/60 mb-6">
                Оставьте заявку и получите 3D-проект кухни бесплатно
              </p>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <input
                    type="text"
                    placeholder="Ваше имя"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="input-gold w-full"
                    required
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    placeholder="Ваш телефон"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="input-gold w-full"
                    required
                  />
                </div>
                <button type="submit" className="btn-gold w-full">
                  Получить расчет
                </button>
              </form>
              <p className="text-white/40 text-xs text-center mt-4">
                Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Модальное окно формы */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="bg-zinc-900 border-zinc-700 text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-serif text-center">
              Получить дизайн-проект
            </DialogTitle>
          </DialogHeader>
          {isSubmitted ? (
            <div className="text-center py-8">
              <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-green-500" />
              </div>
              <h4 className="text-xl font-medium text-white mb-2">Спасибо!</h4>
              <p className="text-white/60">Мы свяжемся с вами в ближайшее время</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <div>
                <label className="text-white/80 text-sm mb-2 block">Ваше имя</label>
                <input
                  type="text"
                  placeholder="Иван"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="input-gold w-full"
                  required
                />
              </div>
              <div>
                <label className="text-white/80 text-sm mb-2 block">Ваш телефон</label>
                <input
                  type="tel"
                  placeholder="+7 (___) ___-__-__"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="input-gold w-full"
                  required
                />
              </div>
              <button type="submit" className="btn-gold w-full">
                Отправить заявку
              </button>
              <p className="text-white/40 text-xs text-center">
                Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
              </p>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
