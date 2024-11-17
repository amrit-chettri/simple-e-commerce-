// Auth state management
class Auth {
    static isAuthenticated() {
        return localStorage.getItem('access_token') !== null;
    }

    static getToken() {
        return localStorage.getItem('access_token');
    }

    static setTokens(access, refresh) {
        localStorage.setItem('access_token', access);
        localStorage.setItem('refresh_token', refresh);
    }

    static clearTokens() {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
    }

    static async refreshToken() {
        try {
            const refresh = localStorage.getItem('refresh_token');
            if (!refresh) throw new Error('No refresh token');

            const response = await fetch('/api/token/refresh/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ refresh }),
            });

            if (!response.ok) throw new Error('Token refresh failed');

            const data = await response.json();
            localStorage.setItem('access_token', data.access);
            return data.access;
        } catch (error) {
            Auth.clearTokens();
            window.location.href = '/login';
            return null;
        }
    }
}

// Update navigation based on auth state
function updateNavigation() {
    const authLinks = document.getElementById('authLinks');
    if (Auth.isAuthenticated()) {
        authLinks.innerHTML = `
            <li class="nav-item">
                <a class="nav-link" href="/home/profile">Profile</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="#" onclick="logout()">Logout</a>
            </li>
        `;
    } else {
        authLinks.innerHTML = `
            <li class="nav-item">
                <a class="nav-link" href="/login">Login</a>
            </li>
            <li class="nav-item">
                <a class="nav-link" href="/register">Register</a>
            </li>
        `;
    }
}

// Logout function
async function logout() {
    Auth.clearTokens();
    window.location.href = '/login';
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', updateNavigation);