import { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  Settings,
  Image,
  FileText,
  Phone,
  Save,
  RotateCcw,
  ExternalLink,
  Menu,
  ChevronRight,
  LogOut
} from 'lucide-react';
import { getConfig, setConfig, resetConfig, type SiteConfig } from '@/config';
import { getImageUrl } from '@/lib/imageStorage';
import { ImageUploader } from '@/components/ImageUploader';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent } from '@/components/ui/tabs';
import { toast } from 'sonner';

export function Admin() {
  const [config, setLocalConfig] = useState<SiteConfig>(getConfig());
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState('general');
  const [imgSrcs, setImgSrcs] = useState<Record<string, string>>({});

  useEffect(() => {
    // Проверка авторизации (простая)
    const isAuth = sessionStorage.getItem('adminAuth');
    if (!isAuth) {
      const password = prompt('Введите пароль администратора:');
      if (password === 'admin123') {
        sessionStorage.setItem('adminAuth', 'true');
      } else {
        window.location.href = '/';
      }
    }
  }, []);

  useEffect(() => {
    const keys = [
      'hero-bg', 'logo', 'og-image',
      'cat-kitchens', 'cat-wardrobes', 'cat-dressing', 'cat-other',
      'portfolio-0', 'portfolio-1', 'portfolio-2', 'portfolio-3', 'portfolio-4', 'portfolio-5',
      'about-img-0', 'about-img-1', 'about-img-2',
    ];
    keys.forEach(async (key) => {
      const url = await getImageUrl(key);
      if (url) setImgSrcs((prev) => ({ ...prev, [key]: url }));
    });
  }, []);

  const getImgSrc = (key: string, fallback: string) => imgSrcs[key] || fallback;

  const handleImgUpdate = (key: string) => (url: string | null) => {
    setImgSrcs((prev) => {
      if (url === null) {
        const { [key]: _removed, ...rest } = prev;
        return rest;
      }
      return { ...prev, [key]: url };
    });
  };

  const handleSave = () => {
    setConfig(config);
    toast.success('Настройки сохранены!', {
      description: 'Изменения применены на сайте',
    });
  };

  const handleReset = () => {
    if (confirm('Вы уверены? Все изменения будут сброшены.')) {
      resetConfig();
      setLocalConfig(getConfig());
      toast.info('Настройки сброшены к значениям по умолчанию');
    }
  };

  const updateField = (path: string, value: any) => {
    const keys = path.split('.');

    const setNestedValue = (obj: any, keys: string[], value: any): any => {
      if (keys.length === 1) {
        return { ...obj, [keys[0]]: value };
      }
      return {
        ...obj,
        [keys[0]]: setNestedValue(obj[keys[0]], keys.slice(1), value),
      };
    };

    setLocalConfig(setNestedValue(config, keys, value));
  };

  const logout = () => {
    sessionStorage.removeItem('adminAuth');
    window.location.href = '/';
  };

  const menuItems = [
    { id: 'general', label: 'Основное', icon: LayoutDashboard },
    { id: 'seo', label: 'SEO', icon: Settings },
    { id: 'contacts', label: 'Контакты', icon: Phone },
    { id: 'content', label: 'Контент', icon: FileText },
    { id: 'images', label: 'Изображения', icon: Image },
  ];

  return (
    <div className="min-h-screen bg-[#080F1E] flex">
      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-[#0B1629] border-r border-blue-900 transition-transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="p-6 border-b border-blue-900">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center">
              <span className="text-white font-bold">А</span>
            </div>
            <div>
              <h1 className="text-white font-semibold">Админ-панель</h1>
              <p className="text-blue-400 text-xs">Кухни Сибири</p>
            </div>
          </div>
        </div>

        <nav className="p-4 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  activeTab === item.id
                    ? 'bg-orange-500/20 text-orange-400'
                    : 'text-blue-300 hover:bg-[#0F2035] hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
                <ChevronRight className="w-4 h-4 ml-auto opacity-0" />
              </button>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-blue-900">
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-3 text-blue-300 hover:text-white transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span>Выйти</span>
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="bg-[#0B1629] border-b border-blue-900 p-4 flex items-center justify-between">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="lg:hidden text-blue-300 hover:text-white"
          >
            <Menu className="w-6 h-6" />
          </button>

          <div className="flex items-center gap-4">
            <a
              href="/"
              target="_blank"
              className="flex items-center gap-2 text-blue-300 hover:text-white transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              <span className="hidden sm:inline">Открыть сайт</span>
            </a>
            <Button
              onClick={handleSave}
              className="bg-orange-500 hover:bg-orange-600 text-black"
            >
              <Save className="w-4 h-4 mr-2" />
              Сохранить
            </Button>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 overflow-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            {/* Основные настройки */}
            <TabsContent value="general" className="space-y-6">
              <div>
                <h2 className="text-2xl font-serif text-white mb-6">Основные настройки</h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-blue-200">Название сайта</Label>
                    <Input
                      value={config.siteName}
                      onChange={(e) => updateField('siteName', e.target.value)}
                      className="bg-[#0F2035] border-blue-900 text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-blue-200">Описание сайта</Label>
                    <Input
                      value={config.siteDescription}
                      onChange={(e) => updateField('siteDescription', e.target.value)}
                      className="bg-[#0F2035] border-blue-900 text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-blue-200">Город</Label>
                    <Input
                      value={config.city}
                      onChange={(e) => updateField('city', e.target.value)}
                      className="bg-[#0F2035] border-blue-900 text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-blue-200">Регион</Label>
                    <Input
                      value={config.region}
                      onChange={(e) => updateField('region', e.target.value)}
                      className="bg-[#0F2035] border-blue-900 text-white"
                    />
                  </div>
                </div>
              </div>

              <div className="divider-gold" />

              {/* УТП */}
              <div>
                <h3 className="text-xl font-serif text-white mb-4">Уникальное торговое предложение</h3>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-blue-200">Заголовок УТП</Label>
                    <Input
                      value={config.utp.title}
                      onChange={(e) => updateField('utp.title', e.target.value)}
                      className="bg-[#0F2035] border-blue-900 text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-blue-200">Подзаголовок</Label>
                    <Input
                      value={config.utp.subtitle}
                      onChange={(e) => updateField('utp.subtitle', e.target.value)}
                      className="bg-[#0F2035] border-blue-900 text-white"
                    />
                  </div>

                  <div className="space-y-4">
                    <Label className="text-blue-200">Преимущества</Label>
                    {config.utp.benefits.map((benefit, index) => (
                      <div key={index} className="grid grid-cols-3 gap-4 p-4 bg-[#0F2035]/50 rounded-lg">
                        <Input
                          value={benefit.title}
                          onChange={(e) => {
                            const newBenefits = [...config.utp.benefits];
                            newBenefits[index].title = e.target.value;
                            updateField('utp.benefits', newBenefits);
                          }}
                          placeholder="Заголовок"
                          className="bg-[#0F2035] border-blue-900 text-white"
                        />
                        <Input
                          value={benefit.description}
                          onChange={(e) => {
                            const newBenefits = [...config.utp.benefits];
                            newBenefits[index].description = e.target.value;
                            updateField('utp.benefits', newBenefits);
                          }}
                          placeholder="Описание"
                          className="bg-[#0F2035] border-blue-900 text-white col-span-2"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* SEO */}
            <TabsContent value="seo" className="space-y-6">
              <div>
                <h2 className="text-2xl font-serif text-white mb-6">SEO настройки</h2>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-blue-200">Title (заголовок страницы)</Label>
                    <Input
                      value={config.seo.title}
                      onChange={(e) => updateField('seo.title', e.target.value)}
                      className="bg-[#0F2035] border-blue-900 text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-blue-200">Meta Description</Label>
                    <Textarea
                      value={config.seo.description}
                      onChange={(e) => updateField('seo.description', e.target.value)}
                      className="bg-[#0F2035] border-blue-900 text-white"
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-blue-200">Keywords (через запятую)</Label>
                    <Textarea
                      value={config.seo.keywords.join(', ')}
                      onChange={(e) => updateField('seo.keywords', e.target.value.split(', '))}
                      className="bg-[#0F2035] border-blue-900 text-white"
                      rows={4}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-blue-200">OG Image (путь к изображению)</Label>
                    <Input
                      value={config.seo.ogImage}
                      onChange={(e) => updateField('seo.ogImage', e.target.value)}
                      className="bg-[#0F2035] border-blue-900 text-white"
                    />
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Контакты */}
            <TabsContent value="contacts" className="space-y-6">
              <div>
                <h2 className="text-2xl font-serif text-white mb-6">Контактная информация</h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-blue-200">Телефон (для ссылки)</Label>
                    <Input
                      value={config.phone}
                      onChange={(e) => updateField('phone', e.target.value)}
                      className="bg-[#0F2035] border-blue-900 text-white"
                      placeholder="89041234567"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-blue-200">Телефон (отображение)</Label>
                    <Input
                      value={config.phoneFormatted}
                      onChange={(e) => updateField('phoneFormatted', e.target.value)}
                      className="bg-[#0F2035] border-blue-900 text-white"
                      placeholder="8 (904) 123-45-67"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-blue-200">Email</Label>
                    <Input
                      value={config.email}
                      onChange={(e) => updateField('email', e.target.value)}
                      className="bg-[#0F2035] border-blue-900 text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-blue-200">Адрес</Label>
                    <Input
                      value={config.address}
                      onChange={(e) => updateField('address', e.target.value)}
                      className="bg-[#0F2035] border-blue-900 text-white"
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label className="text-blue-200">Режим работы</Label>
                    <Input
                      value={config.workingHours}
                      onChange={(e) => updateField('workingHours', e.target.value)}
                      className="bg-[#0F2035] border-blue-900 text-white"
                    />
                  </div>
                </div>

                <div className="divider-gold my-8" />

                <h3 className="text-xl font-serif text-white mb-4">Социальные сети</h3>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-blue-200">Instagram</Label>
                    <Input
                      value={config.social.instagram || ''}
                      onChange={(e) => updateField('social.instagram', e.target.value)}
                      className="bg-[#0F2035] border-blue-900 text-white"
                      placeholder="https://instagram.com/..."
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-blue-200">VK</Label>
                    <Input
                      value={config.social.vk || ''}
                      onChange={(e) => updateField('social.vk', e.target.value)}
                      className="bg-[#0F2035] border-blue-900 text-white"
                      placeholder="https://vk.com/..."
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-blue-200">Telegram</Label>
                    <Input
                      value={config.social.telegram || ''}
                      onChange={(e) => updateField('social.telegram', e.target.value)}
                      className="bg-[#0F2035] border-blue-900 text-white"
                      placeholder="https://t.me/..."
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-blue-200">WhatsApp</Label>
                    <Input
                      value={config.social.whatsapp || ''}
                      onChange={(e) => updateField('social.whatsapp', e.target.value)}
                      className="bg-[#0F2035] border-blue-900 text-white"
                      placeholder="https://wa.me/..."
                    />
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Контент */}
            <TabsContent value="content" className="space-y-6">
              <div>
                <h2 className="text-2xl font-serif text-white mb-6">Управление контентом</h2>
                
                <div className="space-y-6">
                  <div className="p-6 bg-[#0F2035]/50 rounded-lg">
                    <h3 className="text-lg font-medium text-white mb-4">О компании</h3>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label className="text-blue-200">Заголовок</Label>
                        <Input
                          value={config.about.title}
                          onChange={(e) => updateField('about.title', e.target.value)}
                          className="bg-[#0F2035] border-blue-900 text-white"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-blue-200">Описание</Label>
                        <Textarea
                          value={config.about.description}
                          onChange={(e) => updateField('about.description', e.target.value)}
                          className="bg-[#0F2035] border-blue-900 text-white"
                          rows={4}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="p-6 bg-[#0F2035]/50 rounded-lg">
                    <h3 className="text-lg font-medium text-white mb-4">FAQ</h3>
                    <div className="space-y-4">
                      {config.faq.map((item, index) => (
                        <div key={index} className="space-y-2 p-4 bg-[#0F2035] rounded-lg">
                          <Input
                            value={item.question}
                            onChange={(e) => {
                              const newFaq = [...config.faq];
                              newFaq[index].question = e.target.value;
                              updateField('faq', newFaq);
                            }}
                            placeholder="Вопрос"
                            className="bg-[#0B1629] border-blue-900 text-white"
                          />
                          <Textarea
                            value={item.answer}
                            onChange={(e) => {
                              const newFaq = [...config.faq];
                              newFaq[index].answer = e.target.value;
                              updateField('faq', newFaq);
                            }}
                            placeholder="Ответ"
                            className="bg-[#0B1629] border-blue-900 text-white"
                            rows={3}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Изображения */}
            <TabsContent value="images" className="space-y-6">
              <div>
                <h2 className="text-2xl font-serif text-white mb-6">Управление изображениями</h2>

                <div className="space-y-6">
                  {/* Главный экран */}
                  <div className="p-6 bg-[#0F2035]/50 rounded-lg">
                    <h3 className="text-lg font-medium text-white mb-4">Главный экран (Hero)</h3>
                    <ImageUploader
                      imageKey="hero-bg"
                      label="Фоновое изображение"
                      currentSrc={getImgSrc('hero-bg', '/images/hero-bg.jpg')}
                      maxWidth={1920}
                      maxHeight={1080}
                      quality={0.85}
                      aspectRatio="16/9"
                      onUpdate={handleImgUpdate('hero-bg')}
                    />
                  </div>

                  {/* Логотип */}
                  <div className="p-6 bg-[#0F2035]/50 rounded-lg">
                    <h3 className="text-lg font-medium text-white mb-2">Логотип</h3>
                    <p className="text-blue-400 text-xs mb-4">
                      Загрузите PNG/SVG с прозрачным фоном. После загрузки логотип отобразится в шапке сайта.
                    </p>
                    <div className="max-w-xs">
                      <ImageUploader
                        imageKey="logo"
                        label="Изображение логотипа"
                        currentSrc={getImgSrc('logo', '/images/hero-bg.jpg')}
                        maxWidth={400}
                        maxHeight={200}
                        quality={0.92}
                        aspectRatio="2/1"
                        outputFormat="png"
                        onUpdate={handleImgUpdate('logo')}
                      />
                    </div>
                    <div className="mt-4 space-y-2">
                      <Label className="text-blue-200">Alt текст логотипа</Label>
                      <Input
                        value={config.logo.alt}
                        onChange={(e) => updateField('logo.alt', e.target.value)}
                        className="bg-[#0F2035] border-blue-900 text-white"
                      />
                    </div>
                  </div>

                  {/* OG изображение */}
                  <div className="p-6 bg-[#0F2035]/50 rounded-lg">
                    <h3 className="text-lg font-medium text-white mb-2">OG-изображение (для соцсетей)</h3>
                    <p className="text-blue-400 text-xs mb-4">
                      Отображается при репосте ссылки в ВКонтакте, Telegram и других соцсетях. Рекомендуется 1200×630px.
                    </p>
                    <ImageUploader
                      imageKey="og-image"
                      label="OG-изображение"
                      currentSrc={getImgSrc('og-image', '/images/og-image.jpg')}
                      maxWidth={1200}
                      maxHeight={630}
                      quality={0.85}
                      aspectRatio="1200/630"
                      onUpdate={handleImgUpdate('og-image')}
                    />
                  </div>

                  {/* Категории */}
                  <div className="p-6 bg-[#0F2035]/50 rounded-lg">
                    <h3 className="text-lg font-medium text-white mb-4">Категории мебели</h3>
                    <div className="grid sm:grid-cols-2 gap-6">
                      {config.categories.map((category) => (
                        <ImageUploader
                          key={category.id}
                          imageKey={`cat-${category.id}`}
                          label={category.name}
                          currentSrc={getImgSrc(`cat-${category.id}`, category.image)}
                          maxWidth={800}
                          maxHeight={1067}
                          quality={0.85}
                          aspectRatio="3/4"
                          onUpdate={handleImgUpdate(`cat-${category.id}`)}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Портфолио */}
                  <div className="p-6 bg-[#0F2035]/50 rounded-lg">
                    <h3 className="text-lg font-medium text-white mb-4">Портфолио</h3>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {config.portfolio.map((project, index) => (
                        <ImageUploader
                          key={project.id}
                          imageKey={`portfolio-${index}`}
                          label={project.title}
                          currentSrc={getImgSrc(`portfolio-${index}`, project.image)}
                          maxWidth={900}
                          maxHeight={675}
                          quality={0.85}
                          aspectRatio="4/3"
                          onUpdate={handleImgUpdate(`portfolio-${index}`)}
                        />
                      ))}
                    </div>
                  </div>

                  {/* О компании */}
                  <div className="p-6 bg-[#0F2035]/50 rounded-lg">
                    <h3 className="text-lg font-medium text-white mb-4">Раздел "О нас"</h3>
                    <div className="grid sm:grid-cols-3 gap-6">
                      {(['Фото производства 1', 'Фото производства 2', 'Фото материалов'] as const).map(
                        (label, index) => (
                          <ImageUploader
                            key={index}
                            imageKey={`about-img-${index}`}
                            label={label}
                            currentSrc={getImgSrc(
                              `about-img-${index}`,
                              config.about.images[index] || '/images/hero-bg.jpg'
                            )}
                            maxWidth={700}
                            maxHeight={933}
                            quality={0.85}
                            aspectRatio="3/4"
                            onUpdate={handleImgUpdate(`about-img-${index}`)}
                          />
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          {/* Кнопки действий */}
          <div className="mt-8 flex gap-4">
            <Button
              onClick={handleSave}
              className="bg-orange-500 hover:bg-orange-600 text-black"
            >
              <Save className="w-4 h-4 mr-2" />
              Сохранить изменения
            </Button>
            <Button
              onClick={handleReset}
              variant="outline"
              className="border-blue-900 text-blue-300 hover:text-white"
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Сбросить
            </Button>
          </div>
        </main>
      </div>

      {/* Overlay для мобильного меню */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-[#050D1A]/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
}

export default Admin;
