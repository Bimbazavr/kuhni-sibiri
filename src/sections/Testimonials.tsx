import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Анна Коваль',
    project: 'Угловая кухня 22 м²',
    date: 'Март 2024',
    rating: 5,
    text: 'Заказали кухню полгода назад — до сих пор в восторге! Всё сделали точно в срок, качество материалов отличное. Менеджер Александр был на связи на каждом этапе.',
  },
  {
    name: 'Дмитрий Иванов',
    project: 'Прямая кухня 16 м²',
    date: 'Январь 2024',
    rating: 5,
    text: 'Делали кухню в новую квартиру. 3D-проект очень помог визуализировать результат. Сборщики аккуратные, ничего не поцарапали. Рекомендую!',
  },
  {
    name: 'Светлана Петрова',
    project: 'П-образная кухня 28 м²',
    date: 'Февраль 2024',
    rating: 5,
    text: 'Качество на уровне! Цена оказалась ниже, чем у конкурентов, а результат лучше. Отдельный плюс — фиксированная цена в договоре, никаких доплат.',
  },
  {
    name: 'Михаил Сорокин',
    project: 'Кухня с островом 35 м²',
    date: 'Апрель 2024',
    rating: 5,
    text: 'Долго выбирал компанию, остановился на Кухнях Сибири — не пожалел. Вносили изменения несколько раз, никаких претензий. Кухня получилась именно такой, как хотел.',
  },
];

export function Testimonials() {
  return (
    <section className="py-24" style={{backgroundColor:'#111111'}}>
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center mb-12">
          <p className="section-label">Отзывы клиентов</p>
          <h2 className="section-title">ЧТО ГОВОРЯТ <span>НАШИ КЛИЕНТЫ</span></h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {testimonials.map((t, i) => (
            <div key={i} className="card-dark p-6 flex flex-col">
              <Quote className="w-8 h-8 mb-4 flex-shrink-0" style={{color:'rgba(224,201,184,0.3)'}} />
              <p className="text-[#B0B0B0] text-sm leading-relaxed flex-1 mb-5">"{t.text}"</p>
              <div className="border-t border-[#333] pt-4">
                <div className="flex items-center gap-1 mb-2">
                  {Array.from({length: t.rating}).map((_, j) => (
                    <Star key={j} className="w-3.5 h-3.5 fill-current" style={{color:'#E0C9B8'}} />
                  ))}
                </div>
                <p className="text-white font-bold text-sm">{t.name}</p>
                <p className="text-[#B0B0B0] text-xs">{t.project} · {t.date}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Trust bar */}
        <div className="mt-12 rounded-2xl p-8 grid grid-cols-2 lg:grid-cols-4 gap-6" style={{backgroundColor:'#242424', border:'1px solid #333'}}>
          {[
            {v:'500+', l:'реализованных проектов'},
            {v:'96%', l:'клиентов рекомендуют нас'},
            {v:'4.9/5', l:'средняя оценка на Яндексе'},
            {v:'8 лет', l:'на рынке Иркутска'},
          ].map(({v, l}) => (
            <div key={l} className="text-center">
              <p className="text-3xl font-black mb-1" style={{color:'#E0C9B8', fontFamily:'Montserrat,sans-serif'}}>{v}</p>
              <p className="text-[#B0B0B0] text-sm">{l}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
