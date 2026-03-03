import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { getConfig } from '@/config';

export function FAQ() {
  const config = getConfig();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleQuestion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 bg-[#050D1A]">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Левая колонка - заголовок */}
          <div>
            <p className="text-emerald-400 font-medium tracking-wider uppercase text-sm mb-4">
              FAQ
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white mb-6">
              Часто задаваемые вопросы
            </h2>
            <p className="text-white/60 text-lg mb-8">
              Не нашли ответ на свой вопрос? Свяжитесь с нами удобным способом.
            </p>
            <a
              href="#contacts"
              className="btn-gold inline-block"
            >
              Задать вопрос
            </a>
          </div>

          {/* Правая колонка - вопросы */}
          <div className="space-y-4">
            {config.faq.map((item, index) => (
              <div
                key={index}
                className="border border-white/10 rounded-lg overflow-hidden"
              >
                <button
                  onClick={() => toggleQuestion(index)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-white/5 transition-colors"
                >
                  <span className="text-white font-medium pr-4">{item.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-emerald-400 flex-shrink-0 transition-transform ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    openIndex === index ? 'max-h-96' : 'max-h-0'
                  }`}
                >
                  <div className="p-5 pt-0 text-white/70 leading-relaxed">
                    {item.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
