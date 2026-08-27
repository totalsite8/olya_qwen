import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Presentation } from "lucide-react";
import { MEDIA } from "../data/media";
import { PageHero, PageMarquee, VisualStrip, Process, PageCTA } from "../components/ServicePage";
import { SectionHead } from "../components/ui";

const DECKS: { id: string; name: string; client: string; meta: string; slides: string[] }[] = [
  {
    id: "cube",
    name: "house CUBE",
    client: "Загородная недвижимость",
    meta: "Japandi · исследование рынка",
    slides: [MEDIA.cubeCover, MEDIA.cubeJapandi, MEDIA.cubeConcept, MEDIA.cubeMarket, MEDIA.cubeClasses, MEDIA.cubeLogo],
  },
  {
    id: "burnout",
    name: "Профессиональное выгорание",
    client: "Исследовательский дек",
    meta: "кейс Microsoft · статистика",
    slides: [MEDIA.burnCover, MEDIA.burnDef, MEDIA.burnStats, MEDIA.burnMicrosoft, MEDIA.burnQuote, MEDIA.burnPrev],
  },
  {
    id: "social",
    name: "Социальные сети",
    client: "Аналитический дек",
    meta: "9 графиков · сегментация",
    slides: [MEDIA.smCover, MEDIA.smNeural, MEDIA.smGoals, MEDIA.smGeo, MEDIA.smTimeline, MEDIA.smAge],
  },
  {
    id: "logistics",
    name: "Проблемы логистики",
    client: "B2B-переговоры",
    meta: "6 схем · сделка закрыта",
    slides: [MEDIA.logCover, MEDIA.logIntro],
  },
  {
    id: "alfa",
    name: "Памятка «Альфа»",
    client: "Гайдлайн коммуникации",
    meta: "маскоты · правила речи",
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

export default function Presentations() {
  return (
    <div>
      <PageHero
        kicker="Презентации"
        title="Деки, которые"
        outline="открывают двери"
        subtitle="Питч-деки, инвест-презентации и корпоративные шаблоны: нарратив первым, дизайн вторым. Работают в переговорной, в почте и на экране за 10 секунд."
        bg={MEDIA.projectsBg}
        chips={["Нарратив и структура", "Инфографика", "Фирменные шаблоны", "Анимация слайдов"]}
      />

      <DeckViewer />

      <PageMarquee items={["Питч-деки", "Инвест-презентации", "Инфографика", "Фирменные шаблоны", "Редизайн", "Анимация слайдов"]} />

      <div className="py-16 md:py-24">
        <VisualStrip
          reverse
          images={[
            MEDIA.cubeCover,
            MEDIA.burnCover,
            MEDIA.smCover,
            MEDIA.logCover,
            MEDIA.alfaGuideCover,
            MEDIA.cubeJapandi,
            MEDIA.burnStats,
            MEDIA.smGeo,
          ]}
        />
      </div>

      <Process
        steps={[
          { t: "Аудит и нарратив", d: "Что за слайдами: цель, аудитория, аргументы. Собираем скелет истории до единого пикселя.", days: "день 1" },
          { t: "Концепция", d: "2–4 ключевых слайда в финальном стиле: типографика, сетка, цвет, характер инфографики.", days: "дни 2–3" },
          { t: "Дизайн-система", d: "Мастер-слайды, компоненты, стили графиков. Дальше вёрстка идёт быстро и консистентно.", days: "день 3" },
          { t: "Вёрстка дека", d: "Все слайды: 10 слайдов в день. Инфографика перерисовывается с нуля, не скриншоты.", days: "дни 4–6" },
          { t: "Правки и финал", d: "3 круга правок включены. Выгрузка в PPT/Keynote/PDF, шрифты и исходники Figma — ваши.", days: "дни 6–7" },
          { t: "Анимация (опция)", d: "Видео-версия дека: движение слайдов, озвучка, 60–90 секунд для рассылки и соцсетей.", days: "+2–3 дня" },
        ]}
      />

      <PageCTA>Пришлите текущий дек или черновик — бесплатно скажем, что с ним делать.</PageCTA>
    </div>
  );
}
