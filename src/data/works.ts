import { MEDIA } from "./media";

export interface GalleryItem {
  src: string;
  cap: string;
}

export interface Work {
  id: string;
  index: string;
  title: string;
  client: string;
  category: string;
  year: string;
  image: string;
  ratio: string;
  span: string;
  desc: string;
  role: string;
  stack: string[];
  metrics: { k: string; v: string }[];
  gallery: GalleryItem[];
  video?: string;
  poster?: string;
}

export const PORTRAIT =
  "https://image.qwenlm.ai/generated-images/b37c32ce-a8f7-4da8-928a-ba8350d49e23/_result.png";

export const WORKS: Work[] = [
  {
    id: "showreel",
    index: "00",
    title: "Шоурил",
    client: "Лучшее за 45 секунд",
    category: "Видео",
    year: "2026",
    image: MEDIA.videoPoster,
    poster: MEDIA.videoPoster,
    video: MEDIA.showreel,
    ratio: "aspect-[16/10]",
    span: "md:col-span-7",
    desc: "Сборка главных проектов года: маскоты, нейрогенерации, моушн и упаковка — под один ритм. Наведите, чтобы включить; в кейсе — плеер со звуком.",
    role: "Моушн-дизайн, нейропродакшн, монтаж",
    stack: ["After Effects", "Runway", "ElevenLabs", "CapCut"],
    metrics: [
      { k: "Хронометраж", v: "45 сек" },
      { k: "Проектов", v: "12" },
      { k: "Рынки", v: "RU·US·EU" },
    ],
    gallery: [],
  },
  {
    id: "alfa",
    index: "01",
    title: "Альфа",
    client: "АльфаСтрахование · маскоты",
    category: "Персонажи",
    year: "2025",
    image: MEDIA.alfaMascotsHero,
    ratio: "aspect-[16/10]",
    span: "md:col-span-5",
    desc: "Два героя бренда — мужчина и кот в красном: характеры, пластика, 20+ ракурсов и ситуаций. Отдельным артефактом — памятка для сотрудников: как персонажи говорят, где уместны, а где — категорически нет.",
    role: "Персонажи, иллюстрация, гайдлайн",
    stack: ["Illustrator", "Figma", "Photoshop"],
    metrics: [
      { k: "Персонажа", v: "2" },
      { k: "Ракурсов", v: "20+" },
      { k: "Гайд", v: "12 разворотов" },
    ],
    gallery: [
      { src: MEDIA.alfaCatFull, cap: "Кот в красном — полный рост" },
      { src: MEDIA.alfaManPortrait, cap: "Мужчина-маскот крупно" },
      { src: MEDIA.alfaPair, cap: "Пара героев" },
      { src: MEDIA.alfaGuideCover, cap: "Обложка памятки" },
      { src: MEDIA.alfaGuideSpeech, cap: "Правила речи героев" },
      { src: MEDIA.alfaGuideLuck, cap: "Финальный разворот" },
    ],
  },
  {
    id: "domashniy",
    index: "02",
    title: "Домашний",
    client: "Телеканал · digital",
    category: "Digital",
    year: "2025",
    image: MEDIA.domGrid,
    ratio: "aspect-[4/3]",
    span: "md:col-span-5",
    desc: "Годовая контент-система телеканала: маскот-кот, рубрикатор, сторис к эфирам, инфографика итогов года и карточки «Твой выбор» с актёрами. Единый голос от публикаций до промо премьер.",
    role: "Контент-система, иллюстрация, SMM",
    stack: ["Figma", "Photoshop", "Illustrator"],
    metrics: [
      { k: "Публикаций", v: "60+" },
      { k: "ER", v: "×2.4" },
      { k: "Рубрики", v: "4" },
    ],
    gallery: [
      { src: MEDIA.domPopcorn, cap: "Сторис к эфиру" },
      { src: MEDIA.domStats, cap: "Итоги года" },
      { src: MEDIA.domTrophy, cap: "Кот с кубком" },
      { src: MEDIA.domCast, cap: "Карточки «Твой выбор»" },
      { src: MEDIA.domCta, cap: "CTA-экран" },
    ],
  },
  {
    id: "ecozavr",
    index: "03",
    title: "Ecozavr",
    client: "Эко-средства · упаковка",
    category: "Упаковка",
    year: "2026",
    image: MEDIA.ecoAd,
    ratio: "aspect-[4/3]",
    span: "md:col-span-7",
    desc: "Продуктовая фотография и рекламные макеты линейки эко-средств: 12 SKU, стилистика «природа крупным планом», носители — от карточек маркетплейсов до наружной рекламы.",
    role: "Продуктовый визуал, рекламные макеты",
    stack: ["Photoshop", "Lightroom", "Figma"],
    metrics: [
      { k: "SKU", v: "12" },
      { k: "Кадров", v: "40+" },
      { k: "Рекламных кампаний", v: "2" },
    ],
    gallery: [
      { src: MEDIA.ecoHand, cap: "Lifestyle: продукт в руке" },
      { src: MEDIA.ecoDual, cap: "Пара флаконов" },
      { src: MEDIA.ecoDogWash, cap: "Сценарий использования" },
      { src: MEDIA.ecoApples, cap: "Натюрморт с яблоками" },
      { src: MEDIA.ecoFoamTile, cap: "Деталь: пена" },
    ],
  },
  {
    id: "cube",
    index: "04",
    title: "house CUBE",
    client: "Загородный клуб · Japandi",
    category: "Презентации",
    year: "2026",
    image: MEDIA.cubeCover,
    ratio: "aspect-[16/10]",
    span: "md:col-span-7",
    desc: "Исследовательская презентация загородного клуба: позиционирование в стиле japandi, анализ рынка, три концепт-идеи и программа мастер-классов. Минимум текста, максимум воздуха.",
    role: "Нарратив, инфографика, дизайн",
    stack: ["Figma", "Pitch"],
    metrics: [
      { k: "Слайдов", v: "24" },
      { k: "Концепции", v: "3" },
      { k: "Стиль", v: "Japandi" },
    ],
    gallery: [
      { src: MEDIA.cubeJapandi, cap: "Принципы Japandi" },
      { src: MEDIA.cubeConcept, cap: "Три концепт-идеи" },
      { src: MEDIA.cubeMarket, cap: "Исследование рынка" },
      { src: MEDIA.cubeClasses, cap: "Мастер-классы" },
      { src: MEDIA.cubeLogo, cap: "Финальный слайд" },
    ],
  },
  {
    id: "burnout",
    index: "05",
    title: "Профвыгорание",
    client: "Данные → слайды",
    category: "Презентации",
    year: "2025",
    image: MEDIA.burnCover,
    ratio: "aspect-[16/10]",
    span: "md:col-span-5",
    desc: "Синяя серия о профессиональном выгорании: определение, статистика, кейс Microsoft и профилактика. Сложные данные — на одном экране, без перегруза и канцелярита.",
    role: "Инфографика, редактура данных",
    stack: ["Figma", "Illustrator"],
    metrics: [
      { k: "Слайдов", v: "18" },
      { k: "Источников", v: "9" },
      { k: "Кейс", v: "Microsoft" },
    ],
    gallery: [
      { src: MEDIA.burnStats, cap: "Статистика" },
      { src: MEDIA.burnMicrosoft, cap: "Кейс Microsoft" },
      { src: MEDIA.burnQuote, cap: "Цитата-тезис" },
      { src: MEDIA.burnPrev, cap: "Профилактика" },
    ],
  },
];

export const FILTERS = ["Все", "Видео", "Персонажи", "Digital", "Упаковка", "Презентации"];
