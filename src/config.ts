// Конфигурация сайта "Кухни Сибири"
// Этот файл можно редактировать через админ-панель

export interface SiteConfig {
  // Основная информация
  siteName: string;
  siteDescription: string;
  city: string;
  region: string;
  phone: string;
  phoneFormatted: string;
  email: string;
  address: string;
  workingHours: string;
  
  // SEO
  seo: {
    title: string;
    description: string;
    keywords: string[];
    ogImage: string;
  };
  
  // Логотип
  logo: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  
  // Социальные сети
  social: {
    instagram?: string;
    vk?: string;
    telegram?: string;
    youtube?: string;
    whatsapp?: string;
  };
  
  // УТП (Уникальное торговое предложение)
  utp: {
    title: string;
    subtitle: string;
    benefits: {
      icon: string;
      title: string;
      description: string;
    }[];
  };
  
  // Категории мебели
  categories: {
    id: string;
    name: string;
    description: string;
    image: string;
    link: string;
  }[];
  
  // Портфолио
  portfolio: {
    id: string;
    title: string;
    category: string;
    style: string;
    image: string;
    beforeImage?: string;
    afterImage?: string;
    price?: string;
    description?: string;
  }[];
  
  // Процесс работы
  process: {
    step: number;
    title: string;
    description: string;
    icon: string;
  }[];
  
  // Отзывы
  testimonials: {
    id: string;
    name: string;
    text: string;
    rating: number;
    image?: string;
    project?: string;
    date: string;
  }[];
  
  // О компании
  about: {
    title: string;
    description: string;
    features: string[];
    images: string[];
    stats: {
      value: string;
      label: string;
    }[];
  };
  
  // Материалы и поставщики
  materials: {
    name: string;
    logo: string;
    description: string;
  }[];
  
  // FAQ
  faq: {
    question: string;
    answer: string;
  }[];
  
  // Контакты
  contacts: {
    mapCoordinates: {
      lat: number;
      lng: number;
    };
    mapZoom: number;
  };
}

// Начальная конфигурация
export const defaultConfig: SiteConfig = {
  siteName: "Кухни Сибири",
  siteDescription: "Производство премиальной мебели на заказ в Иркутске. Кухни, шкафы, гардеробные от производителя.",
  city: "Иркутск",
  region: "Иркутская область",
  phone: "89041230123",
  phoneFormatted: "8 (904) 123-0-123",
  email: "info@kuhni-sibiri.ru",
  address: "г. Иркутск, ул. Производственная, 15",
  workingHours: "Пн-Пт: 9:00-19:00, Сб: 10:00-16:00",
  
  seo: {
    title: "Кухни на заказ в Иркутске | Производство мебели 'Кухни Сибири'",
    description: "Изготовление кухонь, шкафов и гардеробных в Иркутске и Иркутской области. Бесплатный замер и 3D-проект. Срок 30 дней. Гарантия 2 года. Звоните: 8 (904) 123-0-123",
    keywords: [
      "кухни на заказ Иркутск",
      "мебель на заказ Иркутск",
      "кухни Иркутск",
      "шкафы купе Иркутск",
      "гардеробные Иркутск",
      "производство мебели Иркутск",
      "кухни под заказ Иркутская область",
      "мебельный цех Иркутск",
      "дизайн кухни Иркутск",
      "замер кухни Иркутск"
    ],
    ogImage: "./images/og-image.jpg"
  },
  
  logo: {
    src: "./images/logo.svg",
    alt: "Кухни Сибири - производство мебели на заказ",
    width: 180,
    height: 50
  },
  
  social: {
    instagram: "https://instagram.com/kuhni_sibiri",
    vk: "https://vk.com/kuhni_sibiri",
    telegram: "https://t.me/kuhni_sibiri",
    youtube: "https://youtube.com/@kuhni_sibiri",
    whatsapp: "https://wa.me/79041230123"
  },
  
  utp: {
    title: "Кухни премиум-класса от производителя",
    subtitle: "Индивидуальный дизайн, 3D-визуализация, срок изготовления 30 дней",
    benefits: [
      {
        icon: "ruler",
        title: "Бесплатный замер",
        description: "Выезд замерщика бесплатно в черте города Иркутск"
      },
      {
        icon: "cube",
        title: "3D-визуализация",
        description: "Бесплатный дизайн-проект с 3D-рендером за 24 часа"
      },
      {
        icon: "clock",
        title: "30 дней",
        description: "Срок изготовления кухни от замера до установки"
      },
      {
        icon: "shield",
        title: "2 года гарантии",
        description: "Полная гарантия на всю мебель и фурнитуру"
      }
    ]
  },
  
  categories: [
    {
      id: "kitchens",
      name: "Кухни",
      description: "Индивидуальные кухни любой сложности от классики до модерна",
      image: "./images/categories/kitchen.jpg",
      link: "#kitchens"
    },
    {
      id: "wardrobes",
      name: "Шкафы-купе",
      description: "Встроенные и отдельностоящие шкафы с раздвижными дверями",
      image: "./images/categories/wardrobe.jpg",
      link: "#wardrobes"
    },
    {
      id: "dressing",
      name: "Гардеробные",
      description: "Продуманные системы хранения для вашей одежды и аксессуаров",
      image: "./images/categories/dressing.jpg",
      link: "#dressing"
    },
    {
      id: "other",
      name: "Другая мебель",
      description: "Прихожие, детские, офисная мебель и другие решения",
      image: "./images/categories/other.jpg",
      link: "#other"
    }
  ],
  
  portfolio: [
    {
      id: "1",
      title: "Кухня в современном стиле",
      category: "kitchens",
      style: "modern",
      image: "./images/portfolio/kitchen-1.jpg",
      price: "850 000 ₽",
      description: "Кухня 12 м² с островом, фасады МДФ эмаль, столешница кварц"
    },
    {
      id: "2",
      title: "Классическая кухня",
      category: "kitchens",
      style: "classic",
      image: "./images/portfolio/kitchen-2.jpg",
      price: "1 200 000 ₽",
      description: "Кухня 15 м², массив дуба, фрезеровка, патина"
    },
    {
      id: "3",
      title: "Шкаф-купе в спальню",
      category: "wardrobes",
      style: "modern",
      image: "./images/portfolio/wardrobe-1.jpg",
      price: "180 000 ₽",
      description: "Встроенный шкаф 3 метра, зеркальные двери, LED-подсветка"
    },
    {
      id: "4",
      title: "Гардеробная комната",
      category: "dressing",
      style: "modern",
      image: "./images/portfolio/dressing-1.jpg",
      price: "320 000 ₽",
      description: "Гардеробная 8 м² с островом, система хранения под заказ"
    },
    {
      id: "5",
      title: "Кухня-гостиная",
      category: "kitchens",
      style: "minimalism",
      image: "./images/portfolio/kitchen-3.jpg",
      price: "1 500 000 ₽",
      description: "Единое пространство 25 м², без ручек, интегрированная техника"
    },
    {
      id: "6",
      title: "Прихожая с зеркалом",
      category: "other",
      style: "modern",
      image: "./images/portfolio/hall-1.jpg",
      price: "95 000 ₽",
      description: "Компактная прихожая с тумбой и вешалкой"
    }
  ],
  
  process: [
    {
      step: 1,
      title: "Замер",
      description: "Бесплатный выезд замерщика в удобное время. Точные замеры помещения.",
      icon: "ruler"
    },
    {
      step: 2,
      title: "3D-проект",
      description: "Разработка дизайн-проекта с 3D-визуализацией. Согласование всех деталей.",
      icon: "palette"
    },
    {
      step: 3,
      title: "Производство",
      description: "Изготовление мебели на нашем цеху в Иркутске. Контроль качества.",
      icon: "factory"
    },
    {
      step: 4,
      title: "Доставка и сборка",
      description: "Доставка и профессиональная сборка мебели с гарантией 2 года.",
      icon: "truck"
    }
  ],
  
  testimonials: [
    {
      id: "1",
      name: "Анна и Сергей К.",
      text: "Заказывали кухню в новую квартиру. Остались очень довольны! Дизайнер учел все наши пожелания, 3D-визуализация помогла представить результат. Сборка прошла быстро и качественно.",
      rating: 5,
      project: "Кухня 14 м²",
      date: "февраль 2026"
    },
    {
      id: "2",
      name: "Марина П.",
      text: "Второй раз обращаемся в 'Кухни Сибири'. Первый раз делали кухню, теперь гардеробную. Качество отличное, сроки соблюдены. Рекомендую!",
      rating: 5,
      project: "Гардеробная комната",
      date: "январь 2026"
    },
    {
      id: "3",
      name: "Дмитрий В.",
      text: "Долго выбирали подрядчика для кухни в загородный дом. Остановились на 'Кухнях Сибири' и не пожалели. Индивидуальный подход, качественные материалы.",
      rating: 5,
      project: "Кухня для коттеджа",
      date: "декабрь 2025"
    },
    {
      id: "4",
      name: "Елена С.",
      text: "Заказывали шкафы-купе во всю квартиру. Работа выполнена на высшем уровне. Особенно понравилась встроенная подсветка и системы хранения.",
      rating: 5,
      project: "Шкафы-купе (3 шт.)",
      date: "ноябрь 2025"
    }
  ],
  
  about: {
    title: "О производстве",
    description: "Кухни Сибири — это локальное производство премиальной мебели в Иркутске. Мы создаем индивидуальные решения для вашего дома, используя качественные материалы и современное оборудование.",
    features: [
      "Собственное производство в Иркутске",
      "Материалы от ведущих поставщиков",
      "Современное оборудование",
      "Опытные мастера и сборщики",
      "Контроль качества на каждом этапе"
    ],
    images: [
      "./images/about/factory-1.jpg",
      "./images/about/factory-2.jpg",
      "./images/about/materials.jpg"
    ],
    stats: [
      { value: "500+", label: "Выполненных проектов" },
      { value: "8", label: "Лет на рынке" },
      { value: "30", label: "Дней средний срок" },
      { value: "2", label: "Года гарантии" }
    ]
  },
  
  materials: [
    {
      name: "Egger",
      logo: "./images/brands/egger.svg",
      description: "Австрийские ЛДСП премиум-класса"
    },
    {
      name: "Kronospan",
      logo: "./images/brands/kronospan.svg",
      description: "Высококачественные плиты МДФ и ЛДСП"
    },
    {
      name: "Blum",
      logo: "./images/brands/blum.svg",
      description: "Австрийская фурнитура с доводчиками"
    },
    {
      name: "Hettich",
      logo: "./images/brands/hettich.svg",
      description: "Немецкая фурнитура для мебели"
    }
  ],
  
  faq: [
    {
      question: "Сколько стоит кухня на заказ?",
      answer: "Стоимость кухни зависит от размеров, материалов фасадов, фурнитуры и сложности проекта. Средний чек на кухню в Иркутске — от 300 000 до 1 500 000 рублей. Мы предоставляем бесплатный расчет стоимости после замера."
    },
    {
      question: "Какой срок изготовления кухни?",
      answer: "Стандартный срок изготовления кухни — 30 дней с момента утверждения проекта. Для сложных проектов срок может быть увеличен до 45 дней."
    },
    {
      question: "Какие материалы вы используете?",
      answer: "Мы работаем с ЛДСП Egger и Kronospan, МДФ эмаль, массив дерева (дуб, бук, ясень), кварцевыми и акриловыми столешницами, фурнитурой Blum и Hettich."
    },
    {
      question: "Даете ли вы гарантию?",
      answer: "Да, мы предоставляем гарантию 2 года на всю мебель и фурнитуру. В гарантийный случай входят дефекты материалов и сборки."
    },
    {
      question: "Выезд замерщика платный?",
      answer: "Выезд замерщика бесплатный в черте города Иркутск. Для загородных объектов и других городов области стоимость выезда оговаривается отдельно."
    }
  ],
  
  contacts: {
    mapCoordinates: {
      lat: 52.2875,
      lng: 104.2810
    },
    mapZoom: 13
  }
};

// Текущая конфигурация (может быть изменена через админку)
let currentConfig: SiteConfig = { ...defaultConfig };

export function getConfig(): SiteConfig {
  const saved = localStorage.getItem('siteConfig');
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch {
      return currentConfig;
    }
  }
  return currentConfig;
}

export function setConfig(config: SiteConfig) {
  currentConfig = config;
  localStorage.setItem('siteConfig', JSON.stringify(config));
}

export function resetConfig() {
  currentConfig = { ...defaultConfig };
  localStorage.setItem('siteConfig', JSON.stringify(currentConfig));
}
