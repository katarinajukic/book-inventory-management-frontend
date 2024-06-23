import axios from 'axios';
import { getCurrentUser } from './authService';

const API_URL = 'http://localhost:8080/api/v1/admin/books/orders';

export const fetchBookOrders = async () => {
    const currentUser = getCurrentUser();
    if (!currentUser) {
        throw new Error('User not authenticated');
    }
    try {
        const response = await axios.get(API_URL, {
            headers: {
                'Authorization': `Bearer ${currentUser.accessToken}`
            }
        });
        console.log('API Response:', response.data);
        return response.data.content;
    } catch (error) {
        throw error;
    }
};

export const acceptBookOrder = async (orderId) => {
    const currentUser = getCurrentUser();
    if (!currentUser) {
        throw new Error('User not authenticated');
    }
    try {
        const response = await axios.put(`${API_URL}/accept/${orderId}`, null, {
            headers: {
                'Authorization': `Bearer ${currentUser.accessToken}`
            }
        });
        console.log('Accept Order Response:', response.data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const rejectBookOrder = async (orderId) => {
    const currentUser = getCurrentUser();
    if (!currentUser) {
        throw new Error('User not authenticated');
    }
    try {
        const response = await axios.put(`${API_URL}/reject/${orderId}`, null, {
            headers: {
                'Authorization': `Bearer ${currentUser.accessToken}`
            }
        });
        console.log('Reject Order Response:', response.data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const markBookOrderAsDone = async (orderId) => {
    const currentUser = getCurrentUser();
    if (!currentUser) {
        throw new Error('User not authenticated');
    }
    try {
        const response = await axios.put(`${API_URL}/done/${orderId}`, null, {
            headers: {
                'Authorization': `Bearer ${currentUser.accessToken}`
            }
        });
        console.log('Mark as Done Response:', response.data);
        return response.data;
    } catch (error) {
        throw error;
    }
};