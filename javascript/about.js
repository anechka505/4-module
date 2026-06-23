// Динамический рендер карточек "Наши жители" на странице "О фесте".
// Это требование ККК Модуля 4 (M4-L0 / M4-L4 workshop):
// у нас должен быть хотя бы один блок, который рисуется из массива через createElement + forEach.
//
// Тексты взяты прямо из Figma (нода 5:167, дети 5:195/5:201/5:208 и 5:196/5:202/5:209).
// Фоновое изображение каждой карточки — готовый рендер из Figma (фон + панель + фото),
// текст уже НЕ запечён в PNG (мы временно прятали текст-ноды через set_node_visibility перед экспортом).

document.addEventListener('DOMContentLoaded', function () {

    var creatures = [
        {
            name: 'Овалус',
            description: 'Спокойное космическое существо с планеты мягких туманов. Он внимательно наблюдает за всем вокруг своими двумя глазами и запоминает каждого гостя фестиваля.\n\nОвалус любит тёплый свет, сладкие фрукты и медленно покачиваться на месте.',
            // На мобайле — точные переносы строк как в Figma 56:169. На десктопе/планшете
            // эти <br> скрываются через CSS, текст течёт натурально.
            mobileLines: [
                [
                    'Спокойное космическое существо',
                    'с планеты мягких туманов.',
                    'Он внимательно наблюдает',
                    'за всем вокруг своими двумя',
                    'глазами и запоминает каждого',
                    'гостя фестиваля.'
                ],
                [
                    'Овалус любит тёплый свет,',
                    'сладкие фрукты и медленно',
                    'покачиваться на месте.'
                ]
            ],
            cardImage: 'images/about-card-ovalus.png',
            modifier: 'ovalus'   // текст справа на синей панели, белый
        },
        {
            name: 'Дикая корова Сатурна',
            description: 'Дикая корова Сатурна больше всего любит медленные прогулки по космическим лугам. По утрам она собирает звёздную росу.\n\nК людям подходит не сразу: сначала наблюдает, но если угостить её сладкой травой, быстро становится доверчивой.',
            mobileLines: [
                [
                    'Дикая корова Сатурна больше',
                    'всего любит медленные прогулки',
                    'по космическим лугам. По утрам',
                    'она собирает звёздную росу.'
                ],
                [
                    'К людям подходит не сразу:',
                    'сначала наблюдает, но если',
                    'угостить её сладкой травой,',
                    'быстро становится доверчивой.'
                ]
            ],
            cardImage: 'images/about-card-cow.png',
            modifier: 'cow'      // карточка в Figma повёрнута 180° — визуально текст слева, белый
        },
        {
            name: 'Астроптички',
            description: 'Астроптички живут небольшими шумными стайками и всё время что‑то собирают: блестящие камешки, пыльцу с метеоритов и крошки космических фруктов.\n\nПо вечерам астроптички устраивают перелёты по кругу и поют короткие свистящие мелодии',
            mobileLines: [
                [
                    'Астроптички живут небольшими',
                    'шумными стайками и всё время',
                    'что‑то собирают: блестящие',
                    'камешки, пыльцу с метеоритов',
                    'и крошки космических фруктов.'
                ],
                [
                    'По вечерам астроптички',
                    'устраивают перелёты по кругу',
                    'и поют короткие свистящие',
                    'мелодии'
                ]
            ],
            cardImage: 'images/about-card-birds.png',
            modifier: 'birds'    // текст справа на жёлтой панели, синий
        }
    ];


    var listEl = document.getElementById('residents-list');
    if (!listEl) {
        return;
    }


    creatures.forEach(function (creature) {

        // Корневой <article> — одна карточка.
        var card = document.createElement('article');
        card.className = 'creature-card creature-card--' + creature.modifier;

        // Фон карточки — готовый PNG из Figma (фон + цветная панель + фото).
        var bg = document.createElement('img');
        bg.className = 'creature-card__bg';
        bg.src = creature.cardImage;
        bg.alt = creature.name;
        card.appendChild(bg);

        // Блок с текстом, лежит поверх фона.
        var textBox = document.createElement('div');
        textBox.className = 'creature-card__text';

        var title = document.createElement('h2');
        title.className = 'creature-card__name';
        title.textContent = creature.name;
        textBox.appendChild(title);

        // Описание: если задан mobileLines (массив параграфов из массива строк),
        // используем его и расставляем <br class="mobile-desc-br"> между строками —
        // на десктопе/планшете эти <br> скрываются через CSS, на мобайле — переносят
        // строку точно как в Figma. Иначе fallback на старое поведение со split \n\n.
        if (creature.mobileLines) {
            creature.mobileLines.forEach(function (paragraphLines) {
                var p = document.createElement('p');
                p.className = 'creature-card__desc';
                paragraphLines.forEach(function (line, i) {
                    if (i > 0) {
                        // Пробел — чтобы при скрытом <br> слова не слипались в одну строку.
                        p.appendChild(document.createTextNode(' '));
                        var br = document.createElement('br');
                        br.className = 'mobile-desc-br';
                        p.appendChild(br);
                    }
                    p.appendChild(document.createTextNode(line));
                });
                textBox.appendChild(p);
            });
        } else {
            var paragraphs = creature.description.split('\n\n');
            paragraphs.forEach(function (paragraphText) {
                var p = document.createElement('p');
                p.className = 'creature-card__desc';
                p.textContent = paragraphText;
                textBox.appendChild(p);
            });
        }

        card.appendChild(textBox);
        listEl.appendChild(card);
    });

});
