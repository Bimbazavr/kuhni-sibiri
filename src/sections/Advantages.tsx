import { Clock, Star, RefreshCw, Monitor } from 'lucide-react';

const advantages = [
  {
    icon: Clock,
    title: 'Твёрдые сроки',
    desc: 'Фиксируем дату сдачи в договоре. Компенсация 1% за каждый день просрочки. Средний срок — 30 рабочих дней.',
  },
  {
    icon: Star,
    title: 'Высокое качество',
    desc: 'Используем только сертифицированные материалы. Собственный ОТК на каждом этапе производства. Гарантия 2 года.',
  },
  {
    icon: RefreshCw,
    title: 'Неограниченные изменения',
    desc: 'Вносим правки в проект до тех пор, пока он не будет идеальным. Три бесплатные итерации дизайна.',
  },
  {
    icon: Monitor,
    title: 'Удалённый расчёт',
    desc: 'Пришлите план помещения — разработаем 3D-проект онлайн. Вам не нужно ехать в офис для начала работы.',
  },
];

export function Advantages() {
  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-24" style={{backgroundColor:'#111111'}}>
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — advantages grid */}
          <div>
            <p className="section-label">Почему мы</p>
            <h2 className="section-title mb-10">ПРЕИМУЩЕСТВА <span>РАБОТЫ С НАМИ</span></h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {advantages.map((adv, i) => {
                const Icon = adv.icon;
                return (
                  <div key={i} className="card-dark p-6">
                    <div className="icon-circle mb-5">
                      <Icon className="w-5 h-5" style={{color:'#E0C9B8'}} />
                    </div>
                    <p className="text-white font-bold mb-3 uppercase text-sm tracking-wide" style={{fontFamily:'Montserrat,sans-serif'}}>{adv.title}</p>
                    <p className="text-[#B0B0B0] text-sm leading-relaxed mb-4">{adv.desc}</p>
                    <button onClick={() => scrollTo('#consultation')}
                      className="text-xs font-semibold tracking-wider uppercase transition-colors hover:opacity-80" style={{color:'#E0C9B8'}}>
                      Обсудить проект →
                    </button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right — visual */}
          <div className="relative flex flex-col items-center">
            <div className="rounded-2xl overflow-hidden w-full max-w-sm" style={{backgroundColor:'#242424'}}>
              <img src="/images/categories/kitchen.jpg" alt="Преимущества работы с нами"
                className="w-full object-cover aspect-[4/5] opacity-80" />
            </div>
            {/* Floating badge */}
            <div className="absolute top-6 -left-4 rounded-xl p-4 hidden md:block" style={{backgroundColor:'#242424', border:'1px solid #E0C9B8'}}>
              <p className="text-white font-black text-2xl" style={{fontFamily:'Montserrat,sans-serif'}}>2 года</p>
              <p className="text-[#B0B0B0] text-xs">гарантия</p>
            </div>
            <div className="absolute bottom-8 -right-4 rounded-xl p-4 hidden md:block" style={{backgroundColor:'#E0C9B8'}}>
              <p className="text-[#1A1A1A] font-black text-2xl" style={{fontFamily:'Montserrat,sans-serif'}}>30 дн</p>
              <p className="text-[#1A1A1A] text-xs font-medium">срок изготовления</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
