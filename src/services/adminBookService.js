import axios from 'axios';
import { getCurrentUser } from './authService';

const API_URL = 'http://localhost:8080/api/v1/books';

const getAuthHeaders = () => {
    const user = getCurrentUser();
    return {
        headers: { Authorization: `Bearer ${user.accessToken}` }
    };
};

export const createBook = async (book) => {
    const response = await axios.post(API_URL, book, getAuthHeaders());
    return response.data;
};
