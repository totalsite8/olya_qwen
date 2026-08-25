# Архив изображений Figma в WebP

> Все изображения перекодированы в WebP с качеством 92, а рендеры макета — с качеством 95. Исходные пиксельные размеры сохранены; искусственное увеличение до 4K не выполнялось, чтобы не создавать ложные детали.

Файл Figma: **Untitled11111**  
Основной фрейм: **Frame 442** (`1:67`)  
Размер полного макета: **1440.0 × 9142.0 px**  
Статистика: **77** уникальных WebP-файлов, **82** размещений в макете.

## Структура архива

```text
figma_export/
├── assets/
│   ├── 00_shared/       # повторно используемые изображения
│   ├── 01_hero/         # первый экран
│   ├── 02_alfa/         # Альфа Страхование
│   ├── 03_domashniy/    # телеканал «Домашний»
│   ├── 04_ecozavr/      # Ecozavr
│   ├── 05_projects/     # дополнительные презентационные кейсы
│   └── 06_footer/       # фон футера
├── layout/              # WebP-рендеры макета и секций
├── source/figma_file.json
├── manifest.json
└── INSTRUCTIONS.md
```

## Рендеры макета

| Файл | Назначение |
|---|---|
| `layout/00_full_layout.webp` | Весь макет целиком |
| `layout/01_hero.webp` | Первый экран |
| `layout/02_alfa.webp` | Проект «Альфа Страхование» |
| `layout/03_domashniy.webp` | Проект для телеканала «Домашний» |
| `layout/04_ecozavr.webp` | Проект Ecozavr |
| `layout/05_projects.webp` | Дополнительные проекты |
| `layout/06_footer.webp` | Футер |

## Полная карта изображений

Путь в колонке «Файл» — это готовый WebP, который можно подключать в сайт. `node-id` позволяет найти точное место изображения в Figma.

| Раздел | Смысловое имя | Файл | Описание | Узел Figma | Размер в макете | Рекомендация |
|---|---|---|---|---|---:|---|
| Первый экран / обложка | `hero-background-abstract` | `assets/01_hero/hero-background-abstract.webp` | Абстрактный чёрно-оранжевый фон с волнообразной текстурой. | `1:201` | 1448.000190260073 × 1559.999941223783 px | Фоновое изображение первого экрана. |
| Первый экран / обложка | `hero-card-alfa-mascots` | `assets/01_hero/hero-card-alfa-mascots.webp` | Мужчина и кот-маскот «Альфа» на красно-оранжевом фоне. | `I1:296;1:10` | 302.0 × 416.0 px | Карточка проекта «Альфа Страхование» на первом экране. |
| Первый экран / обложка | `hero-card-eco-soap-product` | `assets/01_hero/hero-card-eco-soap-product.webp` | Флакон экологичного мыла/средства на фиолетовом фоне. | `I1:298;1:10` | 302.0 × 416.0 px | Карточка проекта Ecozavr на первом экране. |
| Первый экран / обложка | `hero-card-data-analytics-laptop` | `assets/01_hero/hero-card-data-analytics-laptop.webp` | Ноутбук с экраном аналитики и показателем 20 процентов. | `I1:299;1:10` | 302.0 × 416.0 px | Карточка проекта с презентационным/аналитическим дизайном. |
| Первый экран / обложка | `domashniy-mascot-pink-laptop` | `assets/00_shared/domashniy-mascot-pink-laptop.webp` | Розовый персонаж-маскот с ноутбуком в стилистике телеканала «Домашний». | `I1:297;1:10` | 302.0 × 416.0 px | Обложка/иллюстрация проекта «Домашний». Используется также в карточке на первом экране. |
| Проект «Альфа Страхование» | `alfa-mascots-hero` | `assets/02_alfa/alfa-mascots-hero.webp` | Главный персонаж проекта: мужчина и кот-маскот «Альфа». | `1:205` | 539.0 × 539.0 px | Крупная иллюстрация в начале кейса «Альфа Страхование». |
| Проект «Альфа Страхование» | `alfa-cat-mascot-full-body` | `assets/02_alfa/alfa-cat-mascot-full-body.webp` | Кот-маскот в красном костюме, полный рост. | `1:219` | 226.53630736470222 × 226.53630736470222 px | Портрет персонажа в сетке иллюстраций. |
| Проект «Альфа Страхование» | `alfa-cat-mascot-standing` | `assets/02_alfa/alfa-cat-mascot-standing.webp` | Кот-маскот в красном костюме, стоит в полный рост. | `1:221` | 226.53630736470222 × 226.53630736470222 px | Портрет персонажа в сетке иллюстраций. |
| Проект «Альфа Страхование» | `alfa-man-mascot-full-body` | `assets/02_alfa/alfa-man-mascot-full-body.webp` | Мужчина-маскот в костюме, полный рост. | `1:223` | 226.53630736470222 × 226.53630736470222 px | Портрет персонажа в сетке иллюстраций. |
| Проект «Альфа Страхование» | `alfa-man-and-cat-back-view` | `assets/02_alfa/alfa-man-and-cat-back-view.webp` | Мужчина со спины рядом с котом-маскотом. | `1:225` | 226.53630736470222 × 226.53630736470222 px | Портрет персонажей в сетке иллюстраций. |
| Проект «Альфа Страхование» | `alfa-cat-mascot-paw` | `assets/02_alfa/alfa-cat-mascot-paw.webp` | Кот-маскот крупным планом, тянущий лапу к зрителю. | `1:220` | 223.62934908270836 × 223.62934908270836 px | Портрет персонажа в сетке иллюстраций. |
| Проект «Альфа Страхование» | `alfa-man-and-cat-full-body` | `assets/02_alfa/alfa-man-and-cat-full-body.webp` | Мужчина и кот-маскот рядом, полный рост. | `1:222` | 223.62934908270836 × 223.62934908270836 px | Портрет персонажей в сетке иллюстраций. |
| Проект «Альфа Страхование» | `alfa-man-mascot-portrait` | `assets/02_alfa/alfa-man-mascot-portrait.webp` | Портрет мужчины-маскота крупным планом. | `1:224` | 223.62934908270836 × 223.62934908270836 px | Портрет персонажа в сетке иллюстраций. |
| Проект «Альфа Страхование» | `alfa-guide-pamyatka-cover` | `assets/02_alfa/alfa-guide-pamyatka-cover.webp` | Красно-оранжевая обложка памятки с мужчиной и котом. | `1:308` | 244.39613342285156 × 137.47280883789062 px | Слайд/обложка памятки для проекта «Альфа». |
| Проект «Альфа Страхование» | `alfa-guide-key-moments` | `assets/02_alfa/alfa-guide-key-moments.webp` | Разворот памятки с блоком «Важные моменты». | `1:309` | 244.0703125 × 137.28955078125 px | Слайд внутренней страницы памятки. |
| Проект «Альфа Страхование» | `alfa-guide-key-moments` | `assets/02_alfa/alfa-guide-key-moments.webp` | Разворот памятки с блоком «Важные моменты». | `1:310` | 181.1521453857422 × 137.49317932128906 px | Слайд внутренней страницы памятки. |
| Проект «Альфа Страхование» | `alfa-guide-speech-rules` | `assets/02_alfa/alfa-guide-speech-rules.webp` | Разворот памятки с правилами речи: как нельзя и как правильно говорить. | `1:311` | 244.39613342285156 × 137.47280883789062 px | Слайд внутренней страницы памятки. |
| Проект «Альфа Страхование» | `alfa-guide-speech-rules` | `assets/02_alfa/alfa-guide-speech-rules.webp` | Разворот памятки с правилами речи: как нельзя и как правильно говорить. | `1:313` | 244.3599090576172 × 54.73662185668945 px | Слайд внутренней страницы памятки. |
| Проект «Альфа Страхование» | `alfa-guide-speech-rules` | `assets/02_alfa/alfa-guide-speech-rules.webp` | Разворот памятки с правилами речи: как нельзя и как правильно говорить. | `1:312` | 149.2224578857422 × 137.49317932128906 px | Слайд внутренней страницы памятки. |
| Проект «Альфа Страхование» | `alfa-guide-contract-nsz` | `assets/02_alfa/alfa-guide-contract-nsz.webp` | Разворот памятки «Как сохранить договор НСЖ». | `1:314` | 244.39613342285156 × 137.47280883789062 px | Слайд внутренней страницы памятки. |
| Проект «Альфа Страхование» | `alfa-guide-good-luck` | `assets/02_alfa/alfa-guide-good-luck.webp` | Финальный красный слайд с котом, мужчиной и пожеланием удачи. | `1:316` | 244.39613342285156 × 137.47280883789062 px | Финальный слайд памятки. |
| Проект «Альфа Страхование» | `alfa-guide-contract-nsz` | `assets/02_alfa/alfa-guide-contract-nsz.webp` | Разворот памятки «Как сохранить договор НСЖ». | `1:315` | 137.49317932128906 × 115.98950958251953 px | Слайд внутренней страницы памятки. |
| Проект для телеканала «Домашний» | `domashniy-cat-mascot-pink-gifts` | `assets/03_domashniy/domashniy-cat-mascot-pink-gifts.webp` | Белый кот-маскот среди розовых подарков и цветов. | `1:143` | 226.53630736470222 × 226.53630736470222 px | Иллюстрация для digital-материалов «Домашнего». |
| Проект для телеканала «Домашний» | `domashniy-cat-mascot-gift-pile` | `assets/03_domashniy/domashniy-cat-mascot-gift-pile.webp` | Белый кот-маскот на фоне стопки розовых подарков. | `1:145` | 226.53630736470222 × 226.53630736470222 px | Иллюстрация для digital-материалов «Домашнего». |
| Проект для телеканала «Домашний» | `domashniy-cat-mascot-couch` | `assets/03_domashniy/domashniy-cat-mascot-couch.webp` | Белый кот-маскот сидит на розовом кресле/диване. | `1:147` | 226.53630736470222 × 226.53630736470222 px | Иллюстрация для digital-материалов «Домашнего». |
| Проект для телеканала «Домашний» | `domashniy-cat-mascot-striped-shirt` | `assets/03_domashniy/domashniy-cat-mascot-striped-shirt.webp` | Белый кот-маскот в полосатой футболке на текстурном фоне. | `1:149` | 226.53630736470222 × 226.53630736470222 px | Иллюстрация для digital-материалов «Домашнего». |
| Проект для телеканала «Домашний» | `domashniy-cat-mascot-couch-trophy` | `assets/03_domashniy/domashniy-cat-mascot-couch-trophy.webp` | Белый кот-маскот на розовом диване с кубком. | `1:144` | 223.62934908270836 × 223.62934908270836 px | Иллюстрация для digital-материалов «Домашнего». |
| Проект для телеканала «Домашний» | `domashniy-mascot-pink-laptop` | `assets/00_shared/domashniy-mascot-pink-laptop.webp` | Розовый персонаж-маскот с ноутбуком. | `1:146` | 223.62934908270836 × 223.62934908270836 px | Иллюстрация для digital-материалов; этот исходник также используется в hero-карточке. |
| Проект для телеканала «Домашний» | `domashniy-mascot-laptop` | `assets/03_domashniy/domashniy-mascot-laptop.webp` | Розовый персонаж-маскот работает за ноутбуком. | `1:148` | 223.62934908270836 × 223.62934908270836 px | Иллюстрация для digital-материалов «Домашнего». |
| Проект для телеканала «Домашний» | `domashniy-year-stats` | `assets/03_domashniy/domashniy-year-stats.webp` | Розовая инфографика со статистикой и показателями канала. | `I1:136;61:64` | 302.0 × 301.0 px | Карточка/экран с итоговой статистикой. |
| Проект для телеканала «Домашний» | `domashniy-social-grid-collage` | `assets/03_domashniy/domashniy-social-grid-collage.webp` | Коллаж публикаций и образов персонажей телеканала «Домашний». | `1:140` | 302.0 × 414.0 px | Визуальный пример digital-коммуникации. |
| Проект для телеканала «Домашний» | `domashniy-cast-collage` | `assets/03_domashniy/domashniy-cast-collage.webp` | Коллаж актёров и персонажей телеканала с подписями. | `I1:137;61:64` | 302.0 × 301.0 px | Карточка/экран со стикерами и героями канала. |
| Проект для телеканала «Домашний» | `domashniy-story-popcorn-promo` | `assets/03_domashniy/domashniy-story-popcorn-promo.webp` | Вертикальная сторис с персонажем, попкорном и анонсом эфира. | `1:141` | 302.0 × 414.0 px | Пример сторис для социальных сетей. |
| Проект для телеканала «Домашний» | `domashniy-social-comment-screenshot` | `assets/03_domashniy/domashniy-social-comment-screenshot__b8c46948.webp` | Скриншот публикации/сторис с текстом и реакциями. | `I1:150;61:64` | 302.0 × 301.0 px | Пример коммуникации с аудиторией. |
| Проект для телеканала «Домашний» | `domashniy-cast-vadim` | `assets/03_domashniy/domashniy-cast-vadim.webp` | Карточка участника/актёра Вадима с анонсом события. | `1:154` | 98.1283187866211 × 184.7985382080078 px | Персонажная карточка в серии «Твой выбор». |
| Проект для телеканала «Домашний» | `domashniy-cta-increase` | `assets/03_domashniy/domashniy-cta-increase.webp` | Розовый экран с призывом «Увеличь» и иллюстрацией бантика. | `I1:138;61:64` | 302.0 × 301.0 px | Карточка с призывом к действию. |
| Проект для телеканала «Домашний» | `domashniy-premiere-promo` | `assets/03_domashniy/domashniy-premiere-promo.webp` | Розовый промо-экран с анонсом премьеры и персонажем. | `I1:139;61:64` | 302.0 × 301.0 px | Карточка/экран анонса передачи. |
| Проект для телеканала «Домашний» | `domashniy-cast-andrey` | `assets/03_domashniy/domashniy-cast-andrey.webp` | Карточка участника/актёра Андрея с анонсом события. | `1:155` | 98.02884674072266 × 184.6112060546875 px | Персонажная карточка в серии «Твой выбор». |
| Проект для телеканала «Домашний» | `domashniy-cast-leo` | `assets/03_domashniy/domashniy-cast-leo.webp` | Карточка участника/актёра Льва с анонсом события. | `1:153` | 97.84149932861328 × 184.25839233398438 px | Персонажная карточка в серии «Твой выбор». |
| Проект для телеканала «Домашний» | `domashniy-cast-oleg` | `assets/03_domashniy/domashniy-cast-oleg.webp` | Карточка участника/актёра Олега с анонсом события. | `1:156` | 98.22782135009766 × 184.98593139648438 px | Персонажная карточка в серии «Твой выбор». |
| Проект для телеканала «Домашний» | `domashniy-cast-mikhail` | `assets/03_domashniy/domashniy-cast-mikhail.webp` | Карточка участника/актёра Михаила с анонсом события. | `1:157` | 98.22782135009766 × 184.98593139648438 px | Персонажная карточка в серии «Твой выбор». |
| Проект для телеканала «Домашний» | `domashniy-cast-kolya` | `assets/03_domashniy/domashniy-cast-kolya.webp` | Карточка участника/актёра Коли с анонсом события. | `1:158` | 98.22782135009766 × 184.98593139648438 px | Персонажная карточка в серии «Твой выбор». |
| Проект для телеканала «Домашний» | `domashniy-social-comment-screenshot` | `assets/03_domashniy/domashniy-social-comment-screenshot.webp` | Скриншот публикации/сторис с текстом и реакциями. | `1:151` | 302.0 × 64.0 px | Пример коммуникации с аудиторией. |
| Проект Ecozavr | `ecozavr-background-hills` | `assets/04_ecozavr/ecozavr-background-hills.webp` | Фотография зелёных холмов и мягкого природного ландшафта. | `1:69` | 1440.0 × 1742.0 px | Фоновое изображение кейса Ecozavr. |
| Проект Ecozavr | `ecozavr-purple-soap-detail` | `assets/04_ecozavr/ecozavr-purple-soap-detail.webp` | Крупный план фиолетового флакона экологичного мыла. | `1:80` | 198.0 × 198.0 px | Продуктовая фотография в сетке кейса. |
| Проект Ecozavr | `ecozavr-white-detergent-bottle` | `assets/04_ecozavr/ecozavr-white-detergent-bottle.webp` | Белая бутылка средства для стирки с цветочным оформлением. | `1:81` | 198.0 × 198.0 px | Продуктовая фотография в сетке кейса. |
| Проект Ecozavr | `ecozavr-orange-soap-bottle` | `assets/04_ecozavr/ecozavr-orange-soap-bottle.webp` | Оранжевый флакон экологичного мыла. | `1:82` | 198.0 × 198.0 px | Продуктовая фотография в сетке кейса. |
| Проект Ecozavr | `ecozavr-foam-pump-detail` | `assets/04_ecozavr/ecozavr-foam-pump-detail.webp` | Крупный план помпы и пены на флаконе. | `1:83` | 198.0 × 198.0 px | Продуктовая фотография в сетке кейса. |
| Проект Ecozavr | `ecozavr-green-bottle` | `assets/04_ecozavr/ecozavr-green-bottle.webp` | Зелёный флакон средства Ecozavr на светлом фоне. | `1:84` | 198.0 × 198.0 px | Продуктовая фотография в сетке кейса. |
| Проект Ecozavr | `ecozavr-product-grid` | `assets/04_ecozavr/ecozavr-product-grid.webp` | Коллаж упаковок и средств Ecozavr в интерьере. | `1:85` | 198.0 × 198.0 px | Коллаж продуктовой линейки. |
| Проект Ecozavr | `ecozavr-bottle-in-hand` | `assets/04_ecozavr/ecozavr-bottle-in-hand.webp` | Рука держит флакон средства в зелёной ванной. | `1:86` | 406.0 × 520.0 px | Lifestyle-фотография продукта. |
| Проект Ecozavr | `ecozavr-ad-cover` | `assets/04_ecozavr/ecozavr-ad-cover.webp` | Рекламный макет «Эко Гел» с флаконом на природном фоне. | `1:87` | 406.0 × 520.0 px | Рекламный постер/макет. |
| Проект Ecozavr | `ecozavr-yellow-bottle-flower-still-life` | `assets/04_ecozavr/ecozavr-yellow-bottle-flower-still-life.webp` | Жёлтый флакон средства на фоне цветов и природных материалов. | `1:89` | 406.0 × 520.0 px | Продуктовая lifestyle-фотография. |
| Проект Ecozavr | `ecozavr-dual-bottles` | `assets/04_ecozavr/ecozavr-dual-bottles.webp` | Два флакона средств Ecozavr на светлом фоне. | `1:109` | 226.53630736470222 × 226.53630736470222 px | Продуктовая фотография. |
| Проект Ecozavr | `ecozavr-dog-and-bottle` | `assets/04_ecozavr/ecozavr-dog-and-bottle.webp` | Собака рядом с флаконом средства для ухода. | `1:111` | 226.53630736470222 × 226.53630736470222 px | Lifestyle-фотография с домашним животным. |
| Проект Ecozavr | `ecozavr-green-bottle-foam` | `assets/04_ecozavr/ecozavr-green-bottle-foam.webp` | Зелёный флакон на фоне плитки и пены. | `1:113` | 226.53630736470222 × 226.53630736470222 px | Продуктовая фотография. |
| Проект Ecozavr | `ecozavr-yellow-bottle-pour` | `assets/04_ecozavr/ecozavr-yellow-bottle-pour.webp` | Жёлтый флакон и жидкость, льющаяся на ладонь. | `1:115` | 226.53630736470222 × 226.53630736470222 px | Продуктовая lifestyle-фотография. |
| Проект Ecozavr | `ecozavr-green-bottle-apples` | `assets/04_ecozavr/ecozavr-green-bottle-apples.webp` | Зелёный флакон среди яблок в корзине. | `1:110` | 223.62934908270836 × 223.62934908270836 px | Продуктовая lifestyle-фотография. |
| Проект Ecozavr | `ecozavr-purple-bottle-sink` | `assets/04_ecozavr/ecozavr-purple-bottle-sink.webp` | Фиолетовый флакон у раковины, рука нажимает на дозатор. | `1:112` | 223.62934908270836 × 223.62934908270836 px | Lifestyle-фотография продукта. |
| Проект Ecozavr | `ecozavr-dog-wash` | `assets/04_ecozavr/ecozavr-dog-wash.webp` | Человек моет собаку рядом с флаконом средства. | `1:114` | 223.62934908270836 × 223.62934908270836 px | Lifestyle-фотография с домашним животным. |
| Проект Ecozavr | `projects-background-abstract` | `assets/04_ecozavr/projects-background-abstract.webp` | Абстрактный синий фон с оранжевыми органическими формами. | `1:161` | 1440.0 × 2328.0 px | Фоновое изображение секции презентационных проектов. |
| Дополнительные проекты / AI creator | `logistics-problems-introduction` | `assets/05_projects/logistics-problems-introduction.webp` | Вводный слайд о проблемах логистики с текстом и таблицей. | `1:189` | 614.0 × 346.0 px | Слайд отдельного кейса. |
| Дополнительные проекты / AI creator | `logistics-problems-cover` | `assets/05_projects/logistics-problems-cover.webp` | Слайд о проблемах логистики с синим контейнером и показателем 20 процентов. | `1:188` | 614.0 × 346.0 px | Обложка/слайд отдельного кейса. |
| Дополнительные проекты / AI creator | `cube-house-cover` | `assets/05_projects/cube-house-cover.webp` | Обложка кейса house CUBE с фотографией загородного дома у воды. | `1:167` | 406.0 × 228.0 px | Обложка/слайд проекта house CUBE. |
| Дополнительные проекты / AI creator | `cube-house-japandi-style` | `assets/05_projects/cube-house-japandi-style.webp` | Слайд о стиле Japandi и принципах оформления интерьера. | `1:168` | 406.0 × 228.0 px | Слайд проекта house CUBE. |
| Дополнительные проекты / AI creator | `cube-house-masterclasses` | `assets/05_projects/cube-house-masterclasses.webp` | Слайд с фотографиями мастер-классов и интерьерных занятий. | `1:170` | 407.0 × 228.0 px | Слайд проекта house CUBE. |
| Дополнительные проекты / AI creator | `cube-house-concept-ideas` | `assets/05_projects/cube-house-concept-ideas.webp` | Слайд с тремя концептуальными идеями для house CUBE. | `1:169` | 406.0 × 228.0 px | Слайд проекта house CUBE. |
| Дополнительные проекты / AI creator | `cube-house-market-research` | `assets/05_projects/cube-house-market-research.webp` | Слайд с исследованием рынка и показателями Japandi. | `1:171` | 406.0 × 228.0 px | Слайд проекта house CUBE. |
| Дополнительные проекты / AI creator | `cube-house-logo` | `assets/05_projects/cube-house-logo.webp` | Финальный слайд с логотипом house CUBE. | `1:172` | 407.0 × 228.0 px | Финальный слайд проекта house CUBE. |
| Дополнительные проекты / AI creator | `professional-gaming-cover` | `assets/05_projects/professional-gaming-cover.webp` | Синий титульный слайд «Профессиональное выгорание». | `1:181` | 405.3047790527344 × 227.98391723632812 px | Обложка презентационного кейса. |
| Дополнительные проекты / AI creator | `professional-gaming-definition` | `assets/05_projects/professional-gaming-definition.webp` | Слайд с определением профессионального выгорания и ключевыми симптомами. | `1:185` | 405.3047790527344 × 227.98391723632812 px | Слайд презентационного кейса. |
| Дополнительные проекты / AI creator | `professional-gaming-statistics` | `assets/05_projects/professional-gaming-statistics.webp` | Слайд со статистикой профессионального выгорания. | `1:182` | 405.3047790527344 × 227.98391723632812 px | Слайд презентационного кейса. |
| Дополнительные проекты / AI creator | `professional-gaming-prevention-quote` | `assets/05_projects/professional-gaming-prevention-quote.webp` | Слайд с тезисом о профилактике выгорания, продуктивности и здоровье. | `1:186` | 405.3047790527344 × 227.98391723632812 px | Слайд презентационного кейса. |
| Дополнительные проекты / AI creator | `professional-gaming-microsoft-case` | `assets/05_projects/professional-gaming-microsoft-case.webp` | Слайд с кейсом Microsoft и показателями выгорания. | `1:184` | 405.3047790527344 × 227.98391723632812 px | Слайд презентационного кейса. |
| Дополнительные проекты / AI creator | `professional-gaming-quote` | `assets/05_projects/professional-gaming-quote.webp` | Слайд с цитатой о выгорании как результате системных сбоев. | `1:183` | 405.3047790527344 × 227.98391723632812 px | Слайд презентационного кейса. |
| Дополнительные проекты / AI creator | `social-media-cover` | `assets/05_projects/social-media-cover.webp` | Фиолетовая обложка раздела о социальных сетях. | `1:174` | 406.0 × 228.0 px | Обложка презентационного кейса. |
| Дополнительные проекты / AI creator | `social-media-platform-timeline` | `assets/05_projects/social-media-platform-timeline.webp` | Слайд с этапами развития платформы с 2005 по 2016 год. | `1:178` | 406.0 × 228.0 px | Слайд презентационного кейса. |
| Дополнительные проекты / AI creator | `social-media-neural-networks-quote` | `assets/05_projects/social-media-neural-networks-quote.webp` | Слайд с тезисом о нейросетях и алгоритмах социальных сетей. | `1:175` | 407.0 × 228.0 px | Слайд презентационного кейса. |
| Дополнительные проекты / AI creator | `social-media-goals-laptop` | `assets/05_projects/social-media-goals-laptop.webp` | Слайд с основными целями и изображением сайта на ноутбуке. | `1:176` | 406.0 × 228.0 px | Слайд презентационного кейса. |
| Дополнительные проекты / AI creator | `social-media-geographic-distribution` | `assets/05_projects/social-media-geographic-distribution.webp` | Слайд о географическом распространении с картой и статистикой. | `1:177` | 406.0 × 228.0 px | Слайд презентационного кейса. |
| Дополнительные проекты / AI creator | `social-media-age-segmentation` | `assets/05_projects/social-media-age-segmentation.webp` | Слайд с исследованием пользователей по возрастным группам. | `1:179` | 407.0 × 228.0 px | Слайд презентационного кейса. |
| Контакты / футер | `footer-background-abstract` | `assets/06_footer/footer-background-abstract.webp` | Абстрактная чёрно-оранжевая фоновая текстура. | `1:268` | 1440.0 × 776.0 px | Фоновое изображение футера. |

## Уникальные WebP-файлы

| Смысловое имя | Файл | WebP-размер | Пиксельный размер | Использований | Описание |
|---|---|---:|---:|---:|---|
| `alfa-cat-mascot-full-body` | `assets/02_alfa/alfa-cat-mascot-full-body.webp` | 612564 B | 2048 × 2048 px | 1 | Кот-маскот в красном костюме, полный рост. |
| `alfa-cat-mascot-paw` | `assets/02_alfa/alfa-cat-mascot-paw.webp` | 554110 B | 2048 × 2048 px | 1 | Кот-маскот крупным планом, тянущий лапу к зрителю. |
| `alfa-cat-mascot-standing` | `assets/02_alfa/alfa-cat-mascot-standing.webp` | 711884 B | 2341 × 4071 px | 1 | Кот-маскот в красном костюме, стоит в полный рост. |
| `alfa-guide-contract-nsz` | `assets/02_alfa/alfa-guide-contract-nsz.webp` | 242606 B | 1920 × 1080 px | 2 | Разворот памятки «Как сохранить договор НСЖ». |
| `alfa-guide-good-luck` | `assets/02_alfa/alfa-guide-good-luck.webp` | 191986 B | 1920 × 1080 px | 1 | Финальный красный слайд с котом, мужчиной и пожеланием удачи. |
| `alfa-guide-key-moments` | `assets/02_alfa/alfa-guide-key-moments.webp` | 246286 B | 1920 × 1080 px | 2 | Разворот памятки с блоком «Важные моменты». |
| `alfa-guide-pamyatka-cover` | `assets/02_alfa/alfa-guide-pamyatka-cover.webp` | 244126 B | 1920 × 1080 px | 1 | Красно-оранжевая обложка памятки с мужчиной и котом. |
| `alfa-guide-speech-rules` | `assets/02_alfa/alfa-guide-speech-rules.webp` | 255760 B | 1920 × 1080 px | 3 | Разворот памятки с правилами речи: как нельзя и как правильно говорить. |
| `alfa-man-and-cat-back-view` | `assets/02_alfa/alfa-man-and-cat-back-view.webp` | 413172 B | 2048 × 2048 px | 1 | Мужчина со спины рядом с котом-маскотом. |
| `alfa-man-and-cat-full-body` | `assets/02_alfa/alfa-man-and-cat-full-body.webp` | 528174 B | 2048 × 2048 px | 1 | Мужчина и кот-маскот рядом, полный рост. |
| `alfa-man-mascot-full-body` | `assets/02_alfa/alfa-man-mascot-full-body.webp` | 1256754 B | 3816 × 3816 px | 1 | Мужчина-маскот в костюме, полный рост. |
| `alfa-man-mascot-portrait` | `assets/02_alfa/alfa-man-mascot-portrait.webp` | 716354 B | 1536 × 2752 px | 1 | Портрет мужчины-маскота крупным планом. |
| `alfa-mascots-hero` | `assets/02_alfa/alfa-mascots-hero.webp` | 84044 B | 1024 × 1024 px | 1 | Главный персонаж проекта: мужчина и кот-маскот «Альфа». |
| `cube-house-concept-ideas` | `assets/05_projects/cube-house-concept-ideas.webp` | 82432 B | 935 × 526 px | 1 | Слайд с тремя концептуальными идеями для house CUBE. |
| `cube-house-cover` | `assets/05_projects/cube-house-cover.webp` | 64964 B | 937 × 527 px | 1 | Обложка кейса house CUBE с фотографией загородного дома у воды. |
| `cube-house-japandi-style` | `assets/05_projects/cube-house-japandi-style.webp` | 41134 B | 939 × 529 px | 1 | Слайд о стиле Japandi и принципах оформления интерьера. |
| `cube-house-logo` | `assets/05_projects/cube-house-logo.webp` | 7280 B | 935 × 526 px | 1 | Финальный слайд с логотипом house CUBE. |
| `cube-house-market-research` | `assets/05_projects/cube-house-market-research.webp` | 57690 B | 937 × 527 px | 1 | Слайд с исследованием рынка и показателями Japandi. |
| `cube-house-masterclasses` | `assets/05_projects/cube-house-masterclasses.webp` | 81796 B | 938 × 528 px | 1 | Слайд с фотографиями мастер-классов и интерьерных занятий. |
| `domashniy-cast-andrey` | `assets/03_domashniy/domashniy-cast-andrey.webp` | 50616 B | 404 × 724 px | 1 | Карточка участника/актёра Андрея с анонсом события. |
| `domashniy-cast-collage` | `assets/03_domashniy/domashniy-cast-collage.webp` | 199464 B | 1080 × 1080 px | 1 | Коллаж актёров и персонажей телеканала с подписями. |
| `domashniy-cast-kolya` | `assets/03_domashniy/domashniy-cast-kolya.webp` | 49860 B | 396 × 728 px | 1 | Карточка участника/актёра Коли с анонсом события. |
| `domashniy-cast-leo` | `assets/03_domashniy/domashniy-cast-leo.webp` | 42460 B | 452 × 772 px | 1 | Карточка участника/актёра Льва с анонсом события. |
| `domashniy-cast-mikhail` | `assets/03_domashniy/domashniy-cast-mikhail.webp` | 47430 B | 396 × 724 px | 1 | Карточка участника/актёра Михаила с анонсом события. |
| `domashniy-cast-oleg` | `assets/03_domashniy/domashniy-cast-oleg.webp` | 41164 B | 396 × 720 px | 1 | Карточка участника/актёра Олега с анонсом события. |
| `domashniy-cast-vadim` | `assets/03_domashniy/domashniy-cast-vadim.webp` | 51178 B | 404 × 728 px | 1 | Карточка участника/актёра Вадима с анонсом события. |
| `domashniy-cat-mascot-couch` | `assets/03_domashniy/domashniy-cat-mascot-couch.webp` | 166964 B | 1080 × 1920 px | 1 | Белый кот-маскот сидит на розовом кресле/диване. |
| `domashniy-cat-mascot-couch-trophy` | `assets/03_domashniy/domashniy-cat-mascot-couch-trophy.webp` | 273152 B | 1080 × 1355 px | 1 | Белый кот-маскот на розовом диване с кубком. |
| `domashniy-cat-mascot-gift-pile` | `assets/03_domashniy/domashniy-cat-mascot-gift-pile.webp` | 120878 B | 1080 × 1108 px | 1 | Белый кот-маскот на фоне стопки розовых подарков. |
| `domashniy-cat-mascot-pink-gifts` | `assets/03_domashniy/domashniy-cat-mascot-pink-gifts.webp` | 313018 B | 1536 × 2752 px | 1 | Белый кот-маскот среди розовых подарков и цветов. |
| `domashniy-cat-mascot-striped-shirt` | `assets/03_domashniy/domashniy-cat-mascot-striped-shirt.webp` | 733808 B | 1644 × 1644 px | 1 | Белый кот-маскот в полосатой футболке на текстурном фоне. |
| `domashniy-cta-increase` | `assets/03_domashniy/domashniy-cta-increase.webp` | 49700 B | 1080 × 1350 px | 1 | Розовый экран с призывом «Увеличь» и иллюстрацией бантика. |
| `domashniy-mascot-laptop` | `assets/03_domashniy/domashniy-mascot-laptop.webp` | 97634 B | 1080 × 1479 px | 1 | Розовый персонаж-маскот работает за ноутбуком. |
| `domashniy-mascot-pink-laptop` | `assets/00_shared/domashniy-mascot-pink-laptop.webp` | 90440 B | 1267 × 1737 px | 2 | Розовый персонаж-маскот с ноутбуком. |
| `domashniy-premiere-promo` | `assets/03_domashniy/domashniy-premiere-promo.webp` | 12974 B | 200 × 200 px | 1 | Розовый промо-экран с анонсом премьеры и персонажем. |
| `domashniy-social-comment-screenshot` | `assets/03_domashniy/domashniy-social-comment-screenshot.webp` | 135152 B | 992 × 1302 px | 1 | Скриншот публикации/сторис с текстом и реакциями. |
| `domashniy-social-comment-screenshot` | `assets/03_domashniy/domashniy-social-comment-screenshot__b8c46948.webp` | 38234 B | 323 × 491 px | 1 | Скриншот публикации/сторис с текстом и реакциями. |
| `domashniy-social-grid-collage` | `assets/03_domashniy/domashniy-social-grid-collage.webp` | 215568 B | 840 × 1264 px | 1 | Коллаж публикаций и образов персонажей телеканала «Домашний». |
| `domashniy-story-popcorn-promo` | `assets/03_domashniy/domashniy-story-popcorn-promo.webp` | 124696 B | 840 × 1264 px | 1 | Вертикальная сторис с персонажем, попкорном и анонсом эфира. |
| `domashniy-year-stats` | `assets/03_domashniy/domashniy-year-stats.webp` | 69176 B | 840 × 834 px | 1 | Розовая инфографика со статистикой и показателями канала. |
| `ecozavr-ad-cover` | `assets/04_ecozavr/ecozavr-ad-cover.webp` | 500032 B | 1792 × 2400 px | 1 | Рекламный макет «Эко Гел» с флаконом на природном фоне. |
| `ecozavr-background-hills` | `assets/04_ecozavr/ecozavr-background-hills.webp` | 297638 B | 992 × 1200 px | 1 | Фотография зелёных холмов и мягкого природного ландшафта. |
| `ecozavr-bottle-in-hand` | `assets/04_ecozavr/ecozavr-bottle-in-hand.webp` | 275524 B | 1792 × 2400 px | 1 | Рука держит флакон средства в зелёной ванной. |
| `ecozavr-dog-and-bottle` | `assets/04_ecozavr/ecozavr-dog-and-bottle.webp` | 364132 B | 1856 × 2304 px | 1 | Собака рядом с флаконом средства для ухода. |
| `ecozavr-dog-wash` | `assets/04_ecozavr/ecozavr-dog-wash.webp` | 776902 B | 1792 × 2400 px | 1 | Человек моет собаку рядом с флаконом средства. |
| `ecozavr-dual-bottles` | `assets/04_ecozavr/ecozavr-dual-bottles.webp` | 312404 B | 2048 × 2048 px | 1 | Два флакона средств Ecozavr на светлом фоне. |
| `ecozavr-foam-pump-detail` | `assets/04_ecozavr/ecozavr-foam-pump-detail.webp` | 50598 B | 1000 × 1000 px | 1 | Крупный план помпы и пены на флаконе. |
| `ecozavr-green-bottle` | `assets/04_ecozavr/ecozavr-green-bottle.webp` | 169364 B | 1862 × 1265 px | 1 | Зелёный флакон средства Ecozavr на светлом фоне. |
| `ecozavr-green-bottle-apples` | `assets/04_ecozavr/ecozavr-green-bottle-apples.webp` | 629066 B | 1792 × 2400 px | 1 | Зелёный флакон среди яблок в корзине. |
| `ecozavr-green-bottle-foam` | `assets/04_ecozavr/ecozavr-green-bottle-foam.webp` | 230782 B | 1856 × 2304 px | 1 | Зелёный флакон на фоне плитки и пены. |
| `ecozavr-orange-soap-bottle` | `assets/04_ecozavr/ecozavr-orange-soap-bottle.webp` | 56516 B | 687 × 469 px | 1 | Оранжевый флакон экологичного мыла. |
| `ecozavr-product-grid` | `assets/04_ecozavr/ecozavr-product-grid.webp` | 598110 B | 2048 × 2048 px | 1 | Коллаж упаковок и средств Ecozavr в интерьере. |
| `ecozavr-purple-bottle-sink` | `assets/04_ecozavr/ecozavr-purple-bottle-sink.webp` | 173472 B | 1856 × 2304 px | 1 | Фиолетовый флакон у раковины, рука нажимает на дозатор. |
| `ecozavr-purple-soap-detail` | `assets/04_ecozavr/ecozavr-purple-soap-detail.webp` | 45402 B | 690 × 469 px | 1 | Крупный план фиолетового флакона экологичного мыла. |
| `ecozavr-white-detergent-bottle` | `assets/04_ecozavr/ecozavr-white-detergent-bottle.webp` | 33984 B | 1200 × 800 px | 1 | Белая бутылка средства для стирки с цветочным оформлением. |
| `ecozavr-yellow-bottle-flower-still-life` | `assets/04_ecozavr/ecozavr-yellow-bottle-flower-still-life.webp` | 795046 B | 1792 × 2400 px | 1 | Жёлтый флакон средства на фоне цветов и природных материалов. |
| `ecozavr-yellow-bottle-pour` | `assets/04_ecozavr/ecozavr-yellow-bottle-pour.webp` | 182558 B | 1856 × 2304 px | 1 | Жёлтый флакон и жидкость, льющаяся на ладонь. |
| `footer-background-abstract` | `assets/06_footer/footer-background-abstract.webp` | 165726 B | 2752 × 1536 px | 1 | Абстрактная чёрно-оранжевая фоновая текстура. |
| `hero-background-abstract` | `assets/01_hero/hero-background-abstract.webp` | 137994 B | 2752 × 1536 px | 1 | Абстрактный чёрно-оранжевый фон с волнообразной текстурой. |
| `hero-card-alfa-mascots` | `assets/01_hero/hero-card-alfa-mascots.webp` | 650810 B | 1856 × 2304 px | 1 | Мужчина и кот-маскот «Альфа» на красно-оранжевом фоне. |
| `hero-card-data-analytics-laptop` | `assets/01_hero/hero-card-data-analytics-laptop.webp` | 675322 B | 2000 × 3000 px | 1 | Ноутбук с экраном аналитики и показателем 20 процентов. |
| `hero-card-eco-soap-product` | `assets/01_hero/hero-card-eco-soap-product.webp` | 388628 B | 1856 × 2304 px | 1 | Флакон экологичного мыла/средства на фиолетовом фоне. |
| `logistics-problems-cover` | `assets/05_projects/logistics-problems-cover.webp` | 113680 B | 1280 × 720 px | 1 | Слайд о проблемах логистики с синим контейнером и показателем 20 процентов. |
| `logistics-problems-introduction` | `assets/05_projects/logistics-problems-introduction.webp` | 111794 B | 1280 × 720 px | 1 | Вводный слайд о проблемах логистики с текстом и таблицей. |
| `professional-gaming-cover` | `assets/05_projects/professional-gaming-cover.webp` | 31894 B | 957 × 538 px | 1 | Синий титульный слайд «Профессиональное выгорание». |
| `professional-gaming-definition` | `assets/05_projects/professional-gaming-definition.webp` | 60278 B | 955 × 538 px | 1 | Слайд с определением профессионального выгорания и ключевыми симптомами. |
| `professional-gaming-microsoft-case` | `assets/05_projects/professional-gaming-microsoft-case.webp` | 78276 B | 958 × 539 px | 1 | Слайд с кейсом Microsoft и показателями выгорания. |
| `professional-gaming-prevention-quote` | `assets/05_projects/professional-gaming-prevention-quote.webp` | 40710 B | 955 × 538 px | 1 | Слайд с тезисом о профилактике выгорания, продуктивности и здоровье. |
| `professional-gaming-quote` | `assets/05_projects/professional-gaming-quote.webp` | 35500 B | 959 × 540 px | 1 | Слайд с цитатой о выгорании как результате системных сбоев. |
| `professional-gaming-statistics` | `assets/05_projects/professional-gaming-statistics.webp` | 70734 B | 957 × 538 px | 1 | Слайд со статистикой профессионального выгорания. |
| `projects-background-abstract` | `assets/04_ecozavr/projects-background-abstract.webp` | 66980 B | 904 × 1200 px | 1 | Абстрактный синий фон с оранжевыми органическими формами. |
| `social-media-age-segmentation` | `assets/05_projects/social-media-age-segmentation.webp` | 107276 B | 1717 × 966 px | 1 | Слайд с исследованием пользователей по возрастным группам. |
| `social-media-cover` | `assets/05_projects/social-media-cover.webp` | 588338 B | 1716 × 966 px | 1 | Фиолетовая обложка раздела о социальных сетях. |
| `social-media-geographic-distribution` | `assets/05_projects/social-media-geographic-distribution.webp` | 402248 B | 1717 × 966 px | 1 | Слайд о географическом распространении с картой и статистикой. |
| `social-media-goals-laptop` | `assets/05_projects/social-media-goals-laptop.webp` | 187672 B | 1717 × 966 px | 1 | Слайд с основными целями и изображением сайта на ноутбуке. |
| `social-media-neural-networks-quote` | `assets/05_projects/social-media-neural-networks-quote.webp` | 555504 B | 1715 × 965 px | 1 | Слайд с тезисом о нейросетях и алгоритмах социальных сетей. |
| `social-media-platform-timeline` | `assets/05_projects/social-media-platform-timeline.webp` | 345750 B | 1716 × 966 px | 1 | Слайд с этапами развития платформы с 2005 по 2016 год. |

## Технические примечания

- Конвертация выполнена без изменения размеров исходников.
- Качество WebP для ассетов: 92; для рендеров макета: 95.
- Все исходные JPG/PNG удалены из папок `assets/` и `layout/` после успешной конвертации.
- Исходный JSON Figma сохранён для связи слоёв, координат и `node-id`.
- Если исходник меньше физического размера 4K-экрана, он не увеличивался искусственно: повышение разрешения не добавит реальных деталей.
