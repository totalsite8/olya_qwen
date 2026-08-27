import { type ReactNode, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

/** Бегущая строка: контент дублируется для бесшовности */
export function Marquee({
  children,
  duration = 30,
  reverse = false,
  className = "",
}: {
  children: ReactNode;
  duration?: number;
  reverse?: boolean;
  className?: string;
}) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <div
        className={`marquee-track ${reverse ? "reverse" : ""}`}
        style={{ ["--marquee-dur" as string]: `${duration}s` }}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}

/** Магнитная кнопка — тянется к курсору */
export function Magnetic({ children, strength = 0.35 }: { children: ReactNode; strength?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 180, damping: 14, mass: 0.4 });
  const sy = useSpring(my, { stiffness: 180, damping: 14, mass: 0.4 });

  return (
    <motion.div
      ref={ref}
      style={{ x: sx, y: sy }}
      onMouseMove={(e) => {
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        mx.set((e.clientX - (r.left + r.width / 2)) * strength);
        my.set((e.clientY - (r.top + r.height / 2)) * strength);
      }}
      onMouseLeave={() => {
        mx.set(0);
        my.set(0);
      }}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
}

/** Заголовок секции: индекс + крупный display-текст */
export function SectionHead({
  index,
  title,
  meta,
  id,
}: {
  index: string;
  title: ReactNode;
  meta?: string;
  id?: string;
}) {
  return (
    <div id={id} className="mb-10 flex flex-wrap items-end justify-between gap-4 md:mb-16">
      <div data-reveal>
        <div className="mb-3 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.22em] text-muted">
          <span className="text-accent">({index})</span>
          <span className="h-px w-10 bg-line" />
        </div>
        <h2 className="font-display text-[clamp(1.9rem,5vw,4.2rem)] font-bold uppercase leading-[0.98] tracking-tight">
          {title}
        </h2>
      </div>
      {meta && (
        <p data-reveal className="max-w-xs pb-2 font-mono text-xs leading-relaxed text-muted">
          {meta}
        </p>
      )}
    </div>
  );
}

/** Вращающаяся круговая надпись */
export function OrbitBadge({ text, className = "" }: { text: string; className?: string }) {
  const id = useRef(`orbit-${Math.random().toString(36).slice(2, 8)}`).current;
  return (
    <div className={`spin-slow ${className}`} aria-hidden>
      <svg viewBox="0 0 120 120" className="h-full w-full">
        <defs>
          <path id={id} d="M 60,60 m -46,0 a 46,46 0 1,1 92,0 a 46,46 0 1,1 -92,0" />
        </defs>
        <text className="fill-ink font-mono text-[10.5px] uppercase tracking-[0.24em]">
          <textPath href={`#${id}`}>{text}</textPath>
        </text>
        <circle cx="60" cy="60" r="4" className="fill-accent" />
      </svg>
    </div>
  );
}

/** Плавное появление при скролле (фолбэк без GSAP — для мелких элементов) */
export function FadeIn({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

/** Перфорация киноплёнки — фирменный мотив сайта */
export function Sprockets({ count = 80, className = "" }: { count?: number; className?: string }) {
  return (
    <div aria-hidden className={`pointer-events-none flex items-center justify-between gap-3 px-5 ${className}`}>
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} className="h-2 w-3.5 shrink-0 rounded-[3px] border border-line bg-bg/50" />
      ))}
    </div>
  );
}

/** Счётчик с пружинным значением */
export function useHoverLift() {
  const y = useMotionValue(0);
  const sy = useSpring(y, { stiffness: 300, damping: 20 });
  const rotate = useTransform(sy, [0, -8], [0, -0.6]);
  return { sy, rotate };
}
