import { useEffect, useRef, useState } from "react";

const CHARS = "#@%&*+=/<>_▮";

/** Текст «расшифровывается» при наведении — фирменный глитч-ховер */
export function ScrambleText({ text, className = "" }: { text: string; className?: string }) {
  const [display, setDisplay] = useState(text);
  const timer = useRef<number | null>(null);

  const run = () => {
    if (timer.current) window.clearInterval(timer.current);
    let frame = 0;
    const total = 9;
    timer.current = window.setInterval(() => {
      frame++;
      if (frame >= total) {
        setDisplay(text);
        if (timer.current) window.clearInterval(timer.current);
        timer.current = null;
        return;
      }
      const solved = Math.floor((frame / total) * text.length);
      setDisplay(
        text
          .split("")
          .map((ch, i) => {
            if (ch === " ") return " ";
            if (i < solved) return ch;
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );
    }, 26);
  };

  useEffect(
    () => () => {
      if (timer.current) window.clearInterval(timer.current);
    },
    []
  );

  return (
    <span className={`inline-block whitespace-nowrap ${className}`} onMouseEnter={run}>
      {display}
    </span>
  );
}
