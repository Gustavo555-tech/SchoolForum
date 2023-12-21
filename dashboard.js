// Inside your dashboard.js file
document.addEventListener('DOMContentLoaded', function () {
    var profilePicture = document.getElementById('profile-picture');
    var menuContainer = document.getElementById('menu-container');

    profilePicture.addEventListener('click', function (event) {
        event.stopPropagation();
        menuContainer.classList.toggle('hidden');
    });

    // Close the menu if clicking outside
    document.addEventListener('click', function closeMenu(event) {
        if (!menuContainer.contains(event.target) && !profilePicture.contains(event.target)) {
            menuContainer.classList.add('hidden');
            document.removeEventListener('click', closeMenu);
        }
    });
});
