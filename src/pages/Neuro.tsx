import { ShieldCheck } from "lucide-react";
import { MEDIA } from "../data/media";
import { PageHero, PageMarquee, VisualStrip, Process, PageCTA } from "../components/ServicePage";
import { SectionHead, FadeIn } from "../components/ui";

/* Все кадры — реальные работы из архива */
const SHOWCASE = [
  {
    img: MEDIA.alfaCatFull,
    t: "Консистентный персонаж",
    d: "один герой · 10+ ракурсов и эмоций · кейс «Альфы»",
    tag: "нейро-база + ручная доработка",
  },
  {
    img: MEDIA.domLaptop,
    t: "Цифровые герои",
    d: "маскоты для SMM-систем, эфиров и стикерпаков",
    tag: "персонажи · канал «Домашний»",
  },
  {
    img: MEDIA.ecoFlowers,
    t: "Продукт без студии",
    d: "сцены для Ecozavr: лайфстайл, натюрморты, e-com",
    tag: "генерация + арт-дирекшн",
  },
  {
    img: MEDIA.projectsBg,
    t: "Абстрактные миры",
    d: "фоновый арт и текстуры под айдентику бренда",
    tag: "стиль-трансфер · апскейл 4K",
  },
];

function Showcase() {
  return (
    <section className="mx-auto max-w-[1600px] px-5 py-20 md:px-10 md:py-28">
      <SectionHead
        index="G"
        title={<>Что выходит<br />из пайплайна</>}
        meta="Не «картинка из нейросети», а деливерабл: отобранный, доработанный вручную, поднятый до 4K и посаженный в формат."
      />
      <div className="grid gap-5 md:grid-cols-2">
        {SHOWCASE.map((s, i) => (
          <FadeIn key={s.t} delay={(i % 2) * 0.1}>
            <div className="group relative overflow-hidden rounded-2xl border border-line bg-card">
              <img
                src={s.img}
                alt={s.t}
                loading="lazy"
                className="aspect-[4/3] w-full object-cover transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.05]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-bg/90 via-bg/20 to-transparent" />
              <span className="absolute left-4 top-4 rounded-full border border-line bg-bg/70 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] backdrop-blur-sm">
                {s.tag}
              </span>
              <div className="absolute inset-x-0 bottom-0 p-6">
                <h3 className="font-display text-2xl font-bold uppercase tracking-tight">{s.t}</h3>
                <p className="mt-1 font-mono text-[11px] uppercase tracking-wide text-muted">{s.d}</p>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

export default function Neuro() {
  return (
    <div>
      <PageHero
        kicker="Нейрогенерации"
        title="AI с руками"
        outline="дизайнера"
        subtitle="Генерации — это 10% работы. Остальные 90% — референсы, промпт-инжиниринг, отбор из сотен вариантов и ручная доработка до брендового результата."
        bg={MEDIA.heroBg}
        chips={["Midjourney · Runway · Kling", "HeyGen · ElevenLabs", "LoRA под ваш стиль", "Апскейл до 4K"]}
      />

      <Showcase />

      <PageMarquee items={["Изображения", "Оживление кадров", "5-сек клипы", "Аватары", "Клон голоса", "LoRA", "Персонажи", "Апскейл 4K"]} />

      <div className="py-16 md:py-24">
        <VisualStrip
          images={[
            MEDIA.ecoAd,
            MEDIA.alfaMascotsHero,
            MEDIA.ecoDogWash,
            MEDIA.domGrid,
            MEDIA.ecoApples,
            MEDIA.heroCardEco,
            MEDIA.ecoFoamTile,
            MEDIA.domTrophy,
          ]}
        />
      </div>

      <Process
        steps={[
          { t: "Референсы и мудборд", d: "Собираем визуальный мир: свет, текстуры, референсы бренда. Утверждаем направление до генераций.", days: "день 1" },
          { t: "Промпт-инжиниринг", d: "Пишем и тестируем промпты: 100+ вариантов на ключевой кадр. Фиксируем рабочие формулы для серии.", days: "дни 1–2" },
          { t: "Генерация и отбор", d: "Прогоняем серию, отбираем 3–5 финалистов на кадр. Показываем подборку с комментариями.", days: "дни 2–3" },
          { t: "Ручная доработка", d: "Фотошоп-чистка: руки, артефакты, логотипы, консистентность света. Здесь AI-кадр становится брендовым.", days: "дни 3–4" },
          { t: "Апскейл и форматы", d: "Поднимаем до 4K, сажаем в форматы: лента, сторис, печать, маркетплейсы. Исходники и промпты — ваши.", days: "день 5" },
        ]}
      />

      <section className="mx-auto max-w-[1600px] px-5 pb-20 md:px-10 md:pb-28">
        <div className="flex flex-col items-start gap-6 rounded-2xl border border-line bg-surface/60 p-8 md:flex-row md:items-center md:p-10">
          <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-accent/15 text-accent">
            <ShieldCheck size={24} />
          </span>
          <div>
            <h3 className="font-display text-xl font-bold uppercase tracking-tight md:text-2xl">Этика и права</h3>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted">
              Не генерируем фейковые отзывы, дипфейки реальных людей без согласия и «чужие бренды под ключ». В портфолио-кейсах всегда указана доля AI и ручной работы.
            </p>
          </div>
        </div>
      </section>

      <PageCTA>Пришлите референс или задачу — за день соберём тестовую генерацию в вашем стиле.</PageCTA>
    </div>
  );
}
