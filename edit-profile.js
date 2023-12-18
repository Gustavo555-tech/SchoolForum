document.addEventListener("DOMContentLoaded", function () {
    const editProfileForm = document.getElementById("edit-profile-form");

    if (editProfileForm) {
        editProfileForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const formData = new FormData(editProfileForm);

            // Perform AJAX request to update profile picture
            fetch('http://localhost:5500/api/update-profile', {
                method: 'POST',
                body: formData,
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Failed to update profile picture');
                    }
                    return response.json();
                })
                .then(data => {
                    // Handle successful update, e.g., show a success message
                    console.log('Profile picture updated successfully');
                })
                .catch(error => {
                    console.error('Update Profile Error:', error);
                    // Handle update failure, show an error message, etc.
                });
        });
    }
});
