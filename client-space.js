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
    clientLoginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(clientLoginForm);
        const data = Object.fromEntries(formData);
        console.log('Client login submitted:', data);

        // Simulate login process
        // In production, this would make an API call
        setTimeout(() => {
            alert('Connexion réussie ! Redirection vers le tableau de bord...');
            window.location.href = 'dashboard.html';
        }, 1000);
    });
}

console.log('EQLIX Client Space - Loaded successfully! 🔐');
