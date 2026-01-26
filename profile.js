// ===================================
// PROFILE PAGE - JavaScript
// User Profile Management
// ===================================

let currentUser = null;

// ===== LOAD USER PROFILE =====
async function loadUserProfile() {
    // Check Auth
    if (!window.API || !window.API.user.isAuthenticated()) {
        window.location.href = 'index.html';
        return;
    }

    try {
        // Try to get user from localStorage first
        const userStr = localStorage.getItem('user');
        if (userStr) {
            currentUser = JSON.parse(userStr);
            displayUserProfile(currentUser);
        }

        // Fetch fresh data from API
        const response = await API.auth.me();

        if (response.success && response.data) {
            currentUser = response.data;
            // Update localStorage
            localStorage.setItem('user', JSON.stringify(currentUser));
            displayUserProfile(currentUser);
        }
    } catch (error) {
        console.error('Error loading user profile:', error);
        // If token is invalid, redirect to login
        if (error.status === 401) {
            localStorage.clear();
            window.location.href = 'client-space.html';
        }
    }
}

// ===== DISPLAY USER PROFILE =====
function displayUserProfile(user) {
    document.getElementById('display-firstName').textContent = user.firstName || '-';
    document.getElementById('display-lastName').textContent = user.lastName || '-';
    document.getElementById('display-email').textContent = user.email || '-';
    document.getElementById('display-phone').textContent = user.phone || '-';
    document.getElementById('display-company').textContent = user.company || '-';

    // Format date
    if (user.createdAt) {
        const date = new Date(user.createdAt);
        document.getElementById('display-createdAt').textContent = date.toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }
}

// ===== EDIT PROFILE =====
const editProfileBtn = document.getElementById('edit-profile-btn');
const profileView = document.getElementById('profile-view');
const profileEditForm = document.getElementById('profile-edit-form');
const cancelEditBtn = document.getElementById('cancel-edit-btn');

if (editProfileBtn) {
    editProfileBtn.addEventListener('click', () => {
        // Populate form with current values
        document.getElementById('edit-firstName').value = currentUser.firstName || '';
        document.getElementById('edit-lastName').value = currentUser.lastName || '';
        document.getElementById('edit-email').value = currentUser.email || '';
        document.getElementById('edit-phone').value = currentUser.phone || '';
        document.getElementById('edit-company').value = currentUser.company || '';

        // Show form, hide view
        profileView.style.display = 'none';
        profileEditForm.style.display = 'block';
        editProfileBtn.style.display = 'none';
    });
}

if (cancelEditBtn) {
    cancelEditBtn.addEventListener('click', () => {
        // Show view, hide form
        profileView.style.display = 'block';
        profileEditForm.style.display = 'none';
        editProfileBtn.style.display = 'inline-flex';
    });
}

// ===== SAVE PROFILE CHANGES =====
if (profileEditForm) {
    profileEditForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(profileEditForm);
        const data = {
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            email: formData.get('email'),
            phone: formData.get('phone') || '',
            company: formData.get('company') || ''
        };

        // Disable submit button
        const submitBtn = profileEditForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.textContent = 'Enregistrement...';

        try {
            const response = await API.users.updateProfile(data);

            if (response.success) {
                // Update current user
                currentUser = { ...currentUser, ...data };
                localStorage.setItem('user', JSON.stringify(currentUser));

                // Display updated profile
                displayUserProfile(currentUser);

                // Show view, hide form
                profileView.style.display = 'block';
                profileEditForm.style.display = 'none';
                editProfileBtn.style.display = 'inline-flex';

                alert('Profil mis à jour avec succès !');
            } else {
                alert(response.error?.message || 'Erreur lors de la mise à jour du profil.');
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            alert('Erreur de connexion. Veuillez réessayer.');
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }
    });
}

// ===== CHANGE PASSWORD =====
const passwordChangeForm = document.getElementById('password-change-form');

if (passwordChangeForm) {
    passwordChangeForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(passwordChangeForm);
        const currentPassword = formData.get('currentPassword');
        const newPassword = formData.get('newPassword');
        const confirmNewPassword = formData.get('confirmNewPassword');

        // Validate passwords match
        if (newPassword !== confirmNewPassword) {
            alert('Les nouveaux mots de passe ne correspondent pas.');
            return;
        }

        // Validate password length
        if (newPassword.length < 6) {
            alert('Le nouveau mot de passe doit contenir au moins 6 caractères.');
            return;
        }

        // Disable submit button
        const submitBtn = passwordChangeForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.textContent = 'Changement en cours...';

        try {
            const response = await API.auth.changePassword({
                currentPassword,
                newPassword
            });

            if (response.success) {
                alert('Mot de passe changé avec succès !');
                passwordChangeForm.reset();
            } else {
                alert(response.error?.message || 'Erreur lors du changement de mot de passe.');
            }
        } catch (error) {
            console.error('Error changing password:', error);
            alert('Erreur de connexion. Veuillez réessayer.');
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }
    });
}

// ===== LOGOUT =====
const logoutBtn = document.getElementById('logout-btn');

if (logoutBtn) {
    logoutBtn.addEventListener('click', async () => {
        if (confirm('Êtes-vous sûr de vouloir vous déconnecter ?')) {
            try {
                // Call logout API
                await API.auth.logout();
            } catch (error) {
                console.error('Error during logout:', error);
            } finally {
                // Clear local storage
                localStorage.clear();
                sessionStorage.clear();

                // Redirect to home
                window.location.href = 'index.html';
            }
        }
    });
}

// Load profile on page load
document.addEventListener('DOMContentLoaded', () => {
    loadUserProfile();
});

console.log('EQLIX Profile Page - Loaded successfully! 👤');
