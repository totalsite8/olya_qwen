import { useEffect, useState } from "react";

export interface Rates {
  usd: number;
  eur: number;
  date: string;
  source: "cbr" | "fallback";
}

/** Резервные курсы ЦБ РФ на 22.08.2026 (раздел 6 мастер-промпта) */
const FALLBACK: Rates = { usd: 82.92, eur: 96.86, date: "22.08.2026", source: "fallback" };
const CACHE_KEY = "ob-rates-cache";

function readCache(): Rates | null {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const p = JSON.parse(raw) as { d: string; usd: number; eur: number };
    if (!p.d || !p.usd || !p.eur) return null;
    return { usd: p.usd, eur: p.eur, date: p.d, source: "cbr" };
  } catch {
    return null;
  }
}

/** Курсы ЦБ РФ: кеш в localStorage, обновление не чаще раза в сутки */
export function useRates(): Rates {
  const [rates, setRates] = useState<Rates>(() => readCache() ?? FALLBACK);

  useEffect(() => {
    const cached = readCache();
    const today = new Date().toISOString().slice(0, 10);
    if (cached && cached.date === today) {
      setRates(cached);
      return;
    }
    let cancelled = false;
    fetch("https://www.cbr-xml-daily.ru/daily_json.js")
      .then((r) => {
        if (!r.ok) throw new Error("rates");
        return r.json() as Promise<{ Valute: { USD: { Value: number }; EUR: { Value: number } } }>;
      })
      .then((data) => {
        if (cancelled) return;
        const next: Rates = {
          usd: data.Valute.USD.Value,
          eur: data.Valute.EUR.Value,
          date: today,
          source: "cbr",
        };
        try {
          localStorage.setItem(CACHE_KEY, JSON.stringify({ d: today, usd: next.usd, eur: next.eur }));
        } catch {
          /* noop */
        }
        setRates(next);
      })
      .catch(() => {
        if (!cancelled) setRates(cached ?? FALLBACK); // резерв + пометка об актуальности
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return rates;
}
