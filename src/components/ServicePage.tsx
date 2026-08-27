import { type ReactNode, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import { Marquee, SectionHead, Sprockets } from "./ui";
import { MEDIA } from "../data/media";

gsap.registerPlugin(ScrollTrigger);

/* ---------- Hero с параллакс-фоном ---------- */
export function PageHero({
  kicker,
  title,
  outline,
  subtitle,
  bg,
  chips,
}: {
  kicker: string;
  title: string;
  outline?: string;
  subtitle: string;
  bg: string;
  chips: string[];
}) {
  const imgRef = useRef<HTMLImageElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = imgRef.current;
    if (!el) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { yPercent: -8 },
        {
          yPercent: 8,
          ease: "none",
          scrollTrigger: { trigger: bgRef.current, start: "top bottom", end: "bottom top", scrub: 0.6 },
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <div ref={bgRef} className="relative overflow-hidden pt-16 md:pt-[72px]">
      <div className="absolute inset-0">
        <img ref={imgRef} src={bg} alt="" className="absolute -top-[10%] h-[132%] w-full object-cover opacity-[0.34]" />
        <div className="absolute inset-0 bg-gradient-to-b from-bg/70 via-bg/45 to-bg" />
      </div>

      <div className="relative mx-auto max-w-[1600px] px-5 pb-16 pt-14 md:px-10 md:pb-24 md:pt-24">
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.26em] text-muted"
        >
          <Link to="/" className="transition-colors hover:text-accent">Главная</Link>
          <span className="text-accent">/</span>
          <span className="text-ink">{kicker}</span>
        </motion.p>

        <h1 className="font-display font-black uppercase leading-[0.94] tracking-tight">
          <span className="block overflow-hidden">
            <motion.span
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="block text-[clamp(2.6rem,7.2vw,7rem)]"
            >
              {title}
            </motion.span>
          </span>
          {outline && (
            <span className="block overflow-hidden">
              <motion.span
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="text-stroke-accent block text-[clamp(2.6rem,7.2vw,7rem)]"
              >
                {outline}
              </motion.span>
            </span>
          )}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.22, ease: [0.16, 1, 0.3, 1] }}
          className="mt-7 max-w-2xl text-base leading-relaxed text-muted md:text-lg"
        >
          {subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.34, ease: [0.16, 1, 0.3, 1] }}
          className="mt-9 flex flex-wrap gap-2.5"
        >
          {chips.map((c) => (
            <span key={c} className="rounded-full border border-line bg-bg/60 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.14em] backdrop-blur-sm">
              {c}
            </span>
          ))}
        </motion.div>
      </div>

      <Sprockets count={90} className="absolute inset-x-0 bottom-1 py-1 opacity-50" />
    </div>
  );
}

/* ---------- Бегущая строка раздела ---------- */
export function PageMarquee({ items }: { items: string[] }) {
  return (
    <div className="relative border-y border-line bg-surface/50 py-5">
      <Sprockets count={90} className="absolute inset-x-0 -top-2.5 py-0.5 opacity-40" />
      <Sprockets count={90} className="absolute inset-x-0 -bottom-2.5 py-0.5 opacity-40" />
      <Marquee duration={26}>
        {items.map((t) => (
          <span key={t} className="flex items-center">
            <span className="px-6 font-display text-xl font-bold uppercase tracking-tight md:text-2xl">{t}</span>
            <span className="text-accent">✷</span>
          </span>
        ))}
      </Marquee>
    </div>
  );
}

/* ---------- Визуальная лента изображений ---------- */
export function VisualStrip({ images, reverse = false }: { images: string[]; reverse?: boolean }) {
  const doubled = [...images, ...images];
  return (
    <div className="overflow-hidden border-y border-line bg-card/40">
      <div className={`marquee-track ${reverse ? "reverse" : ""}`} style={{ ["--marquee-dur" as string]: "46s" }}>
        {doubled.map((src, i) => (
          <div key={src + i} className="h-52 w-72 shrink-0 overflow-hidden border-r border-linesoft md:h-64 md:w-96">
            <img
              src={src}
              alt=""
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-[1.06]"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ---------- Структура работы ---------- */
export function Process({ steps }: { steps: { t: string; d: string; days: string }[] }) {
  return (
    <section className="mx-auto max-w-[1600px] px-5 py-20 md:px-10 md:py-28">
      <SectionHead index="P" title={<>Как устроена<br />работа</>} meta="Каждый этап — с артефактом на выходе. Правки: 3 круга в стоимости, исходники — ваши." />
      <div className="relative">
        <div className="absolute bottom-0 left-[15px] top-0 w-px bg-line md:left-1/2" />
        <div className="space-y-10 md:space-y-0">
          {steps.map((s, i) => (
            <motion.div
              key={s.t}
              initial={{ opacity: 0, x: i % 2 ? 40 : -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className={`relative md:flex md:items-center md:py-7 ${i % 2 ? "md:flex-row-reverse" : ""}`}
            >
              <div className="absolute left-0 top-1 grid h-8 w-8 place-items-center rounded-full border border-line bg-bg font-mono text-[11px] text-accent md:left-1/2 md:-translate-x-1/2">
                {String(i + 1).padStart(2, "0")}
              </div>
              <div className={`ml-12 md:ml-0 md:w-1/2 ${i % 2 ? "md:pl-16" : "md:pr-16 md:text-right"}`}>
                <div className="mb-1 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted">
                  <span className="rounded-full border border-line px-2.5 py-0.5 text-accent">{s.days}</span>
                </div>
                <h3 className="font-display text-xl font-bold uppercase tracking-tight md:text-2xl">{s.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{s.d}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Финальный CTA (без калькулятора) ---------- */
export function PageCTA({ children }: { children?: ReactNode }) {
  return (
    <section className="relative overflow-hidden">
      <img src={MEDIA.footerBg} alt="" className="absolute inset-0 h-full w-full object-cover opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-b from-bg via-bg/30 to-bg/80" />
      <div className="relative mx-auto max-w-[1600px] px-5 py-24 text-center md:px-10 md:py-32">
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="font-display text-[clamp(2rem,5.5vw,4.6rem)] font-black uppercase leading-[0.95] tracking-tight"
        >
          Обсудим <span className="text-accent">ваш проект?</span>
        </motion.h2>
        <p className="mx-auto mt-6 max-w-xl text-sm leading-relaxed text-muted md:text-base">
          {children ?? "Ответ в течение рабочего дня. Бриф — 10 минут."}
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center">
          <a
            href="https://t.me/obakushkina"
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-3 rounded-full bg-accent px-9 py-4 font-mono text-xs font-medium uppercase tracking-[0.14em] text-accentink transition-transform hover:scale-[1.04]"
            data-cursor
          >
            Написать в Telegram
            <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
