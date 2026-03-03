import { ArrowRight } from 'lucide-react';
import { getConfig } from '@/config';
import { useCustomImage } from '@/hooks/useCustomImage';

interface CategoryCardProps {
  id: string;
  name: string;
  description: string;
  image: string;
  link: string;
  index: number;
}

function CategoryCard({ id, name, description, image, link, index }: CategoryCardProps) {
  const imgSrc = useCustomImage(`cat-${id}`, image);
  return (
    <a
      href={link}
      className="product-card group"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="relative aspect-[3/4] overflow-hidden rounded-lg">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
          style={{ backgroundImage: `url(${imgSrc})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050D1A] via-black/40 to-transparent" />
        <div className="absolute inset-0 p-6 flex flex-col justify-end">
          <h3 className="text-2xl font-serif font-semibold text-white mb-2 group-hover:text-orange-400 transition-colors">
            {name}
          </h3>
          <p className="text-white/70 text-sm mb-4 line-clamp-2">{description}</p>
          <div className="flex items-center gap-2 text-orange-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
            <span>Подробнее</span>
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
        <div className="absolute inset-0 border-2 border-transparent group-hover:border-emerald-500/50 rounded-lg transition-colors" />
      </div>
    </a>
  );
}

export function Categories() {
  const config = getConfig();

  return (
    <section id="catalog" className="py-24 bg-[#080F1E]">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Заголовок */}
        <div className="text-center mb-16">
          <p className="text-emerald-400 font-medium tracking-wider uppercase text-sm mb-4">
            Каталог
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white mb-4">
            Мебель на заказ
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            Создаем индивидуальные решения для вашего дома. От классики до современных минималистичных интерьеров.
          </p>
        </div>

        {/* Сетка категорий */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {config.categories.map((category, index) => (
            <CategoryCard key={category.id} {...category} index={index} />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <a
            href="#contacts"
            className="inline-flex items-center gap-2 text-orange-400 hover:text-orange-300 transition-colors font-medium"
          >
            <span>Получить консультацию дизайнера</span>
            <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </div>
    </section>
  );
}
