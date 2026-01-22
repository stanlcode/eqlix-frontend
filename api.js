// ===================================
// EQLIX MEDIA CREATION - API Configuration
// Configuration des appels API vers le backend
// ===================================

// Auto-detect environment: use localhost for development, production URL for deployed site
const API_BASE_URL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? 'http://localhost:5000/api'
    : 'https://eqlix-backend.onrender.com/api';

// Configuration des headers
const getHeaders = (includeAuth = false) => {
    const headers = {
        'Content-Type': 'application/json',
    };

    if (includeAuth) {
        const token = localStorage.getItem('accessToken');
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }
    }

    return headers;
};

// API Endpoints
const API = {
    // Authentication
    auth: {
        register: async (userData) => {
            const response = await fetch(`${API_BASE_URL}/auth/register`, {
                method: 'POST',
                headers: getHeaders(),
                body: JSON.stringify(userData),
            });
            return response.json();
        },

        login: async (credentials) => {
            const response = await fetch(`${API_BASE_URL}/auth/login`, {
                method: 'POST',
                headers: getHeaders(),
                body: JSON.stringify(credentials),
            });
            const data = await response.json();

            if (data.success) {
                // Sauvegarder les tokens
                localStorage.setItem('accessToken', data.data.accessToken);
                localStorage.setItem('refreshToken', data.data.refreshToken);
                localStorage.setItem('user', JSON.stringify(data.data.user));
            }

            return data;
        },

        logout: async () => {
            const refreshToken = localStorage.getItem('refreshToken');
            const response = await fetch(`${API_BASE_URL}/auth/logout`, {
                method: 'POST',
                headers: getHeaders(true),
                body: JSON.stringify({ refreshToken }),
            });

            // Nettoyer le localStorage
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('user');

            return response.json();
        },

        forgotPassword: async (email) => {
            const response = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
                method: 'POST',
                headers: getHeaders(),
                body: JSON.stringify({ email }),
            });
            return response.json();
        },
    },

    // Contact
    contact: {
        submit: async (contactData) => {
            const response = await fetch(`${API_BASE_URL}/contact`, {
                method: 'POST',
                headers: getHeaders(),
                body: JSON.stringify(contactData),
            });
            return response.json();
        },
    },

    // Upload
    upload: {
        image: async (file) => {
            const formData = new FormData();
            formData.append('file', file);

            const response = await fetch(`${API_BASE_URL}/upload/image`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                },
                body: formData,
            });
            return response.json();
        },

        document: async (file) => {
            const formData = new FormData();
            formData.append('file', file);

            const response = await fetch(`${API_BASE_URL}/upload/document`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
                },
                body: formData,
            });
            return response.json();
        },
    },

    // User
    user: {
        getCurrentUser: () => {
            const userStr = localStorage.getItem('user');
            return userStr ? JSON.parse(userStr) : null;
        },

        isAuthenticated: () => {
            return !!localStorage.getItem('accessToken');
        },
    },
};

// Fonction utilitaire pour gérer les erreurs
const handleAPIError = (error) => {
    console.error('API Error:', error);

    if (error.code === 'INVALID_TOKEN' || error.code === 'NO_TOKEN') {
        // Token invalide, rediriger vers login
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        window.location.href = '/client-space.html';
    }

    return {
        success: false,
        error: error,
    };
};

// Export pour utilisation globale
window.API = API;
window.handleAPIError = handleAPIError;

console.log('✅ API Configuration loaded - Backend: ' + API_BASE_URL);
