document.addEventListener('DOMContentLoaded', function () {

    var backBtn = document.getElementById('back-btn');
    if (!backBtn) return;

    backBtn.addEventListener('click', function () {
        if (window.history.length > 1) {
            window.history.back();
        } else {
            window.location.href = 'index.html';
        }
    });

});
