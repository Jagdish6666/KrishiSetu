import axios from 'axios';

const API_BASE_URL = '/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add a request interceptor to add the JWT token to headers
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export const authService = {
    login: async (email, password) => {
        const response = await api.post('/auth/login', { email, password });
        if (response.data.data.token) {
            localStorage.setItem('token', response.data.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.data));
        }
        return response.data;
    },
    register: async (userData) => {
        const response = await api.post('/auth/register', userData);
        return response.data;
    },
    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    },
    getCurrentUser: () => {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    }
};

export const farmerService = {
    addCrop: async (cropData) => {
        const response = await api.post('/farmer/crop', cropData);
        return response.data;
    },
    getCrops: async () => {
        const response = await api.get('/farmer/crops');
        return response.data;
    },
    getOffers: async () => {
        const response = await api.get('/farmer/offers');
        return response.data;
    },
    checkEligibility: async (criteria) => {
        const response = await api.post('/farmer/check-eligibility', criteria);
        return response.data;
    }
};

export const buyerService = {
    getAllCrops: async (location = '') => {
        const response = await api.get(`/buyer/crops${location ? `?location=${location}` : ''}`);
        return response.data;
    },
    placeOffer: async (offerData) => {
        const response = await api.post('/buyer/offer', offerData);
        return response.data;
    },
    getMyOffers: async () => {
        const response = await api.get('/buyer/offers');
        return response.data;
    }
};

export default api;
