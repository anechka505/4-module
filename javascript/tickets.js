document.addEventListener('DOMContentLoaded', function () {

    var triggers = [
        document.getElementById('ticket-plus-adult'),
        document.getElementById('ticket-plus-baby'),
        document.getElementById('ticket-plus-child')
    ];
    var overlay = document.getElementById('popup-overlay');
    var closeBtn = document.getElementById('popup-close');
    var form = document.getElementById('popup-form');
    var emailInput = document.getElementById('popup-email');
    var notification = document.getElementById('notification');

    var notificationTimer = null;

    function openPopup() {
        if (!overlay) return;
        overlay.hidden = false;
        requestAnimationFrame(function () {
            overlay.classList.add('is-open');
        });
        document.body.classList.add('is-popup-open');
        if (emailInput) {
            setTimeout(function () { emailInput.focus(); }, 50);
        }
    }

    function closePopup() {
        if (!overlay) return;
        overlay.classList.remove('is-open');
        document.body.classList.remove('is-popup-open');
        setTimeout(function () {
            overlay.hidden = true;
        }, 250);
    }

    function showNotification() {
        if (!notification) return;
        if (notificationTimer) {
            clearTimeout(notificationTimer);
        }
        notification.hidden = false;
        requestAnimationFrame(function () {
            notification.classList.add('is-visible');
        });
        notificationTimer = setTimeout(function () {
            notification.classList.remove('is-visible');
            setTimeout(function () {
                notification.hidden = true;
            }, 500);
            notificationTimer = null;
        }, 5000);
    }

    triggers.forEach(function (btn) {
        if (btn) {
            btn.addEventListener('click', openPopup);
        }
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', closePopup);
    }

    if (overlay) {
        overlay.addEventListener('click', function (e) {
            if (e.target === overlay) {
                closePopup();
            }
        });
    }

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && overlay && !overlay.hidden) {
            closePopup();
        }
    });

    if (form && emailInput) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            var value = emailInput.value.trim();
            var emailMask = /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/;

            if (!value || !emailMask.test(value)) {
                emailInput.classList.add('is-invalid');
                emailInput.addEventListener('input', function once() {
                    emailInput.classList.remove('is-invalid');
                    emailInput.removeEventListener('input', once);
                });
                return;
            }

            emailInput.value = '';
            closePopup();
            showNotification();
        });
    }

});
