import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { LayoutGrid, Repeat, TrendingUp } from "lucide-react";
import { MEDIA } from "../data/media";
import { PageHero, PageMarquee, MarketInsight, Process, PriceStrip, PageCTA } from "../components/ServicePage";
import { SectionHead, FadeIn, Marquee } from "../components/ui";

/* Разбросанные «открытки» Домашнего */
function DomashniyScatter() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const r1 = useTransform(scrollYProgress, [0, 1], [-6, 3]);
  const r2 = useTransform(scrollYProgress, [0, 1], [5, -4]);

  const cards = [
    { img: MEDIA.domGifts, r: r1, cls: "md:col-span-2", rot: "-rotate-2" },
    { img: MEDIA.domPopcorn, r: r2, cls: "", rot: "rotate-2" },
    { img: MEDIA.domStats, r: r2, cls: "", rot: "-rotate-1" },
    { img: MEDIA.domTrophy, r: r1, cls: "", rot: "rotate-1" },
    { img: MEDIA.domCast, r: r1, cls: "md:col-span-2", rot: "rotate-2" },
    { img: MEDIA.domCouch, r: r2, cls: "", rot: "-rotate-2" },
  ];

  return (
    <section ref={ref} className="mx-auto max-w-[1600px] px-5 py-20 md:px-10 md:py-28">
      <SectionHead
        index="К"
        title={<>Кейс · телеканал<br />«Домашний»</>}
        meta="Розовая контент-система: маскоты, сторис, карточкиcast и инфографика итогов года. ER аккаунта +41% за полгода."
      />
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
        {cards.map((c, i) => (
          <motion.div
            key={c.img}
            style={{ rotate: c.r }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: (i % 3) * 0.09, ease: [0.16, 1, 0.3, 1] }}
            className={`${c.cls} ${c.rot} group overflow-hidden rounded-xl border border-line bg-card shadow-xl transition-transform duration-500 hover:rotate-0 hover:scale-[1.03]`}
          >
            <img src={c.img} alt="Телеканал «Домашний»" loading="lazy" className="aspect-[3/4] w-full object-cover" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function EcozavrFrames() {
  const frames = [MEDIA.ecoAd, MEDIA.ecoFlowers, MEDIA.ecoHand, MEDIA.ecoDog, MEDIA.ecoPour, MEDIA.ecoApples];
  return (
    <section className="relative overflow-hidden border-y border-line bg-surface/50 py-20 md:py-28">
      <div className="absolute inset-0 opacity-[0.16]">
        <img src={MEDIA.ecoBg} alt="" className="h-full w-full object-cover" />
      </div>
      <div className="relative mx-auto max-w-[1600px] px-5 md:px-10">
        <SectionHead
          index="E"
          title={<>Кейс · Ecozavr</>}
          meta="Продуктовая вселенная эко-косметики: 12 SKU, 60+ кадров, рекламные макеты и карточки маркетплейсов. CTR карточек +23%."
        />
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6">
          {frames.map((f, i) => (
            <FadeIn key={f} delay={(i % 3) * 0.08}>
              <div className="group overflow-hidden rounded-xl border border-line bg-bg p-3 shadow-lg transition-transform duration-500 hover:-translate-y-1.5">
                <div className="overflow-hidden rounded-lg">
                  <img src={f} alt="Ecozavr" loading="lazy" className="aspect-[4/5] w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.06]" />
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

const SERVICES = [
  { t: "Посты для соцсетей", d: "Креативы под рубрики: анонсы, акции, вовлечение. 5 единиц в день по норме.", p: "600 ₽ / $25 / €18" },
  { t: "Баннеры", d: "Web и наружка: статичные и анимированные, все размеры из медиаплана.", p: "800 ₽ / $35 / €25" },
  { t: "Обложки и превью", d: "YouTube, VK, Дзен: кликабельные превью с единой системой.", p: "от 900 ₽ / $45 / €33" },
  { t: "Сторис", d: "Серии сторис с механиками: опросы, квизы, swipe-up.", p: "500 ₽ / $20 / €15" },
  { t: "Иконки и графика", d: "Наборы иконок, стикеры, элементы интерфейса.", p: "400 ₽ / $15 / €10" },
  { t: "Карточки товара", d: "E-com: инфографика, преимущества, rich-контент для Ozon/WB/Amazon.", p: "700 ₽ / $30 / €22" },
  { t: "Дизайн-подписка", d: "Пакет единиц в месяц по фиксу: приоритет, единый стиль, отчётность.", p: "25 000 ₽ / $1 200 / €900" },
  { t: "Смена / день", d: "Дизайнер на день: созвон утром, результат вечером. Норма EU-рынка.", p: "20 000 ₽ / $1 000 / €700" },
];

export default function Design() {
  return (
    <div>
      <PageHero
        kicker="Дизайн и SMM"
        title="Графика, которая"
        outline="работает каждый день"
        subtitle="Посты, баннеры, сторис, карточки товара и целые контент-системы с шаблонами. Не разовые креативы, а конвейер в вашем стиле: от 5 единиц в день, три рынка — RU · US · EU."
        bg={MEDIA.ecoBg}
        chips={["Контент-системы", "E-com карточки", "Баннеры и наружка", "Шаблоны для команды", "Подписка и день-ставки"]}
      />

      <DomashniyScatter />
      <EcozavrFrames />

      <div className="border-y border-line bg-surface/50 py-5">
        <Marquee duration={30} reverse>
          {["Посты", "Баннеры", "Сторис", "Обложки", "Иконки", "Карточки товара", "Инфографика", "Шаблоны"].map((t) => (
            <span key={t} className="flex items-center">
              <span className="px-6 font-display text-xl font-bold uppercase tracking-tight md:text-2xl">{t}</span>
              <span className="text-accent">✷</span>
            </span>
          ))}
        </Marquee>
      </div>

      <MarketInsight
        title={<>Рынок графического<br />дизайна</>}
        items={[
          { v: "$10–60", k: "креатив у фрилансера США", note: "Наш пост $25 и баннер $35 — середина вилки при скорости конвейера и бренд-консистентности, за которую обычно доплачивают агентствам." },
          { v: "×2.1", k: "рост ER на системном контенте", note: "Кейс «Домашнего»: единая система маскотов и рубрик удвоила вовлечённость. Разовые креативы такого не дают — поэтому продаём системы." },
          { v: "+23%", k: "CTR карточек после редизайна", note: "Ecozavr на маркетплейсах: инфографика преимуществ и лайфстайл-кадры вместо студийного белого фона. E-com — самый быстрый ROI в дизайне." },
          { v: "5/день", k: "норма выработки на единицы", note: "Прозрачная скорость: посты, баннеры, сторис, иконки — 5 единиц в день. Слайды — 10, статичные нейро-изображения — 20." },
          { v: "₽25K", k: "месяц дизайн-подписки", note: "Модель ретейнера: пакет единиц за фикс, приоритет в очереди, отчёт в конце месяца. Дешевле штатного дизайнера в 3 раза." },
          { v: "300–450 €", k: "день фрилансера в ЕС", note: "Европа покупает дизайнера днями, а не задачами. Позиция «смена/день» — наш формат для EU-клиентов: €700/день." },
        ]}
      />

      <section className="mx-auto max-w-[1600px] px-5 py-20 md:px-10 md:py-28">
        <SectionHead index="S" title={<>Услуги и цены<br />по трём рынкам</>} meta="Цены за единицу: RU ₽ · US $ · EU €. Линейно, без скидок за объём — зато 3 круга правок и исходники уже внутри." />
        <div className="grid gap-px overflow-hidden rounded-2xl border border-line bg-line md:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((s, i) => (
            <motion.div
              key={s.t}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: (i % 4) * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="group flex flex-col bg-bg p-6 transition-colors hover:bg-surface"
            >
              <LayoutGrid size={18} className="text-accent transition-transform duration-300 group-hover:rotate-6" />
              <h3 className="mt-4 font-display text-base font-bold uppercase leading-tight tracking-tight">{s.t}</h3>
              <p className="mt-2 flex-1 text-[13px] leading-relaxed text-muted">{s.d}</p>
              <div className="mt-4 font-mono text-[11px] text-accent">{s.p}</div>
            </motion.div>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap items-center gap-3 text-muted">
          <Repeat size={15} className="text-accent" />
          <span className="font-mono text-[11px] uppercase tracking-wide">подписка X1 и день-ставка X20 — для регулярных задач</span>
          <TrendingUp size={15} className="ml-4 text-accent" />
          <span className="font-mono text-[11px] uppercase tracking-wide">e-com: карточка + инфографика — самый быстрый ROI</span>
        </div>
      </section>

      <Process
        steps={[
          { t: "Аудит ленты и бренда", d: "Смотрим соцсети, конкурентов, айдентику. Фиксируем, что работает, а что — визуальный шум.", days: "день 1" },
          { t: "Система и шаблоны", d: "Рубрикатор, сетки, типографика, палитра. Figma-шаблоны, чтобы команда могла собирать сама.", days: "дни 2–4" },
          { t: "Первая партия", d: "15–20 единиц в системе: посты, сторис, обложки. Утверждаем тон и плотность.", days: "дни 5–8" },
          { t: "Конвейер", d: "Производство по контент-плану: 5 единиц в день, еженедельная выгрузка, единый стиль.", days: "далее" },
          { t: "Аналитика и итерации", d: "Раз в месяц: что зашло по ER и CTR, какие рубрики усиливаем, какие шаблоны дорабатываем.", days: "ежемесячно" },
        ]}
      />

      <PriceStrip
        ids={["D1", "D2", "D3", "D4", "D5", "D6", "X17", "X18", "X1", "X20"]}
        note="Единицы считаются линейно: 10 постов = 10 × цена поста. Точную смету под рынок, срочность и права соберёт калькулятор."
      />

      <PageCTA>Покажите вашу ленту — бесплатно разберём 3 точки роста и посчитаем систему под ваш темп публикаций.</PageCTA>
    </div>
  );
}
