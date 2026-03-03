import { ArrowRight } from 'lucide-react';

const products = [
  { title: 'Гардеробные системы', desc: 'Модульные системы хранения под заказ', price: 'от 85 000 ₽', img: '/images/categories/dressing.jpg' },
  { title: 'Шкафы-купе', desc: 'Встроенные и корпусные шкафы-купе', price: 'от 65 000 ₽', img: '/images/categories/wardrobe.jpg' },
  { title: 'Универсальные шкафы', desc: 'Для спальни, гостиной, офиса', price: 'от 45 000 ₽', img: '/images/portfolio/wardrobe-1.jpg' },
  { title: 'Детские комнаты', desc: 'Безопасная мебель для детей', price: 'от 120 000 ₽', img: '/images/portfolio/dressing-1.jpg' },
];

export function Crosssell() {
  return (
    <section className="py-24" style={{backgroundColor:'#1A1A1A'}}>
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <p className="section-label">Также делаем</p>
            <h2 className="section-title">ВАМ ТАКЖЕ МОЖЕТ <span>ПРИГОДИТЬСЯ</span></h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {products.map((p, i) => (
            <div key={i} className="card-dark overflow-hidden group cursor-pointer">
              <div className="aspect-[4/3] overflow-hidden">
                <img src={p.img} alt={p.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-80" />
              </div>
              <div className="p-4">
                <p className="text-white font-bold text-sm mb-1 uppercase tracking-wide" style={{fontFamily:'Montserrat,sans-serif'}}>{p.title}</p>
                <p className="text-[#B0B0B0] text-xs mb-3">{p.desc}</p>
                <div className="flex items-center justify-between">
                  <span className="font-bold" style={{color:'#E0C9B8', fontFamily:'Montserrat,sans-serif'}}>{p.price}</span>
                  <button className="text-xs font-semibold flex items-center gap-1 transition-colors hover:opacity-70" style={{color:'#E0C9B8'}}>
                    Подробнее <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
