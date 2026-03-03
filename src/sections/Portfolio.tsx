import { useState } from 'react';
import { ZoomIn } from 'lucide-react';
import { getConfig } from '@/config';
import { useCustomImage } from '@/hooks/useCustomImage';
import {
  Dialog,
  DialogContent,
} from '@/components/ui/dialog';

const filters = [
  { id: 'all', label: 'Все работы' },
  { id: 'kitchens', label: 'Кухни' },
  { id: 'wardrobes', label: 'Шкафы' },
  { id: 'dressing', label: 'Гардеробные' },
  { id: 'other', label: 'Другое' },
];

const styles = [
  { id: 'all', label: 'Все стили' },
  { id: 'modern', label: 'Современный' },
  { id: 'classic', label: 'Классика' },
  { id: 'minimalism', label: 'Минимализм' },
];

function ModalImage({ project, index }: { project: ReturnType<typeof getConfig>['portfolio'][0]; index: number }) {
  const imgSrc = useCustomImage(`portfolio-${index}`, project.image);
  return (
    <div
      className="absolute inset-0 bg-cover bg-center"
      style={{ backgroundImage: `url(${imgSrc})` }}
    />
  );
}

interface PortfolioCardProps {
  project: ReturnType<typeof getConfig>['portfolio'][0];
  index: number;
  onClick: () => void;
}

function PortfolioCard({ project, index, onClick }: PortfolioCardProps) {
  const imgSrc = useCustomImage(`portfolio-${index}`, project.image);
  return (
    <div
      className="product-card group cursor-pointer"
      onClick={onClick}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
          style={{ backgroundImage: `url(${imgSrc})` }}
        />
        <div className="absolute inset-0 bg-[#050D1A]/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <div className="w-14 h-14 rounded-full bg-emerald-500/90 flex items-center justify-center">
            <ZoomIn className="w-6 h-6 text-white" />
          </div>
        </div>
        {project.price && (
          <div className="absolute top-4 right-4 px-3 py-1 bg-[#050D1A]/70 backdrop-blur-sm rounded-full">
            <span className="text-orange-400 font-medium text-sm">{project.price}</span>
          </div>
        )}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-[#050D1A] to-transparent">
          <h3 className="text-lg font-serif text-white group-hover:text-emerald-400 transition-colors">
            {project.title}
          </h3>
        </div>
      </div>
    </div>
  );
}

export function Portfolio() {
  const config = getConfig();
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeStyle, setActiveStyle] = useState('all');
  const [selectedProject, setSelectedProject] = useState<typeof config.portfolio[0] | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const filteredProjects = config.portfolio
    .map((project, index) => ({ project, index }))
    .filter(({ project }) => {
      const categoryMatch = activeFilter === 'all' || project.category === activeFilter;
      const styleMatch = activeStyle === 'all' || project.style === activeStyle;
      return categoryMatch && styleMatch;
    });

  return (
    <section id="portfolio" className="py-24 bg-[#050D1A]">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Заголовок */}
        <div className="text-center mb-12">
          <p className="text-emerald-400 font-medium tracking-wider uppercase text-sm mb-4">
            Портфолио
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white mb-4">
            Наши работы
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            Реальные проекты для клиентов из Иркутска и Иркутской области
          </p>
        </div>

        {/* Фильтры */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
          <div className="flex flex-wrap justify-center gap-2">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeFilter === filter.id
                    ? 'bg-emerald-500 text-white'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-center gap-2 mb-12">
          {styles.map((style) => (
            <button
              key={style.id}
              onClick={() => setActiveStyle(style.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeStyle === style.id
                  ? 'border border-emerald-500 text-emerald-400'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              {style.label}
            </button>
          ))}
        </div>

        {/* Сетка работ */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map(({ project, index }) => (
            <PortfolioCard
              key={project.id}
              project={project}
              index={index}
              onClick={() => {
                setSelectedProject(project);
                setSelectedIndex(index);
              }}
            />
          ))}
        </div>

        {/* Пустое состояние */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-16">
            <p className="text-white/60">Нет проектов в выбранной категории</p>
          </div>
        )}
      </div>

      {/* Модальное окно с деталями проекта */}
      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="bg-[#0B1629] border-blue-900 text-white max-w-4xl p-0 overflow-hidden">
          {selectedProject && (
            <div className="grid md:grid-cols-2">
              {/* Изображение */}
              <div className="relative aspect-square md:aspect-auto">
                <ModalImage project={selectedProject} index={selectedIndex} />
              </div>
              {/* Информация */}
              <div className="p-8">
                <h3 className="text-2xl font-serif font-bold text-white mb-2">
                  {selectedProject.title}
                </h3>
                <p className="text-orange-400 text-lg font-medium mb-4">
                  {selectedProject.price}
                </p>
                <p className="text-white/70 mb-6">
                  {selectedProject.description}
                </p>
                <div className="space-y-3">
                  <div className="flex justify-between py-2 border-b border-white/10">
                    <span className="text-white/60">Категория</span>
                    <span className="text-white">
                      {filters.find(f => f.id === selectedProject.category)?.label}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-white/10">
                    <span className="text-white/60">Стиль</span>
                    <span className="text-white">
                      {styles.find(s => s.id === selectedProject.style)?.label}
                    </span>
                  </div>
                </div>
                <a
                  href="#contacts"
                  onClick={() => setSelectedProject(null)}
                  className="btn-gold w-full mt-8 block text-center"
                >
                  Заказать похожий проект
                </a>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
