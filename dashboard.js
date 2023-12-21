document.addEventListener('DOMContentLoaded', function () {
    var profilePicture = document.getElementById('profile-picture');
    var menuContainer = document.getElementById('menu-container');

    profilePicture.addEventListener('click', function (event) {
        event.stopPropagation();
        document.querySelector('.menu-slate').classList.toggle('hidden');
    });

    // Sluit het menu als er buiten wordt geklikt
    document.addEventListener('click', function closeMenu(event) {
        var menuSlate = document.querySelector('.menu-slate');
        if (!menuSlate.contains(event.target) && !profilePicture.contains(event.target)) {
            menuSlate.classList.add('hidden');
        }
    });
});
