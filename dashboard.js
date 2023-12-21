document.addEventListener('DOMContentLoaded', function () {
    var profilePicture = document.getElementById('profile-picture');
    var menuContainer = document.getElementById('menu-container');

    // Add a click event listener to the profile picture
    profilePicture.addEventListener('click', function (event) {
        event.stopPropagation();
        menuContainer.classList.toggle('hidden');
    });

    // Close the menu if clicking outside
    document.addEventListener('click', function closeMenu(event) {
        if (!menuContainer.contains(event.target) && !profilePicture.contains(event.target)) {
            menuContainer.classList.add('hidden');
        }
    });
});
