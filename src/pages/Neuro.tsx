import { motion } from "framer-motion";
import { Wand2, ShieldCheck, Layers, Cpu } from "lucide-react";
import { MEDIA } from "../data/media";
import { PageHero, PageMarquee, MarketInsight, Process, PriceStrip, PageCTA } from "../components/ServicePage";
import { SectionHead, FadeIn } from "../components/ui";
import { fmtMoney } from "../lib/format";

/* Все кадры — реальные работы из архива */
const SHOWCASE = [
  {
    img: MEDIA.alfaCatFull,
    t: "Консистентный персонаж",
    d: "один герой · 10+ ракурсов и эмоций · кейс «Альфы»",
    tag: "нейро-база + ручная доработка",
  },
  {
    img: MEDIA.domLaptop,
    t: "Цифровые герои",
    d: "маскоты для SMM-систем, эфиров и стикерпаков",
    tag: "персонажи · канал «Домашний»",
  },
  {
    img: MEDIA.ecoFlowers,
    t: "Продукт без студии",
    d: "сцены для Ecozavr: лайфстайл, натюрморты, e-com",
    tag: "генерация + арт-дирекшн",
  },
  {
    img: MEDIA.projectsBg,
    t: "Абстрактные миры",
    d: "фоновый арт и текстуры под айдентику бренда",
    tag: "стиль-трансфер · апскейл 4K",
  },
];

function Showcase() {
  return (
    <section className="mx-auto max-w-[1600px] px-5 py-20 md:px-10 md:py-28">
      <SectionHead
        index="G"
        title={<>Что выходит<br />из пайплайна</>}
        meta="Не «картинка из нейросети», а деливерабл: отобранный, доработанный вручную, поднятый до 4K и посаженный в формат."
      />
      <div className="grid gap-5 md:grid-cols-2">
        {SHOWCASE.map((s, i) => (
          <FadeIn key={s.t} delay={(i % 2) * 0.1}>
            <div className="group relative overflow-hidden rounded-2xl border border-line bg-card">
              <img
                src={s.img}
                alt={s.t}
                loading="lazy"
                className="aspect-[4/3] w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg/90 via-bg/20 to-transparent" />
              <span className="absolute left-4 top-4 rounded-full border border-line bg-bg/70 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] backdrop-blur-sm">
                {s.tag}
              </span>
              <div className="absolute inset-x-0 bottom-0 p-6">
                <h3 className="font-display text-2xl font-bold uppercase tracking-tight">{s.t}</h3>
                <p className="mt-1 font-mono text-[11px] uppercase tracking-wide text-muted">{s.d}</p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

const SERVICES = [
  { icon: Wand2, t: "Статичные изображения", d: "Ключевые кадры, продукты в сцене, персонажи, фоны. 20 штук в день по норме выработки.", p: "от 400 ₽", id: "N1" },
  { icon: Cpu, t: "Анимация изображения", d: "«Оживить» статичный кадр: 2–5 секунд движения для ленты, сторис и лендинга.", p: "от 2 000 ₽", id: "N2" },
  { icon: Layers, t: "Видео-генерация", d: "Клипы 5 секунд по сценарию: продукт, абстракция, персонаж. Склейка в ролики до 30 сек.", p: "от 3 000 ₽", id: "N3" },
  { icon: Wand2, t: "Говорящий аватар", d: "Цифровой спикер по вашему скрипту: синхрон губ, жесты, субтитры, мультиязычность.", p: "5 000 ₽/мин", id: "N4" },
  { icon: Wand2, t: "Озвучка и клон голоса", d: "Студийный голос без студии: клонирование с согласия владельца, чистка, интонации.", p: "1 500 ₽/мин", id: "N5" },
  { icon: Cpu, t: "Кастомная LoRA", d: "Обучение модели на вашем стиле или продукте: бренд-консистентные генерации навсегда.", p: "15 000 ₽", id: "X13" },
  { icon: Layers, t: "Консистентный персонаж", d: "Один герой в 10 ракурсах и эмоциях — для SMM-систем, маскотов, стикерпаков.", p: "6 000 ₽", id: "X14" },
  { icon: Wand2, t: "Ретушь и апскейл", d: "Нейро-ретушь фото и поднятие до 4K: печать, наружка, маркетплейсы.", p: "от 150 ₽", id: "X15" },
];

export default function Neuro() {
  return (
    <div>
      <PageHero
        kicker="Нейрогенерации"
        title="AI с руками"
        outline="дизайнера"
        subtitle="Генерации — это 10% работы. Остальные 90% — референсы, промпт-инжиниринг, отбор из сотен вариантов и ручная доработка до брендового результата. Прозрачно: всегда говорим, где работал ИИ."
        bg={MEDIA.heroBg}
        chips={["Midjourney · Runway · Kling", "HeyGen · ElevenLabs", "LoRA под ваш стиль", "Апскейл до 4K", "Раскрытие AI-участия"]}
      />

      <Showcase />

      <PageMarquee items={["Изображения", "Оживление кадров", "5-сек клипы", "Аватары", "Клон голоса", "LoRA", "Персонажи", "Апскейл 4K"]} />

      <MarketInsight
        title={<>Рынок нейро-<br />продакшна</>}
        items={[
          { v: "₽1 000+", k: "услуга генерации на Profi.ru", note: "Вилка 1 000–6 000 ₽, есть и «по 50 ₽ за картинку». Разница в цене — это отбор, ретушь и посадка в бренд. Мы в честном среднем сегменте." },
          { v: "$150–1 200", k: "AI-деливерабл на рынке США", note: "30-сек ролик: новичок $150–400, средний $400–1 000, эксперт $1 000–3 500. Рынок платит за результат, а не за инструмент — так и позиционируемся." },
          { v: "$1.5–8K", k: "месячный ретейнер у фрилансеров", note: "Агентские AI-UGC тарифы: Starter €4 000, Growth €9 600, Pro €21 500/мес. Дизайн-подписка X1 — наш ответ этой модели: пакет единиц за фикс." },
          { v: "₽3–8", k: "себестоимость одной генерации", note: "Подписки 300–800 ₽/мес, API от $0.003. Поэтому клиент платит не за «нажать кнопку», а за вкус, отбор и доработку. Говорим об этом открыто." },
          { v: "×10", k: "вариантов на один финал", note: "Норма: 100+ генераций на ключевой кадр, в финал идут 1–2. Кураторство — и есть продукт." },
          { v: "100%", k: "раскрытие AI-участия", note: "Тренд 2026 — authenticity. В каждом кейсе указываем модели и долю ручной работы. Это снимает вопрос «почему так дёшево/дорого»." },
        ]}
      />

      <section className="mx-auto max-w-[1600px] px-5 py-20 md:px-10 md:py-28">
        <SectionHead index="S" title={<>Услуги и<br />цены за единицу</>} meta="Линейные цены без скидок за объём: 3 круга правок и исходники уже в стоимости каждой позиции." />
        <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s, i) => (
            <motion.div
              key={s.id}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: (i % 4) * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="group flex flex-col bg-bg p-6 transition-colors hover:bg-surface"
            >
              <s.icon size={20} className="text-accent transition-transform duration-300 group-hover:scale-110" />
              <h3 className="mt-4 font-display text-base font-bold uppercase leading-tight tracking-tight">{s.t}</h3>
              <p className="mt-2 flex-1 text-[13px] leading-relaxed text-muted">{s.d}</p>
              <div className="mt-4 font-mono text-xs text-accent">{s.p}</div>
            </motion.div>
          ))}
        </div>
        <p className="mt-5 font-mono text-[11px] uppercase tracking-wide text-muted">
          точная смета с рынком, срочностью и правами — в калькуляторе · RU {fmtMoney(0, "RU").replace("0", "…")}
        </p>
      </section>

      <Process
        steps={[
          { t: "Референсы и мудборд", d: "Собираем визуальный мир: свет, текстуры, референсы бренда. Утверждаем направление до генераций.", days: "день 1" },
          { t: "Промпт-инжиниринг", d: "Пишем и тестируем промпты: 100+ вариантов на ключевой кадр. Фиксируем рабочие формулы для серии.", days: "дни 1–2" },
          { t: "Генерация и отбор", d: "Прогоняем серию, отбираем 3–5 финалистов на кадр. Показываем подборку с комментариями.", days: "дни 2–3" },
          { t: "Ручная доработка", d: "Фотошоп-чистка: руки, артефакты, логотипы, консистентность света. Здесь AI-кадр становится брендовым.", days: "дни 3–4" },
          { t: "Апскейл и форматы", d: "Поднимаем до 4K, сажаем в форматы: лента, сторис, печать, маркетплейсы. Исходники и промпты — ваши.", days: "день 5" },
        ]}
      />

      <section className="mx-auto max-w-[1600px] px-5 pb-20 md:px-10 md:pb-28">
        <div className="flex flex-col items-start gap-6 rounded-2xl border border-line bg-surface/60 p-8 md:flex-row md:items-center md:p-10">
          <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-accent/15 text-accent">
            <ShieldCheck size={24} />
          </span>
          <div>
            <h3 className="font-display text-xl font-bold uppercase tracking-tight md:text-2xl">Этика и права</h3>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted">
              Не генерируем фейковые отзывы, дипфейки реальных людей без согласия и «чужие бренды под ключ». Права на коммерческое использование передаются полностью (RU) или лицензируются (US/EU — блок прав в калькуляторе). В портфолио-кейсах всегда указана доля AI и ручной работы.
            </p>
          </div>
        </div>
      </section>

      <PriceStrip
        ids={["N1", "N2", "N3", "N4", "N5", "X13", "X14", "X15", "X16", "X17"]}
        note="Нейро-позиции считаются за штуки и минуты. Для регулярных задач выгоднее дизайн-подписка X1: пакет единиц в месяц по фиксированной цене."
      />

      <PageCTA>Пришлите референс или задачу — за день соберём тестовую генерацию в вашем стиле и посчитаем серию.</PageCTA>
    </div>
  );
}
