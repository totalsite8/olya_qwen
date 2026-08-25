import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/** Кастомный курсор: точка + догоняющее кольцо, увеличивается на интерактивных элементах */
export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 260, damping: 26, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 260, damping: 26, mass: 0.6 });
  const [hover, setHover] = useState(false);
  const [down, setDown] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine)");
    setEnabled(mq.matches);
    if (!mq.matches) return;

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      setHover(!!t?.closest("a, button, [data-cursor], input, label, [role='button']"));
    };
    const dn = () => setDown(true);
    const up = () => setDown(false);
    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseover", over, { passive: true });
    window.addEventListener("mousedown", dn);
    window.addEventListener("mouseup", up);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      window.removeEventListener("mousedown", dn);
      window.removeEventListener("mouseup", up);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[95] hidden md:block"
        style={{ x, y }}
      >
        <motion.div
          className="-translate-x-1/2 -translate-y-1/2 rounded-full bg-accent"
          animate={{ scale: down ? 0.5 : hover ? 0.4 : 1, width: 8, height: 8 }}
          transition={{ duration: 0.18 }}
        />
      </motion.div>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[94] hidden md:block"
        style={{ x: ringX, y: ringY }}
      >
        <motion.div
          className="-translate-x-1/2 -translate-y-1/2 rounded-full border border-ink/50 mix-blend-difference"
          animate={{
            scale: down ? 0.8 : hover ? 1.9 : 1,
            opacity: hover ? 0.9 : 0.45,
          }}
          transition={{ type: "spring", stiffness: 320, damping: 24 }}
          style={{ width: 34, height: 34 }}
        />
      </motion.div>
    </>
  );
}
