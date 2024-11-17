class API {
    static async request(endpoint, options = {}) {
        const token = Auth.getToken();
        
        if (!options.headers) {
            options.headers = {};
        }
        
        if (token) {
            options.headers['Authorization'] = `Bearer ${token}`;
        }
        
        options.headers['Content-Type'] = options.headers['Content-Type'] || 'application/json';

        try {
            let response = await fetch(`/home/api/${endpoint}`, options);
            
            if (response.status === 401) {
                const newToken = await Auth.refreshToken();
                if (newToken) {
                    options.headers['Authorization'] = `Bearer ${newToken}`;
                    response = await fetch(`/home/api/${endpoint}`, options);
                }
            }

            if (!response.ok) {
                throw new Error(`API Error: ${response.statusText}`);
            }

            return await response.json();
        } catch (error) {
            console.error('API Error:', error);
            throw error;
        }
    }

    // Profile endpoints
    static async getProfile() {
        return await this.request('profile/');
    }

    static async updateProfile(data) {
        const formData = new FormData();
        for (const [key, value] of Object.entries(data)) {
            formData.append(key, value);
        }
        return await this.request('profile/', {
            method: 'PUT',
            headers: {},  // Let browser set content-type for FormData
            body: formData
        });
    }

    // Product endpoints
    static async getProducts(search = '', ordering = '') {
        let url = 'product/';
        const params = new URLSearchParams();
        if (search) params.append('search', search);
        if (ordering) params.append('ordering', ordering);
        if (params.toString()) url += `?${params.toString()}`;
        return await this.request(url);
    }

    static async getProduct(id) {
        return await this.request(`product/${id}/`);
    }

    static async createProduct(data) {
        const formData = new FormData();
        for (const [key, value] of Object.entries(data)) {
            formData.append(key, value);
        }
        return await this.request('product/', {
            method: 'POST',
            headers: {},
            body: formData
        });
    }

    static async updateProduct(id, data) {
        const formData = new FormData();
        for (const [key, value] of Object.entries(data)) {
            formData.append(key, value);
        }
        return await this.request(`product/${id}/`, {
            method: 'PUT',
            headers: {},
            body: formData
        });
    }

    static async deleteProduct(id) {
        return await this.request(`product/${id}/`, {
            method: 'DELETE'
        });
    }

    // Cart endpoints
    static async getCart() {
        return await this.request('cart/');
    }

    static async addToCart(productId) {
        return await this.request('cart/', {
            method: 'POST',
            body: JSON.stringify({ product: productId })
        });
    }

    static async removeFromCart(cartItemId) {
        return await this.request(`cart/${cartItemId}/`, {
            method: 'DELETE'
        });
    }
}