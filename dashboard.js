// Inside your dashboard.js file
document.addEventListener('DOMContentLoaded', function () {
    var profilePicture = document.getElementById('profile-picture');
    var menuContainer = document.getElementById('menu-container');

    profilePicture.addEventListener('click', function () {
        // Toggle the 'hidden' class of the menu-container to show/hide it
        menuContainer.classList.toggle('hidden');
    });
});
