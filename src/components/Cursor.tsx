import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Курсор — обычный системный. Но он «влияет на поле»: за ним следует мягкое
 * акцентное свечение (screen-блендинг), которое подсвечивает участок сайта —
 * весь интерфейс слегка реагирует на присутствие указателя.
 */
export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const x = useMotionValue(-600);
  const y = useMotionValue(-600);
  const gx = useSpring(x, { stiffness: 46, damping: 18, mass: 1.1 });
  const gy = useSpring(y, { stiffness: 46, damping: 18, mass: 1.1 });
  const [active, setActive] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    if (!mq.matches) return;
    setEnabled(true);

    let raf = 0;
    const move = (e: MouseEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        x.set(e.clientX);
        y.set(e.clientY);
      });
    };
    const enter = () => setActive(true);
    const leave = () => setActive(false);

    window.addEventListener("mousemove", move, { passive: true });
    document.documentElement.addEventListener("mouseenter", enter);
    document.documentElement.addEventListener("mouseleave", leave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", move);
      document.documentElement.removeEventListener("mouseenter", enter);
      document.documentElement.removeEventListener("mouseleave", leave);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[2] overflow-hidden"
      animate={{ opacity: active ? 1 : 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="absolute left-0 top-0 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          x: gx,
          y: gy,
          background:
            "radial-gradient(circle, color-mix(in srgb, var(--accent) 13%, transparent) 0%, color-mix(in srgb, var(--accent-2) 6%, transparent) 38%, transparent 70%)",
          mixBlendMode: "screen",
          filter: "blur(6px)",
        }}
      />
    </motion.div>
  );
}
