import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { MEDIA } from "../data/media";
import {
  PageHero,
  PageMarquee,
  MarketInsight,
  Process,
  PriceStrip,
  PageCTA,
} from "../components/ServicePage";

const DELIVERABLES = [
  {
    t: "Контент-система",
    d: "Рубрикатор, сетка форматов и шаблоны Figma: команда публикует сама, не ломая стиль.",
    tag: "от 5 ед./день",
  },
  {
    t: "Карточки товара",
    d: "E-com креативы под маркетплейсы: инфографика, УТП на первом кадре, A/B-варианты.",
    tag: "700 ₽/шт",
  },
  {
    t: "Баннеры и обложки",
    d: "Рекламные форматы всех размеров + обложки YouTube/VK с кликабельной композицией.",
    tag: "от 800 ₽",
  },
  {
    t: "Фирменные шаблоны",
    d: "Мастер-шаблоны сторис, постов и презентаций — бренд живёт без дизайнера на связи.",
    tag: "разово",
  },
  {
    t: "Дизайн-подписка",
    d: "Пакет единиц в месяц: фикс-бюджет, приоритет в очереди, отчёт по выработке.",
    tag: "25 000 ₽/мес",
  },
  {
    t: "Нейро-ускорение",
    d: "Генерации и ретушь внутри процесса: черновики за часы, а не за дни — без доплат за «ИИ».",
    tag: "в составе",
  },
];

const CASE_FRAMES = [
  { src: MEDIA.domGrid, cap: "Лента и образы персонажей" },
  { src: MEDIA.domPopcorn, cap: "Сторис к эфиру" },
  { src: MEDIA.domStats, cap: "Инфографика итогов года" },
  { src: MEDIA.domCast, cap: "Карточки «Твой выбор»" },
  { src: MEDIA.domPremiere, cap: "Промо премьеры" },
  { src: MEDIA.domCta, cap: "CTA-экран" },
];

export default function Design() {
  return (
    <div>
      <PageHero
        kicker="Дизайн и SMM"
        title="Визуальные"
        outline="системы брендов"
        subtitle="Не отдельные посты, а управляемая система: рубрикатор, шаблоны, карточки товара и подписка на дизайн-ресурс. Собирается быстро, живёт долго, масштабируется без потери стиля."
        bg={MEDIA.projectsBg}
        chips={["SMM-графика", "Карточки товара", "Шаблоны Figma", "Дизайн-подписка"]}
      />

      <PageMarquee
        items={["Посты", "Сторис", "Баннеры", "Карточки товара", "Обложки", "Иконки", "Инфографика", "Подписка"]}
      />

      <MarketInsight
        title={<>Рынок SMM-дизайна<br />в цифрах</>}
        items={[
          {
            v: "×2.4",
            k: "Рост ER на контент-системе",
            note: "Разовые посты дают ×1.2–1.5. Система с рубрикатором и узнаваемым персонажем удерживает внимание — кейс «Домашний».",
          },
          {
            v: "×2–3",
            k: "Разрыв с биржевой ценой качества",
            note: "Биржи демпингуют, студии дороги. Планка «выше среднего»: студийная логика системы по цене уверенного фриланса.",
          },
          {
            v: "70%",
            k: "Решений о покупке — на карточке",
            note: "В e-com покупают глазами: первый кадр с УТП и инфографикой решает больше, чем описание товара.",
          },
        ]}
      />

      {/* Что входит */}
      <section className="mx-auto max-w-[1600px] px-5 py-20 md:px-10 md:py-28">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4 md:mb-14">
          <div data-reveal>
            <div className="mb-3 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.22em] text-muted">
              <span className="text-accent">(D)</span>
              <span className="h-px w-10 bg-line" />
            </div>
            <h2 className="font-display text-[clamp(1.9rem,5vw,4.2rem)] font-bold uppercase leading-[0.98] tracking-tight">
              Что входит
            </h2>
          </div>
          <p data-reveal className="max-w-xs pb-2 font-mono text-xs leading-relaxed text-muted">
            Шесть форматов — по одному или в связке. Подписка собирает их в конвейер.
          </p>
        </div>

        <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-2 xl:grid-cols-3">
          {DELIVERABLES.map((it, i) => (
            <motion.div
              key={it.t}
              initial={{ opacity: 0, y: 34 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.65, delay: (i % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="group relative bg-bg p-7 transition-colors hover:bg-surface md:p-8"
            >
              <div className="mb-6 flex items-start justify-between">
                <span className="font-mono text-xs text-accent">{String(i + 1).padStart(2, "0")}</span>
                <span className="rounded-full border border-line px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-muted transition-colors group-hover:border-accent group-hover:text-accent">
                  {it.tag}
                </span>
              </div>
              <h3 className="font-display text-xl font-bold uppercase tracking-tight md:text-2xl">{it.t}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{it.d}</p>
              {i === 5 && (
                <span className="absolute right-5 top-5 text-accent opacity-0 transition-opacity group-hover:opacity-100">
                  <Sparkles size={16} />
                </span>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Кейс */}
      <section className="relative overflow-hidden border-y border-line">
        <img
          src={MEDIA.projectsBg}
          alt=""
          className="absolute inset-0 h-full w-full scale-110 object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-bg via-bg/60 to-bg" />
        <div className="relative mx-auto max-w-[1600px] px-5 py-20 md:px-10 md:py-28">
          <div className="grid items-start gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5" data-reveal>
              <div className="mb-3 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.22em] text-muted">
                <span className="text-accent">(Кейс)</span>
                <span className="h-px w-10 bg-line" />
              </div>
              <h2 className="font-display text-[clamp(1.9rem,4.6vw,3.8rem)] font-black uppercase leading-[0.96] tracking-tight">
                Телеканал
                <br />
                <span className="text-stroke-accent">«Домашний»</span>
              </h2>
              <p className="mt-6 max-w-md text-sm leading-relaxed text-muted md:text-base">
                Годовая digital-система телеканала: маскот-кот стал ведущим всех форматов — от сторис
                к эфирам до инфографики итогов года. Единый голос бренда в 60+ публикациях и
                карточках «Твой выбор» с актёрами.
              </p>
              <div className="mt-8 grid grid-cols-3 divide-x divide-line border-y border-line py-5">
                <div className="pr-4">
                  <div className="font-display text-2xl font-black text-accent md:text-3xl">60+</div>
                  <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">публикаций</div>
                </div>
                <div className="px-4">
                  <div className="font-display text-2xl font-black text-accent md:text-3xl">×2.4</div>
                  <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">рост ER</div>
                </div>
                <div className="pl-4">
                  <div className="font-display text-2xl font-black text-accent md:text-3xl">4</div>
                  <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">рубрики</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {CASE_FRAMES.map((f, i) => (
                  <motion.figure
                    key={f.src + i}
                    initial={{ opacity: 0, y: 40, rotate: i % 2 ? 1.4 : -1.4 }}
                    whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.7, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                    className={`group overflow-hidden rounded-xl border border-line bg-card ${
                      i % 3 === 1 ? "sm:translate-y-6" : ""
                    }`}
                  >
                    <div className="aspect-[4/5] overflow-hidden">
                      <img
                        src={f.src}
                        alt={f.cap}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.07]"
                      />
                    </div>
                    <figcaption className="px-3 py-2.5 font-mono text-[10px] uppercase tracking-[0.12em] text-muted">
                      {f.cap}
                    </figcaption>
                  </motion.figure>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Process
        steps={[
          {
            t: "Аудит и рубрикатор",
            d: "Разбор текущих соцсетей, аудитории и конкурентов. На выходе — карта рубрик и тональность.",
            days: "1 день",
          },
          {
            t: "Стиль и шаблоны",
            d: "Визуальный язык: цвета, типографика, сетки. Мастер-шаблоны Figma для всех форматов.",
            days: "2 дня",
          },
          {
            t: "Контент-план на месяц",
            d: "30 дней публикаций по рубрикам: темы, форматы, черновики текстов под визуал.",
            days: "1 день",
          },
          {
            t: "Продакшн пакета",
            d: "Отрисовка пакета: посты, сторис, карточки. Норма — 5 единиц в день, правки включены.",
            days: "по объёму",
          },
          {
            t: "Аналитика и итерации",
            d: "Смотрим метрики месяца: что зашло — масштабируем, что нет — заменяем рубрику.",
            days: "ежемесячно",
          },
        ]}
      />

      <PriceStrip
        ids={["D1", "D2", "D3", "D4", "D5", "D6", "X17", "X18", "X01"]}
        note="Базовые единицы дизайна по трём рынкам. Дизайн-подписка (X01) собирает их в ежемесячный пакет с приоритетом."
      />

      <PageCTA>
        Пришлите ссылку на соцсети или маркетплейс-карточку — покажу три точки роста бесплатно.
      </PageCTA>
    </div>
  );
}
