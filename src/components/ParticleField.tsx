import { useEffect, useRef } from "react";
import { useStore } from "../store/useStore";

type P = { x: number; y: number; vx: number; vy: number; r: number; d: number; plus: boolean; tw: number };

/** Амбиентный фон: дрейфующие точки и «плюсы» с параллаксом от курсора */
export default function ParticleField() {
  const theme = useStore((s) => s.theme);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0;
    let h = 0;
    let raf = 0;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    let parts: P[] = [];
    let t = Math.random() * 100;

    const cs = getComputedStyle(document.documentElement);
    const dotColor = cs.getPropertyValue("--muted").trim() || "#9a9282";
    const accentColor = cs.getPropertyValue("--accent").trim() || "#ff4d1f";

    const seed = () => {
      const count = Math.min(90, Math.floor((w * h) / 20000));
      parts = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.14,
        vy: (Math.random() - 0.5) * 0.14,
        r: 0.7 + Math.random() * 1.5,
        d: 0.3 + Math.random() * 0.7,
        plus: Math.random() < 0.15,
        tw: Math.random() * Math.PI * 2,
      }));
    };

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    };

    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const frame = () => {
      t += 0.016;
      ctx.clearRect(0, 0, w, h);
      for (const p of parts) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -24) p.x = w + 24;
        if (p.x > w + 24) p.x = -24;
        if (p.y < -24) p.y = h + 24;
        if (p.y > h + 24) p.y = -24;
        const px = p.x + (mouse.x - w / 2) * 0.028 * p.d;
        const py = p.y + (mouse.y - h / 2) * 0.028 * p.d;
        const alpha = (0.18 + 0.13 * Math.sin(t * 1.4 + p.tw)) * p.d;
        ctx.globalAlpha = Math.max(0.04, alpha);
        if (p.plus) {
          ctx.strokeStyle = accentColor;
          ctx.lineWidth = 1;
          const s = 3.5 + p.r;
          ctx.beginPath();
          ctx.moveTo(px - s, py);
          ctx.lineTo(px + s, py);
          ctx.moveTo(px, py - s);
          ctx.lineTo(px, py + s);
          ctx.stroke();
        } else {
          ctx.fillStyle = dotColor;
          ctx.beginPath();
          ctx.arc(px, py, p.r, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;
    };

    const loop = () => {
      frame();
      raf = requestAnimationFrame(loop);
    };

    resize();
    if (reduced) {
      frame(); // один статичный кадр
    } else {
      loop();
    }

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
    };
  }, [theme]);

  return <canvas ref={canvasRef} aria-hidden className="pointer-events-none fixed inset-0 z-0" />;
}
