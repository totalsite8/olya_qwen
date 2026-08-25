export type Market = "RU" | "US" | "EU";
export type Unit =
  | "шт"
  | "мин"
  | "слайд"
  | "проект"
  | "пакет"
  | "мес"
  | "день"
  | "модель"
  | "набор"
  | "формат";

export type CategoryId = "design" | "neuro" | "video" | "pres" | "extra";

export interface Service {
  id: string;
  code: string;
  name: string;
  unit: Unit;
  prices: Record<Market, number>;
  /** Шаг счётчика: 1 для штук, 0.5 для минут */
  step: 1 | 0.5;
  sliderMax: number;
  /** Дней на единицу (нормы выработки, раздел 9) */
  daysPerUnit: number;
  /** Исключено из расчёта срока (подписка) */
  noDays?: boolean;
  /** Медиана рынка РФ, ₽ за единицу — для строки «рыночный ориентир» */
  medianRu?: number;
  note?: string;
  sub?: string;
  cat: CategoryId;
}

export const MARKET_META: Record<Market, { label: string; cur: string; flag: string }> = {
  RU: { label: "Россия", cur: "₽", flag: "RU" },
  US: { label: "США", cur: "$", flag: "US" },
  EU: { label: "Европа", cur: "€", flag: "EU" },
};

export const CATEGORIES: { id: CategoryId; title: string; desc: string }[] = [
  { id: "design", title: "Дизайн", desc: "SMM-графика и креативы поштучно" },
  { id: "neuro", title: "Нейрогенерации", desc: "Статика, «оживление», клипы, аватары и голос" },
  { id: "video", title: "Видео и анимация", desc: "Минуты анимации, сценарий, озвучка" },
  { id: "pres", title: "Презентации", desc: "Слайды по типам + база проекта один раз" },
  { id: "extra", title: "Расширенный спектр", desc: "Ретейнеры, системы, пакеты — цены-черновик" },
];

export const SERVICES: Service[] = [
  // ===== 2.1 Дизайн =====
  { id: "D1", code: "D1", name: "Пост для соцсетей", unit: "шт", prices: { RU: 600, US: 25, EU: 18 }, step: 1, sliderMax: 60, daysPerUnit: 0.2, medianRu: 1200, cat: "design" },
  { id: "D2", code: "D2", name: "Баннер", unit: "шт", prices: { RU: 800, US: 35, EU: 25 }, step: 1, sliderMax: 60, daysPerUnit: 0.2, medianRu: 1500, cat: "design" },
  { id: "D3", code: "D3", name: "Обложка", unit: "шт", prices: { RU: 1500, US: 60, EU: 40 }, step: 1, sliderMax: 40, daysPerUnit: 0.2, medianRu: 2500, cat: "design" },
  { id: "D4", code: "D4", name: "Сторис", unit: "шт", prices: { RU: 500, US: 20, EU: 15 }, step: 1, sliderMax: 60, daysPerUnit: 0.2, medianRu: 800, cat: "design" },
  { id: "D5", code: "D5", name: "Иконка", unit: "шт", prices: { RU: 400, US: 15, EU: 10 }, step: 1, sliderMax: 40, daysPerUnit: 0.2, medianRu: 1000, cat: "design" },
  { id: "D6", code: "D6", name: "Карточка товара", unit: "шт", prices: { RU: 700, US: 30, EU: 22 }, step: 1, sliderMax: 60, daysPerUnit: 0.2, medianRu: 1500, cat: "design" },

  // ===== 2.2 Нейрогенерации =====
  { id: "N1", code: "N1", name: "Статичное изображение", unit: "шт", prices: { RU: 400, US: 12, EU: 9 }, step: 1, sliderMax: 100, daysPerUnit: 0.05, medianRu: 1000, cat: "neuro" },
  { id: "N2", code: "N2", name: "Анимация изображения («оживить»)", unit: "шт", prices: { RU: 2000, US: 80, EU: 60 }, step: 1, sliderMax: 20, daysPerUnit: 0.25, medianRu: 12000, cat: "neuro" },
  { id: "N3", code: "N3", name: "Видео-генерация, клип 5 секунд", unit: "шт", prices: { RU: 3000, US: 125, EU: 90 }, step: 1, sliderMax: 20, daysPerUnit: 0.34, medianRu: 15000, cat: "neuro" },
  { id: "N4", code: "N4", name: "Говорящий аватар", unit: "мин", prices: { RU: 5000, US: 200, EU: 150 }, step: 0.5, sliderMax: 10, daysPerUnit: 0.1, medianRu: 10000, cat: "neuro" },
  { id: "N5", code: "N5", name: "Озвучка / клон голоса", unit: "мин", prices: { RU: 1500, US: 60, EU: 45 }, step: 0.5, sliderMax: 20, daysPerUnit: 0.05, medianRu: 2500, cat: "neuro" },

  // ===== 2.3 Видео и анимация =====
  {
    id: "V1", code: "V1", name: "Стандартная анимация", unit: "мин",
    prices: { RU: 18000, US: 800, EU: 550 }, step: 0.5, sliderMax: 10, daysPerUnit: 2, medianRu: 50000, cat: "video",
    note: "Нейтральный фон, 1 персонаж, графические элементы, 3 круга правок, исходники",
  },
  {
    id: "V2", code: "V2", name: "Сложная анимация", unit: "мин",
    prices: { RU: 23000, US: 1500, EU: 900 }, step: 0.5, sliderMax: 10, daysPerUnit: 2, medianRu: 90000, cat: "video",
    note: "2–3 персонажа, смены сцен, экшн, параллакс, 3D-элементы, сложный свет",
  },
  { id: "V3", code: "V3", name: "Сценарий / раскадровка", unit: "мин", prices: { RU: 5000, US: 400, EU: 160 }, step: 0.5, sliderMax: 10, daysPerUnit: 1, medianRu: 20000, cat: "video" },
  { id: "V4", code: "V4", name: "Озвучка к видео", unit: "мин", prices: { RU: 1500, US: 60, EU: 45 }, step: 0.5, sliderMax: 20, daysPerUnit: 0.05, medianRu: 2500, cat: "video" },

  // ===== 2.4 Презентации =====
  { id: "P1", code: "P1", name: "Презентация с нуля", unit: "слайд", prices: { RU: 800, US: 25, EU: 22 }, step: 1, sliderMax: 60, daysPerUnit: 0.1, medianRu: 1500, cat: "pres" },
  { id: "P2", code: "P2", name: "Редизайн готовой презентации", unit: "слайд", prices: { RU: 500, US: 15, EU: 13 }, step: 1, sliderMax: 60, daysPerUnit: 0.1, medianRu: 1500, cat: "pres" },
  { id: "P3", code: "P3", name: "Слайды с инфографикой и схемами", unit: "слайд", prices: { RU: 1500, US: 40, EU: 38 }, step: 1, sliderMax: 40, daysPerUnit: 0.1, medianRu: 3000, cat: "pres" },

  // ===== 12. Расширенный спектр (цены-черновик) =====
  { id: "X01", code: "X1", name: "Дизайн-подписка (пакет единиц в месяц)", unit: "мес", prices: { RU: 25000, US: 1200, EU: 900 }, step: 1, sliderMax: 12, daysPerUnit: 0, noDays: true, medianRu: 60000, sub: "Ретейнер", cat: "extra" },
  { id: "X02", code: "X2", name: "Анимированный корпоративный стиль", unit: "проект", prices: { RU: 60000, US: 3000, EU: 2200 }, step: 1, sliderMax: 3, daysPerUnit: 14, medianRu: 200000, sub: "Системы", cat: "extra" },
  { id: "X03", code: "X3", name: "Анимация логотипа", unit: "шт", prices: { RU: 12000, US: 600, EU: 450 }, step: 1, sliderMax: 5, daysPerUnit: 2, medianRu: 25000, sub: "Моушн", cat: "extra" },
  { id: "X04", code: "X4", name: "Соцпакет анимаций (5–10 роликов + шаблоны)", unit: "пакет", prices: { RU: 45000, US: 2200, EU: 1600 }, step: 1, sliderMax: 4, daysPerUnit: 5, medianRu: 90000, sub: "Моушн", cat: "extra" },
  { id: "X05", code: "X5", name: "Фирменный шаблон презентации (PPT/Figma)", unit: "шт", prices: { RU: 25000, US: 1200, EU: 900 }, step: 1, sliderMax: 3, daysPerUnit: 3, medianRu: 25000, sub: "Презентации", cat: "extra" },
  { id: "X06", code: "X6", name: "Концепция дизайна презентации (2–4 слайда)", unit: "шт", prices: { RU: 15000, US: 750, EU: 550 }, step: 1, sliderMax: 3, daysPerUnit: 3, medianRu: 15000, sub: "Презентации", cat: "extra" },
  { id: "X07", code: "X7", name: "Питч-дек под ключ (нарратив + дизайн)", unit: "проект", prices: { RU: 80000, US: 4000, EU: 3000 }, step: 1, sliderMax: 3, daysPerUnit: 10, medianRu: 150000, sub: "Презентации", cat: "extra" },
  { id: "X08", code: "X8", name: "Reels / Shorts под ключ", unit: "шт", prices: { RU: 7000, US: 350, EU: 260 }, step: 1, sliderMax: 20, daysPerUnit: 1.5, medianRu: 15000, sub: "Видео", cat: "extra" },
  { id: "X09", code: "X9", name: "Адаптация ролика под формат (9:16, 1:1, 4:5)", unit: "формат", prices: { RU: 3500, US: 175, EU: 130 }, step: 1, sliderMax: 9, daysPerUnit: 0.5, medianRu: 5000, sub: "Видео", cat: "extra" },
  { id: "X10", code: "X10", name: "Локализация видео (субтитры + озвучка)", unit: "мин", prices: { RU: 2500, US: 120, EU: 90 }, step: 0.5, sliderMax: 20, daysPerUnit: 0.1, medianRu: 4000, sub: "Видео", cat: "extra" },
  { id: "X11", code: "X11", name: "Саунд-дизайн и музыкальная подложка", unit: "мин", prices: { RU: 3000, US: 150, EU: 110 }, step: 0.5, sliderMax: 10, daysPerUnit: 0.1, medianRu: 5000, sub: "Видео", cat: "extra" },
  { id: "X12", code: "X12", name: "Монтаж материала заказчика", unit: "мин", prices: { RU: 4000, US: 200, EU: 150 }, step: 0.5, sliderMax: 30, daysPerUnit: 0.1, medianRu: 6000, sub: "Видео", cat: "extra" },
  { id: "X13", code: "X13", name: "Кастомная LoRA / обучение модели на стиле", unit: "модель", prices: { RU: 15000, US: 750, EU: 550 }, step: 1, sliderMax: 4, daysPerUnit: 3, medianRu: 30000, sub: "Нейро", cat: "extra" },
  { id: "X14", code: "X14", name: "Консистентный персонаж (10 ракурсов)", unit: "набор", prices: { RU: 6000, US: 300, EU: 220 }, step: 1, sliderMax: 6, daysPerUnit: 1, medianRu: 12000, sub: "Нейро", cat: "extra" },
  { id: "X15", code: "X15", name: "Нейро-ретушь и обработка фото", unit: "шт", prices: { RU: 150, US: 8, EU: 6 }, step: 1, sliderMax: 100, daysPerUnit: 0.02, medianRu: 500, sub: "Нейро", cat: "extra" },
  { id: "X16", code: "X16", name: "Апскейл изображения до 4K", unit: "шт", prices: { RU: 300, US: 15, EU: 11 }, step: 1, sliderMax: 100, daysPerUnit: 0.02, medianRu: 800, sub: "Нейро", cat: "extra" },
  { id: "X17", code: "X17", name: "Инфографика для соцсетей", unit: "шт", prices: { RU: 1000, US: 45, EU: 35 }, step: 1, sliderMax: 40, daysPerUnit: 0.2, medianRu: 2000, sub: "Дизайн", cat: "extra" },
  { id: "X18", code: "X18", name: "Обложка YouTube / превью", unit: "шт", prices: { RU: 900, US: 45, EU: 33 }, step: 1, sliderMax: 40, daysPerUnit: 0.2, medianRu: 1500, sub: "Дизайн", cat: "extra" },
  { id: "X19", code: "X19", name: "Анимированная презентация (видео со слайдов)", unit: "слайд", prices: { RU: 1200, US: 55, EU: 42 }, step: 1, sliderMax: 40, daysPerUnit: 0.15, medianRu: 2000, sub: "Презентации", cat: "extra" },
  { id: "X20", code: "X20", name: "Смена исполнителя: «смена/день»", unit: "день", prices: { RU: 20000, US: 1000, EU: 700 }, step: 1, sliderMax: 10, daysPerUnit: 1, medianRu: 35000, sub: "Формат работы", cat: "extra" },
];

/** База проекта презентации — начисляется один раз, если есть хотя бы один слайд P1–P3 */
export const PRES_BASE = {
  name: "База проекта презентации",
  prices: { RU: 8000, US: 300, EU: 220 } as Record<Market, number>,
  days: 2,
  medianRu: 15000,
};

export const SERVICE_BY_ID: Record<string, Service> = Object.fromEntries(
  SERVICES.map((s) => [s.id, s])
);
