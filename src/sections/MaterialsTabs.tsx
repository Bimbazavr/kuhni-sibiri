import { useState } from 'react';
import { ChevronRight } from 'lucide-react';

type TabId = 'facades' | 'countertops' | 'bodies';

const tabs: { id: TabId; label: string }[] = [
  { id: 'facades', label: 'Фасады' },
  { id: 'countertops', label: 'Столешницы' },
  { id: 'bodies', label: 'Корпуса' },
];

const content: Record<TabId, {
  title: string;
  desc: string;
  items: { name: string; desc: string; badge?: string }[];
}> = {
  facades: {
    title: 'Фасады кухонь',
    desc: 'Лицо вашей кухни — выбор материала определяет стиль, долговечность и уход. Мы работаем только с проверенными поставщиками.',
    items: [
      { name: 'МДФ плёночный', desc: 'Бюджетный и практичный вариант. Более 500 цветов и фактур. Легко моется, устойчив к влаге.', badge: 'Популярный' },
      { name: 'Пластик ABS', desc: 'Высокая устойчивость к механическим воздействиям. Однородная структура, широкая палитра.', },
      { name: 'Эмаль', desc: 'Глянцевая или матовая поверхность. Идеально ровный цвет. Премиальный внешний вид.', badge: 'Премиум' },
      { name: 'Массив дерева', desc: 'Натуральное тепло и уют. Уникальный рисунок каждой детали. Дуб, ясень, берёза.', badge: 'Элит' },
    ],
  },
  countertops: {
    title: 'Столешницы',
    desc: 'Рабочая поверхность должна быть одновременно красивой и практичной. Мы подберём оптимальный материал для вашего стиля жизни.',
    items: [
      { name: 'Постформинг ЛДСП', desc: 'Бюджетный вариант с защитным покрытием. Большой выбор декоров, устойчив к царапинам.', badge: 'Популярный' },
      { name: 'Кварц искусственный', desc: 'Высокая прочность и гигиеничность. Устойчив к высоким температурам и кислотам.', badge: 'Хит' },
      { name: 'Натуральный камень', desc: 'Гранит, мрамор — неповторимый рисунок, максимальная долговечность.', badge: 'Элит' },
      { name: 'Нержавеющая сталь', desc: 'Идеально для современных кухонь. Гигиенично, легко моется, не боится температур.', },
    ],
  },
  bodies: {
    title: 'Корпуса и каркасы',
    desc: 'Основа кухни — каркас из качественных материалов обеспечивает долговечность и надёжность конструкции.',
    items: [
      { name: 'ЛДСП 16 мм', desc: 'Стандартный вариант. Влагостойкая пропитка, кромка ПВХ 0.4–2 мм. Сертификаты E1.', badge: 'Стандарт' },
      { name: 'ЛДСП 18 мм', desc: 'Усиленный вариант для нагруженных секций. Повышенная жёсткость конструкции.', badge: 'Популярный' },
      { name: 'МДФ влагостойкий', desc: 'Для зон повышенной влажности. Рядом с мойкой, посудомоечной машиной.', },
      { name: 'Массив дерева', desc: 'Ценный вариант для полностью деревянных кухонь. Дышащий материал, экологичен.', badge: 'Элит' },
    ],
  },
};

export function MaterialsTabs() {
  const [activeTab, setActiveTab] = useState<TabId>('facades');
  const tab = content[activeTab];

  return (
    <section className="py-24 relative overflow-hidden" style={{backgroundColor:'#1A1A1A'}}>
      {/* Decorative BG */}
      <div className="absolute right-0 top-0 w-1/3 h-full opacity-10">
        <img src="./images/about/materials.jpg" alt="" className="w-full h-full object-cover" />
      </div>

      <div className="relative z-10 container mx-auto px-4 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Left */}
          <div className="lg:w-1/3">
            <p className="section-label">Из чего делаем</p>
            <h2 className="section-title mb-8">ИСПОЛЬЗУЕМ ТОЛЬКО <span>КАЧЕСТВЕННЫЕ</span> МАТЕРИАЛЫ</h2>

            {/* Tabs */}
            <div className="flex flex-col gap-2 mb-8">
              {tabs.map(t => (
                <button key={t.id} onClick={() => setActiveTab(t.id)}
                  className={`tab-btn text-left ${activeTab === t.id ? 'active' : ''}`}>
                  {t.label}
                </button>
              ))}
            </div>

            <p className="text-[#B0B0B0] text-sm leading-relaxed">{tab.desc}</p>
          </div>

          {/* Right — content */}
          <div className="lg:w-2/3">
            <h3 className="text-white font-bold text-2xl mb-6 uppercase tracking-wide" style={{fontFamily:'Montserrat,sans-serif'}}>{tab.title}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {tab.items.map((item, i) => (
                <div key={i} className="card-dark p-5 relative">
                  {item.badge && (
                    <span className="absolute top-4 right-4 text-xs px-2 py-0.5 rounded font-semibold" style={{backgroundColor:'rgba(224,201,184,0.15)', color:'#E0C9B8'}}>
                      {item.badge}
                    </span>
                  )}
                  <p className="text-white font-bold mb-2 text-sm uppercase tracking-wide pr-16" style={{fontFamily:'Montserrat,sans-serif'}}>{item.name}</p>
                  <p className="text-[#B0B0B0] text-sm leading-relaxed mb-3">{item.desc}</p>
                  <button className="text-xs font-semibold tracking-wider uppercase transition-colors hover:opacity-70 flex items-center gap-1" style={{color:'#E0C9B8'}}>
                    Подробнее <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
