import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { ArrowUpRight, Play, Plus, X } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FILTERS, PORTRAIT, WORKS, type Work } from "../data/works";
import { MEDIA } from "../data/media";
import { Magnetic, Marquee, Sprockets } from "../components/ui";

gsap.registerPlugin(ScrollTrigger);

/* ================= ДАННЫЕ ПРОВОДНИКА ================= */
interface Chapter {
  id: string;
  to: string;
  num: string;
  name: string;
  desc: string;
  chips: string[];
  visuals: string[];
  video?: string;
  meta: string;
}

const CHAPTERS: Chapter[] = [
  {
    id: "video",
    to: "/video",
    num: "01",
    name: "Видео и моушн",
    desc: "Рекламные ролики, эксплейнеры и AI-видео: режиссура, генерация, ручной крафт и пакет форматов под ключ.",
    chips: ["Ролики под ключ", "AI + ручной крафт", "16:9 · 9:16 · 1:1"],
    visuals: [MEDIA.videoPoster, MEDIA.domPopcorn, MEDIA.ecoAd],
    video: MEDIA.showreel,
    meta: "шоурил 45 сек",
  },
  {
    id: "neuro",
    to: "/neuro",
    num: "02",
    name: "Нейрогенерации",
    desc: "Персонажи, продуктовые сцены и целые миры: генерация — 10% работы, остальное — отбор и ручная доработка.",
    chips: ["Консистентные персонажи", "Продукт без студии", "LoRA под ваш стиль"],
    visuals: [MEDIA.alfaMascotsHero, MEDIA.domLaptop, MEDIA.projectsBg],
    meta: "кейс «Альфа»",
  },
  {
    id: "presentations",
    to: "/presentations",
    num: "03",
    name: "Презентации",
    desc: "Питч-деки и исследовательские деки: нарратив, инфографика и вёрстка, которая открывается за 90 секунд.",
    chips: ["Питч-деки", "Инфографика", "Фирменные шаблоны"],
    visuals: [MEDIA.cubeCover, MEDIA.burnMicrosoft, MEDIA.smGeo],
    meta: "4 дека в портфеле",
  },
  {
    id: "design",
    to: "/design",
    num: "04",
    name: "Дизайн и SMM",
    desc: "Контент-системы, карточки товара и упаковки: не разовые посты, а управляемый конвейер в одном стиле.",
    chips: ["Контент-системы", "E-com карточки", "Шаблоны Figma"],
    visuals: [MEDIA.domGrid, MEDIA.ecoFlowers, MEDIA.domStats],
    meta: "3 кейса в портфеле",
  },
];

/* ================= КАДРЫ-МАТЕРИАЛЫ ДЛЯ ПУЛЬТА ================= */
interface Frame {
  id: string;
  tag: string | null;
  to: string;
  src: string;
  label: string;
  cls: string;
  aspect: string;
  rot: number;
  z: number;
  video?: string;
  speed: string;
}

const FRAMES: Frame[] = [
  {
    id: "video",
    tag: "01",
    to: "/video",
    src: MEDIA.videoPoster,
    video: MEDIA.showreel,
    label: "Шоурил ’26",
    cls: "left-0 top-[2%] w-[52%]",
    aspect: "aspect-video",
    rot: -3,
    z: 30,
    speed: "hb-a",
  },
  {
    id: "neuro",
    tag: "02",
    to: "/neuro",
    src: MEDIA.alfaMascotsHero,
    label: "Альфа · персонажи",
    cls: "right-0 top-0 w-[30%]",
    aspect: "aspect-square",
    rot: 4,
    z: 20,
    speed: "hb-b",
  },
  {
    id: "presentations",
    tag: "03",
    to: "/presentations",
    src: MEDIA.cubeCover,
    label: "house CUBE · дек",
    cls: "left-[19%] bottom-[1%] w-[37%]",
    aspect: "aspect-video",
    rot: -2,
    z: 10,
    speed: "hb-c",
  },
  {
    id: "design",
    tag: "04",
    to: "/design",
    src: MEDIA.domGrid,
    label: "Домашний · SMM",
    cls: "right-[2%] bottom-[3%] w-[24%]",
    aspect: "aspect-[2/3]",
    rot: -5,
    z: 20,
    speed: "hb-d",
  },
  {
    id: "eco",
    tag: null,
    to: "/design",
    src: MEDIA.ecoAd,
    label: "Ecozavr · упаковка",
    cls: "left-[3%] top-[38%] w-[19%]",
    aspect: "aspect-[3/4]",
    rot: 6,
    z: 5,
    speed: "hb-e",
  },
];

/* ================= HERO-ПУЛЬТ ================= */
function HeroBoard() {
  const rootRef = useRef<HTMLElement>(null);
  const boardRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [active, setActive] = useState<string | null>(null);
  const [fine, setFine] = useState(false);
  const movedRef = useRef(false);

  useEffect(() => {
    setFine(window.matchMedia("(pointer: fine)").matches);
  }, []);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const st = { trigger: rootRef.current, start: "top top", end: "bottom top", scrub: true };
      gsap.to(".hero-bgimg", { yPercent: 16, ease: "none", scrollTrigger: st });
      gsap.to(".hero-title", { yPercent: -9, ease: "none", scrollTrigger: st });
      gsap.to(".hb-a", { yPercent: -9, ease: "none", scrollTrigger: st });
      gsap.to(".hb-b", { yPercent: 11, ease: "none", scrollTrigger: st });
      gsap.to(".hb-c", { yPercent: -13, ease: "none", scrollTrigger: st });
      gsap.to(".hb-d", { yPercent: 9, ease: "none", scrollTrigger: st });
      gsap.to(".hb-e", { yPercent: 16, rotate: 14, ease: "none", scrollTrigger: st });
      gsap.to(".board-hint", { autoAlpha: 0, ease: "none", scrollTrigger: st });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  const open = (to: string) => {
    if (!movedRef.current) navigate(to);
  };

  const frameInner = (f: Frame, mobile = false) => {
    const isActive = active === f.id;
    return (
      <div
        className={`relative overflow-hidden rounded-xl border bg-card shadow-2xl transition-colors duration-300 ${
          isActive && !mobile ? "border-accent" : "border-line"
        } ${f.aspect}`}
      >
        {f.video ? (
          <video
            src={f.video}
            poster={f.src}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            className="h-full w-full object-cover"
          />
        ) : (
          <img
            src={f.src}
            alt={f.label}
            loading={mobile ? "lazy" : "eager"}
            className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
          />
        )}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg/70 via-transparent to-transparent opacity-80" />
        {f.video && (
          <span className="absolute left-2.5 top-2.5 flex items-center gap-1.5 rounded-full bg-bg/80 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.14em] backdrop-blur">
            <Play size={9} className="text-accent" /> live
          </span>
        )}
        {f.tag && (
          <span className="absolute right-2.5 top-2.5 rounded-full border border-line bg-bg/80 px-2 py-0.5 font-mono text-[9px] tracking-[0.18em] text-muted backdrop-blur">
            /{f.tag}
          </span>
        )}
        <div
          className={`absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 bg-bg/85 px-3 py-2 backdrop-blur transition-transform duration-300 ${
            isActive && !mobile ? "translate-y-0" : mobile ? "translate-y-0" : "translate-y-full group-hover:translate-y-0"
          }`}
        >
          <span className="truncate font-mono text-[9px] uppercase tracking-[0.16em] text-muted">{f.label}</span>
          <span className="flex shrink-0 items-center gap-1 font-mono text-[9px] uppercase tracking-[0.16em] text-accent">
            открыть <ArrowUpRight size={10} />
          </span>
        </div>
      </div>
    );
  };

  return (
    <section
      ref={rootRef}
      onMouseLeave={() => setActive(null)}
      className="relative flex min-h-svh flex-col overflow-hidden pt-24 lg:h-svh lg:min-h-[680px]"
    >
      {/* фон макета */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <img
          src={MEDIA.heroBg}
          alt=""
          className="hero-bgimg absolute -top-[12%] h-[130%] w-full object-cover opacity-[0.34]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-bg/55 via-bg/25 to-bg" />
      </div>
      <span
        aria-hidden
        className="spin-slow pointer-events-none absolute left-[42%] top-[14%] hidden text-4xl text-accent/50 lg:block"
      >
        ✷
      </span>

      <div className="relative mx-auto grid w-full max-w-[1600px] flex-1 grid-cols-1 items-center gap-10 px-5 pb-8 md:px-10 lg:grid-cols-12 lg:gap-8 lg:pb-16">
        {/* ЛЕВО: индекс-проводник */}
        <div className="flex flex-col justify-center lg:col-span-5">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="mb-6 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[10px] uppercase tracking-[0.22em] text-muted"
          >
            <span className="rounded-full border border-line px-3 py-1">Портфолио — 2026</span>
            <span>проводник по услугам</span>
            <span className="flex items-center gap-2">
              <span className="ping-dot inline-block h-1.5 w-1.5 rounded-full bg-ok" />
              открыта к проектам
            </span>
          </motion.div>

          <h1 className="hero-title font-display font-black uppercase leading-[0.86] tracking-tight">
            <span className="block overflow-hidden">
              <motion.span
                initial={{ y: "112%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
                className="block text-[clamp(2.9rem,6.2vw,6.4rem)]"
              >
                Ольга
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span
                initial={{ y: "112%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.95, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="text-stroke block text-[clamp(1.9rem,4vw,4.1rem)]"
              >
                Бакушкина
              </motion.span>
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mt-4 font-accent text-lg italic text-muted md:text-xl"
          >
            {fine ? "наведи на строку — кадр оживёт · перетащи его" : "выбери направление — листай кадры →"}
          </motion.p>

          <div className="mt-7 border-t border-line">
            {CHAPTERS.map((ch, i) => (
              <motion.div
                key={ch.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.42 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link
                  to={ch.to}
                  data-cursor
                  onMouseEnter={() => setActive(ch.id)}
                  onFocus={() => setActive(ch.id)}
                  className="index-row group relative block border-b border-line py-3 lg:py-3.5"
                >
                  <div className="flex items-baseline gap-4 md:gap-6">
                    <span className="index-num font-mono text-[11px] text-muted">/{ch.num}</span>
                    <span className="index-name font-display text-[clamp(1.25rem,2.3vw,2.1rem)] font-black uppercase leading-none tracking-tight">
                      {ch.name}
                    </span>
                    <span className="index-arrow ml-auto hidden shrink-0 text-accent opacity-40 sm:block">
                      <ArrowUpRight size={20} strokeWidth={1.5} />
                    </span>
                  </div>
                  <span className="index-desc text-muted">
                    <span>
                      <span className="flex flex-wrap items-center gap-x-4 gap-y-0.5 pt-1.5 font-mono text-[10px] uppercase tracking-[0.14em]">
                        <span>{ch.meta}</span>
                        <span className="text-accent">✷</span>
                        <span>{ch.chips.join(" · ")}</span>
                      </span>
                    </span>
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.8 }}
            className="mt-5 flex flex-wrap items-center justify-between gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-muted"
          >
            <span>RU · US · EU</span>
            <span className="hidden sm:block">06 кейсов · 4 направления</span>
            <span>листай — плёнка услуг ↓</span>
          </motion.div>
        </div>

        {/* ПРАВО: живая доска материалов */}
        <div className="relative hidden lg:col-span-7 lg:block">
          <div ref={boardRef} className="board-hint relative h-[54vh] max-h-[600px] min-h-[430px] w-full">
            <span className="absolute -top-7 right-0 font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
              перетащи кадры ✷ клик — открыть
            </span>
            {FRAMES.map((f, i) => (
              <motion.div
                key={f.id}
                initial={{ opacity: 0, scale: 0.85, y: 40 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className={`absolute ${f.cls} ${f.speed}`}
              >
                <motion.div
                  drag={fine}
                  dragConstraints={boardRef}
                  dragElastic={0.09}
                  dragMomentum={false}
                  onDrag={() => (movedRef.current = true)}
                  onDragEnd={() => setTimeout(() => (movedRef.current = false), 90)}
                  onMouseEnter={() => setActive(f.id)}
                  onClick={() => open(f.to)}
                  whileDrag={{ scale: 1.06, boxShadow: "0 30px 60px rgba(0,0,0,0.45)" }}
                  animate={{
                    scale: active === f.id ? 1.045 : 1,
                    opacity: active && active !== f.id ? 0.35 : 1,
                    rotate: active === f.id ? 0 : f.rot,
                  }}
                  transition={{ type: "spring", stiffness: 220, damping: 22 }}
                  style={{ zIndex: active === f.id ? 50 : f.z }}
                  data-cursor
                  className="group relative cursor-grab active:cursor-grabbing"
                >
                  {frameInner(f)}
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* МОБИЛЬНАЯ ЛЕНТА КАДРОВ */}
        <div className="-mx-5 lg:hidden">
          <div className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2">
            {FRAMES.map((f) => (
              <button
                key={f.id}
                onClick={() => navigate(f.to)}
                data-cursor
                className="group w-[72vw] max-w-[340px] shrink-0 snap-center text-left"
              >
                {frameInner(f, true)}
              </button>
            ))}
          </div>
          <p className="mt-3 px-1 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
            листай кадры →
          </p>
        </div>
      </div>

      <div className="relative border-t border-line bg-bg2/80 py-3 backdrop-blur lg:border-b">
        <Marquee duration={24}>
          {["Шоурил 45 сек", "Маскоты «Альфы»", "Питч-деки", "AI-аватары", "Упаковка Ecozavr", "SMM-системы", "Эксплейнеры", "LoRA под стиль"].map(
            (t, i) => (
              <span key={t} className="flex items-center">
                <span
                  className={`px-6 font-display text-xl font-black uppercase tracking-tight md:text-2xl ${
                    i % 2 ? "text-stroke" : ""
                  }`}
                >
                  {t}
                </span>
                <span className="text-accent">✷</span>
              </span>
            )
          )}
        </Marquee>
      </div>
    </section>
  );
}

/* ================= ПЛЁНКА УСЛУГ ================= */
function FilmPanel({
  ch,
  idx,
  active,
  frame,
  setFrame,
}: {
  ch: Chapter;
  idx: number;
  active: number;
  frame: number;
  setFrame: (i: number) => void;
}) {
  const isActive = active === idx;
  const count = ch.visuals.length;
  return (
    <article
      className={`relative flex h-[64svh] w-[88vw] shrink-0 snap-start flex-col justify-center px-6 pt-8 transition-opacity duration-500 md:px-12 lg:h-full lg:w-[74vw] lg:pt-0 xl:w-[68vw] ${
        isActive ? "opacity-100" : "opacity-40"
      }`}
    >
      <div className="chapter-num pointer-events-none absolute left-0 top-8 font-display text-[7rem] font-black leading-none md:text-[11rem] lg:top-10 lg:text-[15rem]">
        {ch.num}
      </div>

      <div className="relative grid items-center gap-6 lg:grid-cols-12 lg:gap-10">
        {/* сцена */}
        <div className="order-1 lg:order-2 lg:col-span-7">
          <div
            className={`relative overflow-hidden rounded-xl border transition-colors duration-500 ${
              isActive ? "border-accent/60" : "border-line"
            }`}
          >
            <div className="relative aspect-[16/9] lg:aspect-[16/8.4]">
              <AnimatePresence mode="popLayout">
                {ch.video && frame === 0 ? (
                  <motion.video
                    key="video"
                    src={ch.video}
                    poster={ch.visuals[0]}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <motion.img
                    key={frame}
                    src={ch.visuals[frame]}
                    alt={ch.name}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="h-full w-full object-cover"
                  />
                )}
              </AnimatePresence>
              <span className="absolute left-3 top-3 rounded-full border border-line bg-bg/80 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.16em] backdrop-blur">
                {ch.video && frame === 0 ? "▶ шоурил" : `кадр ${String(frame + 1).padStart(2, "0")}/${String(count).padStart(2, "0")}`}
              </span>
            </div>
            {/* миниатюры кадров */}
            <div className="flex gap-2 border-t border-line bg-bg/70 p-2 backdrop-blur">
              {ch.visuals.map((v, i) => (
                <button
                  key={v + i}
                  onClick={() => setFrame(i)}
                  data-cursor
                  className={`relative h-10 w-16 shrink-0 overflow-hidden rounded-md border transition-all md:h-12 md:w-20 ${
                    i === frame ? "border-accent opacity-100" : "border-line opacity-50 hover:opacity-90"
                  }`}
                  aria-label={`Кадр ${i + 1}`}
                >
                  <img src={v} alt="" className="h-full w-full object-cover" loading="lazy" />
                  {ch.video && i === 0 && (
                    <span className="absolute inset-0 grid place-items-center bg-bg/40">
                      <Play size={12} className="text-accent" />
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* текст */}
        <div className="order-2 lg:order-1 lg:col-span-5">
          <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.24em] text-muted">
            <span className={isActive ? "text-accent" : ""}>глава {ch.num}</span>
            <span className="h-px w-8 bg-line" />
            <span>{ch.meta}</span>
          </div>
          <h3 className="mt-4 font-display text-[clamp(2rem,4.4vw,4.2rem)] font-black uppercase leading-[0.9] tracking-tight">
            {ch.name}
          </h3>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-muted">{ch.desc}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {ch.chips.map((c) => (
              <span
                key={c}
                className="rounded-full border border-line px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-muted transition-colors hover:border-accent hover:text-ink"
              >
                {c}
              </span>
            ))}
          </div>
          <div className="mt-7">
            <Magnetic>
              <Link
                to={ch.to}
                data-cursor
                className="group inline-flex items-center gap-2.5 rounded-full bg-accent px-7 py-3.5 font-mono text-[11px] font-medium uppercase tracking-[0.16em] text-accentink"
              >
                открыть раздел
                <ArrowUpRight
                  size={14}
                  className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </Link>
            </Magnetic>
          </div>
        </div>
      </div>
    </article>
  );
}

function FilmChapters() {
  const rootRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const tcRef = useRef<HTMLSpanElement>(null);
  const phRef = useRef<HTMLDivElement>(null);
  const [pinned, setPinned] = useState(false);
  const [active, setActive] = useState(0);
  const [frame, setFrame] = useState(0);
  const startRef = useRef(0);
  const amountRef = useRef(0);

  // режим «плёнки»: пин только на широких экранах без reduced-motion
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const rm = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setPinned(mq.matches && !rm.matches);
    apply();
    mq.addEventListener("change", apply);
    rm.addEventListener("change", apply);
    return () => {
      mq.removeEventListener("change", apply);
      rm.removeEventListener("change", apply);
    };
  }, []);

  const setTimecode = useCallback((p: number) => {
    const t = Math.min(45, p * 45);
    const ss = Math.floor(t);
    const ff = Math.floor((t % 1) * 25);
    if (tcRef.current)
      tcRef.current.textContent = `00:${String(ss).padStart(2, "0")}:${String(ff).padStart(2, "0")}`;
    if (phRef.current) phRef.current.style.transform = `scaleX(${Math.min(1, p)})`;
  }, []);

  // GSAP-пин: вертикальный скролл крутит плёнку горизонтально
  useLayoutEffect(() => {
    if (!pinned) return;
    const ctx = gsap.context(() => {
      const track = trackRef.current;
      if (!track) return;
      const amount = () => Math.max(0, track.scrollWidth - window.innerWidth);
      gsap.to(track, {
        x: () => -amount(),
        ease: "none",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: () => "+=" + amount(),
          pin: true,
          scrub: 0.7,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            startRef.current = self.start;
            amountRef.current = self.end - self.start;
            setTimecode(self.progress);
            const idx = Math.min(CHAPTERS.length - 1, Math.floor(self.progress * CHAPTERS.length));
            setActive((v) => (v === idx ? v : idx));
          },
        },
      });
    }, rootRef);
    const t = setTimeout(() => ScrollTrigger.refresh(), 350);
    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize);
    return () => {
      clearTimeout(t);
      window.removeEventListener("resize", onResize);
      ctx.revert();
    };
  }, [pinned, setTimecode]);

  // мобильный трек: следим за свайпом
  const onTrackScroll = useCallback(() => {
    const el = trackRef.current;
    if (!el || pinned) return;
    const max = Math.max(1, el.scrollWidth - el.clientWidth);
    const p = el.scrollLeft / max;
    setTimecode(p);
    const idx = Math.min(CHAPTERS.length - 1, Math.round(p * (CHAPTERS.length - 1)));
    setActive((v) => (v === idx ? v : idx));
  }, [pinned, setTimecode]);

  // автопрокрутка кадров активной панели
  useEffect(() => {
    setFrame(0);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => {
      setFrame((f) => (f + 1) % CHAPTERS[active].visuals.length);
    }, 2800);
    return () => clearInterval(id);
  }, [active]);

  const goTo = (i: number) => {
    if (pinned) {
      const top = startRef.current + (i / Math.max(1, CHAPTERS.length - 1)) * amountRef.current;
      window.scrollTo({ top, behavior: "smooth" });
    } else {
      const el = trackRef.current?.children[i] as HTMLElement | undefined;
      el?.scrollIntoView({ behavior: "smooth", inline: "start", block: "nearest" });
    }
  };

  return (
    <section
      ref={rootRef}
      id="services"
      className="relative border-y border-line bg-bg2/50 lg:h-svh lg:overflow-hidden"
    >
      <div
        ref={trackRef}
        onScroll={onTrackScroll}
        className="no-scrollbar relative flex w-max snap-x snap-mandatory items-stretch overflow-x-auto lg:h-full lg:snap-none lg:overflow-visible"
      >
        {/* перфорация плёнки едет вместе с треком */}
        <Sprockets count={170} className="absolute inset-x-0 top-2 py-1 opacity-70" />
        <Sprockets count={170} className="absolute inset-x-0 bottom-[3.4rem] hidden py-1 opacity-70 lg:flex" />

        {CHAPTERS.map((ch, i) => (
          <FilmPanel key={ch.id} ch={ch} idx={i} active={active} frame={frame} setFrame={setFrame} />
        ))}

        {/* финальный кадр */}
        <article className="relative flex h-[64svh] w-[88vw] shrink-0 snap-start flex-col items-center justify-center px-6 lg:h-full lg:w-[46vw]">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted">конец плёнки услуг</p>
          <button
            onClick={() => document.getElementById("works")?.scrollIntoView({ behavior: "smooth" })}
            data-cursor
            className="group mt-5 text-center"
          >
            <span className="text-stroke-accent block font-display text-[clamp(2.6rem,6vw,5.4rem)] font-black uppercase leading-[0.9] tracking-tight transition-colors group-hover:text-accent">
              работы
            </span>
            <span className="mt-3 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-muted transition-colors group-hover:text-accent">
              избранные кейсы <span className="transition-transform duration-300 group-hover:translate-y-1">↓</span>
            </span>
          </button>
        </article>
      </div>

      {/* таймлайн-скраббер */}
      <div className="relative z-30 border-t border-line bg-bg/85 backdrop-blur lg:absolute lg:inset-x-0 lg:bottom-0">
        <div className="mx-auto flex max-w-[1600px] items-center gap-4 px-5 py-3 md:px-10">
          <span ref={tcRef} className="w-20 font-mono text-[11px] tabular-nums tracking-[0.14em] text-accent">
            00:00:00
          </span>
          <div className="relative h-[3px] flex-1 overflow-hidden rounded-full bg-line">
            <div ref={phRef} className="absolute inset-0 origin-left rounded-full bg-accent" style={{ transform: "scaleX(0)" }} />
          </div>
          <div className="flex items-center gap-1">
            {CHAPTERS.map((c, i) => (
              <button
                key={c.id}
                onClick={() => goTo(i)}
                data-cursor
                aria-label={c.name}
                className={`rounded-full px-2.5 py-1 font-mono text-[10px] tracking-[0.12em] transition-all ${
                  i === active ? "bg-accent text-accentink" : "text-muted hover:text-ink"
                }`}
              >
                {c.num}
              </button>
            ))}
          </div>
          <span className="hidden font-mono text-[10px] uppercase tracking-[0.2em] text-muted sm:block">
            {pinned ? "скролль — плёнка едет →" : "свайпай плёнку →"}
          </span>
        </div>
      </div>
    </section>
  );
}

/* ================= РАБОТЫ ================= */
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
      className={`group relative block h-full w-full overflow-hidden border border-line bg-card text-left will-change-transform ${work.span}`}
    >
      <div className={`relative overflow-hidden ${work.ratio}`}>
        {work.video ? (
          <video
            src={work.video}
            poster={work.poster}
            muted
            loop
            playsInline
            preload="metadata"
            onMouseEnter={(e) => e.currentTarget.play().catch(() => undefined)}
            onMouseLeave={(e) => e.currentTarget.pause()}
            className="h-full w-full object-cover"
          />
        ) : (
          <img
            src={work.image}
            alt={work.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-bg/85 via-bg/10 to-transparent opacity-90" />
        <span className="absolute left-4 top-4 rounded-full border border-line bg-bg/70 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] backdrop-blur-sm">
          {work.index} · {work.category}
        </span>
        {work.video && (
          <span className="absolute left-1/2 top-1/2 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-bg/70 backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
            <Play size={20} className="ml-0.5 text-accent" />
          </span>
        )}
        <span className="absolute right-4 top-4 grid h-10 w-10 translate-y-2 place-items-center rounded-full bg-accent text-accentink opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <Plus size={18} />
        </span>
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5">
          <div>
            <h3 className="font-display text-2xl font-black uppercase leading-none tracking-tight md:text-4xl">
              {work.title}
            </h3>
            <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
              {work.client} — {work.year}
            </p>
          </div>
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
            {work.video ? (
              <video
                src={work.video}
                poster={work.poster}
                controls
                autoPlay
                muted
                loop
                playsInline
                className="h-full w-full object-cover"
              />
            ) : (
              <img src={work.image} alt={work.title} className="h-full w-full object-cover" />
            )}
          </div>
          <div className="flex flex-col gap-6 p-7 md:p-10">
            <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
              {work.index} · {work.category} · {work.year}
            </div>
            <h3 className="font-display text-3xl font-black uppercase leading-none md:text-5xl">{work.title}</h3>
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
            {work.gallery.length > 0 && (
              <div>
                <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                  Материалы кейса · {work.gallery.length}
                </div>
                <div className="no-scrollbar flex gap-2 overflow-x-auto pb-1">
                  {work.gallery.map((g, gi) => (
                    <figure key={g.src + gi} className="shrink-0">
                      <img
                        src={g.src}
                        alt={g.cap}
                        loading="lazy"
                        className="h-20 w-28 rounded-lg border border-line object-cover transition-transform duration-300 hover:scale-105 md:h-24 md:w-36"
                      />
                      <figcaption className="mt-1 max-w-[7rem] truncate font-mono text-[9px] uppercase tracking-wide text-muted">
                        {g.cap}
                      </figcaption>
                    </figure>
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
  const [activeWork, setActiveWork] = useState<Work | null>(null);
  const list = WORKS.filter((w) => filter === "Все" || w.category === filter);

  return (
    <section id="works" className="border-t border-line py-20 md:py-28">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6" data-reveal>
          <div>
            <div className="mb-3 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.22em] text-muted">
              <span className="text-accent">(05)</span>
              <span className="h-px w-10 bg-line" />
            </div>
            <h2 className="font-display text-[clamp(2rem,5.4vw,4.6rem)] font-black uppercase leading-[0.95] tracking-tight">
              Избранные <span className="font-accent italic font-medium normal-case text-accent">работы</span>
            </h2>
          </div>
          <div className="no-scrollbar flex gap-2 overflow-x-auto">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                data-cursor
                className={`shrink-0 rounded-full border px-4 py-2 font-mono text-[11px] uppercase tracking-[0.12em] transition-all ${
                  filter === f
                    ? "border-accent bg-accent text-accentink"
                    : "border-line text-muted hover:border-accent/50 hover:text-ink"
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <motion.div layout className="grid gap-5 md:grid-cols-12">
          <AnimatePresence mode="popLayout">
            {list.map((w) => (
              <motion.div
                layout
                key={w.id}
                initial={{ opacity: 0, y: 36 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className={`col-span-12 sm:col-span-6 ${w.span}`}
              >
                <WorkCard work={w} onOpen={setActiveWork} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>{activeWork && <WorkModal work={activeWork} onClose={() => setActiveWork(null)} />}</AnimatePresence>
    </section>
  );
}

/* ================= ОБО МНЕ ================= */
function About() {
  const facts = [
    "дизайн × нейро × видео",
    "рынки RU · US · EU",
    "Figma · After Effects · Midjourney",
    "шоурил 45 секунд",
    "60+ SMM-публикаций",
    "12 SKU упаковки",
    "маскоты «Альфы» и «Домашнего»",
  ];
  return (
    <section id="about" className="relative overflow-hidden border-t border-line py-20 md:py-28">
      <img src={MEDIA.projectsBg} alt="" className="absolute inset-0 h-full w-full object-cover opacity-[0.14]" />
      <div className="absolute inset-0 bg-gradient-to-b from-bg via-bg/40 to-bg" />
      <div className="relative mx-auto grid max-w-[1600px] items-center gap-12 px-5 md:px-10 lg:grid-cols-12">
        <div className="lg:col-span-4" data-reveal>
          <div className="relative mx-auto max-w-[340px]">
            <div className="overflow-hidden rounded-xl border border-line">
              <img src={PORTRAIT} alt="Ольга Бакушкина" className="aspect-[3/4] w-full object-cover" />
            </div>
            <div className="absolute -bottom-7 -right-7 h-24 w-24 md:h-28 md:w-28">
              <div className="spin-slow h-full w-full" aria-hidden>
                <svg viewBox="0 0 120 120" className="h-full w-full">
                  <defs>
                    <path id="about-orbit" d="M 60,60 m -46,0 a 46,46 0 1,1 92,0 a 46,46 0 1,1 -92,0" />
                  </defs>
                  <text className="fill-ink font-mono text-[10.5px] uppercase tracking-[0.24em]">
                    <textPath href="#about-orbit">дизайн · нейро · моушн · презентации ·</textPath>
                  </text>
                  <circle cx="60" cy="60" r="4" className="fill-accent" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className="lg:col-span-8" data-reveal>
          <div className="mb-3 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.22em] text-muted">
            <span className="text-accent">(06)</span>
            <span className="h-px w-10 bg-line" />
            <span>обо мне</span>
          </div>
          <h2 className="font-display text-[clamp(2rem,5vw,4.2rem)] font-black uppercase leading-[0.95] tracking-tight">
            Собираю бренды<br />
            <span className="font-accent italic font-medium normal-case text-accent">из картинки, движения и смысла</span>
          </h2>
          <p className="mt-6 max-w-2xl text-sm leading-relaxed text-muted md:text-base">
            От маскота и упаковки — до шоурила и питч-дека. Нейросети в пайплайне, рука дизайнера —
            в каждом кадре. Работаю с рынками России, США и Европы.
          </p>
          <div className="mt-8">
            <Marquee duration={26}>
              {facts.map((f) => (
                <span key={f} className="flex items-center">
                  <span className="px-5 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">{f}</span>
                  <span className="text-accent">✷</span>
                </span>
              ))}
            </Marquee>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================= КОНТАКТЫ ================= */
function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden border-t border-line py-24 md:py-36">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <img src={MEDIA.footerBg} alt="" className="h-full w-full object-cover opacity-35" />
        <div className="absolute inset-0 bg-gradient-to-b from-bg via-bg/40 to-bg/85" />
      </div>
      <div className="relative mx-auto max-w-[1600px] px-5 md:px-10">
        <div className="mb-3 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.22em] text-muted" data-reveal>
          <span className="text-accent">(07)</span>
          <span className="h-px w-10 bg-line" />
          <span>контакты</span>
        </div>
        <h2 className="font-display text-[clamp(2.4rem,7vw,6.5rem)] font-black uppercase leading-[0.88] tracking-tight" data-reveal>
          Давайте сделаем
          <span className="block font-accent italic font-medium normal-case text-accent">что-нибудь громкое</span>
        </h2>
        <div className="mt-12 flex flex-wrap items-center gap-5" data-reveal>
          <Magnetic>
            <a
              href="https://t.me/obakushkina"
              target="_blank"
              rel="noreferrer"
              data-cursor
              className="inline-flex items-center gap-2.5 rounded-full bg-accent px-8 py-4 font-mono text-xs font-medium uppercase tracking-[0.16em] text-accentink"
            >
              Написать в Telegram <ArrowUpRight size={14} />
            </a>
          </Magnetic>
          <Magnetic>
            <a
              href="mailto:olga@bakushkina.design"
              data-cursor
              className="inline-flex items-center gap-2.5 rounded-full border border-line px-8 py-4 font-mono text-xs uppercase tracking-[0.16em] transition-colors hover:border-accent hover:text-accent"
            >
              olga@bakushkina.design
            </a>
          </Magnetic>
        </div>
        <div className="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6 font-mono text-[11px] uppercase tracking-[0.18em] text-muted" data-reveal>
          <span>© 2026 Ольга Бакушкина</span>
          <span className="flex items-center gap-3">
            <span className="ping-dot inline-block h-2 w-2 rounded-full bg-ok" />
            открыта к проектам · MSK
          </span>
          <span>дизайн + код — без шаблонов</span>
        </div>
      </div>
    </section>
  );
}

/* ================= СТРАНИЦА ================= */
export default function Home() {
  const rootRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 44, autoAlpha: 0 },
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
      <HeroBoard />
      <FilmChapters />
      <Works />
      <About />
      <Contact />
    </div>
  );
}
