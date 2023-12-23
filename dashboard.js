document.addEventListener('DOMContentLoaded', function () {
    var profilePicture = document.getElementById('profile-picture');
    var menuContainer = document.getElementById('menu-container');

    // Your account button and submenu
    var accountBtn = document.getElementById('account-btn');
    var accountMenu = document.getElementById('account-menu');

    // Notifications button and submenu
    var notificationsBtn = document.getElementById('notifications-btn');
    var notificationsMenu = document.getElementById('notifications-menu');

    // Change Email button click event
    document.getElementById('change-email-btn').addEventListener('click', function () {
        // Show the email modal
        var emailModal = document.getElementById('email-modal');
        emailModal.style.display = 'block';
        centerModal(emailModal);
    });

    // Add click event listener to the "Close" button in the modal
    document.getElementById('close-email-btn-modal').addEventListener('click', function () {
        closeEmailModal();
    });

    // Add click event listener to the "Change Email" button in the modal
    document.getElementById('change-email-btn').addEventListener('click', function () {
        console.log('Change Email button clicked');  // Add this line
        // Show the email modal
        var emailModal = document.getElementById('email-modal');
        emailModal.style.display = 'block';
        centerModal(emailModal);
    });

    // Function to handle changing email
    function changeEmail() {
        var newEmailInput = document.getElementById('new-email');
        var newEmail = newEmailInput.value;
    
        // Validate the new email (you may want to add more robust validation)
        if (newEmail && isValidEmail(newEmail)) {
            // Perform the logic to update the email on the server
            // For now, we'll just log the new email to the console
            console.log('New Email:', newEmail);
            alert('Email changed successfully!');
    
            // Close the modal after changing email
            closeEmailModal();
        } else {
            // Handle invalid email
            alert('Invalid email format');
        }
    }

    // Function to validate email format
    function isValidEmail(email) {
        // Basic email validation (you may want to improve this)
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Function to center the modal on the screen
    function centerModal(modal) {
        var windowWidth = window.innerWidth;
        var windowHeight = window.innerHeight;
        var modalWidth = modal.offsetWidth;
        var modalHeight = modal.offsetHeight;

        var leftPosition = (windowWidth - modalWidth) / 2;
        var topPosition = (windowHeight - modalHeight) / 2;

        modal.style.left = leftPosition + 'px';
        modal.style.top = topPosition + 'px';
    }

    // Function to close the email modal
    function closeEmailModal() {
        var emailModal = document.getElementById('email-modal');
        emailModal.style.display = 'none';
    }

    // Voeg een click event listener toe aan de profielfoto
    profilePicture.addEventListener('click', function () {
        // Toggle de 'hidden' klasse van het menu-container om het te tonen/verbergen
        menuContainer.classList.toggle('hidden');

        if (!menuContainer.classList.contains('hidden')) {
            adjustMenuPosition(menuContainer);
        }
    });

    // Your account button click event
    accountBtn.addEventListener('click', function () {
        // Toggle the 'hidden' class of the account submenu
        accountMenu.classList.toggle('hidden');

        if (!accountMenu.classList.contains('hidden')) {
            adjustMenuPosition(accountMenu);
        }
    });

    // Notifications button click event
    notificationsBtn.addEventListener('click', function () {
        // Toggle the 'hidden' class of the notifications submenu
        notificationsMenu.classList.toggle('hidden');

        if (!notificationsMenu.classList.contains('hidden')) {
            adjustMenuPosition(notificationsMenu);
        }
    });

    // Function to adjust menu position
    function adjustMenuPosition(menu) {
        var rect = menu.getBoundingClientRect();
        var windowWidth = window.innerWidth;
        var menuWidth = menu.offsetWidth;
        var offset = 50; // Adjust this value based on your preference

        // Calculate the new position
        var newPosition = windowWidth - rect.right - menuWidth - offset;

        // Set the new left position
        menu.style.left = newPosition + 'px';
    }
});
