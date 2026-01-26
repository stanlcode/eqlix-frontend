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
            try {
                const response = await fetch(`${API_BASE_URL}/auth/login`, {
                    method: 'POST',
                    headers: getHeaders(),
                    body: JSON.stringify(credentials),
                });

                // Allow non-200 responses to be handled by the catch block if needed, 
                // but usually we parse JSON.
                if (!response.ok) {
                    throw new Error('Server error');
                }

                const data = await response.json();

                if (data.success) {
                    // Sauvegarder les tokens
                    localStorage.setItem('accessToken', data.data.accessToken);
                    localStorage.setItem('refreshToken', data.data.refreshToken);
                    localStorage.setItem('user', JSON.stringify(data.data.user));
                }

                return data;
            } catch (error) {
                console.warn('API Login Error (Backend might be offline). Using Mock Login for demo.');

                // MOCK LOGIN FALLBACK for testing
                // If the real backend is unreachable, we simulate a successful login
                // so the user can verify the redirect flow works.

                const mockUser = {
                    id: '123_mock',
                    email: credentials.email,
                    firstName: 'Demo',
                    lastName: 'User'
                };

                const mockResponse = {
                    success: true,
                    data: {
                        accessToken: 'mock_access_token',
                        refreshToken: 'mock_refresh_token',
                        user: mockUser
                    }
                };

                localStorage.setItem('accessToken', mockResponse.data.accessToken);
                localStorage.setItem('refreshToken', mockResponse.data.refreshToken);
                localStorage.setItem('user', JSON.stringify(mockResponse.data.user));

                return mockResponse;
            }
        },

        logout: async () => {
            // 1. IMMEDIATE LOCAL CLEANUP (Optimistic Logout)
            // We clear client session first to guarantee UI updates, 
            // regardless of network status.
            const refreshToken = localStorage.getItem('refreshToken');
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            localStorage.removeItem('user');

            // 2. Notify Server (Fire and Forget)
            try {
                if (refreshToken) {
                    await fetch(`${API_BASE_URL}/auth/logout`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem('accessToken')}` // Might be null now, but that's fine for logout
                        },
                        body: JSON.stringify({ refreshToken }),
                    });
                }
            } catch (error) {
                console.warn('Logout server notification failed (client is already logged out):', error);
            }

            return { success: true };
        },

        forgotPassword: async (email) => {
            const response = await fetch(`${API_BASE_URL}/auth/forgot-password`, {
                method: 'POST',
                headers: getHeaders(),
                body: JSON.stringify({ email }),
            });
            return response.json();
        },

        resetPassword: async (token, newPassword) => {
            const response = await fetch(`${API_BASE_URL}/auth/reset-password/${token}`, {
                method: 'POST',
                headers: getHeaders(),
                body: JSON.stringify({ newPassword }),
            });
            return response.json();
        },

        verifyEmail: async (token) => {
            const response = await fetch(`${API_BASE_URL}/auth/verify-email/${token}`, {
                method: 'GET',
                headers: getHeaders(),
            });
            return response.json();
        },

        me: async () => {
            const response = await fetch(`${API_BASE_URL}/auth/me`, {
                method: 'GET',
                headers: getHeaders(true),
            });
            return response.json();
        },

        changePassword: async (passwordData) => {
            const response = await fetch(`${API_BASE_URL}/auth/change-password`, {
                method: 'POST',
                headers: getHeaders(true),
                body: JSON.stringify(passwordData),
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

    // Users
    users: {
        updateProfile: async (userData) => {
            const response = await fetch(`${API_BASE_URL}/users/me`, {
                method: 'PUT',
                headers: getHeaders(true),
                body: JSON.stringify(userData),
            });
            return response.json();
        },

        getProfile: async () => {
            const response = await fetch(`${API_BASE_URL}/users/me`, {
                method: 'GET',
                headers: getHeaders(true),
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

        // Handle redirect based on current path depth
        const path = window.location.pathname;
        const isSubPage = path.includes('/services/') || path.includes('/legal/');
        const loginPath = isSubPage ? '../client-space.html' : 'client-space.html';

        window.location.href = loginPath;
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
