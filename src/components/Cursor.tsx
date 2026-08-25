import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

/**
 * Курсор — обычный системный, ничего не перехватываем.
 * «Влияние на всё поле»:
 *  1) мягкий акцентный свет (soft-light) следует за указателем по всему сайту;
 *  2) CSS-переменные --mx/--my сдвигают фоновые слои (сетка, частицы) —
 *     полотно слегка «дышит» в сторону курсора.
 * Не оборачивает страницу в transform — fixed-элементы (меню, модалки)
 * продолжают работать корректно.
 */
export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const gx = useMotionValue(50);
  const gy = useMotionValue(40);
  const sgx = useSpring(gx, { stiffness: 40, damping: 20, mass: 1 });
  const sgy = useSpring(gy, { stiffness: 40, damping: 20, mass: 1 });
  const spotlight = useTransform(
    [sgx, sgy],
    ([x, y]) => `radial-gradient(640px circle at ${x}% ${y}%, var(--accent-glow), transparent 62%)`
  );

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || calm) return;
    setEnabled(true);

    let raf = 0;
    const onMove = (e: PointerEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        gx.set((e.clientX / window.innerWidth) * 100);
        gy.set((e.clientY / window.innerHeight) * 100);
        document.documentElement.style.setProperty("--mx", nx.toFixed(3));
        document.documentElement.style.setProperty("--my", ny.toFixed(3));
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
    };
  }, [gx, gy]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="pointer-events-none fixed inset-0 z-[93]"
      style={{ background: spotlight, mixBlendMode: "soft-light" }}
    />
  );
}
