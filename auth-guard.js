// ===================================
// AUTH GUARD - Route Protection
// Protects pages that require authentication
// ===================================

// Check if user is logged in
function isLoggedIn() {
    const token = localStorage.getItem('accessToken');
    return !!token;
}

// Get current user from localStorage
function getCurrentUser() {
    const userStr = localStorage.getItem('user');
    if (userStr) {
        try {
            return JSON.parse(userStr);
        } catch (e) {
            return null;
        }
    }
    return null;
}

// Redirect to login if not authenticated
if (!isLoggedIn()) {
    // Store the current page to redirect back after login
    sessionStorage.setItem('redirectAfterLogin', window.location.pathname);
    window.location.href = 'client-space.html';
}

console.log('Auth Guard - User authenticated ✓');
