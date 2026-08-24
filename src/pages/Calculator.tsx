import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertTriangle,
  ArrowLeft,
  Check,
  ChevronDown,
  Copy,
  History as HistoryIcon,
  Minus,
  Plus,
  RotateCcw,
  Save,
  Trash2,
} from "lucide-react";
import {
  CATEGORIES,
  MARKET_META,
  PRES_BASE,
  SERVICES,
  type Market,
  type Service,
} from "../data/services";
import { computeCalc, LICENSES, TAX_NOTES, URGENCIES, type CalcState } from "../lib/calc";
import { useRates } from "../hooks/useRates";
import { fmtDateTime, fmtMoney, fmtQty, fmtRub, pluralDays } from "../lib/format";
import { useStore } from "../store/useStore";

const MARKETS: Market[] = ["RU", "US", "EU"];

function emptyState(): CalcState {
  return { qty: {}, urgency: 0, license: 0, market: "RU", client: "" };
}

/* ================= Счётчик со слайдером ================= */
function Stepper({
  service,
  value,
  onChange,
}: {
  service: Service;
  value: number;
  onChange: (v: number) => void;
}) {
  const clamp = (v: number) => {
    const stepped = Math.round(v / service.step) * service.step;
    return Math.min(999, Math.max(0, Number(stepped.toFixed(1))));
  };

  return (
    <div className="w-full">
      <div className="flex items-center gap-3">
        <div className="flex items-center rounded-full border border-line">
          <button
            onClick={() => onChange(clamp(value - service.step))}
            disabled={value <= 0}
            aria-label="Уменьшить"
            className="grid h-9 w-9 place-items-center rounded-full text-muted transition-colors hover:text-accent disabled:opacity-30 disabled:hover:text-muted"
          >
            <Minus size={14} />
          </button>
          <input
            type="number"
            inputMode="decimal"
            value={value || ""}
            placeholder="0"
            onChange={(e) => onChange(clamp(parseFloat(e.target.value.replace(",", ".")) || 0))}
            className="w-14 bg-transparent text-center font-mono text-sm font-medium outline-none"
            aria-label={`Количество: ${service.name}`}
          />
          <button
            onClick={() => onChange(clamp(value + service.step))}
            aria-label="Увеличить"
            className="grid h-9 w-9 place-items-center rounded-full text-muted transition-colors hover:text-accent"
          >
            <Plus size={14} />
          </button>
        </div>
        <span className="font-mono text-[11px] uppercase tracking-wide text-muted">
          {service.unit}
          {service.step === 0.5 && <span className="ml-1 text-muted/60">шаг 0,5</span>}
        </span>
      </div>

      <AnimatePresence>
        {value > 0 && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <input
              type="range"
              min={0}
              max={service.sliderMax}
              step={service.step}
              value={Math.min(value, service.sliderMax)}
              onChange={(e) => onChange(clamp(parseFloat(e.target.value)))}
              className="mt-2"
              aria-label={`Слайдер: ${service.name}`}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ================= Строка услуги ================= */
function ServiceRow({
  service,
  market,
  value,
  onChange,
  links,
}: {
  service: Service;
  market: Market;
  value: number;
  onChange: (v: number) => void;
  links?: {
    scriptOn: boolean;
    voiceOn: boolean;
    onScript: () => void;
    onVoice: () => void;
  };
}) {
  const sum = value * service.prices[market];
  const active = value > 0;

  return (
    <div
      className={`border-b border-linesoft px-4 py-4 transition-colors duration-300 md:px-6 ${
        active ? "bg-card" : "hover:bg-card/50"
      }`}
    >
      <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
        <div className="min-w-0 flex-1 basis-52">
          <div className="flex items-center gap-2.5">
            <span className={`font-mono text-[10px] tracking-wide ${active ? "text-accent" : "text-muted"}`}>
              {service.code}
            </span>
            <span className="truncate text-sm font-medium md:text-[15px]">{service.name}</span>
          </div>
          {service.note && (
            <p className="mt-1 max-w-md text-xs leading-snug text-muted">{service.note}</p>
          )}
          <div className="mt-1 font-mono text-[11px] text-muted">
            {fmtMoney(service.prices[market], market)} / {service.unit}
          </div>
        </div>

        <div className="w-full sm:w-auto sm:flex-1">
          <Stepper service={service} value={value} onChange={onChange} />
        </div>

        <div className="w-28 text-right">
          <AnimatePresence mode="popLayout" initial={false}>
            {active ? (
              <motion.span
                key="sum"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="block font-mono text-sm font-bold text-accent"
              >
                {fmtMoney(sum, market)}
              </motion.span>
            ) : (
              <motion.span
                key="dash"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="block font-mono text-sm text-muted/50"
              >
                —
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </div>

      {links && (
        <div className="mt-3 flex flex-wrap gap-2">
          <button
            onClick={links.onScript}
            className={`flex items-center gap-2 rounded-full border px-3 py-1.5 font-mono text-[11px] uppercase tracking-wide transition-all ${
              links.scriptOn
                ? "border-accent bg-accent text-accentink"
                : "border-line text-muted hover:border-ink hover:text-ink"
            }`}
          >
            {links.scriptOn ? <Check size={12} /> : <Plus size={12} />}
            сценарий · то же число минут
          </button>
          <button
            onClick={links.onVoice}
            className={`flex items-center gap-2 rounded-full border px-3 py-1.5 font-mono text-[11px] uppercase tracking-wide transition-all ${
              links.voiceOn
                ? "border-accent bg-accent text-accentink"
                : "border-line text-muted hover:border-ink hover:text-ink"
            }`}
          >
            {links.voiceOn ? <Check size={12} /> : <Plus size={12} />}
            озвучка · то же число минут
          </button>
        </div>
      )}
    </div>
  );
}

/* ================= Страница ================= */
export default function Calculator() {
  const [state, setState] = useState<CalcState>(emptyState);
  const [openCats, setOpenCats] = useState<string[]>(["design", "neuro", "video", "pres"]);
  const [extrasOpen, setExtrasOpen] = useState(false);
  const [scriptLink, setScriptLink] = useState<"V1" | "V2" | null>(null);
  const [voiceLink, setVoiceLink] = useState<"V1" | "V2" | null>(null);
  const [savedFlash, setSavedFlash] = useState(false);
  const [copied, setCopied] = useState(false);
  const [confirmClear, setConfirmClear] = useState(false);
  const [restoredFlash, setRestoredFlash] = useState(false);

  const rates = useRates();
  const result = useMemo(() => computeCalc(state, rates), [state, rates]);

  const { history, addRecord, removeRecord, clearHistory, pendingRestore, consumeRestore } = useStore();
  const topRef = useRef<HTMLDivElement>(null);

  /* Восстановление расчёта из истории */
  useEffect(() => {
    if (!pendingRestore) return;
    setState({
      qty: { ...pendingRestore.qty },
      urgency: pendingRestore.urgency,
      license: pendingRestore.license,
      market: pendingRestore.market,
      client: pendingRestore.client,
    });
    setExtrasOpen(Object.keys(pendingRestore.qty).some((id) => id.startsWith("X")));
    consumeRestore();
    setRestoredFlash(true);
    const t = setTimeout(() => setRestoredFlash(false), 2400);
    topRef.current?.scrollIntoView({ behavior: "smooth" });
    return () => clearTimeout(t);
  }, [pendingRestore, consumeRestore]);

  const setQty = (id: string, v: number) => {
    setState((s) => {
      const qty = { ...s.qty };
      if (v <= 0) delete qty[id];
      else qty[id] = v;
      // связанные сценарий/озвучка следуют за V1/V2
      if ((id === "V1" || id === "V2") && v > 0) {
        if (scriptLink === id) qty["V3"] = v;
        if (voiceLink === id) qty["V4"] = v;
      }
      return { ...s, qty };
    });
  };

  const toggleLink = (target: "V3" | "V4", source: "V1" | "V2") => {
    const isOn = (target === "V3" ? scriptLink : voiceLink) === source;
    const setter = target === "V3" ? setScriptLink : setVoiceLink;
    if (isOn) {
      setter(null);
      setQty(target, 0);
      return;
    }
    setter(source);
    const srcQty = state.qty[source] ?? 0;
    const base = srcQty > 0 ? srcQty : 1;
    setState((s) => ({
      ...s,
      qty: { ...s.qty, [source]: srcQty > 0 ? srcQty : 1, [target]: base },
    }));
  };

  const toggleCat = (id: string) =>
    setOpenCats((c) => (c.includes(id) ? c.filter((x) => x !== id) : [...c, id]));

  const patch = (p: Partial<CalcState>) => setState((s) => ({ ...s, ...p }));

  const reset = () => {
    setState(emptyState());
    setScriptLink(null);
    setVoiceLink(null);
  };

  /* Сохранение в историю */
  const save = () => {
    if (!result.hasItems) return;
    const brief = result.lines.map((l) => `${l.service.code}×${fmtQty(l.qty)}`).join(" · ");
    addRecord({
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      createdAt: Date.now(),
      client: state.client.trim() || "Без имени",
      market: state.market,
      qty: { ...state.qty },
      urgency: state.urgency,
      license: state.license,
      total: result.total,
      totalRub: result.totalRub,
      seqDays: result.seqDays,
      parDays: result.parDays,
      itemsBrief: brief + (result.presBaseSum > 0 ? " · база през." : ""),
    });
    setSavedFlash(true);
    setTimeout(() => setSavedFlash(false), 2200);
  };

  /* Копирование сметы */
  const copy = async () => {
    const lines: string[] = [];
    lines.push(`Смета${state.client.trim() ? ` — ${state.client.trim()}` : ""}`);
    lines.push(`Рынок: ${state.market} · курс: $ ${rates.usd} ₽ / € ${rates.eur} ₽`);
    lines.push("—".repeat(34));
    for (const l of result.lines) {
      lines.push(`${l.service.code} ${l.service.name} × ${fmtQty(l.qty)} ${l.service.unit} = ${fmtMoney(l.sum, state.market)}`);
    }
    if (result.presBaseSum > 0) lines.push(`База проекта презентации = ${fmtMoney(result.presBaseSum, state.market)}`);
    lines.push("—".repeat(34));
    lines.push(`Сумма позиций: ${fmtMoney(result.subtotal, state.market)}`);
    if (result.rightsFee > 0) lines.push(`Права (+${Math.round(result.rightsRate * 100)}%): ${fmtMoney(result.rightsFee, state.market)}`);
    if (result.urgencyFee > 0) lines.push(`Срочность «${URGENCIES[state.urgency].label}» (+${Math.round(result.urgencyRate * 100)}%): ${fmtMoney(result.urgencyFee, state.market)}`);
    lines.push(`ИТОГО: ${fmtMoney(result.total, state.market)}${state.market !== "RU" ? ` (≈ ${fmtRub(result.totalRub)} по курсу ЦБ)` : ""}`);
    if (result.seqDays > 0) lines.push(`Срок: ${pluralDays(result.seqDays)} последовательно / ${pluralDays(result.parDays)} параллельно`);
    lines.push(`Налоги: ${TAX_NOTES[state.market]}`);
    try {
      await navigator.clipboard.writeText(lines.join("\n"));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard недоступен — молча */
    }
  };

  const coreCats = CATEGORIES.filter((c) => c.id !== "extra");
  const extras = SERVICES.filter((s) => s.cat === "extra");

  return (
    <div className="min-h-svh pt-24 md:pt-32" ref={topRef}>
      <div className="mx-auto max-w-[1600px] px-5 pb-36 md:px-10 lg:pb-24">
        {/* ===== Шапка ===== */}
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <div>
            <Link
              to="/"
              className="group mb-4 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-muted transition-colors hover:text-accent"
            >
              <ArrowLeft size={13} className="transition-transform group-hover:-translate-x-1" />
              портфолио
            </Link>
            <h1 className="font-display text-4xl font-black uppercase leading-none tracking-tight md:text-6xl">
              Калькулятор <span className="text-stroke-accent">стоимости</span>
            </h1>
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-accent/50 bg-accent/10 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-accent">
                внутренний инструмент · v2.0
              </span>
              <span className="font-mono text-[11px] text-muted">
                {rates.source === "cbr"
                  ? `Курс ЦБ РФ от ${rates.date}: $ ${rates.usd} ₽ · € ${rates.eur} ₽`
                  : `Резервный курс от ${rates.date}: $ ${rates.usd} ₽ · € ${rates.eur} ₽ (API недоступен)`}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex rounded-full border border-line p-1">
              {MARKETS.map((m) => (
                <button
                  key={m}
                  onClick={() => patch({ market: m })}
                  className={`rounded-full px-5 py-2.5 font-mono text-xs font-medium uppercase tracking-[0.12em] transition-all duration-300 ${
                    state.market === m ? "bg-accent text-accentink" : "text-muted hover:text-ink"
                  }`}
                >
                  {m} {MARKET_META[m].cur}
                </button>
              ))}
            </div>
            <input
              value={state.client}
              onChange={(e) => patch({ client: e.target.value })}
              placeholder="Имя клиента…"
              className="w-full rounded-full border border-line bg-transparent px-5 py-2.5 font-mono text-sm outline-none transition-colors placeholder:text-muted/60 focus:border-accent md:w-72"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_400px]">
          {/* ===== Левая колонка: услуги ===== */}
          <div className="space-y-5">
            {coreCats.map((cat) => {
              const items = SERVICES.filter((s) => s.cat === cat.id);
              const open = openCats.includes(cat.id);
              const catSum = result.lines
                .filter((l) => l.service.cat === cat.id)
                .reduce((a, l) => a + l.sum, 0);
              const withBase = cat.id === "pres" ? catSum + result.presBaseSum : catSum;

              return (
                <section key={cat.id} className="overflow-hidden border border-line bg-bg2/50">
                  <button
                    onClick={() => toggleCat(cat.id)}
                    className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left transition-colors hover:bg-card/60 md:px-6"
                  >
                    <div className="flex items-baseline gap-3">
                      <span className="font-display text-xl font-bold uppercase tracking-tight md:text-2xl">
                        {cat.title}
                      </span>
                      <span className="hidden font-mono text-[11px] text-muted sm:block">{cat.desc}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      {withBase > 0 && (
                        <span className="font-mono text-sm font-bold text-accent">{fmtMoney(withBase, state.market)}</span>
                      )}
                      <ChevronDown
                        size={18}
                        className={`text-muted transition-transform duration-400 ${open ? "rotate-180" : ""}`}
                      />
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden border-t border-line"
                      >
                        {items.map((s) => (
                          <ServiceRow
                            key={s.id}
                            service={s}
                            market={state.market}
                            value={state.qty[s.id] ?? 0}
                            onChange={(v) => setQty(s.id, v)}
                            links={
                              s.id === "V1" || s.id === "V2"
                                ? {
                                    scriptOn: scriptLink === s.id,
                                    voiceOn: voiceLink === s.id,
                                    onScript: () => toggleLink("V3", s.id as "V1" | "V2"),
                                    onVoice: () => toggleLink("V4", s.id as "V1" | "V2"),
                                  }
                                : undefined
                            }
                          />
                        ))}
                        {cat.id === "pres" && (
                          <div className="flex items-center justify-between bg-card/70 px-4 py-3 md:px-6">
                            <div>
                              <span className="font-mono text-[10px] text-accent">P0</span>
                              <span className="ml-2.5 text-sm font-medium">{PRES_BASE.name}</span>
                              <p className="mt-0.5 text-xs text-muted">
                                Концепция, стиль и мастер-шаблон — один раз на расчёт, если есть слайды
                              </p>
                            </div>
                            <span className={`font-mono text-sm ${result.presBaseSum > 0 ? "font-bold text-accent" : "text-muted/50"}`}>
                              {result.presBaseSum > 0 ? fmtMoney(result.presBaseSum, state.market) : "—"}
                            </span>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </section>
              );
            })}

            {/* ===== Расширенный спектр ===== */}
            <section className="overflow-hidden border border-dashed border-line">
              <button
                onClick={() => setExtrasOpen((v) => !v)}
                className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left md:px-6"
              >
                <div className="flex items-baseline gap-3">
                  <span className="font-display text-xl font-bold uppercase tracking-tight md:text-2xl">
                    Расширенный спектр
                  </span>
                  <span className="hidden font-mono text-[11px] text-muted sm:block">
                    20 позиций · цены-черновик, требуют подтверждения
                  </span>
                </div>
                <ChevronDown
                  size={18}
                  className={`text-muted transition-transform duration-400 ${extrasOpen ? "rotate-180" : ""}`}
                />
              </button>
              <AnimatePresence initial={false}>
                {extrasOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden border-t border-line"
                  >
                    {extras.map((s) => (
                      <ServiceRow
                        key={s.id}
                        service={s}
                        market={state.market}
                        value={state.qty[s.id] ?? 0}
                        onChange={(v) => setQty(s.id, v)}
                      />
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </section>

            {/* ===== Права (US/EU) ===== */}
            {state.market !== "RU" && (
              <motion.section
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="border border-line bg-bg2/50 p-4 md:p-6"
              >
                <div className="mb-1 flex items-center justify-between">
                  <h2 className="font-display text-xl font-bold uppercase tracking-tight md:text-2xl">
                    Права на использование
                  </h2>
                  <span className="font-mono text-[11px] uppercase tracking-wide text-muted">
                    только {state.market}
                  </span>
                </div>
                <p className="mb-4 text-xs text-muted">
                  Рынок США добавляет +30–50% к счёту за платное размещение. Для RU права передаются полностью — блок скрыт.
                </p>
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {LICENSES.map((l, i) => (
                    <button
                      key={l.label}
                      onClick={() => patch({ license: i })}
                      className={`rounded-lg border px-4 py-3 text-left transition-all duration-300 ${
                        state.license === i
                          ? "border-accent bg-accent/10"
                          : "border-line hover:border-ink/40"
                      }`}
                    >
                      <div className="flex items-center justify-between gap-3">
                        <span className="text-sm font-medium">{l.label}</span>
                        <span className={`font-mono text-xs font-bold ${i === 0 ? "text-muted" : "text-accent"}`}>
                          {l.rate === 0 ? "0%" : `+${Math.round(l.rate * 100)}%`}
                        </span>
                      </div>
                      <div className="mt-1 text-[11px] text-muted">{l.note}</div>
                    </button>
                  ))}
                </div>
              </motion.section>
            )}

            {/* ===== Срочность ===== */}
            <section className="border border-line bg-bg2/50 p-4 md:p-6">
              <h2 className="mb-4 font-display text-xl font-bold uppercase tracking-tight md:text-2xl">
                Срочность
              </h2>
              <div className="grid grid-cols-2 gap-2 lg:grid-cols-4">
                {URGENCIES.map((u, i) => {
                  const rate = u.rates[state.market];
                  return (
                    <button
                      key={u.label}
                      onClick={() => patch({ urgency: i })}
                      className={`rounded-lg border px-4 py-3.5 text-left transition-all duration-300 ${
                        state.urgency === i ? "border-accent bg-accent/10" : "border-line hover:border-ink/40"
                      }`}
                    >
                      <div className="flex items-baseline justify-between gap-2">
                        <span className="text-sm font-bold">{u.label}</span>
                        <span className={`font-mono text-xs font-bold ${rate === 0 ? "text-muted" : "text-accent"}`}>
                          {rate === 0 ? "0%" : `+${Math.round(rate * 100)}%`}
                        </span>
                      </div>
                      <div className="mt-1 font-mono text-[10px] uppercase tracking-wide text-muted">{u.deadline}</div>
                    </button>
                  );
                })}
              </div>
            </section>
          </div>

          {/* ===== Итоговая панель ===== */}
          <aside id="summary-panel" className="scroll-mt-28 lg:sticky lg:top-24 lg:self-start">
            <div className="border border-line bg-surface">
              <div className="flex items-center justify-between border-b border-line px-5 py-4">
                <span className="font-display text-sm font-bold uppercase tracking-wide">Смета</span>
                <span className="font-mono text-[11px] text-muted">
                  {state.client.trim() || "клиент не указан"} · {state.market}
                </span>
              </div>

              <div className="max-h-64 overflow-y-auto px-5 py-4">
                {result.lines.length === 0 && result.presBaseSum === 0 ? (
                  <p className="py-4 text-center font-mono text-xs leading-relaxed text-muted">
                    Выбери услуги слева —
                    <br />
                    итог посчитается сам
                  </p>
                ) : (
                  <ul className="space-y-2">
                    {result.lines.map((l) => (
                      <li key={l.service.id} className="flex items-baseline justify-between gap-3 text-sm">
                        <span className="min-w-0 truncate text-muted">
                          <span className="mr-1.5 font-mono text-[10px] text-accent">{l.service.code}</span>
                          {l.service.name} × {fmtQty(l.qty)}
                        </span>
                        <span className="shrink-0 font-mono text-xs font-medium">{fmtMoney(l.sum, state.market)}</span>
                      </li>
                    ))}
                    {result.presBaseSum > 0 && (
                      <li className="flex items-baseline justify-between gap-3 text-sm">
                        <span className="text-muted">
                          <span className="mr-1.5 font-mono text-[10px] text-accent">P0</span>
                          База презентации
                        </span>
                        <span className="shrink-0 font-mono text-xs font-medium">
                          {fmtMoney(result.presBaseSum, state.market)}
                        </span>
                      </li>
                    )}
                  </ul>
                )}
              </div>

              <div className="space-y-1.5 border-t border-line px-5 py-4 font-mono text-xs">
                <div className="flex justify-between text-muted">
                  <span>Сумма позиций</span>
                  <span>{fmtMoney(result.subtotal, state.market)}</span>
                </div>
                {result.rightsFee > 0 && (
                  <div className="flex justify-between text-muted">
                    <span>Права +{Math.round(result.rightsRate * 100)}%</span>
                    <span>{fmtMoney(result.rightsFee, state.market)}</span>
                  </div>
                )}
                {result.urgencyFee > 0 && (
                  <div className="flex justify-between text-muted">
                    <span>
                      Срочность «{URGENCIES[state.urgency].label}» +{Math.round(result.urgencyRate * 100)}%
                    </span>
                    <span>{fmtMoney(result.urgencyFee, state.market)}</span>
                  </div>
                )}
              </div>

              <div className="border-t border-line px-5 py-5">
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">Итого</div>
                <motion.div
                  key={result.total}
                  initial={{ scale: 0.96, opacity: 0.6 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 24 }}
                  className="mt-1 font-display text-4xl font-black tracking-tight text-accent md:text-5xl"
                >
                  {fmtMoney(result.total, state.market)}
                </motion.div>
                {state.market !== "RU" && result.total > 0 && (
                  <div className="mt-1.5 font-mono text-xs text-muted">
                    ≈ {fmtRub(result.totalRub)} · курс ЦБ{rates.source === "fallback" ? ` (резерв, ${rates.date})` : ""}
                  </div>
                )}
                {result.seqDays > 0 && (
                  <div className="mt-3 flex items-center gap-2 font-mono text-xs text-muted">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent2" />
                    Срок: {pluralDays(result.seqDays)} последовательно · {pluralDays(result.parDays)} параллельно
                  </div>
                )}

                {result.warning && (
                  <div className="mt-4 flex gap-2.5 rounded-lg border border-warn/50 bg-warn/10 p-3 text-xs leading-snug text-warn">
                    <AlertTriangle size={15} className="mt-0.5 shrink-0" />
                    {result.warning}
                  </div>
                )}

                {result.medianRuTotal > 0 && result.hasItems && (
                  <div className="mt-4 rounded-lg border border-accent2/40 bg-accent2/10 p-3.5">
                    <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-accent2">
                      Рыночный ориентир
                    </div>
                    <p className="mt-1.5 text-xs leading-snug text-muted">
                      По медиане рынка РФ этот заказ стоил бы{" "}
                      <span className="font-mono font-bold text-ink">{fmtRub(result.medianRuTotal)}</span>
                      {result.savingPct !== null && (
                        <>
                          {" "}
                          — у нас <span className="font-bold text-accent">ниже на {result.savingPct}%</span>
                        </>
                      )}
                      . Аргумент в переговорах.
                    </p>
                  </div>
                )}

                <div className="mt-4 rounded-lg border border-line p-3.5">
                  <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted">Налоги</div>
                  <p className="mt-1.5 text-xs leading-snug text-muted">{TAX_NOTES[state.market]}</p>
                  {state.market === "RU" && result.total > 0 && (
                    <p className="mt-1 font-mono text-[11px] text-muted">
                      На руки (× 0,94): <span className="text-ink">{fmtRub(result.total * 0.94)}</span>
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2 border-t border-line p-4">
                <button
                  onClick={save}
                  disabled={!result.hasItems}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-accent py-3.5 font-display text-xs font-bold uppercase tracking-[0.14em] text-accentink transition-all hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-35"
                >
                  {savedFlash ? <Check size={15} /> : <Save size={15} />}
                  {savedFlash ? "Сохранено" : "Сохранить в историю"}
                </button>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={copy}
                    disabled={!result.hasItems}
                    className="flex items-center justify-center gap-2 rounded-full border border-line py-3 font-mono text-[11px] uppercase tracking-[0.12em] text-muted transition-all hover:border-accent hover:text-accent disabled:cursor-not-allowed disabled:opacity-35"
                  >
                    {copied ? <Check size={13} /> : <Copy size={13} />}
                    {copied ? "Готово" : "Смета"}
                  </button>
                  <button
                    onClick={reset}
                    disabled={!result.hasItems && !state.client}
                    className="flex items-center justify-center gap-2 rounded-full border border-line py-3 font-mono text-[11px] uppercase tracking-[0.12em] text-muted transition-all hover:border-accent hover:text-accent disabled:cursor-not-allowed disabled:opacity-35"
                  >
                    <RotateCcw size={13} />
                    Сброс
                  </button>
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* ===== История ===== */}
        <section className="mt-20">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <h2 className="flex items-center gap-3 font-display text-2xl font-bold uppercase tracking-tight md:text-3xl">
              <HistoryIcon size={22} className="text-accent" />
              История расчётов
              <span className="font-mono text-sm font-normal text-muted">({history.length})</span>
            </h2>
            {history.length > 0 && (
              <button
                onClick={() => {
                  if (confirmClear) {
                    clearHistory();
                    setConfirmClear(false);
                  } else {
                    setConfirmClear(true);
                    setTimeout(() => setConfirmClear(false), 2600);
                  }
                }}
                className={`flex items-center gap-2 rounded-full border px-4 py-2 font-mono text-[11px] uppercase tracking-[0.14em] transition-all ${
                  confirmClear
                    ? "border-accent bg-accent text-accentink"
                    : "border-line text-muted hover:border-accent hover:text-accent"
                }`}
              >
                <Trash2 size={13} />
                {confirmClear ? "Точно очистить?" : "Очистить"}
              </button>
            )}
          </div>

          {history.length === 0 ? (
            <div className="border border-dashed border-line px-6 py-12 text-center">
              <p className="font-mono text-xs leading-relaxed text-muted">
                Пока пусто. Собери расчёт и нажми «Сохранить в историю» —
                <br className="hidden md:block" />
                записи живут локально в браузере, их можно открыть и пересчитать.
              </p>
            </div>
          ) : (
            <ul className="space-y-2">
              <AnimatePresence initial={false}>
                {history.map((r) => (
                  <motion.li
                    layout
                    key={r.id}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                    className="flex flex-wrap items-center gap-x-5 gap-y-2 border border-line bg-bg2/40 px-4 py-3.5 transition-colors hover:bg-bg2 md:px-5"
                  >
                    <span className="w-28 shrink-0 font-mono text-[11px] text-muted">{fmtDateTime(r.createdAt)}</span>
                    <span className="w-36 shrink-0 truncate text-sm font-medium">{r.client}</span>
                    <span className="rounded-full border border-line px-2.5 py-1 font-mono text-[10px] uppercase tracking-wide text-muted">
                      {r.market}
                    </span>
                    <span className="min-w-0 flex-1 truncate font-mono text-[11px] text-muted">{r.itemsBrief}</span>
                    <span className="ml-auto shrink-0 text-right">
                      <span className="block font-mono text-sm font-bold text-accent">
                        {fmtMoney(r.total, r.market)}
                      </span>
                      {r.market !== "RU" && (
                        <span className="block font-mono text-[10px] text-muted">≈ {fmtRub(r.totalRub)}</span>
                      )}
                    </span>
                    <span className="flex shrink-0 gap-1.5">
                      <button
                        onClick={() => useStore.getState().requestRestore(r)}
                        className="rounded-full border border-line px-3 py-1.5 font-mono text-[10px] uppercase tracking-wide text-muted transition-all hover:border-accent hover:text-accent"
                      >
                        Открыть
                      </button>
                      <button
                        onClick={() => removeRecord(r.id)}
                        aria-label="Удалить запись"
                        className="grid h-7 w-7 place-items-center self-center rounded-full border border-line text-muted transition-all hover:border-accent hover:text-accent"
                      >
                        <Trash2 size={12} />
                      </button>
                    </span>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>
          )}
        </section>
      </div>

      {/* Мобильная плашка итога */}
      <div className="fixed inset-x-0 bottom-0 z-[70] border-t border-line bg-surface/95 px-5 py-3 backdrop-blur-md lg:hidden">
        <button
          onClick={() => document.getElementById("summary-panel")?.scrollIntoView({ behavior: "smooth", block: "start" })}
          className="flex w-full items-center justify-between gap-4"
        >
          <span className="text-left">
            <span className="block font-mono text-[10px] uppercase tracking-[0.18em] text-muted">
              Итого{result.seqDays > 0 ? ` · ${result.seqDays} дн.` : ""}
            </span>
            <span className="block font-display text-xl font-black text-accent">
              {fmtMoney(result.total, state.market)}
            </span>
          </span>
          <span className="rounded-full bg-accent px-4 py-2 font-mono text-[11px] font-medium uppercase tracking-wide text-accentink">
            к смете ↑
          </span>
        </button>
      </div>

      {/* Тост восстановления */}
      <AnimatePresence>
        {restoredFlash && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 left-1/2 z-[99] -translate-x-1/2 rounded-full bg-accent px-6 py-3 font-mono text-xs font-medium uppercase tracking-[0.14em] text-accentink shadow-xl"
          >
            Расчёт восстановлен из истории
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
