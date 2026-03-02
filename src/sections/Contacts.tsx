import { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, Instagram, MessageCircle } from 'lucide-react';
import { getConfig } from '@/config';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

export function Contacts() {
  const config = getConfig();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    message: '',
  });
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsModalOpen(true);
    setTimeout(() => {
      setIsModalOpen(false);
      setFormData({ name: '', phone: '', message: '' });
    }, 2000);
  };

  return (
    <section id="contacts" className="py-24 bg-zinc-950">
      <div className="container mx-auto px-4 lg:px-8">
        {/* Заголовок */}
        <div className="text-center mb-16">
          <p className="text-amber-400 font-medium tracking-wider uppercase text-sm mb-4">
            Контакты
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white mb-4">
            Свяжитесь с нами
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            Получите бесплатную консультацию и расчет стоимости вашего проекта
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Левая колонка - контактная информация */}
          <div className="space-y-8">
            <div className="glass rounded-xl p-8">
              <h3 className="text-2xl font-serif text-white mb-6">Контактная информация</h3>
              
              <div className="space-y-6">
                <a
                  href={`tel:${config.phone}`}
                  className="flex items-center gap-4 group"
                >
                  <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center group-hover:bg-amber-500/30 transition-colors">
                    <Phone className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <p className="text-white/60 text-sm">Телефон</p>
                    <p className="text-white text-lg font-medium group-hover:text-amber-400 transition-colors">
                      {config.phoneFormatted}
                    </p>
                  </div>
                </a>

                <a
                  href={`mailto:${config.email}`}
                  className="flex items-center gap-4 group"
                >
                  <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center group-hover:bg-amber-500/30 transition-colors">
                    <Mail className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <p className="text-white/60 text-sm">Email</p>
                    <p className="text-white text-lg font-medium group-hover:text-amber-400 transition-colors">
                      {config.email}
                    </p>
                  </div>
                </a>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <p className="text-white/60 text-sm">Адрес</p>
                    <p className="text-white text-lg font-medium">{config.address}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-amber-500/20 flex items-center justify-center">
                    <Clock className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <p className="text-white/60 text-sm">Режим работы</p>
                    <p className="text-white text-lg font-medium">{config.workingHours}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Социальные сети */}
            <div className="glass rounded-xl p-8">
              <h3 className="text-xl font-serif text-white mb-4">Мы в соцсетях</h3>
              <div className="flex gap-4">
                {config.social.instagram && (
                  <a
                    href={config.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-amber-500/20 transition-colors"
                  >
                    <Instagram className="w-5 h-5 text-white" />
                  </a>
                )}
                {config.social.vk && (
                  <a
                    href={config.social.vk}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-amber-500/20 transition-colors"
                  >
                    <span className="text-white font-bold">VK</span>
                  </a>
                )}
                {config.social.telegram && (
                  <a
                    href={config.social.telegram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-amber-500/20 transition-colors"
                  >
                    <Send className="w-5 h-5 text-white" />
                  </a>
                )}
                {config.social.whatsapp && (
                  <a
                    href={config.social.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center hover:bg-amber-500/20 transition-colors"
                  >
                    <MessageCircle className="w-5 h-5 text-white" />
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Правая колонка - форма */}
          <div className="glass rounded-xl p-8">
            <h3 className="text-2xl font-serif text-white mb-2">Оставить заявку</h3>
            <p className="text-white/60 mb-6">
              Заполните форму и мы свяжемся с вами в ближайшее время
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-white/80 text-sm mb-2 block">Ваше имя</label>
                <input
                  type="text"
                  placeholder="Иван Иванов"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="input-gold w-full"
                  required
                />
              </div>

              <div>
                <label className="text-white/80 text-sm mb-2 block">Ваш телефон</label>
                <input
                  type="tel"
                  placeholder="+7 (___) ___-__-__"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="input-gold w-full"
                  required
                />
              </div>

              <div>
                <label className="text-white/80 text-sm mb-2 block">Сообщение (необязательно)</label>
                <textarea
                  placeholder="Расскажите о вашем проекте..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="input-gold w-full h-32 resize-none"
                />
              </div>

              <button type="submit" className="btn-gold w-full">
                Отправить заявку
              </button>

              <p className="text-white/40 text-xs text-center">
                Нажимая кнопку, вы соглашаетесь с политикой конфиденциальности
              </p>
            </form>
          </div>
        </div>

        {/* Карта */}
        <div className="mt-12 rounded-xl overflow-hidden h-80 bg-zinc-800">
          <iframe
            src={`https://yandex.ru/map-widget/v1/?ll=${config.contacts.mapCoordinates.lng}%2C${config.contacts.mapCoordinates.lat}&z=${config.contacts.mapZoom}&l=map&pt=${config.contacts.mapCoordinates.lng},${config.contacts.mapCoordinates.lat},pm2rdm`}
            width="100%"
            height="100%"
            style={{ border: 'none' }}
            allowFullScreen
            className="grayscale hover:grayscale-0 transition-all duration-500"
          />
        </div>
      </div>

      {/* Модальное окно успешной отправки */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="bg-zinc-900 border-zinc-700 text-white max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl font-serif text-center">
              Спасибо за заявку!
            </DialogTitle>
          </DialogHeader>
          <div className="text-center py-8">
            <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-4">
              <Send className="w-8 h-8 text-green-500" />
            </div>
            <p className="text-white/60">
              Мы свяжемся с вами в ближайшее время для уточнения деталей
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
}
