import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Presentation, FileText } from "lucide-react";
import { MEDIA } from "../data/media";
import { PageHero, PageMarquee, MarketInsight, Process, PriceStrip, PageCTA } from "../components/ServicePage";
import { SectionHead, FadeIn } from "../components/ui";

const DECKS: { id: string; name: string; client: string; meta: string; slides: string[] }[] = [
  {
    id: "cube",
    name: "house CUBE",
    client: "Загородная недвижимость",
    meta: "18 слайдов · Japandi · исследование рынка",
    slides: [MEDIA.cubeCover, MEDIA.cubeJapandi, MEDIA.cubeConcept, MEDIA.cubeMarket, MEDIA.cubeClasses, MEDIA.cubeLogo],
  },
  {
    id: "burnout",
    name: "Профессиональное выгорание",
    client: "Исследовательский дек",
    meta: "16 слайдов · 22 источника · кейс Microsoft",
    slides: [MEDIA.burnCover, MEDIA.burnDef, MEDIA.burnStats, MEDIA.burnMicrosoft, MEDIA.burnQuote, MEDIA.burnPrev],
  },
  {
    id: "social",
    name: "Социальные сети",
    client: "Аналитический дек",
    meta: "14 слайдов · 9 графиков · сегментация",
    slides: [MEDIA.smCover, MEDIA.smNeural, MEDIA.smGoals, MEDIA.smGeo, MEDIA.smTimeline, MEDIA.smAge],
  },
  {
    id: "logistics",
    name: "Проблемы логистики",
    client: "B2B-переговоры",
    meta: "12 слайдов · 6 схем · сделка закрыта",
    slides: [MEDIA.logCover, MEDIA.logIntro],
  },
  {
    id: "alfa",
    name: "Памятка «Альфа»",
    client: "Гайдлайн коммуникации",
    meta: "14 разворотов · маскоты · правила речи",
    slides: [MEDIA.alfaGuideCover, MEDIA.alfaGuideMoments, MEDIA.alfaGuideSpeech, MEDIA.alfaGuideContract, MEDIA.alfaGuideLuck],
  },
];

function DeckViewer() {
  const [deckId, setDeckId] = useState(DECKS[0].id);
  const [slide, setSlide] = useState(0);
  const deck = DECKS.find((d) => d.id === deckId) ?? DECKS[0];
  const total = deck.slides.length;

  useEffect(() => setSlide(0), [deckId]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") setSlide((s) => (s + 1) % total);
      if (e.key === "ArrowLeft") setSlide((s) => (s - 1 + total) % total);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [total]);

  return (
    <section className="mx-auto max-w-[1600px] px-5 py-20 md:px-10 md:py-28">
      <SectionHead
        index="D"
        title={<>Настоящие деки<br />из портфеля</>}
        meta="Листайте стрелками или клавиатурой. Каждый дек — с нарративом, инфографикой и системой вёрстки."
      />

      <div className="flex flex-wrap gap-2">
        {DECKS.map((d) => (
          <button
            key={d.id}
            onClick={() => setDeckId(d.id)}
            data-cursor
            className={`rounded-full border px-4 py-2 font-mono text-[11px] uppercase tracking-[0.12em] transition-all ${
              deckId === d.id ? "border-accent bg-accent text-accentink" : "border-line text-muted hover:border-accent/50 hover:text-ink"
            }`}
          >
            {d.name}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-4">
        <div className="lg:col-span-3">
          <div className="relative overflow-hidden rounded-2xl border border-line bg-black">
            <AnimatePresence mode="wait">
              <motion.img
                key={`${deckId}-${slide}`}
                src={deck.slides[slide]}
                alt={`${deck.name} — слайд ${slide + 1}`}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.01 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="aspect-video w-full object-contain"
              />
            </AnimatePresence>

            <button
              onClick={() => setSlide((s) => (s - 1 + total) % total)}
              aria-label="Назад"
              className="absolute left-4 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-bg/80 backdrop-blur transition-all hover:bg-accent hover:text-accentink"
              data-cursor
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => setSlide((s) => (s + 1) % total)}
              aria-label="Вперёд"
              className="absolute right-4 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-bg/80 backdrop-blur transition-all hover:bg-accent hover:text-accentink"
              data-cursor
            >
              <ChevronRight size={18} />
            </button>

            <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-full bg-bg/80 px-4 py-2 backdrop-blur">
              {deck.slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setSlide(i)}
                  aria-label={`Слайд ${i + 1}`}
                  className={`h-1.5 rounded-full transition-all ${i === slide ? "w-6 bg-accent" : "w-1.5 bg-line hover:bg-muted"}`}
                />
              ))}
              <span className="ml-2 font-mono text-[10px] tabular-nums text-muted">
                {String(slide + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="rounded-2xl border border-line bg-surface/60 p-6">
            <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
              <Presentation size={13} /> {deck.client}
            </div>
            <h3 className="mt-3 font-display text-2xl font-bold uppercase leading-tight tracking-tight">{deck.name}</h3>
            <p className="mt-2 font-mono text-[11px] uppercase tracking-wide text-muted">{deck.meta}</p>
          </div>
          <div className="grid flex-1 grid-cols-3 gap-2 lg:grid-cols-2">
            {deck.slides.map((s, i) => (
              <button
                key={s + i}
                onClick={() => setSlide(i)}
                className={`overflow-hidden rounded-lg border transition-all ${
                  i === slide ? "border-accent opacity-100" : "border-line opacity-55 hover:opacity-90"
                }`}
                data-cursor
              >
                <img src={s} alt="" className="aspect-video w-full object-cover" loading="lazy" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const FORMATS = [
  { t: "Питч-дек под ключ", d: "Нарратив + дизайн: структура аргументации, цифры, слайды. Для инвесторов и тендеров.", p: "P1 / X7" },
  { t: "Редизайн готовой", d: "Ваш контент — наша система: единая сетка, типографика, инфографика вместо скриншотов.", p: "P2" },
  { t: "Инфографика и схемы", d: "Данные, которые читаются за 10 секунд: графики, диаграммы, карты, таймлайны.", p: "P3" },
  { t: "Концепция дизайна", d: "2–4 ключевых слайда и дизайн-система до вёрстки всего дека. Правки — на ранней стадии.", p: "X6" },
  { t: "Фирменный шаблон", d: "Мастер-шаблон PPT/Figma: команда сама собирает слайды в вашем стиле за минуты.", p: "X5" },
  { t: "Анимированная версия", d: "Видео со слайдов для рассылки: движение, озвучка, 60–90 секунд вместо 20 страниц.", p: "X19" },
];

export default function Presentations() {
  return (
    <div>
      <PageHero
        kicker="Презентации"
        title="Деки, которые"
        outline="открывают двери"
        subtitle="Питч-деки, инвест-презентации и корпоративные шаблоны: нарратив первым, дизайн вторым. Работают в переговорной, в почте и на экране за 10 секунд. Рынки RU · US · EU."
        bg={MEDIA.projectsBg}
        chips={["Нарратив и структура", "Инфографика", "Концепция за 2–4 слайда", "Шаблон PPT/Figma", "Анимированная версия"]}
      />

      <DeckViewer />

      <PageMarquee items={["Питч-деки", "Инвест-презентации", "Инфографика", "Фирменные шаблоны", "Редизайн", "Анимация слайдов"]} />

      <MarketInsight
        title={<>Рынок презентаций<br />в 2026</>}
        items={[
          { v: "₽1 500+", k: "слайд — медиана рынка РФ", note: "«Дизайн + big data» до 3 000 ₽, с текстами до 4 500 ₽. Наша база 800 ₽/слайд — входной билет ниже студийного прайса при студийном процессе." },
          { v: "₽15–25K", k: "концепция дизайна продаётся отдельно", note: "Рынок выделяет концепцию в отдельную услугу. У нас она есть как позиция X6 — 2–4 слайда и система до вёрстки всего дека." },
          { v: "$35–150", k: "слайд у опытного фрилансера США", note: "Premium-тиры $250–600+/слайд, агентства $1 500–10 000 за дек. Наш $25/слайд — в вилке entry-pro с качеством выше." },
          { v: "$1.5–5K", k: "питч-дек в Кремниевой долине", note: "Фриланс $300–3 500, агентства $3 000–20 000. X7 «питч-дек под ключ» $4 000 — нарратив и дизайн в одном заказе." },
          { v: "$1.5–4K", k: "дек в Европе", note: "Средний ценовой пояс между Азией и США. Европа ценит системы: фирменный шаблон X5 окупается за первый квартал использования." },
          { v: "90 c", k: "столько смотрят инвест-дек", note: "Поэтому каждый слайд — одна мысль, одна цифра, один акцент. Плотность аргументов важнее количества слайдов." },
        ]}
      />

      <section className="mx-auto max-w-[1600px] px-5 py-20 md:px-10 md:py-28">
        <SectionHead index="F" title={<>Шесть форматов<br />работы с деками</>} meta="От концепции до анимированной версии — собираются в любом сочетании, база проекта начисляется один раз." />
        <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-2 lg:grid-cols-3">
          {FORMATS.map((f, i) => (
            <motion.div
              key={f.t}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: (i % 3) * 0.07, ease: [0.16, 1, 0.3, 1] }}
              className="group bg-bg p-7 transition-colors hover:bg-surface"
            >
              <FileText size={20} className="text-accent transition-transform duration-300 group-hover:-translate-y-1" />
              <h3 className="mt-4 font-display text-lg font-bold uppercase tracking-tight md:text-xl">{f.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{f.d}</p>
              <span className="mt-4 inline-block rounded-full border border-line px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
                позиции {f.p}
              </span>
            </motion.div>
          ))}
        </div>
      </section>

      <Process
        steps={[
          { t: "Аудит и нарратив", d: "Что за слайдами: цель, аудитория, аргументы. Собираем скелет истории до единого пикселя.", days: "день 1" },
          { t: "Концепция", d: "2–4 ключевых слайда в финальном стиле: типографика, сетка, цвет, характер инфографики.", days: "дни 2–3" },
          { t: "Дизайн-система", d: "Мастер-слайды, компоненты, стили графиков. Дальше вёрстка идёт быстро и консистентно.", days: "день 3" },
          { t: "Вёрстка дека", d: "Все слайды: 10 слайдов в день по норме выработки. Инфографика перерисовывается с нуля, не скриншоты.", days: "дни 4–6" },
          { t: "Правки и финал", d: "3 круга правок включены. Выгрузка в PPT/Keynote/PDF, шрифты и исходники Figma — ваши.", days: "дни 6–7" },
          { t: "Анимация (опция)", d: "Видео-версия дека: движение слайдов, озвучка, 60–90 секунд для рассылки и соцсетей.", days: "+2–3 дня" },
        ]}
      />

      <PriceStrip
        ids={["P1", "P2", "P3", "X6", "X5", "X19", "X7"]}
        note="База проекта (концепция и настройка системы) начисляется один раз: ₽8 000 / $300 / €220 — при любом количестве слайдов и типов."
      />

      <PageCTA>Пришлите текущий дек или черновик — бесплатно скажем, что с ним делать: редизайн, концепция или новый нарратив.</PageCTA>
    </div>
  );
}
