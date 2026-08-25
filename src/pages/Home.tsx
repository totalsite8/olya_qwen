import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import { ArrowUpRight, Plus, X } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FILTERS, PORTRAIT, WORKS, type Work } from "../data/works";
import { MEDIA } from "../data/media";
import { SERVICES, CATEGORIES } from "../data/services";
import { fmtRub } from "../lib/format";
import { Magnetic, Marquee, OrbitBadge, SectionHead } from "../components/ui";

gsap.registerPlugin(ScrollTrigger);

const SCRAMBLE_WORDS = [
  "нейрогенерации",
  "моушн-дизайн",
  "презентации",
  "AI-продакшн",
  "дизайн-системы",
];
const SCRAMBLE_CHARS = "▓▒░<>/#*+×";

function useScramble(words: string[], interval = 3200) {
  const [text, setText] = useState(words[0]);
  const idxRef = useRef(0);

  useEffect(() => {
    let alive = true;
    let frame: ReturnType<typeof setTimeout> | undefined;
    const cycle = setInterval(() => {
      idxRef.current = (idxRef.current + 1) % words.length;
      const next = words[idxRef.current];
      let step = 0;
      const total = 16;
      const tick = () => {
        if (!alive) return;
        step += 1;
        const reveal = Math.floor((next.length * step) / total);
        let out = next.slice(0, reveal);
        for (let i = reveal; i < next.length; i++) {
          out += SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
        }
        setText(out);
        if (step < total) frame = setTimeout(tick, 32);
      };
      tick();
    }, interval);
    return () => {
      alive = false;
      clearInterval(cycle);
      if (frame) clearTimeout(frame);
    };
  }, [words, interval]);

  return text;
}

/* ============================= HERO ============================= */
function Hero() {
  const scramble = useScramble(SCRAMBLE_WORDS);
  const rootRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.fromTo(
        ".hero-kicker",
        { autoAlpha: 0, y: 14 },
        { autoAlpha: 1, y: 0, duration: 0.7 },
        0.1
      )
        .fromTo(
          ".hero-line-inner",
          { yPercent: 118 },
          { yPercent: 0, duration: 1.15, stagger: 0.12 },
          0.2
        )
        .fromTo(
          ".hero-scramble",
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 0.5 },
          0.9
        )
        .fromTo(
          ".hero-meta > *",
          { autoAlpha: 0, y: 16 },
          { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.07 },
          1
        )
        .fromTo(
          ".hero-portrait",
          { clipPath: "inset(100% 0 0 0)" },
          { clipPath: "inset(0% 0 0 0)", duration: 1.2, ease: "power4.inOut" },
          0.5
        )
        .fromTo(
          ".hero-badge",
          { scale: 0, rotate: -90 },
          { scale: 1, rotate: 0, duration: 0.8, ease: "back.out(1.6)" },
          1.2
        );

      gsap.fromTo(
        ".hero-portrait-img",
        { yPercent: -5 },
        {
          yPercent: 5,
          ease: "none",
          scrollTrigger: { trigger: rootRef.current, start: "top top", end: "bottom top", scrub: true },
        }
      );
      gsap.to(".hero-bgimg", {
        yPercent: 10,
        ease: "none",
        scrollTrigger: { trigger: rootRef.current, start: "top top", end: "bottom top", scrub: true },
      });
      // карточки плывут с разной скоростью + лёгкий вход
      gsap.fromTo(
        ".hero-card",
        { autoAlpha: 0, y: 30 },
        { autoAlpha: 1, y: 0, duration: 1, stagger: 0.14, ease: "power3.out", delay: 1.1 }
      );
      gsap.to(".hero-card-1", {
        yPercent: -46, rotate: 10, ease: "none",
        scrollTrigger: { trigger: rootRef.current, start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to(".hero-card-2", {
        yPercent: -26, rotate: -10, ease: "none",
        scrollTrigger: { trigger: rootRef.current, start: "top top", end: "bottom top", scrub: true },
      });
      gsap.to(".hero-card-3", {
        yPercent: -60, rotate: 6, ease: "none",
        scrollTrigger: { trigger: rootRef.current, start: "top top", end: "bottom top", scrub: true },
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="grid-bg relative overflow-hidden pb-16 pt-28 md:pt-36">
      {/* Фирменный абстрактный фон из макета */}
      <div aria-hidden className="hero-bgwrap pointer-events-none absolute inset-0">
        <img src={MEDIA.heroBg} alt="" className="hero-bgimg absolute -top-[14%] h-[134%] w-full object-cover opacity-[0.4]" />
        <div className="absolute inset-0 bg-gradient-to-b from-bg/40 via-bg/30 to-bg" />
      </div>
      {/* Летающие карточки проектов из первого экрана макета */}
      <div aria-hidden className="pointer-events-none absolute inset-0 hidden lg:block">
        <img src={MEDIA.heroCardAlfa} alt="" className="hero-card hero-card-1 absolute left-[56%] top-24 w-36 rotate-6 rounded-xl border border-line object-cover shadow-2xl" />
        <img src={MEDIA.heroCardEco} alt="" className="hero-card hero-card-2 absolute right-8 top-[42%] w-32 -rotate-6 rounded-xl border border-line object-cover shadow-2xl" />
        <img src={MEDIA.heroCardData} alt="" className="hero-card hero-card-3 absolute bottom-24 left-[62%] w-32 rotate-3 rounded-xl border border-line object-cover shadow-2xl" />
      </div>

      <div className="relative mx-auto max-w-[1600px] px-5 md:px-10">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-8">
            <div className="hero-kicker mb-8 flex flex-wrap items-center gap-4 font-mono text-[11px] uppercase tracking-[0.24em] text-muted">
              <span className="rounded-full border border-line px-3 py-1.5">Портфолио — 2026</span>
              <span className="hidden h-px w-16 bg-line sm:block" />
              <span>дизайн × нейро × видео</span>
            </div>

            <h1 className="font-display font-black uppercase leading-[0.92] tracking-tight">
              <span className="block overflow-hidden pb-[0.08em]">
                <span className="hero-line-inner block text-[clamp(3.2rem,10.5vw,9.5rem)]">Ольга</span>
              </span>
              <span className="block overflow-hidden pb-[0.1em]">
                <span className="hero-line-inner text-stroke block text-[clamp(2.1rem,7.6vw,6.8rem)]">
                  Бакушкина
                </span>
              </span>
            </h1>

            <div className="hero-scramble mt-6 flex items-center gap-3 font-mono text-sm text-muted md:text-base">
              <span className="text-accent">▸</span>
              <span className="tabular-nums tracking-wide text-ink">{scramble}</span>
              <span className="blink inline-block h-[1.1em] w-[2px] bg-accent" />
            </div>

            <div className="hero-meta mt-12 flex flex-wrap items-center gap-x-10 gap-y-4">
              <span className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.18em]">
                <span className="ping-dot inline-block h-2 w-2 rounded-full bg-ok" />
                открыта к проектам
              </span>
              <span className="font-mono text-xs uppercase tracking-[0.18em] text-muted">
                Москва → worldwide
              </span>
              <span className="font-mono text-xs uppercase tracking-[0.18em] text-muted">
                рынки <span className="text-ink">RU · US · EU</span>
              </span>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-4">
            <div className="relative ml-auto mt-4 max-w-[380px] lg:mt-0">
              <div className="hero-portrait relative aspect-[3/4] overflow-hidden border border-line">
                <img
                  src={PORTRAIT}
                  alt="Ольга Бакушкина"
                  className="hero-portrait-img h-[114%] w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg/50 via-transparent to-transparent" />
                <span className="absolute bottom-3 left-3 font-mono text-[10px] uppercase tracking-[0.2em] text-ink/80">
                  Ольга · дизайнер
                </span>
              </div>
              <div className="hero-badge absolute -bottom-8 -left-8 h-28 w-28 md:h-32 md:w-32">
                <OrbitBadge text="дизайн · нейро · моушн · презентации · " className="h-full w-full" />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 flex items-center justify-between border-t border-line pt-5 md:mt-20">
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
            листай ↓
          </span>
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
            09 кейсов · 20 направлений услуг
          </span>
        </div>
      </div>
    </section>
  );
}

/* ============================= MARQUEE ============================= */
function ServicesTicker() {
  const items = ["Брендинг", "Нейрогенерации", "Моушн-дизайн", "Презентации", "SMM-системы", "AI-аватары", "Питч-деки", "Озвучка и звук"];
  return (
    <div className="border-y border-line bg-bg2 py-4">
      <Marquee duration={26}>
        {items.map((t) => (
          <span key={t} className="flex items-center">
            <span className="px-6 font-display text-lg font-semibold uppercase tracking-wide md:text-2xl">
              {t}
            </span>
            <span className="text-accent">✷</span>
          </span>
        ))}
      </Marquee>
    </div>
  );
}

/* ============================= WORKS ============================= */
function WorkCard({ work, onOpen }: { work: Work; onOpen: (w: Work) => void }) {
  const ref = useRef<HTMLButtonElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 160, damping: 16, mass: 0.5 });
  const sry = useSpring(ry, { stiffness: 160, damping: 16, mass: 0.5 });

  return (
    <motion.button
      ref={ref}
      onClick={() => onOpen(work)}
      onMouseMove={(e) => {
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        ry.set(((e.clientX - r.left) / r.width - 0.5) * 5);
        rx.set(-((e.clientY - r.top) / r.height - 0.5) * 5);
      }}
      onMouseLeave={() => {
        rx.set(0);
        ry.set(0);
      }}
      style={{ rotateX: srx, rotateY: sry, transformPerspective: 1000 }}
      data-cursor
      className="group relative block h-full w-full overflow-hidden border border-line bg-card text-left will-change-transform"
    >
      <div className={`relative overflow-hidden ${work.ratio}`}>
        <img
          src={work.image}
          alt={work.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-bg/85 via-bg/10 to-transparent opacity-90 transition-opacity duration-500 group-hover:opacity-100" />

        <span className="absolute left-4 top-4 rounded-full border border-line bg-bg/70 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] backdrop-blur-sm">
          {work.index} · {work.category}
        </span>
        <span
          className={`absolute right-4 top-4 grid h-10 w-10 translate-y-2 place-items-center rounded-full bg-accent text-accentink opacity-0 transition-all duration-400 group-hover:translate-y-0 group-hover:opacity-100`}
        >
          <Plus size={18} />
        </span>

        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5">
          <div>
            <h3 className="font-display text-2xl font-bold uppercase leading-none tracking-tight md:text-4xl">
              {work.title}
            </h3>
            <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
              {work.client} — {work.year}
            </p>
          </div>
          <span className="mb-1 hidden shrink-0 items-center gap-1 font-mono text-[11px] uppercase tracking-[0.14em] text-accent opacity-0 transition-all duration-400 group-hover:opacity-100 md:flex">
            кейс <ArrowUpRight size={13} />
          </span>
        </div>
      </div>
    </motion.button>
  );
}

function WorkModal({ work, onClose }: { work: Work; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[100] overflow-y-auto bg-bg/85 backdrop-blur-sm"
      onClick={onClose}
    >
      <div className="flex min-h-full items-center justify-center p-4 md:p-10">
        <motion.div
          initial={{ y: 48, opacity: 0, scale: 0.98 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: 32, opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="relative grid w-full max-w-5xl grid-cols-1 overflow-hidden border border-line bg-card md:grid-cols-2"
        >
          <button
            onClick={onClose}
            aria-label="Закрыть"
            className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full border border-line bg-bg/70 backdrop-blur transition-colors hover:border-accent hover:text-accent"
          >
            <X size={16} />
          </button>
          <div className="relative aspect-[4/3] overflow-hidden md:aspect-auto md:min-h-[480px]">
            <img src={work.image} alt={work.title} className="h-full w-full object-cover" />
          </div>
          <div className="flex flex-col gap-6 p-7 md:p-10">
            <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
              {work.index} · {work.category} · {work.year}
            </div>
            <h3 className="font-display text-3xl font-bold uppercase leading-none md:text-5xl">
              {work.title}
            </h3>
            <p className="text-sm leading-relaxed text-muted md:text-base">{work.desc}</p>
            <div>
              <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted">Роль</div>
              <p className="text-sm">{work.role}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {work.stack.map((s) => (
                <span key={s} className="rounded-full border border-line px-3 py-1 font-mono text-[11px] uppercase tracking-wide text-muted">
                  {s}
                </span>
              ))}
            </div>

            {work.gallery.length > 1 && (
              <div>
                <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                  Материалы кейса · {work.gallery.length}
                </div>
                <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1">
                  {work.gallery.map((g, gi) => (
                    <img
                      key={g + gi}
                      src={g}
                      alt={`${work.title} — материал ${gi + 1}`}
                      loading="lazy"
                      className="h-20 w-28 shrink-0 rounded-lg border border-line object-cover transition-transform duration-300 hover:scale-105 md:h-24 md:w-36"
                    />
                  ))}
                </div>
              </div>
            )}

            <div className="mt-auto grid grid-cols-3 divide-x divide-line border-t border-line pt-5">
              {work.metrics.map((m) => (
                <div key={m.k} className="px-3 first:pl-0">
                  <div className="font-display text-lg font-bold text-accent md:text-2xl">{m.v}</div>
                  <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">{m.k}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

function Works() {
  const [filter, setFilter] = useState("Все");
  const [active, setActive] = useState<Work | null>(null);
  const list = filter === "Все" ? WORKS : WORKS.filter((w) => w.category === filter);

  return (
    <section id="works" className="mx-auto max-w-[1600px] px-5 py-24 md:px-10 md:py-36">
      <SectionHead
        index="01"
        title={
          <>
            Избранные <span className="text-stroke-accent">работы</span>
          </>
        }
        meta="Кейсы с цифрами: задача → решение → результат клиента. Полный архив — в Behance."
      />

      <div data-reveal className="mb-10 flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            data-cursor
            className={`rounded-full border px-4 py-2 font-mono text-[11px] uppercase tracking-[0.14em] transition-all duration-300 ${
              filter === f
                ? "border-accent bg-accent text-accentink"
                : "border-line text-muted hover:border-ink hover:text-ink"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <motion.div layout className="grid grid-cols-1 gap-5 md:grid-cols-12">
        <AnimatePresence mode="popLayout">
          {list.map((w) => (
            <motion.div
              layout
              key={w.id}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className={w.span}
            >
              <WorkCard work={w} onOpen={setActive} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      <AnimatePresence>{active && <WorkModal work={active} onClose={() => setActive(null)} />}</AnimatePresence>
    </section>
  );
}

/* ============================= CAPABILITIES ============================= */
const CAP_DESC: Record<string, string> = {
  design:
    "Контент-системы и штучные креативы: посты, сторис, баннеры, карточки товара. Шаблоны в Figma, чтобы команда клиента продолжала без меня.",
  neuro:
    "Генерация под задачу, а не «картинка из нейросети»: Midjourney и Flux для статики, Runway и Kling для клипов, HeyGen и ElevenLabs для аватаров и голоса. Ручная доработка обязательна.",
  video:
    "Эксплейнеры, рекламные ролики, анимация логотипов. Стандартная — 1 персонаж и чистый моушн; сложная — сцены, экшн, параллакс и 3D-свет.",
  pres:
    "Питч-деки, коммерческие предложения, отчёты. Нарратив и инфографика, а не «красивые слайды». База проекта — концепция, стиль, мастер-шаблон.",
};

const CAT_PAGE: Record<string, { to: string; label: string }> = {
  design: { to: "/design", label: "страница: дизайн и SMM" },
  neuro: { to: "/neuro", label: "страница: нейрогенерации" },
  video: { to: "/video", label: "страница: видео и моушн" },
  pres: { to: "/presentations", label: "страница: презентации" },
};

function Capabilities() {
  const [open, setOpen] = useState<string | null>("design");

  return (
    <section id="services" className="border-t border-line bg-bg2/60 py-24 md:py-36">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <SectionHead
          index="02"
          title={
            <>
              Что я <span className="text-accent">делаю</span>
            </>
          }
          meta="20 направлений в прайсе. В каждой позиции — 3 круга правок и исходники."
        />

        <div className="border-t border-line">
          {CATEGORIES.filter((c) => c.id !== "extra").map((cat, i) => {
            const items = SERVICES.filter((s) => s.cat === cat.id);
            const minPrice = Math.min(...items.map((s) => s.prices.RU));
            const isOpen = open === cat.id;
            return (
              <div key={cat.id} className="border-b border-line" data-reveal>
                <button
                  onClick={() => setOpen(isOpen ? null : cat.id)}
                  data-cursor
                  className="group grid w-full grid-cols-12 items-center gap-3 py-6 text-left md:py-8"
                >
                  <span className="col-span-2 font-display text-lg font-bold text-muted transition-colors group-hover:text-accent md:col-span-1 md:text-2xl">
                    0{i + 1}
                  </span>
                  <span className="col-span-8 md:col-span-9">
                    <span
                      className={`block font-display text-2xl font-bold uppercase leading-none tracking-tight transition-all duration-400 group-hover:translate-x-3 md:text-5xl ${
                        isOpen ? "text-accent" : ""
                      }`}
                    >
                      {cat.title}
                    </span>
                    <span className="mt-2 hidden font-mono text-[11px] uppercase tracking-[0.16em] text-muted md:block">
                      {cat.desc} · от {fmtRub(minPrice)}
                    </span>
                  </span>
                  <span className="col-span-2 flex justify-end md:col-span-2">
                    <span
                      className={`grid h-11 w-11 place-items-center rounded-full border transition-all duration-400 ${
                        isOpen
                          ? "rotate-45 border-accent bg-accent text-accentink"
                          : "border-line group-hover:border-accent group-hover:text-accent"
                      }`}
                    >
                      <Plus size={18} />
                    </span>
                  </span>
                </button>

                <motion.div
                  initial={false}
                  animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <div className="grid grid-cols-1 gap-8 pb-10 md:grid-cols-12">
                    <p className="max-w-md text-sm leading-relaxed text-muted md:col-span-5 md:col-start-2">
                      {CAP_DESC[cat.id]}
                    </p>
                    <div className="flex flex-wrap content-start gap-2 md:col-span-5">
                      {items.map((s) => (
                        <span
                          key={s.id}
                          className="rounded-full border border-line px-3 py-1.5 font-mono text-[11px] text-muted transition-colors hover:border-accent hover:text-ink"
                        >
                          {s.name} · <span className="text-ink">{fmtRub(s.prices.RU)}</span>
                          {s.unit !== "шт" && s.unit !== "проект" ? `/${s.unit}` : ""}
                        </span>
                      ))}
                    </div>
                    <div className="flex flex-wrap items-center gap-6 md:col-span-12 md:col-start-2">
                      <Link
                        to={CAT_PAGE[cat.id]?.to ?? "/calculator"}
                        className="group inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.14em] text-accentink transition-transform hover:scale-[1.03]"
                      >
                        {CAT_PAGE[cat.id]?.label ?? "направление"}
                        <ArrowUpRight size={13} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </Link>
                      <Link
                        to="/calculator"
                        className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-accent"
                      >
                        посчитать в калькуляторе
                        <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ============================= ABOUT ============================= */
const STATS = [
  { v: "6+", k: "лет в дизайне" },
  { v: "120+", k: "проектов закрыто" },
  { v: "3", k: "рынка — RU / US / EU" },
  { v: "24 ч", k: "минимальный срок" },
];
const TOOLS = [
  "Figma", "After Effects", "Photoshop", "Blender", "Midjourney", "Flux",
  "Runway", "Kling", "HeyGen", "ElevenLabs", "CapCut", "Pitch",
];

function About() {
  return (
    <section id="about" className="border-t border-line py-24 md:py-36">
      <div className="mx-auto grid max-w-[1600px] grid-cols-12 gap-10 px-5 md:px-10">
        <div className="col-span-12 lg:col-span-5">
          <div className="sticky top-28" data-reveal>
            <div className="relative max-w-[420px] overflow-hidden border border-line">
              <img src={PORTRAIT} alt="Ольга Бакушкина" loading="lazy" className="w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-bg/60 to-transparent" />
              <blockquote className="absolute bottom-0 p-6 font-display text-sm font-medium leading-snug md:text-lg">
                «Клиент платит за результат,
                <br />
                а не за инструмент»
              </blockquote>
            </div>
          </div>
        </div>

        <div className="col-span-12 lg:col-span-7">
          <SectionHead
            index="03"
            title={
              <>
                Обо <span className="text-stroke">мне</span>
              </>
            }
          />
          <div className="max-w-2xl space-y-6 text-base leading-relaxed text-muted md:text-lg" data-reveal>
            <p>
              Я — Ольга Бакушкина, дизайнер на стыке классического продакшна и нейроинструментов.
              Шесть лет собираю айдентику, SMM-системы и презентации; последние два года —
              вплотную с AI-видео, аватарами и генеративной статикой.
            </p>
            <p>
              Работаю с тремя рынками — Россия, США, Европа — и честно считаю смету в трёх
              валютах: цены выверены по рыночным вилкам каждого региона, без демпинга
              и без «студийного» раздувания.
            </p>
            <p className="text-ink">
              В каждую позицию уже включены три круга правок и исходники. Предоплата 50/50,
              срочность — прозрачной наценкой, а не «договоримся по факту».
            </p>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-px border border-line bg-line md:grid-cols-4" data-reveal>
            {STATS.map((s) => (
              <div key={s.k} className="group bg-bg p-5 transition-colors duration-300 hover:bg-card md:p-6">
                <div className="font-display text-2xl font-bold text-accent transition-transform duration-300 group-hover:-translate-y-1 md:text-4xl">
                  {s.v}
                </div>
                <div className="mt-2 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">{s.k}</div>
              </div>
            ))}
          </div>

          <div className="mt-10" data-reveal>
            <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.2em] text-muted">Стек и нейростек</div>
            <div className="flex flex-wrap gap-2">
              {TOOLS.map((t) => (
                <span
                  key={t}
                  className="cursor-default rounded-full border border-line px-3 py-1.5 font-mono text-[11px] text-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-accent hover:text-ink"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================= PROCESS ============================= */
const STEPS = [
  { n: "01", t: "Бриф и смета", d: "15 минут на расчёт во внутреннем калькуляторе: состав, сроки, три валюты на выбор." },
  { n: "02", t: "Концепция", d: "Два направления на выбор, мудборд и черновая раскадровка до старта продакшна." },
  { n: "03", t: "Продакшн", d: "Три круга правок уже в цене. Статусы — каждые 2–3 дня, без «пропала на неделю»." },
  { n: "04", t: "Передача", d: "Исходники бесплатно: Figma, AE-проекты, промпты и модели. Оплата 50/50." },
];

function Process() {
  return (
    <section className="border-t border-line bg-bg2/60 py-24 md:py-36">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <SectionHead
          index="04"
          title={
            <>
              Как идёт <span className="text-accent">работа</span>
            </>
          }
          meta="Четыре шага, ноль сюрпризов в смете."
        />
        <div className="grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4" data-reveal>
          {STEPS.map((s) => (
            <div key={s.n} className="group relative bg-bg p-7 transition-colors duration-300 hover:bg-card md:p-9">
              <div className="font-display text-5xl font-black text-linesoft transition-colors duration-400 group-hover:text-accent md:text-7xl">
                {s.n}
              </div>
              <h3 className="mt-6 font-display text-lg font-bold uppercase tracking-tight">{s.t}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{s.d}</p>
              <span className="absolute right-6 top-6 text-accent opacity-0 transition-all duration-300 group-hover:opacity-100">
                ✷
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================= TERMS TICKER ============================= */
function TermsTicker() {
  const items = [
    "3 круга правок включены",
    "исходники — бесплатно",
    "предоплата 50/50",
    "срочность от +20%",
    "рынки RU · US · EU",
    "НДС: самозанятость 6%",
  ];
  return (
    <div className="border-y border-line bg-accent py-3.5 text-accentink">
      <Marquee duration={22} reverse>
        {items.map((t) => (
          <span key={t} className="flex items-center">
            <span className="px-5 font-mono text-xs font-medium uppercase tracking-[0.18em] md:text-sm">{t}</span>
            <span>✷</span>
          </span>
        ))}
      </Marquee>
    </div>
  );
}

/* ============================= CONTACT / FOOTER ============================= */
function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden py-24 md:py-40">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <img src={MEDIA.footerBg} alt="" className="h-full w-full object-cover opacity-35" />
        <div className="absolute inset-0 bg-gradient-to-b from-bg via-bg/40 to-bg/80" />
      </div>
      <div className="relative mx-auto max-w-[1600px] px-5 md:px-10">
        <div className="mb-4 font-mono text-[11px] uppercase tracking-[0.24em] text-muted" data-reveal>
          (05) — Контакты
        </div>
        <h2 className="font-display font-black uppercase leading-[0.95] tracking-tight" data-reveal>
          <span className="block text-[clamp(2.6rem,8vw,7.5rem)]">Есть</span>
          <span className="text-stroke-accent block text-[clamp(2.6rem,8vw,7.5rem)]">задача?</span>
        </h2>
        <p className="mt-6 max-w-lg text-base leading-relaxed text-muted md:text-lg" data-reveal>
          Пришлите бриф или просто идею — в ответ посчитаю смету в вашей валюте и назову
          точный срок. Обычно отвечаю в течение рабочего дня.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-4" data-reveal>
          <Magnetic>
            <a
              href="https://t.me/obakushkina"
              target="_blank"
              rel="noreferrer"
              data-cursor
              className="group inline-flex items-center gap-3 rounded-full bg-accent px-8 py-4 font-display text-sm font-bold uppercase tracking-wide text-accentink transition-colors hover:bg-ink"
            >
              Написать в Telegram
              <ArrowUpRight size={17} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </Magnetic>
          <Magnetic>
            <a
              href="mailto:hello@bakushkina.design"
              data-cursor
              className="inline-flex items-center gap-3 rounded-full border border-line px-8 py-4 font-display text-sm font-bold uppercase tracking-wide transition-all hover:border-accent hover:text-accent"
            >
              hello@bakushkina.design
            </a>
          </Magnetic>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-px border border-line bg-line md:grid-cols-4" data-reveal>
          {[
            { k: "Telegram", v: "@obakushkina", href: "https://t.me/obakushkina" },
            { k: "Behance", v: "obakushkina", href: "https://www.behance.net/obakushkina" },
            { k: "Vimeo", v: "шоурил 45 сек", href: "https://vimeo.com/obakushkina" },
            { k: "Почта", v: "hello@bakushkina.design", href: "mailto:hello@bakushkina.design" },
          ].map((l) => (
            <a
              key={l.k}
              href={l.href}
              target={l.href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              data-cursor
              className="group flex items-center justify-between bg-bg p-5 transition-colors hover:bg-card"
            >
              <span>
                <span className="block font-mono text-[10px] uppercase tracking-[0.18em] text-muted">{l.k}</span>
                <span className="mt-1 block text-sm font-medium">{l.v}</span>
              </span>
              <ArrowUpRight size={16} className="text-muted transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-accent" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-[1600px] flex-wrap items-center justify-between gap-4 px-5 py-6 md:px-10">
        <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
          © {year} Ольга Бакушкина
        </span>
        <span className="hidden font-mono text-[11px] uppercase tracking-[0.16em] text-muted md:block">
          дизайн + код — без шаблонов
        </span>
        <Link
          to="/calculator"
          className="group font-mono text-[11px] uppercase tracking-[0.16em] text-muted transition-colors hover:text-accent"
        >
          внутренний инструмент: калькулятор <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
        </Link>
      </div>
    </footer>
  );
}

/* ============================= PAGE ============================= */
export default function Home() {
  const rootRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  // GSAP: reveal-батч + параллаксы по всей странице
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 48, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          }
        );
      });
    }, rootRef);
    const t = setTimeout(() => ScrollTrigger.refresh(), 400);
    return () => {
      clearTimeout(t);
      ctx.revert();
    };
  }, []);

  // Переход с других страниц на якорь
  useEffect(() => {
    const anchor = (location.state as { anchor?: string } | null)?.anchor;
    if (!anchor) return;
    const t = setTimeout(() => {
      document.getElementById(anchor)?.scrollIntoView({ behavior: "smooth" });
    }, 120);
    return () => clearTimeout(t);
  }, [location.state]);

  return (
    <div ref={rootRef}>
      <Hero />
      <ServicesTicker />
      <Works />
      <TermsTicker />
      <Capabilities />
      <About />
      <Process />
      <Contact />
      <Footer />
    </div>
  );
}
