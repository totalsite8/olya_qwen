export interface Work {
  id: string;
  index: string;
  title: string;
  client: string;
  category: string;
  year: string;
  image: string;
  ratio: string; // tailwind aspect class
  span: string; // tailwind col-span class
  desc: string;
  role: string;
  stack: string[];
  metrics: { k: string; v: string }[];
  accent: "accent" | "accent2";
}

const img = {
  pulse: "https://image.qwenlm.ai/generated-images/fbfca857-c023-4469-af79-3b94af56943b/_result.png",
  dreams: "https://image.qwenlm.ai/generated-images/7a2c9cb1-d8fd-406a-9790-746e69d7fdb0/_result.png",
  motion: "https://image.qwenlm.ai/generated-images/f5252de6-1b5c-43c7-819b-9eb7d8ed4ecf/_result.png",
  deck: "https://image.qwenlm.ai/generated-images/a40f0d46-7afc-4157-95e4-0f465739d745/_result.png",
  kult: "https://image.qwenlm.ai/generated-images/cf32fab9-d10a-4304-9628-ae03f5a528cd/_result.png",
  avatar: "https://image.qwenlm.ai/generated-images/5efa2a75-f867-478a-967c-76668cbaaf34/_result.png",
  portrait: "https://image.qwenlm.ai/generated-images/b37c32ce-a8f7-4da8-928a-ba8350d49e23/_result.png",
};

export const PORTRAIT = img.portrait;

export const WORKS: Work[] = [
  {
    id: "pulse",
    index: "01",
    title: "PULSE",
    client: "Фитнес-приложение",
    category: "Брендинг",
    year: "2026",
    image: img.pulse,
    ratio: "aspect-[4/3]",
    span: "md:col-span-7",
    desc: "Айдентика фитнес-приложения: агрессивная типографика, вермильон на графите, система из 40+ носителей — от иконок треков до наружки. Дизайн-система в Figma с токенами и тёмной темой.",
    role: "Арт-дирекшн, айдентика, UI-кит",
    stack: ["Figma", "Illustrator", "After Effects"],
    metrics: [
      { k: "Носителей", v: "40+" },
      { k: "Срок", v: "3 недели" },
      { k: "Узнаваемость", v: "+38%" },
    ],
    accent: "accent",
  },
  {
    id: "dreams",
    index: "02",
    title: "Сны машины",
    client: "Нейросерия",
    category: "Нейро",
    year: "2026",
    image: img.dreams,
    ratio: "aspect-[4/3]",
    span: "md:col-span-5",
    desc: "Авторская серия нейрогенераций: хромовая органика, иридесцентные отражения. Midjourney + ручная доработка в Photoshop, апскейл до 4K, печать на металле для выставки цифрового искусства.",
    role: "Промпт-арт, ретушь, препресс",
    stack: ["Midjourney", "Photoshop", "Topaz Gigapixel"],
    metrics: [
      { k: "Работ в серии", v: "24" },
      { k: "Печать", v: "4K / металл" },
      { k: "Охват выставки", v: "12K" },
    ],
    accent: "accent2",
  },
  {
    id: "potok",
    index: "03",
    title: "Поток",
    client: "Финтех-эксплейнер",
    category: "Моушн",
    year: "2025",
    image: img.motion,
    ratio: "aspect-video",
    span: "md:col-span-5",
    desc: "90-секундный эксплейнер для платёжной платформы: сценарий, раскадровка, 2D-анимация, озвучка и саунд-дизайн. Синий с вермильоном, плотный монтаж под 120 BPM.",
    role: "Сценарий, анимация, звук",
    stack: ["After Effects", "Illustrator", "ElevenLabs"],
    metrics: [
      { k: "Хронометраж", v: "90 сек" },
      { k: "Конверсия лендинга", v: "+27%" },
      { k: "Просмотры", v: "310K" },
    ],
    accent: "accent",
  },
  {
    id: "zerno",
    index: "04",
    title: "Зерно",
    client: "Агротех-питчдек",
    category: "Презентации",
    year: "2025",
    image: img.deck,
    ratio: "aspect-[4/3]",
    span: "md:col-span-7",
    desc: "Питч-дек на 24 слайда для раунда A: нарратив, инфографика по данным рынка, анимированная версия для рассылки инвесторам. Шалфей + бумага, крупные цифры вместо буллетов.",
    role: "Нарратив, дизайн, инфографика",
    stack: ["Figma", "Pitch", "After Effects"],
    metrics: [
      { k: "Слайдов", v: "24" },
      { k: "Раунд", v: "$2.4M" },
      { k: "Срок", v: "10 дней" },
    ],
    accent: "accent2",
  },
  {
    id: "kult",
    index: "05",
    title: "KULT Coffee",
    client: "SMM-система",
    category: "Дизайн",
    year: "2026",
    image: img.kult,
    ratio: "aspect-[4/3]",
    span: "md:col-span-7",
    desc: "Контент-система для сети спешелти-кофеен: 60+ креативов, конструктивистская типографика, шаблоны под сторис и посты, гайдлайн для бариста-контентмейкера.",
    role: "Дизайн-система, шаблоны, съёмка",
    stack: ["Figma", "Photoshop", "Lightroom"],
    metrics: [
      { k: "Креативов", v: "60+" },
      { k: "ER аккаунта", v: "×2.1" },
      { k: "Подписчики", v: "+18K" },
    ],
    accent: "accent",
  },
  {
    id: "ledger",
    index: "06",
    title: "Цифровой спикер",
    client: "Банк, нейроаватар",
    category: "Видео",
    year: "2026",
    image: img.avatar,
    ratio: "aspect-[4/3]",
    span: "md:col-span-5",
    desc: "Говорящий аватар для внутренних коммуникаций банка: клон голоса, 14 минут роликов, субтитры на трёх языках. Экономия на съёмочных днях — в 6 раз против традиционного продакшна.",
    role: "Нейропродакшн, локализация",
    stack: ["HeyGen", "ElevenLabs", "Runway", "CapCut"],
    metrics: [
      { k: "Минут видео", v: "14" },
      { k: "Языка", v: "3" },
      { k: "Экономия", v: "×6" },
    ],
    accent: "accent2",
  },
];

export const FILTERS = ["Все", "Брендинг", "Нейро", "Моушн", "Презентации", "Дизайн", "Видео"];
