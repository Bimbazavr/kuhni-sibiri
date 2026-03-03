import { Users, Award, Play } from 'lucide-react';

export function QualityReliability() {
  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="quality" className="py-24" style={{backgroundColor:'#1A1A1A'}}>
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <div>
            <p className="section-label">О компании</p>
            <h2 className="section-title mb-6">
              КАЧЕСТВО И <span>НАДЁЖНОСТЬ</span>
            </h2>
            <p className="text-[#B0B0B0] leading-relaxed text-base mb-8 max-w-lg">
              Мы производим кухни с 2016 года. Наша философия — каждая кухня должна прослужить десятилетия и радовать своего владельца каждый день. Только сертифицированные материалы, собственное производство и опытная команда мастеров.
            </p>

            {/* Cards row */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="card-dark p-5">
                <div className="icon-circle mb-4">
                  <Users className="w-5 h-5" style={{color:'#E0C9B8'}} />
                </div>
                <p className="text-white font-bold text-2xl mb-1" style={{fontFamily:'Montserrat,sans-serif'}}>50+</p>
                <p className="text-[#B0B0B0] text-sm">Сотрудников в команде</p>
                <div className="flex -space-x-2 mt-3">
                  {[1,2,3,4].map(i => (
                    <div key={i} className="w-7 h-7 rounded-full border-2 border-[#1A1A1A] flex items-center justify-center text-xs font-bold text-[#1A1A1A]"
                      style={{backgroundColor:'#E0C9B8', opacity: 1 - i*0.15}}>
                      {['АК','МС','ОП','+46'][i-1]}
                    </div>
                  ))}
                </div>
              </div>
              <div className="card-dark p-5">
                <div className="icon-circle mb-4">
                  <Award className="w-5 h-5" style={{color:'#E0C9B8'}} />
                </div>
                <p className="text-white font-bold text-2xl mb-1" style={{fontFamily:'Montserrat,sans-serif'}}>8 лет</p>
                <p className="text-[#B0B0B0] text-sm">На рынке Иркутска</p>
                <p className="text-[#B0B0B0] text-xs mt-2">500+ реализованных проектов по всей Иркутской области</p>
              </div>
            </div>

            {/* Dealer info */}
            <div className="rounded-xl p-5 mb-8" style={{backgroundColor:'#242424', border:'1px solid #333'}}>
              <p className="text-white font-semibold mb-2">Дилерская сеть</p>
              <p className="text-[#B0B0B0] text-sm">Работаем с дизайн-студиями, архитекторами и оптовыми покупателями. Специальные условия для дилеров.</p>
            </div>

            <button onClick={() => scrollTo('#portfolio')} className="btn-outline text-sm">
              Узнать больше о компании
            </button>
          </div>

          {/* Right — video preview */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3]" style={{backgroundColor:'#242424'}}>
              <img src="/images/about/factory-1.jpg" alt="Производство кухонь"
                className="w-full h-full object-cover opacity-70" />
              <div className="absolute inset-0 flex items-center justify-center">
                <button className="w-16 h-16 rounded-full flex items-center justify-center transition-all hover:scale-110"
                  style={{backgroundColor:'#E0C9B8'}}>
                  <Play className="w-6 h-6 ml-1 text-[#1A1A1A]" />
                </button>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-5" style={{background:'linear-gradient(to top, rgba(26,26,26,0.9), transparent)'}}>
                <p className="text-white font-semibold">Видео о производстве</p>
                <p className="text-[#B0B0B0] text-sm">Посмотрите, как мы создаём кухни</p>
              </div>
            </div>

            {/* Stats overlay */}
            <div className="absolute -bottom-6 -right-6 rounded-xl p-4 hidden md:block" style={{backgroundColor:'#E0C9B8'}}>
              <p className="font-black text-3xl text-[#1A1A1A]" style={{fontFamily:'Montserrat,sans-serif'}}>96%</p>
              <p className="text-[#1A1A1A] text-xs font-medium">клиентов рекомендуют нас</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
