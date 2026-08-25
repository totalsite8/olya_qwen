/**
 * Все медиа — из папки upload репозитория (экспорт Figma-макета + ролик).
 * Подключены через raw.githubusercontent, поэтому работают и в dev, и на Vercel.
 * Если переложить upload/ в public/, достаточно поменять MEDIA_BASE на "/upload".
 */
const GH = "https://raw.githubusercontent.com/totalsite8/olya_qwen/main/upload";
const FX = `${GH}/figma_export/assets`;

export const MEDIA_BASE = GH;

export const MEDIA = {
  /* Видео */
  showreel: `${GH}/0824.mp4`,
  videoPoster: "https://image.qwenlm.ai/generated-images/3ae05ff6-8f87-4630-bf92-7798e2a1abe0/_result.png",
  videoBg: "https://image.qwenlm.ai/generated-images/45a4dd78-2dde-4b3b-91b6-9de00f6cb0ad/_result.png",

  /* Общие фоны из макета */
  heroBg: `${FX}/01_hero/hero-background-abstract.webp`,
  projectsBg: `${FX}/04_ecozavr/projects-background-abstract.webp`,
  ecoBg: `${FX}/04_ecozavr/ecozavr-background-hills.webp`,
  footerBg: `${FX}/06_footer/footer-background-abstract.webp`,

  /* Hero-карточки макета */
  heroCardAlfa: `${FX}/01_hero/hero-card-alfa-mascots.webp`,
  heroCardEco: `${FX}/01_hero/hero-card-eco-soap-product.webp`,
  heroCardData: `${FX}/01_hero/hero-card-data-analytics-laptop.webp`,
  heroCardDomashniy: `${FX}/00_shared/domashniy-mascot-pink-laptop.webp`,

  /* Альфа Страхование */
  alfaMascotsHero: `${FX}/02_alfa/alfa-mascots-hero.webp`,
  alfaCatFull: `${FX}/02_alfa/alfa-cat-mascot-full-body.webp`,
  alfaCatStanding: `${FX}/02_alfa/alfa-cat-mascot-standing.webp`,
  alfaManFull: `${FX}/02_alfa/alfa-man-mascot-full-body.webp`,
  alfaBackView: `${FX}/02_alfa/alfa-man-and-cat-back-view.webp`,
  alfaPaw: `${FX}/02_alfa/alfa-cat-mascot-paw.webp`,
  alfaPair: `${FX}/02_alfa/alfa-man-and-cat-full-body.webp`,
  alfaManPortrait: `${FX}/02_alfa/alfa-man-mascot-portrait.webp`,
  alfaGuideCover: `${FX}/02_alfa/alfa-guide-pamyatka-cover.webp`,
  alfaGuideMoments: `${FX}/02_alfa/alfa-guide-key-moments.webp`,
  alfaGuideSpeech: `${FX}/02_alfa/alfa-guide-speech-rules.webp`,
  alfaGuideContract: `${FX}/02_alfa/alfa-guide-contract-nsz.webp`,
  alfaGuideLuck: `${FX}/02_alfa/alfa-guide-good-luck.webp`,

  /* Телеканал «Домашний» */
  domGifts: `${FX}/03_domashniy/domashniy-cat-mascot-pink-gifts.webp`,
  domGiftPile: `${FX}/03_domashniy/domashniy-cat-mascot-gift-pile.webp`,
  domCouch: `${FX}/03_domashniy/domashniy-cat-mascot-couch.webp`,
  domStriped: `${FX}/03_domashniy/domashniy-cat-mascot-striped-shirt.webp`,
  domTrophy: `${FX}/03_domashniy/domashniy-cat-mascot-couch-trophy.webp`,
  domLaptop: `${FX}/03_domashniy/domashniy-mascot-laptop.webp`,
  domStats: `${FX}/03_domashniy/domashniy-year-stats.webp`,
  domGrid: `${FX}/03_domashniy/domashniy-social-grid-collage.webp`,
  domCast: `${FX}/03_domashniy/domashniy-cast-collage.webp`,
  domPopcorn: `${FX}/03_domashniy/domashniy-story-popcorn-promo.webp`,
  domComment: `${FX}/03_domashniy/domashniy-social-comment-screenshot.webp`,
  domCta: `${FX}/03_domashniy/domashniy-cta-increase.webp`,
  domPremiere: `${FX}/03_domashniy/domashniy-premiere-promo.webp`,

  /* Ecozavr */
  ecoPurple: `${FX}/04_ecozavr/ecozavr-purple-soap-detail.webp`,
  ecoWhite: `${FX}/04_ecozavr/ecozavr-white-detergent-bottle.webp`,
  ecoOrange: `${FX}/04_ecozavr/ecozavr-orange-soap-bottle.webp`,
  ecoFoam: `${FX}/04_ecozavr/ecozavr-foam-pump-detail.webp`,
  ecoGreen: `${FX}/04_ecozavr/ecozavr-green-bottle.webp`,
  ecoGrid: `${FX}/04_ecozavr/ecozavr-product-grid.webp`,
  ecoHand: `${FX}/04_ecozavr/ecozavr-bottle-in-hand.webp`,
  ecoAd: `${FX}/04_ecozavr/ecozavr-ad-cover.webp`,
  ecoFlowers: `${FX}/04_ecozavr/ecozavr-yellow-bottle-flower-still-life.webp`,
  ecoDual: `${FX}/04_ecozavr/ecozavr-dual-bottles.webp`,
  ecoDog: `${FX}/04_ecozavr/ecozavr-dog-and-bottle.webp`,
  ecoFoamTile: `${FX}/04_ecozavr/ecozavr-green-bottle-foam.webp`,
  ecoPour: `${FX}/04_ecozavr/ecozavr-yellow-bottle-pour.webp`,
  ecoApples: `${FX}/04_ecozavr/ecozavr-green-bottle-apples.webp`,
  ecoSink: `${FX}/04_ecozavr/ecozavr-purple-bottle-sink.webp`,
  ecoDogWash: `${FX}/04_ecozavr/ecozavr-dog-wash.webp`,

  /* Презентационные кейсы */
  cubeCover: `${FX}/05_projects/cube-house-cover.webp`,
  cubeJapandi: `${FX}/05_projects/cube-house-japandi-style.webp`,
  cubeConcept: `${FX}/05_projects/cube-house-concept-ideas.webp`,
  cubeMarket: `${FX}/05_projects/cube-house-market-research.webp`,
  cubeClasses: `${FX}/05_projects/cube-house-masterclasses.webp`,
  cubeLogo: `${FX}/05_projects/cube-house-logo.webp`,
  burnCover: `${FX}/05_projects/professional-gaming-cover.webp`,
  burnDef: `${FX}/05_projects/professional-gaming-definition.webp`,
  burnStats: `${FX}/05_projects/professional-gaming-statistics.webp`,
  burnQuote: `${FX}/05_projects/professional-gaming-quote.webp`,
  burnMicrosoft: `${FX}/05_projects/professional-gaming-microsoft-case.webp`,
  burnPrev: `${FX}/05_projects/professional-gaming-prevention-quote.webp`,
  smCover: `${FX}/05_projects/social-media-cover.webp`,
  smNeural: `${FX}/05_projects/social-media-neural-networks-quote.webp`,
  smGoals: `${FX}/05_projects/social-media-goals-laptop.webp`,
  smGeo: `${FX}/05_projects/social-media-geographic-distribution.webp`,
  smTimeline: `${FX}/05_projects/social-media-platform-timeline.webp`,
  smAge: `${FX}/05_projects/social-media-age-segmentation.webp`,
  logCover: `${FX}/05_projects/logistics-problems-cover.webp`,
  logIntro: `${FX}/05_projects/logistics-problems-introduction.webp`,
} as const;
