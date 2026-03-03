import { useState } from 'react';
import { ZoomIn, ArrowRight } from 'lucide-react';

const projects = [
  { id: 1, title: 'Кухня в стиле минимализм', area: '18 м²', price: 'от 185 000 руб.', img: './images/portfolio/kitchen-1.jpg', style: 'Минимализм' },
  { id: 2, title: 'Классическая угловая кухня', area: '24 м²', price: 'от 219 000 руб.', img: './images/portfolio/kitchen-2.jpg', style: 'Классика' },
  { id: 3, title: 'Современная кухня-остров', area: '32 м²', price: 'от 310 000 руб.', img: './images/portfolio/kitchen-3.jpg', style: 'Модерн' },
  { id: 4, title: 'Кухня с баром в скандинавском стиле', area: '22 м²', price: 'от 240 000 руб.', img: './images/categories/kitchen.jpg', style: 'Скандинавский' },
  { id: 5, title: 'П-образная кухня с пеналами', area: '28 м²', price: 'от 275 000 руб.', img: './images/portfolio/kitchen-1.jpg', style: 'Модерн' },
  { id: 6, title: 'Кухня с высокими фасадами', area: '20 м²', price: 'от 198 000 руб.', img: './images/portfolio/kitchen-2.jpg', style: 'Минимализм' },
];

export function Portfolio() {
  const [hovered, setHovered] = useState<number | null>(null);

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="portfolio" className="py-24" style={{backgroundColor:'#111111'}}>
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="section-label">Наши работы</p>
            <h2 className="section-title">РЕАЛИЗОВАННЫЕ <span>ПРОЕКТЫ</span></h2>
          </div>
          <button onClick={() => scrollTo('#calculator')}
            className="btn-outline text-sm flex items-center gap-2 self-start md:self-auto">
            Рассчитать свой проект <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
          {projects.map(p => (
            <div key={p.id}
              className="relative rounded-xl overflow-hidden cursor-pointer group"
              style={{backgroundColor:'#242424'}}
              onMouseEnter={() => setHovered(p.id)}
              onMouseLeave={() => setHovered(null)}>
              <div className="aspect-[4/3] overflow-hidden">
                <img src={p.img} alt={p.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              {/* Overlay */}
              <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${hovered === p.id ? 'opacity-100' : 'opacity-0'}`}
                style={{background:'rgba(26,26,26,0.6)'}}>
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{backgroundColor:'#E0C9B8'}}>
                  <ZoomIn className="w-5 h-5 text-[#1A1A1A]" />
                </div>
              </div>
              {/* Info */}
              <div className="p-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs px-2 py-0.5 rounded" style={{backgroundColor:'rgba(224,201,184,0.12)', color:'#E0C9B8'}}>{p.style}</span>
                  <span className="text-[#B0B0B0] text-xs">{p.area}</span>
                </div>
                <p className="text-white font-semibold text-sm mt-1">{p.title}</p>
                <p className="font-bold mt-1" style={{color:'#E0C9B8', fontFamily:'Montserrat,sans-serif'}}>{p.price}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <button className="btn-accent text-sm px-10" onClick={() => scrollTo('#calculator')}>
            ВСЕ ПРОЕКТЫ
          </button>
        </div>
      </div>
    </section>
  );
}
