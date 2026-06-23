document.addEventListener('DOMContentLoaded', function () {

    var topNav = document.querySelector('.top-nav');
    if (!topNav) return;

    var list = topNav.querySelector('.top-nav__list');
    if (!list) return;

    var btn = document.createElement('button');
    btn.className = 'top-nav__hamburger';
    btn.type = 'button';
    btn.setAttribute('aria-label', 'Меню');
    btn.innerHTML = '<span></span><span></span><span></span>';
    topNav.appendChild(btn);

    btn.addEventListener('click', function (e) {
        e.stopPropagation();
        topNav.classList.toggle('is-open');
    });

    document.addEventListener('click', function (e) {
        if (!topNav.contains(e.target)) {
            topNav.classList.remove('is-open');
        }
    });

    list.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () {
            topNav.classList.remove('is-open');
        });
    });

});
