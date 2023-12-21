document.addEventListener('DOMContentLoaded', function () {
    var profilePicture = document.getElementById('profile-picture');
    var menuContainer = document.getElementById('menu-container');

    // Voeg een click event listener toe aan de profielfoto
    profilePicture.addEventListener('click', function () {
        // Toggle de 'hidden' klasse van het menu-container om het te tonen/verbergen
        menuContainer.classList.toggle('hidden');
    });
});
