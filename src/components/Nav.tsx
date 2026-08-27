import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Calculator, ChevronDown, Menu, Moon, Sun, X, Clapperboard, Wand2, Presentation, LayoutGrid } from "lucide-react";
import { useStore } from "../store/useStore";
import { Magnetic } from "./ui";
import { ScrambleText } from "./Scramble";

const ANCHORS = [
  { id: "works", label: "Работы" },
  { id: "services", label: "Услуги" },
  { id: "about", label: "Обо мне" },
  { id: "contact", label: "Контакты" },
];

const SERVICE_PAGES = [
  { to: "/video", label: "Видео и моушн", icon: Clapperboard },
  { to: "/neuro", label: "Нейрогенерации", icon: Wand2 },
  { to: "/presentations", label: "Презентации", icon: Presentation },
  { to: "/design", label: "Дизайн и SMM", icon: LayoutGrid },
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
  const [svcOpen, setSvcOpen] = useState(false);
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

  useEffect(() => {
    setOpen(false);
    setSvcOpen(false);
  }, [location.pathname]);

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
          <Link to="/" className="group flex items-baseline gap-1 font-display text-lg font-bold tracking-tight" data-cursor>
            ОБ
            <span className="inline-block text-accent transition-transform duration-500 group-hover:rotate-[135deg]">✷</span>
          </Link>

          <nav className="hidden items-center gap-6 md:flex">
            <button onClick={() => goAnchor("works")} className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted transition-colors hover:text-ink" data-cursor>
              <ScrambleText text="Работы" />
            </button>

            {/* Выпадающее меню услуг */}
            <div className="relative" onMouseEnter={() => setSvcOpen(true)} onMouseLeave={() => setSvcOpen(false)}>
              <button
                onClick={() => setSvcOpen((v) => !v)}
                className={`flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.2em] transition-colors ${svcOpen ? "text-accent" : "text-muted hover:text-ink"}`}
                data-cursor
              >
                <ScrambleText text="Услуги" />
                <ChevronDown size={12} className={`transition-transform duration-300 ${svcOpen ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {svcOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                    transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute left-1/2 top-full w-64 -translate-x-1/2 pt-3"
                  >
                    <div className="overflow-hidden rounded-xl border border-line bg-surface/95 shadow-2xl backdrop-blur-md">
                      {SERVICE_PAGES.map((s, i) => (
                        <Link
                          key={s.to}
                          to={s.to}
                          className={`flex items-center gap-3 px-5 py-3.5 text-sm transition-colors hover:bg-accent hover:text-accentink ${
                            i > 0 ? "border-t border-linesoft" : ""
                          } ${location.pathname === s.to ? "text-accent" : "text-muted"}`}
                        >
                          <s.icon size={15} />
                          {s.label}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button onClick={() => goAnchor("about")} className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted transition-colors hover:text-ink" data-cursor>
              <ScrambleText text="Обо мне" />
            </button>
            <button onClick={() => goAnchor("contact")} className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted transition-colors hover:text-ink" data-cursor>
              <ScrambleText text="Контакты" />
            </button>
          </nav>

          <div className="flex items-center gap-3 md:gap-4">
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
              className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 font-mono text-[11px] font-medium uppercase tracking-[0.14em] text-accentink transition-transform hover:scale-[1.04]"
              data-cursor
            >
              <Calculator size={13} />
              <span className="hidden sm:inline">Калькулятор</span>
            </Link>
            <button onClick={() => setOpen(true)} aria-label="Меню" className="grid h-9 w-9 place-items-center rounded-full border border-line md:hidden">
              <Menu size={16} />
            </button>
          </div>
        </div>
      </header>

      {/* Мобильное меню */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[80] flex flex-col overflow-y-auto bg-bg px-6 pb-8 pt-5"
          >
            <div className="flex items-center justify-between">
              <span className="font-display text-lg font-bold">
                ОБ<span className="text-accent">✷</span>
              </span>
              <div className="flex items-center gap-4">
                <button onClick={toggleTheme} aria-label="Переключить тему" className="grid h-9 w-9 place-items-center rounded-full border border-line">
                  {theme === "dark" ? <Sun size={15} /> : <Moon size={15} />}
                </button>
                <button onClick={() => setOpen(false)} aria-label="Закрыть меню" className="grid h-9 w-9 place-items-center rounded-full border border-line">
                  <X size={16} />
                </button>
              </div>
            </div>

            <nav className="mt-10 flex flex-col gap-1.5">
              {ANCHORS.map((a, i) => (
                <motion.button
                  key={a.id}
                  initial={{ opacity: 0, x: -28 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.12 + i * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => goAnchor(a.id)}
                  className="group flex items-baseline gap-4 text-left"
                >
                  <span className="font-mono text-xs text-accent">0{i + 1}</span>
                  <span className="font-display text-3xl font-bold uppercase leading-tight transition-colors group-hover:text-accent">
                    {a.label}
                  </span>
                </motion.button>
              ))}

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.38 }} className="mt-5 border-t border-line pt-5">
                <div className="mb-3 font-mono text-[10px] uppercase tracking-[0.22em] text-muted">Направления</div>
                <div className="grid grid-cols-2 gap-2">
                  {SERVICE_PAGES.map((s) => (
                    <Link
                      key={s.to}
                      to={s.to}
                      className="flex items-center gap-2.5 rounded-xl border border-line px-4 py-3.5 text-sm transition-colors hover:border-accent hover:text-accent"
                    >
                      <s.icon size={15} className="shrink-0 text-accent" />
                      {s.label}
                    </Link>
                  ))}
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: -28 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.46, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}>
                <Link to="/calculator" onClick={() => setOpen(false)} className="group mt-5 flex items-baseline gap-4">
                  <span className="font-mono text-xs text-accent">06</span>
                  <span className="flex items-center gap-3 font-display text-3xl font-bold uppercase leading-tight text-accent">
                    <Calculator size={22} /> Калькулятор
                  </span>
                </Link>
              </motion.div>
            </nav>

            <div className="mt-auto flex flex-col gap-2 border-t border-line pt-6">
              <Magnetic>
                <a href="https://t.me/obakushkina" target="_blank" rel="noreferrer" className="font-mono text-sm text-muted hover:text-ink">
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
