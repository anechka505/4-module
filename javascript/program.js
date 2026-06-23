document.addEventListener('DOMContentLoaded', function () {

    var sections = [
        {
            title: 'Знакомься',
            modifier: 'meet',
            posters: [
                'images/program-meet-left.png',
                'images/program-meet-center.png',
                'images/program-meet-right.png'
            ]
        },
        {
            title: 'Пробуй новое',
            modifier: 'try',
            posters: [
                'images/program-try-left.png',
                'images/program-try-center.png',
                'images/program-try-right.png'
            ]
        },
        {
            title: 'Развивайся',
            modifier: 'grow',
            posters: [
                'images/program-grow-left.png',
                'images/program-grow-center.png',
                'images/program-grow-right.png'
            ]
        }
    ];

    var listEl = document.getElementById('program-list');
    if (!listEl) {
        return;
    }

    sections.forEach(function (section) {

        var card = document.createElement('article');
        card.className = 'program-card program-card--' + section.modifier;

        var title = document.createElement('h2');
        title.className = 'program-card__title';
        title.textContent = section.title;
        card.appendChild(title);

        var row = document.createElement('div');
        row.className = 'program-card__posters';

        section.posters.forEach(function (posterSrc) {
            var img = document.createElement('img');
            img.className = 'program-card__poster';
            img.src = posterSrc;
            img.alt = '';
            row.appendChild(img);
        });

        card.appendChild(row);
        listEl.appendChild(card);
    });

});
