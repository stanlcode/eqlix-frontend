// ===================================
// REGISTER PAGE - JavaScript
// Registration Form Handling
// ===================================

// ===== PASSWORD TOGGLE =====
const passwordToggle = document.getElementById('password-toggle');
const passwordInput = document.getElementById('password');
const confirmPasswordToggle = document.getElementById('confirm-password-toggle');
const confirmPasswordInput = document.getElementById('confirmPassword');

// Toggle password visibility
function setupPasswordToggle(toggleBtn, inputField) {
    if (toggleBtn && inputField) {
        toggleBtn.addEventListener('click', () => {
            const eyeIcon = toggleBtn.querySelector('.eye-icon');
            const eyeOffIcon = toggleBtn.querySelector('.eye-off-icon');

            if (inputField.type === 'password') {
                inputField.type = 'text';
                if (eyeIcon) eyeIcon.style.display = 'none';
                if (eyeOffIcon) eyeOffIcon.style.display = 'block';
            } else {
                inputField.type = 'password';
                if (eyeIcon) eyeIcon.style.display = 'block';
                if (eyeOffIcon) eyeOffIcon.style.display = 'none';
            }
        });
    }
}

setupPasswordToggle(passwordToggle, passwordInput);
setupPasswordToggle(confirmPasswordToggle, confirmPasswordInput);

// ===== REGISTRATION FORM SUBMISSION =====
const registerForm = document.getElementById('register-form');
const registerSuccess = document.getElementById('register-success');

if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Get form data
        const formData = new FormData(registerForm);
        const data = {
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            email: formData.get('email'),
            phone: formData.get('phone') || '',
            company: formData.get('company') || '',
            password: formData.get('password'),
            confirmPassword: formData.get('confirmPassword')
        };

        // Validate passwords match
        if (data.password !== data.confirmPassword) {
            alert('Les mots de passe ne correspondent pas. Veuillez réessayer.');
            return;
        }

        // Validate password length
        if (data.password.length < 6) {
            alert('Le mot de passe doit contenir au moins 6 caractères.');
            return;
        }

        // Check terms acceptance
        const termsAccepted = formData.get('terms');
        if (!termsAccepted) {
            alert('Vous devez accepter les conditions générales pour créer un compte.');
            return;
        }

        // Disable submit button
        const submitBtn = registerForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.textContent = 'Création en cours...';

        try {
            // Call API to register
            const response = await API.auth.register({
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                phone: data.phone,
                company: data.company,
                password: data.password
            });

            if (response.success) {
                // Hide form and show success message
                registerForm.style.display = 'none';
                registerSuccess.style.display = 'block';

                // Store tokens
                if (response.data.accessToken) {
                    localStorage.setItem('accessToken', response.data.accessToken);
                }
                if (response.data.refreshToken) {
                    localStorage.setItem('refreshToken', response.data.refreshToken);
                }
                if (response.data.user) {
                    localStorage.setItem('user', JSON.stringify(response.data.user));
                }

                // Redirect to dashboard after 2 seconds
                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 2000);
            } else {
                // Show error message
                const errorMessage = response.error?.message || 'Une erreur est survenue lors de l\'inscription.';
                alert(errorMessage);

                // Re-enable submit button
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            }
        } catch (error) {
            console.error('Error during registration:', error);

            // Handle specific error cases
            let errorMessage = 'Erreur de connexion. Veuillez réessayer.';

            if (error.message && error.message.includes('email')) {
                errorMessage = 'Cet email est déjà utilisé. Veuillez vous connecter ou utiliser un autre email.';
            }

            alert(errorMessage);

            // Re-enable submit button
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }
    });
}

// ===== REAL-TIME PASSWORD VALIDATION =====
if (passwordInput && confirmPasswordInput) {
    confirmPasswordInput.addEventListener('input', () => {
        if (confirmPasswordInput.value && passwordInput.value !== confirmPasswordInput.value) {
            confirmPasswordInput.setCustomValidity('Les mots de passe ne correspondent pas');
        } else {
            confirmPasswordInput.setCustomValidity('');
        }
    });

    passwordInput.addEventListener('input', () => {
        if (confirmPasswordInput.value && passwordInput.value !== confirmPasswordInput.value) {
            confirmPasswordInput.setCustomValidity('Les mots de passe ne correspondent pas');
        } else {
            confirmPasswordInput.setCustomValidity('');
        }
    });
}

console.log('EQLIX Register Page - Loaded successfully! 📝');
