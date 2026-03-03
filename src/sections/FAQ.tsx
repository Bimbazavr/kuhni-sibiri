import { useState } from 'react';
import { Plus, Minus, MessageCircle } from 'lucide-react';

const faqs = [
  {
    q: 'Что потребуется для точного замера?',
    a: 'Нашему замерщику нужен доступ в помещение и наличие всех коммуникаций: розетки, водопровод, вытяжка. Замер занимает 30–60 минут. Если ремонт ещё не завершён — работаем по черновым замерам, приезжаем повторно перед установкой бесплатно.',
  },
  {
    q: 'Сколько времени занимает изготовление кухни?',
    a: 'Стандартный срок — 30 рабочих дней с момента подписания договора и внесения предоплаты. Для сложных проектов с нестандартными материалами — до 45 дней. Срок фиксируется в договоре.',
  },
  {
    q: 'Как подготовиться к монтажу кухни?',
    a: 'Нужно завершить все чистовые работы: укладку плитки, стяжку пола, покраску стен. Все коммуникации (электрика, водопровод) должны быть выведены в проектные места. Мы вышлем инструкцию по подготовке после заключения договора.',
  },
  {
    q: 'Как происходит оплата?',
    a: '50% предоплата при подписании договора, 50% по факту приёмки смонтированной кухни. Принимаем наличные, перевод на карту, безналичный расчёт. Возможна рассрочка 0% на 6 месяцев через банк-партнёр.',
  },
  {
    q: 'Как производится доставка?',
    a: 'Доставляем собственным транспортом по Иркутску бесплатно. Доставка по области — по договорённости. Все элементы упакованы в защитную плёнку, погрузка и подъём на этаж включены в стоимость монтажа.',
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="faq" className="py-24" style={{backgroundColor:'#1A1A1A'}}>
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-5 gap-16">
          {/* Left — FAQ */}
          <div className="lg:col-span-3">
            <p className="section-label">Вопросы и ответы</p>
            <h2 className="section-title mb-10">ОТВЕЧАЕМ <span>НА ВОПРОСЫ</span></h2>

            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <div key={i} className="rounded-xl overflow-hidden transition-all" style={{backgroundColor:'#242424', border:`1px solid ${open === i ? '#E0C9B8' : '#333'}`}}>
                  <button onClick={() => setOpen(open === i ? null : i)}
                    className="w-full flex items-center justify-between px-5 py-4 text-left gap-4">
                    <span className="text-white font-medium text-sm">{faq.q}</span>
                    <div className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center" style={{backgroundColor: open === i ? '#E0C9B8' : '#333'}}>
                      {open === i
                        ? <Minus className="w-3.5 h-3.5 text-[#1A1A1A]" />
                        : <Plus className="w-3.5 h-3.5 text-[#B0B0B0]" />}
                    </div>
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ${open === i ? 'max-h-60' : 'max-h-0'}`}>
                    <p className="px-5 pb-5 text-[#B0B0B0] text-sm leading-relaxed">{faq.a}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — manager card */}
          <div className="lg:col-span-2 flex items-start pt-20">
            <div className="w-full rounded-2xl overflow-hidden" style={{backgroundColor:'#242424', border:'1px solid #333'}}>
              <div className="aspect-square overflow-hidden relative">
                <img src="./images/categories/wardrobe.jpg" alt="Александр — менеджер"
                  className="w-full h-full object-cover opacity-80" />
                <div className="absolute inset-0" style={{background:'linear-gradient(to top, rgba(36,36,36,1) 0%, transparent 50%)'}} />
                <div className="absolute bottom-4 left-4">
                  <p className="text-white font-bold text-lg" style={{fontFamily:'Montserrat,sans-serif'}}>Александр</p>
                  <p className="text-[#B0B0B0] text-sm">Ведущий менеджер</p>
                </div>
              </div>
              <div className="p-5">
                <p className="text-[#B0B0B0] text-sm mb-4">Остался вопрос? Напишите Александру — он ответит в течение 5 минут.</p>
                <button onClick={() => scrollTo('#consultation')}
                  className="btn-accent w-full text-sm flex items-center justify-center gap-2">
                  <MessageCircle className="w-4 h-4" />
                  Обсудить проект
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
