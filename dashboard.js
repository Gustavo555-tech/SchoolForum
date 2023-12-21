// Inside your dashboard.js file
document.addEventListener('DOMContentLoaded', function () {
    var profilePicture = document.getElementById('profile-picture');
    var menuContainer = document.getElementById('menu-container');

    profilePicture.addEventListener('click', function (event) {
        event.stopPropagation(); // Prevent the click event from reaching the document

        // Toggle the 'hidden' class of the menu-slate to show/hide it
        var menuSlate = document.querySelector('.menu-slate');
        menuSlate.classList.toggle('hidden');

        // Close the menu if clicking outside
        document.addEventListener('click', function closeMenu(event) {
            if (!menuSlate.contains(event.target) && !profilePicture.contains(event.target)) {
                menuSlate.classList.add('hidden');
                document.removeEventListener('click', closeMenu);
            }
        });
    });
});
