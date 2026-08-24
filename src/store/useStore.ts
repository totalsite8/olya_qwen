import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Market } from "../data/services";

export interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}

export interface HistoryRecord {
  id: string;
  createdAt: number;
  client: string;
  market: Market;
  qty: Record<string, number>;
  urgency: number;
  license: number;
  total: number;
  totalRub: number;
  seqDays: number;
  parDays: number;
  itemsBrief: string;
}

interface Store {
  theme: "dark" | "light";
  toggleTheme: () => void;

  installEvt: BeforeInstallPromptEvent | null;
  setInstallEvt: (e: BeforeInstallPromptEvent | null) => void;
  installed: boolean;
  setInstalled: () => void;

  history: HistoryRecord[];
  addRecord: (r: HistoryRecord) => void;
  removeRecord: (id: string) => void;
  clearHistory: () => void;

  pendingRestore: HistoryRecord | null;
  requestRestore: (r: HistoryRecord) => void;
  consumeRestore: () => void;
}

export const useStore = create<Store>()(
  persist(
    (set) => ({
      theme: (document.documentElement.dataset.theme as "dark" | "light") || "dark",
      toggleTheme: () =>
        set((s) => {
          const next = s.theme === "dark" ? "light" : "dark";
          document.documentElement.dataset.theme = next;
          try {
            localStorage.setItem("ob-theme", next);
          } catch {
            /* noop */
          }
          return { theme: next };
        }),

      installEvt: null,
      setInstallEvt: (e) => set({ installEvt: e }),
      installed: false,
      setInstalled: () => set({ installed: true, installEvt: null }),

      history: [],
      addRecord: (r) => set((s) => ({ history: [r, ...s.history].slice(0, 40) })),
      removeRecord: (id) => set((s) => ({ history: s.history.filter((h) => h.id !== id) })),
      clearHistory: () => set({ history: [] }),

      pendingRestore: null,
      requestRestore: (r) => set({ pendingRestore: r }),
      consumeRestore: () => set({ pendingRestore: null }),
    }),
    {
      name: "ob-portfolio-store",
      partialize: (s) => ({ theme: s.theme, history: s.history }),
    }
  )
);
