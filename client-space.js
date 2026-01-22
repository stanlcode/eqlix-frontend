// ===================================
// CLIENT SPACE PAGE - JavaScript
// Login Form Handling
// ===================================

// ===== PASSWORD TOGGLE =====
const clientPasswordToggle = document.getElementById('client-password-toggle');
const clientPasswordInput = document.getElementById('client-password');

if (clientPasswordToggle && clientPasswordInput) {
    clientPasswordToggle.addEventListener('click', () => {
        const eyeIcon = clientPasswordToggle.querySelector('.eye-icon');
        const eyeOffIcon = clientPasswordToggle.querySelector('.eye-off-icon');

        if (clientPasswordInput.type === 'password') {
            clientPasswordInput.type = 'text';
            if (eyeIcon) eyeIcon.style.display = 'none';
            if (eyeOffIcon) eyeOffIcon.style.display = 'block';
        } else {
            clientPasswordInput.type = 'password';
            if (eyeIcon) eyeIcon.style.display = 'block';
            if (eyeOffIcon) eyeOffIcon.style.display = 'none';
        }
    });
}

// ===== LOGIN FORM SUBMISSION =====
const clientLoginForm = document.getElementById('client-login-form');

if (clientLoginForm) {
    clientLoginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(clientLoginForm);
        const data = {
            email: formData.get('email'),
            password: formData.get('password')
        };

        // Disable submit button
        const submitBtn = clientLoginForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.textContent = 'Connexion...';

        try {
            // Call login API
            const response = await API.auth.login(data);

            if (response.success) {
                // Check if there's a redirect URL
                const redirectUrl = sessionStorage.getItem('redirectAfterLogin') || 'dashboard.html';
                sessionStorage.removeItem('redirectAfterLogin');

                // Redirect to dashboard or saved page
                window.location.href = redirectUrl;
            } else {
                alert(response.error?.message || 'Email ou mot de passe incorrect.');
                submitBtn.disabled = false;
                submitBtn.textContent = originalText;
            }
        } catch (error) {
            console.error('Error during login:', error);
            alert('Erreur de connexion. Veuillez réessayer.');
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }
    });
}

console.log('EQLIX Client Space - Loaded successfully! 🔐');
