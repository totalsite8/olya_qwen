import { motion } from "framer-motion";
import { MEDIA } from "../data/media";
import { PageHero, PageMarquee, VisualStrip, Process, PageCTA } from "../components/ServicePage";
import { SectionHead } from "../components/ui";

const DOM_FRAMES = [
  { src: MEDIA.domGrid, cap: "Лента и образы персонажей" },
  { src: MEDIA.domPopcorn, cap: "Сторис к эфиру" },
  { src: MEDIA.domStats, cap: "Инфографика итогов года" },
  { src: MEDIA.domCast, cap: "Карточки «Твой выбор»" },
  { src: MEDIA.domPremiere, cap: "Промо премьеры" },
  { src: MEDIA.domCta, cap: "CTA-экран" },
];

const ECO_FRAMES = [
  MEDIA.ecoAd,
  MEDIA.ecoFlowers,
  MEDIA.ecoHand,
  MEDIA.ecoDog,
  MEDIA.ecoPour,
  MEDIA.ecoApples,
  MEDIA.ecoDual,
  MEDIA.ecoFoamTile,
  MEDIA.ecoDogWash,
];

function DomashniyCase() {
  return (
    <section className="mx-auto max-w-[1600px] px-5 py-20 md:px-10 md:py-28">
      <SectionHead
        index="К"
        title={<>Кейс · телеканал<br />«Домашний»</>}
        meta="Розовая контент-система: маскоты, сторис, карточки и инфографика. Единый голос бренда в 60+ публикациях."
      />
      <div className="grid items-start gap-10 lg:grid-cols-12">
        <div className="lg:col-span-5" data-reveal>
          <p className="max-w-md text-sm leading-relaxed text-muted md:text-base">
            Маскот-кот стал ведущим всех форматов — от сторис к эфирам до инфографики итогов года
            и карточек «Твой выбор» с актёрами. Система живёт без дизайнера на связи.
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
            {DOM_FRAMES.map((f, i) => (
              <motion.figure
                key={f.src + i}
                initial={{ opacity: 0, y: 40, rotate: i % 2 ? 1.4 : -1.4 }}
                whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.7, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
                className={`group overflow-hidden rounded-xl border border-line bg-card ${i % 3 === 1 ? "sm:translate-y-6" : ""}`}
              >
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src={f.src}
                    alt={f.cap}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.07]"
                  />
                </div>
                <figcaption className="px-3 py-2.5 font-mono text-[10px] uppercase tracking-[0.12em] text-muted">{f.cap}</figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function EcozavrCase() {
  return (
    <section className="relative overflow-hidden border-y border-line">
      <img src={MEDIA.ecoBg} alt="" className="absolute inset-0 h-full w-full scale-110 object-cover opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-b from-bg via-bg/60 to-bg" />
      <div className="relative mx-auto max-w-[1600px] px-5 py-20 md:px-10 md:py-28">
        <SectionHead
          index="E"
          title={<>Кейс · Ecozavr</>}
          meta="Продуктовая вселенная эко-косметики: 12 SKU, рекламные макеты и карточки маркетплейсов. CTR карточек +23%."
        />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {ECO_FRAMES.map((f, i) => (
            <motion.div
              key={f}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.65, delay: (i % 3) * 0.07, ease: [0.16, 1, 0.3, 1] }}
              className="group overflow-hidden rounded-xl border border-line bg-bg p-2.5 shadow-lg transition-transform duration-500 hover:-translate-y-1.5"
            >
              <div className="overflow-hidden rounded-lg">
                <img
                  src={f}
                  alt="Ecozavr"
                  loading="lazy"
                  className="aspect-[4/5] w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Design() {
  return (
    <div>
      <PageHero
        kicker="Дизайн и SMM"
        title="Визуальные"
        outline="системы брендов"
        subtitle="Не отдельные посты, а управляемая система: рубрикатор, шаблоны, карточки товара. Собирается быстро, живёт долго, масштабируется без потери стиля."
        bg={MEDIA.projectsBg}
        chips={["SMM-графика", "Карточки товара", "Шаблоны Figma", "Контент-системы"]}
      />

      <DomashniyCase />

      <PageMarquee items={["Посты", "Сторис", "Баннеры", "Карточки товара", "Обложки", "Иконки", "Инфографика", "Шаблоны"]} />

      <div className="py-16 md:py-24">
        <VisualStrip images={ECO_FRAMES} />
      </div>

      <EcozavrCase />

      <Process
        steps={[
          { t: "Аудит и рубрикатор", d: "Разбор текущих соцсетей, аудитории и конкурентов. На выходе — карта рубрик и тональность.", days: "1 день" },
          { t: "Стиль и шаблоны", d: "Визуальный язык: цвета, типографика, сетки. Мастер-шаблоны Figma для всех форматов.", days: "2 дня" },
          { t: "Контент-план на месяц", d: "30 дней публикаций по рубрикам: темы, форматы, черновики текстов под визуал.", days: "1 день" },
          { t: "Продакшн пакета", d: "Отрисовка пакета: посты, сторис, карточки. Норма — 5 единиц в день, правки включены.", days: "по объёму" },
          { t: "Аналитика и итерации", d: "Смотрим метрики месяца: что зашло — масштабируем, что нет — заменяем рубрику.", days: "ежемесячно" },
        ]}
      />

      <PageCTA>Пришлите ссылку на соцсети или маркетплейс-карточку — покажу три точки роста бесплатно.</PageCTA>
    </div>
  );
}
