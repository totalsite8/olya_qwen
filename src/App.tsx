import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Download, X, Smartphone } from "lucide-react";
import Nav from "./components/Nav";
import Cursor from "./components/Cursor";
import Preloader from "./components/Preloader";
import ParticleField from "./components/ParticleField";
import ScrollProgress from "./components/ScrollProgress";
import Home from "./pages/Home";
import Calculator from "./pages/Calculator";
import Video from "./pages/Video";
import Neuro from "./pages/Neuro";
import Presentations from "./pages/Presentations";
import Design from "./pages/Design";
import { useStore, type BeforeInstallPromptEvent } from "./store/useStore";

/* ===== PWA: установка по beforeinstallprompt (мобильные) ===== */
function InstallBanner() {
  const { installEvt, setInstallEvt, installed, setInstalled } = useStore();
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const onPrompt = (e: Event) => {
      e.preventDefault();
      setInstallEvt(e as BeforeInstallPromptEvent);
    };
    const onInstalled = () => setInstalled();
    window.addEventListener("beforeinstallprompt", onPrompt);
    window.addEventListener("appinstalled", onInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", onPrompt);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, [setInstallEvt, setInstalled]);

  if (!installEvt || installed || dismissed) return null;

  return (
    <motion.div
      initial={{ y: 90, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 90, opacity: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 24 }}
      className="fixed inset-x-3 bottom-3 z-[85] md:hidden"
    >
      <div className="flex items-center gap-3 rounded-2xl border border-line bg-surface/95 p-3.5 shadow-2xl backdrop-blur">
        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-accent/15 text-accent">
          <Smartphone size={18} />
        </span>
        <div className="min-w-0 flex-1">
          <div className="text-sm font-semibold leading-tight">Установить приложение</div>
          <div className="text-[11px] text-muted">Портфолио и калькулятор — на главный экран</div>
        </div>
        <button
          onClick={async () => {
            await installEvt.prompt();
            const choice = await installEvt.userChoice;
            if (choice.outcome === "accepted") setInstalled();
            else setInstallEvt(null);
          }}
          className="flex shrink-0 items-center gap-1.5 rounded-full bg-accent px-4 py-2.5 font-mono text-[11px] font-medium uppercase tracking-wide text-accentink"
        >
          <Download size={13} />
          OK
        </button>
        <button
          onClick={() => setDismissed(true)}
          aria-label="Скрыть"
          className="shrink-0 text-muted"
        >
          <X size={16} />
        </button>
      </div>
    </motion.div>
  );
}

/* ===== Обёртка страницы с транзишеном ===== */
function PageWrap({ children }: { children: React.ReactNode }) {
  return (
    <motion.main
      initial={{ opacity: 0, y: 26 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -18 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.main>
  );
}

function Shell() {
  const location = useLocation();

  // Сброс скролла при смене маршрута (кроме якорных переходов)
  useEffect(() => {
    if (!(location.state as { anchor?: string } | null)?.anchor) {
      window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
    }
  }, [location.pathname, location.state]);

  return (
    <div className="relative min-h-svh">
      <ParticleField />
      <ScrollProgress />
      <div className="noise-layer" aria-hidden />
      <Cursor />
      <Preloader />
      <Nav />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <PageWrap>
                <Home />
              </PageWrap>
            }
          />
          <Route
            path="/calculator"
            element={
              <PageWrap>
                <Calculator />
              </PageWrap>
            }
          />
          <Route
            path="/video"
            element={
              <PageWrap>
                <Video />
              </PageWrap>
            }
          />
          <Route
            path="/neuro"
            element={
              <PageWrap>
                <Neuro />
              </PageWrap>
            }
          />
          <Route
            path="/presentations"
            element={
              <PageWrap>
                <Presentations />
              </PageWrap>
            }
          />
          <Route
            path="/design"
            element={
              <PageWrap>
                <Design />
              </PageWrap>
            }
          />
          <Route
            path="*"
            element={
              <PageWrap>
                <Home />
              </PageWrap>
            }
          />
        </Routes>
      </AnimatePresence>
      <InstallBanner />
    </div>
    </TiltShell>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Shell />
    </BrowserRouter>
  );
}
