document.addEventListener('DOMContentLoaded', function () {
    const profilePicture = document.getElementById('profile-picture');
    const menu = document.getElementById('profile-menu');

    profilePicture.addEventListener('click', function () {
        console.log('Profile picture clicked'); // Check if this message appears in the console
        menu.classList.toggle('hidden');
    });

    function loadContent(page) {
        console.log('Loading content:', page); // Check if this message appears in the console
        // Rest of your code...
    }

    function openSettings() {
        loadContent('settings.html');
        menu.classList.add('hidden'); // Close the menu after clicking
    }

    function openYourActivity() {
        loadContent('your-activity.html');
        menu.classList.add('hidden'); // Close the menu after clicking
    }

    // Add event listeners for menu items
    document.querySelectorAll('.menu button').forEach(btn => {
        btn.addEventListener('click', function () {
            console.log('Menu button clicked'); // Check if this message appears in the console
            menu.classList.add('hidden'); // Close the menu after clicking any button
        });
    });
});