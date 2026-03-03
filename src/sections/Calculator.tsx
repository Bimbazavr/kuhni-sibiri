import { useState } from 'react';
import { Minus, Plus } from 'lucide-react';

type Shape = 'straight' | 'corner' | 'u_shape' | 'island';
type Material = 'mdf' | 'plastic' | 'wood' | 'enamel' | 'glass' | 'acrylic';

const shapes: { id: Shape; label: string; icon: string }[] = [
  { id: 'straight', label: 'Прямая', icon: '▬' },
  { id: 'corner', label: 'Угловая', icon: '⌐' },
  { id: 'u_shape', label: 'П-образная', icon: '⊓' },
  { id: 'island', label: 'Остров', icon: '⬜' },
];

const materials: { id: Material; label: string; price: number }[] = [
  { id: 'mdf', label: 'МДФ пленочный', price: 1 },
  { id: 'plastic', label: 'Пластик ABS', price: 1.2 },
  { id: 'wood', label: 'Массив дерева', price: 2.5 },
  { id: 'enamel', label: 'Эмаль', price: 2.1 },
  { id: 'glass', label: 'Стекло', price: 1.8 },
  { id: 'acrylic', label: 'Акрил', price: 1.6 },
];

const basePrice = 45000; // per meter

export function Calculator() {
  const [shape, setShape] = useState<Shape>('straight');
  const [length, setLength] = useState(2.5);
  const [width, setWidth] = useState(1.8);
  const [height, setHeight] = useState(2.1);
  const [material, setMaterial] = useState<Material>('mdf');
  const [sent, setSent] = useState(false);
  const [phone, setPhone] = useState('');

  const shapeMult = { straight: 1, corner: 1.3, u_shape: 1.7, island: 1.5 };
  const matPrice = materials.find(m => m.id === material)?.price ?? 1;
  const totalLength = shape === 'straight' ? length : shape === 'corner' ? length + width : shape === 'u_shape' ? length + width * 2 : length * 2;
  const estimated = Math.round(totalLength * basePrice * matPrice * shapeMult[shape]);

  const adj = (setter: (v: number) => void, val: number, min: number, max: number, step: number) => {
    const clamped = Math.max(min, Math.min(max, Math.round((val + step) * 10) / 10));
    setter(clamped);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => { setSent(false); setPhone(''); }, 4000);
  };

  return (
    <section id="calculator" className="py-24" style={{backgroundColor:'#1A1A1A'}}>
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left — calculator */}
          <div>
            <p className="section-label">Интерактивный инструмент</p>
            <h2 className="section-title mb-10">РАССЧИТАЙТЕ <span>СТОИМОСТЬ</span></h2>

            {/* Step 1 — shape */}
            <div className="mb-8">
              <p className="text-white font-bold mb-4 flex items-center gap-3">
                <span className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-black text-[#1A1A1A]" style={{backgroundColor:'#E0C9B8'}}>1</span>
                Форма кухни
              </p>
              <div className="grid grid-cols-4 gap-3">
                {shapes.map(s => (
                  <button key={s.id} onClick={() => setShape(s.id)}
                    className={`rounded-xl py-5 flex flex-col items-center gap-2 transition-all duration-200 border ${shape === s.id ? 'border-[#E0C9B8] bg-[rgba(224,201,184,0.08)]' : 'border-[#333] bg-[#242424] hover:border-[#555]'}`}>
                    <span className="text-2xl" style={{color: shape === s.id ? '#E0C9B8' : '#B0B0B0'}}>{s.icon}</span>
                    <span className="text-xs font-medium" style={{color: shape === s.id ? '#E0C9B8' : '#B0B0B0'}}>{s.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2 — dimensions */}
            <div className="mb-8">
              <p className="text-white font-bold mb-4 flex items-center gap-3">
                <span className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-black text-[#1A1A1A]" style={{backgroundColor:'#E0C9B8'}}>2</span>
                Размеры (метры)
              </p>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: 'Длина', val: length, setter: setLength },
                  { label: 'Ширина', val: width, setter: setWidth },
                  { label: 'Высота', val: height, setter: setHeight },
                ].map(({ label, val, setter }) => (
                  <div key={label} className="rounded-xl p-4" style={{backgroundColor:'#242424', border:'1px solid #333'}}>
                    <p className="text-[#B0B0B0] text-xs mb-3">{label}</p>
                    <div className="flex items-center justify-between">
                      <button onClick={() => adj(setter, val, 0.5, 10, -0.1)}
                        className="w-7 h-7 rounded-full flex items-center justify-center text-white transition-colors hover:bg-[#444]" style={{backgroundColor:'#333'}}>
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="font-bold text-white" style={{fontFamily:'Montserrat,sans-serif'}}>{val.toFixed(1)}</span>
                      <button onClick={() => adj(setter, val, 0.5, 10, 0.1)}
                        className="w-7 h-7 rounded-full flex items-center justify-center text-white transition-colors hover:bg-[#444]" style={{backgroundColor:'#333'}}>
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Step 3 — material */}
            <div className="mb-10">
              <p className="text-white font-bold mb-4 flex items-center gap-3">
                <span className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-black text-[#1A1A1A]" style={{backgroundColor:'#E0C9B8'}}>3</span>
                Материал фасадов
              </p>
              <div className="grid grid-cols-3 gap-3">
                {materials.map(m => (
                  <label key={m.id} className={`flex items-center gap-2 px-3 py-3 rounded-xl cursor-pointer transition-all border ${material === m.id ? 'border-[#E0C9B8] bg-[rgba(224,201,184,0.08)]' : 'border-[#333] bg-[#242424] hover:border-[#555]'}`}>
                    <input type="radio" name="material" value={m.id} checked={material === m.id}
                      onChange={() => setMaterial(m.id)} className="sr-only" />
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${material === m.id ? 'border-[#E0C9B8]' : 'border-[#555]'}`}>
                      {material === m.id && <div className="w-2 h-2 rounded-full" style={{backgroundColor:'#E0C9B8'}} />}
                    </div>
                    <span className="text-xs font-medium" style={{color: material === m.id ? '#E0C9B8' : '#B0B0B0'}}>{m.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Result */}
            <div className="rounded-xl p-6" style={{backgroundColor:'#242424', border:'1px solid #E0C9B8'}}>
              <div className="flex items-center justify-between mb-4">
                <p className="text-[#B0B0B0] text-sm">Примерная стоимость:</p>
                <p className="text-3xl font-black" style={{color:'#E0C9B8', fontFamily:'Montserrat,sans-serif'}}>
                  от {estimated.toLocaleString('ru')} ₽
                </p>
              </div>
              <p className="text-[#555] text-xs mb-4">*Окончательная стоимость определяется после замера и согласования дизайн-проекта</p>
              <form onSubmit={handleSubmit} className="flex gap-3">
                <input type="tel" placeholder="+7 (___) ___-__-__" value={phone}
                  onChange={e => setPhone(e.target.value)} required className="input-dark flex-1 text-sm py-2.5" />
                <button type="submit" className="btn-accent px-6 text-sm py-2.5 whitespace-nowrap">
                  {sent ? 'Отправлено!' : 'Рассчитать'}
                </button>
              </form>
            </div>
          </div>

          {/* Right — image + description */}
          <div className="hidden lg:block">
            <div className="relative">
              <div className="rounded-2xl overflow-hidden aspect-[3/4]" style={{backgroundColor:'#242424'}}>
                <img src="/images/about/factory-2.jpg" alt="Консультация по кухне"
                  className="w-full h-full object-cover opacity-80" />
                <div className="absolute inset-0" style={{background:'linear-gradient(to top, rgba(26,26,26,0.8) 0%, transparent 50%)'}} />
                <div className="absolute bottom-8 left-8 right-8">
                  <p className="text-white font-bold text-xl mb-2">Персональная консультация</p>
                  <p className="text-[#B0B0B0] text-sm">Наш специалист поможет подобрать оптимальное решение для вашей кухни с учётом всех пожеланий и бюджета.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
