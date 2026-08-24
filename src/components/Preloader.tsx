import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/** Интро-шторка: счётчик процентов, маска названия, уход вверх. Один раз за сессию. */
export default function Preloader() {
  const [show, setShow] = useState(() => {
    if (typeof window === "undefined") return false;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
    try {
      if (sessionStorage.getItem("ob-intro")) return false;
    } catch {
      /* noop */
    }
    return true;
  });
  const [n, setN] = useState(0);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    if (!show) return;
    let raf = 0;
    const t0 = performance.now();
    const dur = 1450;
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / dur);
      const e = 1 - Math.pow(1 - p, 3);
      setN(Math.round(e * 100));
      if (p < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        try {
          sessionStorage.setItem("ob-intro", "1");
        } catch {
          /* noop */
        }
        setExiting(true);
        setTimeout(() => setShow(false), 750);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          aria-hidden
          className="fixed inset-0 z-[100] flex flex-col justify-between bg-bg px-6 py-6 md:px-10 md:py-8"
          animate={{ y: exiting ? "-100%" : "0%" }}
          transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
        >
          <div className="flex items-start justify-between font-mono text-[11px] uppercase tracking-[0.25em] text-muted">
            <span>Ольга Бакушкина</span>
            <span className="hidden sm:block">Дизайн · Нейро · Моушн</span>
            <span>2026</span>
          </div>

          <div className="flex items-end justify-between gap-6">
            <h1 className="font-display font-black uppercase leading-[0.92] tracking-tight">
              {["Ольга", "Бакушкина"].map((word, wi) => (
                <span key={word} className="block overflow-hidden">
                  <motion.span
                    initial={{ y: "110%" }}
                    animate={{ y: "0%" }}
                    transition={{ delay: 0.15 + wi * 0.12, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                    className={`block text-[clamp(2.4rem,9vw,7.5rem)] ${wi === 1 ? "text-stroke-accent" : ""}`}
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
            </h1>
            <div className="pb-1 text-right">
              <div className="font-display text-5xl font-black tabular-nums text-accent md:text-8xl">{n}</div>
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted">загрузка</div>
            </div>
          </div>

          <div className="h-px w-full bg-line">
            <div className="h-full bg-accent transition-[width] duration-100 ease-linear" style={{ width: `${n}%` }} />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
