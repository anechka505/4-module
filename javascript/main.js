document.addEventListener('DOMContentLoaded', function () {

    var quizQuestions = [
        {
            question: 'Как называется<br>это космическое существо?',
            options: [
                'ульпух древовидный',
                'Овалус обыкновенный',
                'Шурпун Двуглазый'
            ],
            correctIndex: 1,
            correctText: 'Верно! Это овалус обыкновенный — один из обитателей фестиваля.',
            wrongText: 'Не угадал. Приходи на фест, узнаешь точно.'
        }
    ];

    var currentQuestionIndex = 0;
    var questionEl = document.getElementById('quiz-question');
    var optionsEl = document.getElementById('quiz-options');
    var feedbackEl = document.getElementById('quiz-feedback');

    function renderQuestion() {
        var data = quizQuestions[currentQuestionIndex];

        questionEl.innerHTML = data.question;
        feedbackEl.textContent = '';
        optionsEl.innerHTML = '';

        data.options.forEach(function (optionText, i) {
            var btn = document.createElement('button');
            btn.className = 'quiz__option';
            btn.type = 'button';
            btn.textContent = optionText;

            btn.addEventListener('click', function () {
                handleAnswer(i, btn);
            });

            optionsEl.appendChild(btn);
        });
    }

    function handleAnswer(chosenIndex, clickedBtn) {
        var data = quizQuestions[currentQuestionIndex];
        var allButtons = optionsEl.querySelectorAll('.quiz__option');

        allButtons.forEach(function (btn) {
            btn.disabled = true;
        });

        if (chosenIndex === data.correctIndex) {
            clickedBtn.classList.add('quiz__option--correct');
            feedbackEl.textContent = data.correctText;
        } else {
            clickedBtn.classList.add('quiz__option--wrong');

            allButtons[data.correctIndex].classList.add('quiz__option--correct');
            feedbackEl.textContent = data.wrongText;
        }
    }

    renderQuestion();

    var infoCard = document.getElementById('info-card');
    var tearLocked = false;

    function buildZigzagClips(card) {
        if (!card) return;
        var leftHalf = card.querySelector('.info-card__half--left');
        var rightHalf = card.querySelector('.info-card__half--right');
        if (!leftHalf || !rightHalf) return;

        var perforation = 17.44;
        var amp = 0.6;
        var halfPeriod = 1.2;
        var height = 28.77;

        var boundary = [];
        var y = 0;
        var i = 0;
        while (y <= height + 0.01) {
            var x = (i % 2 === 0) ? (perforation - amp) : (perforation + amp);
            boundary.push([+x.toFixed(2), +y.toFixed(2)]);
            y += halfPeriod;
            i++;
        }

        var leftPts = [[0, 0]];
        boundary.forEach(function (p) { leftPts.push(p); });
        leftPts.push([0, height]);

        var rightPts = [boundary[0]];
        rightPts.push(['100%', 0]);
        rightPts.push(['100%', height]);
        rightPts.push(boundary[boundary.length - 1]);

        for (var k = boundary.length - 2; k >= 1; k--) {
            rightPts.push(boundary[k]);
        }

        leftHalf.style.clipPath = polyToCss(leftPts);
        rightHalf.style.clipPath = polyToCss(rightPts);
    }

    function polyToCss(points) {
        var coords = points.map(function (p) {
            var x = (typeof p[0] === 'number') ? (p[0] + 'vw') : p[0];
            var y = (typeof p[1] === 'number') ? (p[1] + 'vw') : p[1];
            return x + ' ' + y;
        });
        return 'polygon(' + coords.join(', ') + ')';
    }

    if (infoCard) {
        buildZigzagClips(infoCard);

        infoCard.addEventListener('click', function () {
            if (tearLocked) return;
            tearLocked = true;

            infoCard.classList.remove('is-restoring');
            infoCard.classList.add('is-torn');

            setTimeout(function () {
                infoCard.classList.remove('is-torn');
                infoCard.classList.add('is-restoring');
            }, 600);

            setTimeout(function () {
                infoCard.classList.remove('is-restoring');
                tearLocked = false;
            }, 600 + 750);
        });
    }

    var merchBtn = document.getElementById('cosmonaut-arrow-btn');
    var merchOverlay = document.getElementById('merch-popup-overlay');
    var merchClose = document.getElementById('merch-popup-close');
    var merchForm = document.getElementById('merch-popup-form');
    var merchEmail = document.getElementById('merch-popup-email');
    var merchNotification = document.getElementById('merch-notification');

    var merchNotificationTimer = null;

    function openMerchPopup() {
        if (!merchOverlay) return;
        merchOverlay.hidden = false;
        requestAnimationFrame(function () {
            merchOverlay.classList.add('is-open');
        });
        document.body.classList.add('is-popup-open');
        if (merchEmail) {
            setTimeout(function () { merchEmail.focus(); }, 50);
        }
    }

    function closeMerchPopup() {
        if (!merchOverlay) return;
        merchOverlay.classList.remove('is-open');
        document.body.classList.remove('is-popup-open');
        setTimeout(function () {
            merchOverlay.hidden = true;
        }, 250);
    }

    function showMerchNotification() {
        if (!merchNotification) return;
        if (merchNotificationTimer) {
            clearTimeout(merchNotificationTimer);
        }
        merchNotification.hidden = false;
        requestAnimationFrame(function () {
            merchNotification.classList.add('is-visible');
        });
        merchNotificationTimer = setTimeout(function () {
            merchNotification.classList.remove('is-visible');
            setTimeout(function () {
                merchNotification.hidden = true;
            }, 500);
            merchNotificationTimer = null;
        }, 5000);
    }

    if (merchBtn) {
        merchBtn.addEventListener('click', openMerchPopup);
    }

    if (merchClose) {
        merchClose.addEventListener('click', closeMerchPopup);
    }

    if (merchOverlay) {
        merchOverlay.addEventListener('click', function (e) {
            if (e.target === merchOverlay) {
                closeMerchPopup();
            }
        });
    }

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && merchOverlay && !merchOverlay.hidden) {
            closeMerchPopup();
        }
    });

    if (merchForm && merchEmail) {
        merchForm.addEventListener('submit', function (e) {
            e.preventDefault();

            var value = merchEmail.value.trim();
            var emailMask = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;

            if (!value || !emailMask.test(value)) {
                merchEmail.classList.add('is-invalid');
                merchEmail.addEventListener('input', function once() {
                    merchEmail.classList.remove('is-invalid');
                    merchEmail.removeEventListener('input', once);
                });
                return;
            }

            merchEmail.value = '';
            closeMerchPopup();
            showMerchNotification();
        });
    }

});
