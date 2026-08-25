import type { Market } from "../data/services";

const nf = new Intl.NumberFormat("ru-RU", { maximumFractionDigits: 0 });
const nfQty = new Intl.NumberFormat("ru-RU", { maximumFractionDigits: 1 });

export function fmtMoney(value: number, market: Market): string {
  const v = nf.format(Math.round(value));
  if (market === "RU") return `${v} ₽`;
  if (market === "US") return `$ ${v}`;
  return `${v} €`;
}

export function fmtRub(value: number): string {
  return `${nf.format(Math.round(value))} ₽`;
}

export function fmtQty(value: number): string {
  return nfQty.format(value);
}

export function fmtUnitPrice(value: number, market: Market): string {
  return fmtMoney(value, market);
}

export function pluralDays(n: number): string {
  const abs = Math.abs(n) % 100;
  const d = abs % 10;
  if (abs > 10 && abs < 20) return `${n} дней`;
  if (d === 1) return `${n} день`;
  if (d >= 2 && d <= 4) return `${n} дня`;
  return `${n} дней`;
}

export function fmtDateTime(ts: number): string {
  return new Date(ts).toLocaleString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}
