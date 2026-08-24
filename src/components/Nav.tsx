import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, Moon, Sun, X } from "lucide-react";
import { useStore } from "../store/useStore";
import { Magnetic } from "./ui";

const ANCHORS = [
  { id: "works", label: "Работы" },
  { id: "services", label: "Услуги" },
  { id: "about", label: "Обо мне" },
  { id: "contact", label: "Контакты" },
];

function MskClock() {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  const time = new Intl.DateTimeFormat("ru-RU", {
    timeZone: "Europe/Moscow",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(now);
  return (
    <span className="hidden font-mono text-[11px] uppercase tracking-[0.18em] text-muted lg:block">
      MSK <span className="tabular-nums text-ink">{time}</span>
    </span>
  );
}

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { theme, toggleTheme } = useStore();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => setOpen(false), [location.pathname]);

  const goAnchor = (id: string) => {
    setOpen(false);
    if (location.pathname !== "/") {
      navigate("/", { state: { anchor: id } });
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[60] transition-all duration-500 ${
          scrolled ? "border-b border-line bg-bg/85 backdrop-blur-md" : "border-b border-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-[1600px] items-center justify-between px-5 md:h-[72px] md:px-10">
          <Link
            to="/"
            className="group flex items-baseline gap-1 font-display text-lg font-bold tracking-tight"
            data-cursor
          >
            ОБ
            <span className="inline-block text-accent transition-transform duration-500 group-hover:rotate-[135deg]">
              ✷
            </span>
          </Link>

          <nav className="hidden items-center gap-7 md:flex">
            {ANCHORS.map((a) => (
              <button
                key={a.id}
                onClick={() => goAnchor(a.id)}
                className="group relative font-mono text-[11px] uppercase tracking-[0.2em] text-muted transition-colors hover:text-ink"
                data-cursor
              >
                {a.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-accent transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <MskClock />
            <button
              onClick={toggleTheme}
              aria-label="Переключить тему"
              className="grid h-9 w-9 place-items-center rounded-full border border-line text-muted transition-all hover:border-accent hover:text-accent"
              data-cursor
            >
              {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
            </button>
            <Link
              to="/calculator"
              className="hidden items-center gap-2 rounded-full bg-accent px-4 py-2 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-accentink transition-transform hover:scale-[1.04] md:inline-flex"
              data-cursor
            >
              Калькулятор
            </Link>
            <button
              onClick={() => setOpen(true)}
              aria-label="Меню"
              className="grid h-9 w-9 place-items-center rounded-full border border-line md:hidden"
            >
              <Menu size={16} />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[80] flex flex-col bg-bg px-6 pb-8 pt-5"
          >
            <div className="flex items-center justify-between">
              <span className="font-display text-lg font-bold">
                ОБ<span className="text-accent">✷</span>
              </span>
              <div className="flex items-center gap-4">
                <button
                  onClick={toggleTheme}
                  aria-label="Переключить тему"
                  className="grid h-9 w-9 place-items-center rounded-full border border-line"
                >
                  {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
                </button>
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Закрыть меню"
                  className="grid h-9 w-9 place-items-center rounded-full border border-line"
                >
                  <X size={16} />
                </button>
              </div>
            </div>

            <nav className="mt-12 flex flex-col gap-2">
              {ANCHORS.map((a, i) => (
                <motion.button
                  key={a.id}
                  initial={{ opacity: 0, x: -28 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + i * 0.07, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => goAnchor(a.id)}
                  className="group flex items-baseline gap-4 text-left"
                >
                  <span className="font-mono text-xs text-accent">0{i + 1}</span>
                  <span className="font-display text-4xl font-bold uppercase leading-tight transition-colors group-hover:text-accent">
                    {a.label}
                  </span>
                </motion.button>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -28 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.45, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link
                  to="/calculator"
                  onClick={() => setOpen(false)}
                  className="group mt-4 flex items-baseline gap-4"
                >
                  <span className="font-mono text-xs text-accent">05</span>
                  <span className="font-display text-4xl font-bold uppercase leading-tight text-accent">
                    Калькулятор
                  </span>
                </Link>
              </motion.div>
            </nav>

            <div className="mt-auto flex flex-col gap-2 border-t border-line pt-6">
              <Magnetic>
                <a
                  href="https://t.me/obakushkina"
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono text-sm text-muted hover:text-ink"
                >
                  @obakushkina
                </a>
              </Magnetic>
              <a href="mailto:hello@bakushkina.design" className="font-mono text-sm text-muted hover:text-ink">
                hello@bakushkina.design
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
