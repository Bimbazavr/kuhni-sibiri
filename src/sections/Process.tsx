import { FileText, Ruler, Layout, Truck, Smartphone } from 'lucide-react';

const steps = [
  {
    num: 1,
    icon: FileText,
    title: 'Оставить заявку',
    desc: 'Заполните форму на сайте или позвоните нам. Менеджер свяжется в течение 15 минут для уточнения деталей.',
  },
  {
    num: 2,
    icon: Ruler,
    title: 'Замер и дизайн',
    desc: 'Выезжаем на объект для точного замера. Замер бесплатный и ни к чему не обязывает.',
  },
  {
    num: 3,
    icon: Layout,
    title: 'Бесплатный 3D-проект',
    desc: 'Разрабатываем дизайн-проект с фотореалистичными визуализациями. Вносим правки до вашего полного одобрения.',
  },
  {
    num: 4,
    icon: FileText,
    title: 'Договор и предоплата 50%',
    desc: 'Заключаем договор с фиксированной ценой и датой сдачи. Производство запускается после внесения 50% предоплаты.',
  },
  {
    num: 5,
    icon: Truck,
    title: 'Доставка и сборка',
    desc: 'Доставляем и собираем кухню за 1-2 дня. Вы принимаете работу — оставшиеся 50% оплачиваются после сдачи.',
  },
];

export function Process() {
  return (
    <section id="process" className="py-24" style={{backgroundColor:'#111111'}}>
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — steps */}
          <div>
            <p className="section-label">Как мы работаем</p>
            <h2 className="section-title mb-10">ПРОЗРАЧНОСТЬ <span>НА КАЖДОМ ЭТАПЕ</span></h2>

            <div className="space-y-6">
              {steps.map((step, i) => {
                const Icon = step.icon;
                return (
                  <div key={i} className="process-step">
                    <div className="flex flex-col items-center">
                      <div className="process-num">{step.num}</div>
                      {i < steps.length - 1 && (
                        <div className="w-px flex-1 mt-2 mb-0" style={{background:'linear-gradient(to bottom, #333, transparent)', minHeight:'24px'}} />
                      )}
                    </div>
                    <div className="pb-4">
                      <div className="flex items-center gap-3 mb-1">
                        <Icon className="w-4 h-4 flex-shrink-0" style={{color:'#E0C9B8'}} />
                        <p className="text-white font-bold text-sm uppercase tracking-wide" style={{fontFamily:'Montserrat,sans-serif'}}>{step.title}</p>
                      </div>
                      <p className="text-[#B0B0B0] text-sm leading-relaxed">{step.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right — phone mockup */}
          <div className="flex justify-center">
            <div className="relative">
              {/* Phone frame */}
              <div className="rounded-[40px] p-4 shadow-2xl w-64" style={{backgroundColor:'#242424', border:'2px solid #333'}}>
                <div className="rounded-[30px] overflow-hidden" style={{backgroundColor:'#1A1A1A'}}>
                  {/* Phone header */}
                  <div className="px-5 py-4 flex items-center justify-between" style={{backgroundColor:'#E0C9B8'}}>
                    <span className="font-bold text-[#1A1A1A] text-sm" style={{fontFamily:'Montserrat,sans-serif'}}>Кухни Сибири</span>
                    <Smartphone className="w-4 h-4 text-[#1A1A1A]" />
                  </div>
                  {/* Phone content */}
                  <div className="p-4 space-y-3">
                    {['Заявка принята ✓','Замер назначен 15 апр','Проект готов — смотреть','Производство: 60%','Доставка: 28 апр'].map((item, i) => (
                      <div key={i} className="flex items-center gap-3 px-3 py-2.5 rounded-lg" style={{backgroundColor:'#242424', border:'1px solid #333'}}>
                        <div className="w-2 h-2 rounded-full flex-shrink-0" style={{backgroundColor: i <= 2 ? '#E0C9B8' : '#444'}} />
                        <span className="text-xs" style={{color: i <= 2 ? '#fff' : '#555'}}>{item}</span>
                      </div>
                    ))}
                    <div className="pt-2">
                      <p className="text-xs text-center" style={{color:'#B0B0B0'}}>Ваш заказ в работе</p>
                      <div className="mt-2 h-2 rounded-full overflow-hidden" style={{backgroundColor:'#333'}}>
                        <div className="h-full rounded-full w-3/5" style={{backgroundColor:'#E0C9B8'}} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating badge */}
              <div className="absolute -top-6 -right-10 rounded-xl px-4 py-3 hidden md:block" style={{backgroundColor:'#E0C9B8'}}>
                <p className="font-black text-[#1A1A1A] text-xl" style={{fontFamily:'Montserrat,sans-serif'}}>100%</p>
                <p className="text-[#1A1A1A] text-xs">прозрачность</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
