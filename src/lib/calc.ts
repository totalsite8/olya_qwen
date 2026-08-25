import { PRES_BASE, SERVICE_BY_ID, type Market, type Service } from "../data/services";

export interface CalcState {
  qty: Record<string, number>;
  urgency: number; // индекс URGENCIES
  license: number; // индекс LICENSES
  market: Market;
  client: string;
}

export interface LineItem {
  service: Service;
  qty: number;
  sum: number;
}

export interface CalcResult {
  lines: LineItem[];
  presBaseSum: number; // 0, если слайдов нет
  subtotal: number;
  rightsRate: number;
  rightsFee: number;
  urgencyRate: number;
  urgencyFee: number;
  total: number;
  totalRub: number;
  seqDays: number;
  parDays: number;
  medianRuTotal: number; // медиана рынка РФ с той же срочностью
  savingPct: number | null;
  warning: string | null;
  hasItems: boolean;
}

export interface UrgencyLevel {
  label: string;
  deadline: string;
  rates: Record<Market, number>;
  dayLimit: number | null;
}

export const URGENCIES: UrgencyLevel[] = [
  { label: "Стандарт", deadline: "обычный срок", rates: { RU: 0, US: 0, EU: 0 }, dayLimit: null },
  { label: "Быстро", deadline: "≤ 3 рабочих дней", rates: { RU: 0.2, US: 0.25, EU: 0.25 }, dayLimit: 3 },
  { label: "Срочно", deadline: "≤ 24 часов", rates: { RU: 0.5, US: 0.5, EU: 0.5 }, dayLimit: 1 },
  { label: "Горящий", deadline: "сегодня / в ночь", rates: { RU: 1, US: 1, EU: 1 }, dayLimit: 0.5 },
];

export interface LicenseLevel {
  label: string;
  note: string;
  rate: number;
}

export const LICENSES: LicenseLevel[] = [
  { label: "Внутреннее использование", note: "без публикации вовне", rate: 0 },
  { label: "Коммерция без платного трафика", note: "сайт, рассылки, соцсети без рекламы", rate: 0.15 },
  { label: "Платная реклама, 90 дней", note: "Meta / TikTok / Google Ads", rate: 0.3 },
  { label: "Платная реклама, бессрочно", note: "полные права на платное размещение", rate: 0.5 },
];

export const TAX_NOTES: Record<Market, string> = {
  RU: "НДС не облагается — самозанятость, налог 6%.",
  US: "Налог не начисляется: иностранный исполнитель, у клиента — форма W-8BEN.",
  EU: "Цены нетто. НДС не включён: применимая ставка 19–25,5% по стране клиента (по умолчанию 21%).",
};

export function computeCalc(state: CalcState, rates: { usd: number; eur: number }): CalcResult {
  const { qty, market } = state;
  const lines: LineItem[] = [];

  for (const [id, q] of Object.entries(qty)) {
    if (!q || q <= 0) continue;
    const service = SERVICE_BY_ID[id];
    if (!service) continue;
    lines.push({ service, qty: q, sum: q * service.prices[market] });
  }
  lines.sort((a, b) => a.service.id.localeCompare(b.service.id));

  // База презентации — один раз, если есть слайды P1–P3
  const hasSlides = ["P1", "P2", "P3"].some((id) => (qty[id] ?? 0) > 0);
  const presBaseSum = hasSlides ? PRES_BASE.prices[market] : 0;

  const itemsSum = lines.reduce((acc, l) => acc + l.sum, 0);
  const subtotal = itemsSum + presBaseSum;

  // Права — только US/EU
  const rightsRate = market === "RU" ? 0 : LICENSES[state.license]?.rate ?? 0;
  const rightsFee = subtotal * rightsRate;

  const urgencyRate = URGENCIES[state.urgency]?.rates[market] ?? 0;
  const urgencyFee = (subtotal + rightsFee) * urgencyRate;

  const total = Math.round(subtotal + rightsFee + urgencyFee);
  const totalRub = market === "RU" ? total : Math.round(total * (market === "US" ? rates.usd : rates.eur));

  // Сроки: Дни = Σ ⌈qty × днейНаЕдиницу⌉
  let seqSum = 0;
  let parMax = 0;
  for (const l of lines) {
    if (l.service.noDays) continue;
    const d = Math.ceil(l.qty * l.service.daysPerUnit);
    seqSum += d;
    parMax = Math.max(parMax, d);
  }
  if (hasSlides) {
    seqSum += PRES_BASE.days;
    parMax = Math.max(parMax, PRES_BASE.days);
  }
  const seqDays = seqSum > 0 ? Math.max(1, seqSum) : 0;
  const parDays = parMax > 0 ? Math.max(1, parMax) : 0;

  // Медиана рынка РФ (с той же срочностью) — аргумент в переговорах
  let medianBase = hasSlides ? PRES_BASE.medianRu : 0;
  for (const l of lines) {
    if (l.service.medianRu) medianBase += l.qty * l.service.medianRu;
  }
  const medianRuTotal = Math.round(medianBase * (1 + urgencyRate));
  const savingPct =
    medianRuTotal > 0 && totalRub > 0 && medianRuTotal > totalRub
      ? Math.round((1 - totalRub / medianRuTotal) * 100)
      : null;

  // Срочность противоречит сроку
  const urg = URGENCIES[state.urgency];
  let warning: string | null = null;
  if (urg && urg.dayLimit !== null && seqDays > 0 && seqDays > urg.dayLimit) {
    warning = `Тариф «${urg.label}» обещает ${urg.deadline}, а расчётный срок — ${seqDays} дн. последовательно. Предупреди клиента или урежь состав.`;
  }

  return {
    lines,
    presBaseSum,
    subtotal,
    rightsRate,
    rightsFee,
    urgencyRate,
    urgencyFee,
    total,
    totalRub,
    seqDays,
    parDays,
    medianRuTotal,
    savingPct,
    warning,
    hasItems: lines.length > 0,
  };
}
