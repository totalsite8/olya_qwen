import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Pause, Play, Volume2, VolumeX, Clapperboard, Sparkles, ArrowUpRight } from "lucide-react";
import { MEDIA } from "../data/media";
import { PageHero, PageMarquee, VisualStrip, Process, PageCTA } from "../components/ServicePage";
import { SectionHead, FadeIn } from "../components/ui";
import { fmtMoney } from "../lib/format";

/* ================= Шоурил-плеер с таймкодом ================= */
function Showreel() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(true);
  const [tc, setTc] = useState("00:00:00:00");
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    let raf = 0;
    const tick = () => {
      if (!Number.isNaN(v.duration)) {
        const t = v.currentTime;
        const f = Math.floor((t % 1) * 25);
        const s = Math.floor(t) % 60;
        const m = Math.floor(t / 60) % 60;
        setTc(
          `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}:${String(f).padStart(2, "0")}`
        );
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const toggle = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play().catch(() => setFailed(true));
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  return (
    <section className="mx-auto max-w-[1600px] px-5 pt-14 md:px-10 md:pt-20">
      <FadeIn>
        <div className="relative overflow-hidden rounded-2xl border border-line bg-black">
          {!failed ? (
            <video
              ref={videoRef}
              src={MEDIA.showreel}
              poster={MEDIA.videoPoster}
              className="aspect-video w-full cursor-pointer object-cover"
              autoPlay
              muted
              loop
              playsInline
              onClick={toggle}
              onError={() => setFailed(true)}
            />
          ) : (
            <img src={MEDIA.videoPoster} alt="Шоурил" className="aspect-video w-full object-cover" />
          )}

          {/* Кинематографический оверлей */}
          <div className="pointer-events-none absolute inset-x-0 top-0 flex items-center justify-between p-4 md:p-6">
            <span className="flex items-center gap-2 rounded-full bg-black/55 px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-white backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-[#ff3b30]" style={{ animation: "blink 1.1s steps(2) infinite" }} />
              REC · шоурил 2026
            </span>
            <span className="hidden rounded-full bg-black/55 px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-white backdrop-blur-sm md:block">
              4K · 25 fps · LOG→REC.709
            </span>
          </div>

          <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-4 bg-gradient-to-t from-black/80 to-transparent p-4 pt-14 md:p-6">
            <div className="flex items-center gap-3">
              <button
                onClick={toggle}
                aria-label={playing ? "Пауза" : "Смотреть"}
                className="grid h-11 w-11 place-items-center rounded-full bg-[#ff4d1f] text-black transition-transform hover:scale-110"
                data-cursor
              >
                {playing ? <Pause size={16} /> : <Play size={16} className="translate-x-[1px]" />}
              </button>
              <button
                onClick={() => {
                  const v = videoRef.current;
                  if (!v) return;
                  v.muted = !v.muted;
                  setMuted(v.muted);
                }}
                aria-label="Звук"
                className="grid h-9 w-9 place-items-center rounded-full border border-white/25 text-white/80 transition-colors hover:border-white/60 hover:text-white"
                data-cursor
              >
                {muted ? <VolumeX size={14} /> : <Volume2 size={14} />}
              </button>
            </div>
            <span className="font-mono text-xs tabular-nums tracking-[0.2em] text-white/85">TC {tc}</span>
          </div>
        </div>
      </FadeIn>
      <p className="mt-4 text-center font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
        ролик 0824 · рекламный продакшн · режиссура, генерация, пост-продакшн — Ольга Бакушкина
      </p>
    </section>
  );
}

/* ================= Форматы ================= */
const FORMATS = [
  {
    n: "01",
    t: "Рекламный ролик",
    d: "15–60 секунд подperformance-задачи: хук в первые 3 секунды, продуктовый фокус, CTA. Снимем, сгенерируем или соберём из ваших материалов.",
    tags: ["16:9", "9:16", "1:1"],
  },
  {
    n: "02",
    t: "Бренд-фильм",
    d: "Story-driven история о компании: 60–120 секунд, которые хочется досмотреть. Сценарий, режиссура, саунд-дизайн.",
    tags: ["сценарий", "озвучка", "цвет"],
  },
  {
    n: "03",
    t: "Эксплейнер",
    d: "Объясняем сложный продукт просто: 2D-анимация, инфографика в движении, персонажи. Работает на лендинге и в рассылках.",
    tags: ["2D", "инфографика", "60–90 c"],
  },
  {
    n: "04",
    t: "AI-видео и UGC",
    d: "Нейрогенерация клипов 5–30 секунд: продукт в сцене, «ожившие» фото, говорящие аватары. Скорость ×6 против классического продакшна.",
    tags: ["Runway", "HeyGen", "Kling"],
  },
  {
    n: "05",
    t: "Reels / Shorts под ключ",
    d: "Вертикальные ролики сериями: хук, субтитры, адаптация под алгоритмы. Пакет от 5 роликов с единой системой.",
    tags: ["9:16", "субтитры", "серии"],
  },
  {
    n: "06",
    t: "Лого-анимация и заставки",
    d: "3–10 секунд, которые открывают каждый ролик бренда: анимация логотипа, переходы, звуковая подпись.",
    tags: ["звук", "интро", "аутро"],
  },
];

function Formats() {
  return (
    <section className="mx-auto max-w-[1600px] px-5 py-20 md:px-10 md:py-28">
      <SectionHead
        index="F"
        title={<>Что мы<br />снимаем и анимируем</>}
        meta="Шесть форматов — от перфоманс-рекламы до видеоидентичности. Каждый выходит пакетом форматов."
      />
      <div className="grid md:grid-cols-2">
        {FORMATS.map((f, i) => (
          <motion.div
            key={f.n}
            initial={{ opacity: 0, y: 34 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: (i % 2) * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="group relative border-b border-line p-7 transition-colors hover:bg-surface/70 md:p-10"
          >
            <div className="flex items-start justify-between gap-6">
              <span className="font-mono text-xs text-accent">{f.n}</span>
              <ArrowUpRight size={18} className="mt-1 text-muted opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:text-accent group-hover:opacity-100" />
            </div>
            <h3 className="mt-4 font-display text-2xl font-bold uppercase tracking-tight md:text-3xl">{f.t}</h3>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-muted">{f.d}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {f.tags.map((t) => (
                <span key={t} className="rounded-full border border-line px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
                  {t}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ================= Видеоидентичность под ключ ================= */
function VideoIdentity() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], [60, -60]);
  const y2 = useTransform(scrollYProgress, [0, 1], [-40, 70]);

  const layers = [
    { t: "Анимация логотипа", d: "Фирменное появление за 3–10 секунд со звуковой подписью", p: "от " + fmtMoney(12000, "RU") },
    { t: "Пакет переходов", d: "Единые склейки для всех роликов — бренд узнаётся без логотипа", p: "в составе стиля" },
    { t: "Шаблоны форматов", d: "16:9, 9:16, 1:1, 4:5 — переработка композиции, а не кроп кадра", p: "от " + fmtMoney(3500, "RU") + " / формат" },
    { t: "Саунд-дизайн", d: "Музыкальная подложка и фирменные звуковые акценты", p: "от " + fmtMoney(3000, "RU") + " / мин" },
  ];

  return (
    <section ref={ref} className="relative overflow-hidden border-y border-line bg-surface/50">
      <div className="mx-auto grid max-w-[1600px] items-center gap-12 px-5 py-20 md:grid-cols-2 md:px-10 md:py-28">
        <div>
          <SectionHead
            index="V"
            title={<>Видео-<br />идентичность</>}
            meta="Не разовые ролики, а система: стиль, движение и звук, которые работают на бренд в каждом видео"
          />
          <div className="-mt-4 space-y-px overflow-hidden rounded-2xl border border-line bg-line">
            {layers.map((l, i) => (
              <motion.div
                key={l.t}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
                className="group flex items-start justify-between gap-4 bg-bg p-5 transition-colors hover:bg-surface md:p-6"
              >
                <div>
                  <div className="font-semibold">{l.t}</div>
                  <p className="mt-1 text-sm text-muted">{l.d}</p>
                </div>
                <span className="shrink-0 font-mono text-xs text-accent">{l.p}</span>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="relative h-[420px] md:h-[560px]">
          <motion.div style={{ y: y1 }} className="absolute right-0 top-0 w-[78%]">
            <img src={MEDIA.videoPoster} alt="Кадр из ролика" className="w-full rounded-xl border border-line object-cover shadow-2xl" />
          </motion.div>
          <motion.div style={{ y: y2 }} className="absolute bottom-0 left-0 w-[58%]">
            <img src={MEDIA.videoBg} alt="Продакшн-студия" className="w-full rounded-xl border border-line object-cover shadow-2xl" />
          </motion.div>
          <div className="absolute left-[52%] top-[46%] grid h-16 w-16 rotate-12 place-items-center rounded-full bg-accent text-accentink shadow-xl md:h-20 md:w-20">
            <Clapperboard size={28} />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================= Кейс 0824 ================= */
function Case0824() {
  return (
    <section className="mx-auto max-w-[1600px] px-5 py-20 md:px-10 md:py-28">
      <SectionHead index="C" title={<>Кейс · ролик «0824»</>} meta="Рекламный ролик полного цикла: идея → генерация и съёмка → пост-продакшн → пакет форматов" />
      <div className="grid gap-8 lg:grid-cols-5">
        <FadeIn className="lg:col-span-3">
          <div className="overflow-hidden rounded-2xl border border-line">
            <video src={MEDIA.showreel} poster={MEDIA.videoPoster} className="aspect-video w-full object-cover" controls playsInline preload="metadata" />
          </div>
        </FadeIn>
        <div className="space-y-6 lg:col-span-2">
          <FadeIn delay={0.1}>
            <div className="rounded-2xl border border-line bg-surface/60 p-7">
              <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
                <Sparkles size={13} /> Задача
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Собрать рекламный ролик за 5 рабочих дней без съёмочной площадки: продукт, динамика, премиальный свет. Бюджет — в 4 раза ниже студийного.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.18}>
            <div className="rounded-2xl border border-line bg-surface/60 p-7">
              <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">Решение</div>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Гибридный пайплайн: AI-генерация сцен и продуктовой съёмки, ручная доработка каждого кадра, цветокор в единой LUT, саунд-дизайн под ритм монтажа. Финал — мастер 16:9 + версии 9:16 и 1:1.
              </p>
            </div>
          </FadeIn>
          <FadeIn delay={0.26}>
            <div className="grid grid-cols-3 divide-x divide-line rounded-2xl border border-line bg-surface/60">
              {[
                { v: "5 дн", k: "продакшн" },
                { v: "×4", k: "дешевле студии" },
                { v: "3", k: "формата на выходе" },
              ].map((m) => (
                <div key={m.k} className="p-5 text-center">
                  <div className="font-display text-xl font-black text-accent md:text-2xl">{m.v}</div>
                  <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.12em] text-muted">{m.k}</div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

/* ================= Страница ================= */
export default function Video() {
  return (
    <div className="pb-0">
      <PageHero
        kicker="Видео и моушн"
        title="Ролики, которые"
        outline="продают"
        subtitle="Рекламные ролики, бренд-фильмы и AI-видео полного цикла — от сценария и раскадровки до пакета форматов и исходников. Визуал и видеоидентичность для брендов под ключ: RU · US · EU."
        bg={MEDIA.videoBg}
        chips={["Сценарий и раскадровка", "AI-генерация + ручной крафт", "2D/3D-анимация", "Озвучка и саунд", "Пакет 16:9 · 9:16 · 1:1"]}
      />

      <Showreel />

      <div className="pt-16 md:pt-24">
        <PageMarquee items={["Рекламные ролики", "Бренд-фильмы", "Эксплейнеры", "AI-видео", "Reels / Shorts", "Видеоидентичность"]} />
      </div>

      <VisualStrip
        images={[
          MEDIA.videoPoster,
          MEDIA.alfaMascotsHero,
          MEDIA.ecoAd,
          MEDIA.domGrid,
          MEDIA.heroBg,
          MEDIA.ecoDogWash,
          MEDIA.cubeCover,
        ]}
      />

      <Formats />
      <VideoIdentity />

      <Process
        steps={[
          { t: "Бриф и задача", d: "Цель ролика, аудитория, площадки, референсы. Фиксируем KPI: просмотры, конверсия, узнаваемость.", days: "день 1" },
          { t: "Сценарий и раскадровка", d: "Текст по секундам, покадровый план, черновой тайминг под озвучку. Утверждаем до продакшна.", days: "дни 2–3" },
          { t: "Стиль-кадры", d: "2–3 ключевых кадра в финальном стиле: свет, цвет, персонажи. Правки здесь — самые дешёвые правки.", days: "дни 3–4" },
          { t: "Генерация и анимация", d: "AI-сцены + ручная анимация и композитинг. Каждый кадр проходит ручную доработку — без «нейропластика».", days: "дни 4–8" },
          { t: "Монтаж, цвет, звук", d: "Ритм под музыку, цветокор в единой LUT, озвучка и саунд-дизайн. 3 круга правок включены.", days: "дни 8–10" },
          { t: "Пакет форматов", d: "Мастер 16:9 + адаптации 9:16 и 1:1 (переработка композиции, не кроп), субтитры, исходники.", days: "день 11" },
        ]}
      />

      <Case0824 />

      <PageCTA>Ролик от 5 рабочих дней. Пришлём референсы под вашу задачу.</PageCTA>
    </div>
  );
}
