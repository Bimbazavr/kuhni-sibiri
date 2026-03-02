import { Check } from 'lucide-react';
import { getConfig } from '@/config';
import { useCustomImage } from '@/hooks/useCustomImage';

export function About() {
  const config = getConfig();
  const img0 = useCustomImage('about-img-0', config.about.images[0] || '/images/about/factory-1.jpg');
  const img1 = useCustomImage('about-img-1', config.about.images[1] || '/images/about/factory-2.jpg');
  const img2 = useCustomImage('about-img-2', config.about.images[2] || '/images/about/materials.jpg');

  return (
    <section id="about" className="py-24 bg-zinc-950">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Левая колонка - изображения */}
          <div className="relative overflow-hidden p-6 -m-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div
                  className="aspect-[3/4] rounded-lg bg-cover bg-center"
                  style={{ backgroundImage: `url(${img0})` }}
                />
                <div
                  className="aspect-square rounded-lg bg-cover bg-center"
                  style={{ backgroundImage: `url(${img2})` }}
                />
              </div>
              <div className="pt-8">
                <div
                  className="aspect-[3/4] rounded-lg bg-cover bg-center"
                  style={{ backgroundImage: `url(${img1})` }}
                />
              </div>
            </div>

            {/* Декоративные элементы */}
            <div className="absolute bottom-0 right-0 w-24 h-24 border-2 border-amber-500/30 rounded-lg -z-10" />
            <div className="absolute top-0 left-0 w-24 h-24 border-2 border-amber-500/30 rounded-lg -z-10" />
          </div>

          {/* Правая колонка - контент */}
          <div>
            <p className="text-amber-400 font-medium tracking-wider uppercase text-sm mb-4">
              О производстве
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white mb-6">
              {config.about.title}
            </h2>
            <p className="text-white/70 text-lg leading-relaxed mb-8">
              {config.about.description}
            </p>

            {/* Преимущества */}
            <div className="space-y-4 mb-10">
              {config.about.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                    <Check className="w-4 h-4 text-amber-400" />
                  </div>
                  <span className="text-white/80">{feature}</span>
                </div>
              ))}
            </div>

            {/* Статистика */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {config.about.stats.map((stat, index) => (
                <div key={index} className="text-center sm:text-left">
                  <p className="text-3xl font-serif font-bold text-amber-400">{stat.value}</p>
                  <p className="text-white/60 text-sm">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Бренды материалов */}
        <div className="mt-24">
          <p className="text-center text-white/40 text-sm mb-8">Мы работаем с лучшими поставщиками</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            {config.materials.map((material, index) => (
              <div key={index} className="group text-center">
                <div className="w-24 h-24 mx-auto mb-3 rounded-lg bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-colors">
                  <span className="text-xl font-serif font-bold text-white/60 group-hover:text-amber-400 transition-colors">
                    {material.name}
                  </span>
                </div>
                <p className="text-white/40 text-xs">{material.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
