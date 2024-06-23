import axios from 'axios';

const API_URL = 'http://localhost:8080';

export const login = async (username, password) => {
    try {
        const response = await axios.post(`${API_URL}/login`, { username, password });
        if (response.data.accessToken) {
            localStorage.setItem('accessToken', response.data.accessToken);
        }
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const register = async (user) => {
    try {
        const response = await axios.post(`${API_URL}/register`, user);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getCurrentUser = () => {
    const accessToken = localStorage.getItem('accessToken');
    if(!accessToken) {
        return null;
    }
    return {
        accessToken
    }
};

export const logout = () => {
    localStorage.removeItem('accessToken');
};
