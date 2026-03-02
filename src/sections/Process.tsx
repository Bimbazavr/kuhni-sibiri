import { Ruler, Palette, Factory, Truck } from 'lucide-react';
import { getConfig } from '@/config';

const iconMap: Record<string, React.ElementType> = {
  ruler: Ruler,
  palette: Palette,
  factory: Factory,
  truck: Truck,
};

export function Process() {
  const config = getConfig();

  return (
    <section id="process" className="py-24 bg-zinc-950 relative overflow-hidden">
      {/* Декоративный фон */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-amber-500 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Заголовок */}
        <div className="text-center mb-16">
          <p className="text-amber-400 font-medium tracking-wider uppercase text-sm mb-4">
            Как мы работаем
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white mb-4">
            Процесс создания мебели
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            От замера до установки — всего 4 простых шага
          </p>
        </div>

        {/* Шаги */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {config.process.map((step) => {
            const Icon = iconMap[step.icon] || Ruler;
            return (
              <div key={step.step} className="text-center">
                {/* Иконка */}
                <div className="mb-6 flex justify-center">
                  <Icon className="w-12 h-12 text-amber-400" />
                </div>

                {/* Разделитель */}
                <div className="w-8 h-px bg-amber-500/60 mx-auto mb-5" />

                {/* Контент */}
                <h3 className="text-xl font-serif font-semibold text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-white/60 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Гарантии */}
        <div className="mt-20 grid sm:grid-cols-3 gap-6">
          <div className="glass rounded-lg p-6 text-center">
            <p className="text-3xl font-serif font-bold text-amber-400 mb-2">100%</p>
            <p className="text-white/80">Соблюдение сроков</p>
          </div>
          <div className="glass rounded-lg p-6 text-center">
            <p className="text-3xl font-serif font-bold text-amber-400 mb-2">0 ₽</p>
            <p className="text-white/80">Выезд и замер в Иркутске</p>
          </div>
          <div className="glass rounded-lg p-6 text-center">
            <p className="text-3xl font-serif font-bold text-amber-400 mb-2">2 года</p>
            <p className="text-white/80">Гарантия на всю мебель</p>
          </div>
        </div>
      </div>
    </section>
  );
}
