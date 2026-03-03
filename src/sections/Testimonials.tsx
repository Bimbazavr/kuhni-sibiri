import { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { getConfig } from '@/config';

export function Testimonials() {
  const config = getConfig();
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % config.testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + config.testimonials.length) % config.testimonials.length);
  };

  const currentTestimonial = config.testimonials[currentIndex];

  return (
    <section className="py-24 bg-[#050D1A] relative overflow-hidden">
      {/* Декоративный фон */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Заголовок */}
        <div className="text-center mb-16">
          <p className="text-emerald-400 font-medium tracking-wider uppercase text-sm mb-4">
            Отзывы
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white mb-4">
            Что говорят наши клиенты
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            Реальные отзывы из Иркутска и Иркутской области
          </p>
        </div>

        {/* Карусель отзывов */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Основной отзыв */}
            <div className="glass rounded-2xl p-8 md:p-12 text-center">
              {/* Иконка кавычек */}
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-8">
                <Quote className="w-8 h-8 text-emerald-400" />
              </div>

              {/* Рейтинг */}
              <div className="flex justify-center gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < currentTestimonial.rating
                        ? 'text-orange-400 fill-orange-400'
                        : 'text-white/20'
                    }`}
                  />
                ))}
              </div>

              {/* Текст отзыва */}
              <p className="text-lg md:text-xl text-white/90 leading-relaxed mb-8 max-w-2xl mx-auto">
                "{currentTestimonial.text}"
              </p>

              {/* Автор */}
              <div>
                <p className="text-white font-medium text-lg">{currentTestimonial.name}</p>
                {currentTestimonial.project && (
                  <p className="text-emerald-400 text-sm">{currentTestimonial.project}</p>
                )}
                <p className="text-white/40 text-sm mt-1">{currentTestimonial.date}</p>
              </div>
            </div>

            {/* Кнопки навигации */}
            <button
              onClick={prevTestimonial}
              className="absolute left-2 top-1/2 -translate-y-1/2 md:left-0 md:-translate-x-14 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
            <button
              onClick={nextTestimonial}
              className="absolute right-2 top-1/2 -translate-y-1/2 md:right-0 md:translate-x-14 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>
          </div>

          {/* Индикаторы */}
          <div className="flex justify-center gap-2 mt-8">
            {config.testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? 'w-8 bg-emerald-400'
                    : 'bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Статистика */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <p className="text-4xl font-serif font-bold text-orange-400">4.9</p>
            <p className="text-white/60 text-sm">Средний рейтинг</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-serif font-bold text-orange-400">500+</p>
            <p className="text-white/60 text-sm">Довольных клиентов</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-serif font-bold text-orange-400">98%</p>
            <p className="text-white/60 text-sm">Рекомендуют нас</p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-serif font-bold text-orange-400">150+</p>
            <p className="text-white/60 text-sm">Отзывов</p>
          </div>
        </div>
      </div>
    </section>
  );
}
