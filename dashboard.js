document.addEventListener('DOMContentLoaded', function () {
    var profilePicture = document.getElementById('profile-picture');
    var menuContainer = document.getElementById('menu-container');

    // Voeg een click event listener toe aan de profielfoto
    profilePicture.addEventListener('click', function (event) {
        event.stopPropagation();
        menuContainer.classList.toggle('hidden');
    });

    // Sluit het menu als er buiten wordt geklikt
    document.addEventListener('click', function closeMenu(event) {
        if (!menuContainer.contains(event.target) && !profilePicture.contains(event.target)) {
            menuContainer.classList.add('hidden');
        }
    });
});
