import { type ReactNode, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
import { ArrowRight, ArrowUpRight, Calculator } from "lucide-react";
import { Marquee, SectionHead } from "./ui";
import { MEDIA } from "../data/media";
import { SERVICES, SERVICE_BY_ID, type Market } from "../data/services";
import { fmtMoney } from "../lib/format";

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
        <img ref={imgRef} src={bg} alt="" className="h-[120%] w-full object-cover opacity-[0.34]" />
        <div className="absolute inset-0 bg-gradient-to-b from-bg/70 via-bg/45 to-bg" />
      </div>

      <div className="relative mx-auto max-w-[1600px] px-5 pb-20 pt-16 md:px-10 md:pb-32 md:pt-28">
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
          className="mt-8 max-w-2xl text-base leading-relaxed text-muted md:text-lg"
        >
          {subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.34, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-wrap gap-2.5"
        >
          {chips.map((c) => (
            <span key={c} className="rounded-full border border-line bg-bg/60 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.14em] backdrop-blur-sm">
              {c}
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

/* ---------- Бегущая строка раздела ---------- */
export function PageMarquee({ items }: { items: string[] }) {
  return (
    <div className="border-y border-line bg-surface/50 py-5">
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

/* ---------- Исследование рынка ---------- */
export function MarketInsight({ title, items }: { title: ReactNode; items: { v: string; k: string; note: string }[] }) {
  return (
    <section className="mx-auto max-w-[1600px] px-5 py-20 md:px-10 md:py-28">
      <SectionHead index="R" title={title} meta="Что показал анализ рынка — и почему мы целимся выше средней планки" />
      <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-3">
        {items.map((it, i) => (
          <motion.div
            key={it.k}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="group bg-bg p-7 transition-colors hover:bg-surface md:p-9"
          >
            <div className="font-display text-3xl font-black text-accent md:text-4xl">{it.v}</div>
            <div className="mt-3 font-semibold">{it.k}</div>
            <p className="mt-2 text-sm leading-relaxed text-muted">{it.note}</p>
          </motion.div>
        ))}
      </div>
    </section>
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

/* ---------- Прайс-полоса из калькулятора ---------- */
export function PriceStrip({ ids, note }: { ids: string[]; note: string }) {
  const [market, setMarket] = useState<Market>("RU");
  return (
    <section className="border-y border-line bg-surface/60">
      <div className="mx-auto max-w-[1600px] px-5 py-20 md:px-10 md:py-28">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <div data-reveal>
            <div className="mb-3 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.22em] text-muted">
              <span className="text-accent">($)</span>
              <span className="h-px w-10 bg-line" />
            </div>
            <h2 className="font-display text-[clamp(1.9rem,4.4vw,3.6rem)] font-bold uppercase leading-[0.98] tracking-tight">
              Сколько это стоит
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">{note}</p>
          </div>
          <div className="flex gap-1 rounded-full border border-line p-1">
            {(["RU", "US", "EU"] as Market[]).map((m) => (
              <button
                key={m}
                onClick={() => setMarket(m)}
                className={`rounded-full px-4 py-1.5 font-mono text-[11px] uppercase tracking-wide transition-all ${
                  market === m ? "bg-accent text-accentink" : "text-muted hover:text-ink"
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-line">
          {ids.map((id, i) => {
            const s = SERVICE_BY_ID[id];
            if (!s) return null;
            return (
              <div
                key={id}
                className={`group flex items-center justify-between gap-4 bg-bg px-5 py-4 transition-colors hover:bg-surface md:px-7 ${
                  i > 0 ? "border-t border-linesoft" : ""
                }`}
              >
                <div className="min-w-0">
                  <div className="truncate text-sm font-semibold md:text-base">{s.name}</div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">за {s.unit}</div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-display text-lg font-bold tabular-nums text-accent md:text-xl">
                    {fmtMoney(s.prices[market], market)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Link
            to="/calculator"
            className="inline-flex items-center gap-3 rounded-full bg-accent px-7 py-3.5 font-mono text-xs font-medium uppercase tracking-[0.14em] text-accentink transition-transform hover:scale-[1.03]"
            data-cursor
          >
            <Calculator size={15} />
            Точный расчёт в калькуляторе
          </Link>
          <span className="font-mono text-[11px] uppercase tracking-wide text-muted">
            срочность · права · 3 рынка
          </span>
        </div>
      </div>
    </section>
  );
}

/* ---------- Финальный CTA ---------- */
export function PageCTA({ children }: { children?: ReactNode }) {
  return (
    <section className="relative overflow-hidden">
      <img src={MEDIA.footerBg} alt="" className="absolute inset-0 h-full w-full object-cover opacity-30" />
      <div className="absolute inset-0 bg-gradient-to-b from-bg via-bg/30 to-bg/80" />
      <div className="relative mx-auto max-w-[1600px] px-5 py-24 text-center md:px-10 md:py-36">
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
          {children ?? "Ответ в течение рабочего дня. Бриф — 10 минут, оценка — бесплатно."}
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="https://t.me/obakushkina"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-accent px-8 py-4 font-mono text-xs font-medium uppercase tracking-[0.14em] text-accentink transition-transform hover:scale-[1.04]"
            data-cursor
          >
            Написать в Telegram <ArrowUpRight size={14} />
          </a>
          <Link
            to="/calculator"
            className="inline-flex items-center gap-2 rounded-full border border-line px-8 py-4 font-mono text-xs uppercase tracking-[0.14em] transition-colors hover:border-accent hover:text-accent"
            data-cursor
          >
            Посчитать бюджет <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}

export { SERVICES };
