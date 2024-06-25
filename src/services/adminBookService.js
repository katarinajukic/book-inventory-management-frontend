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

export const updateBook = async (bookId, book) => {
    const response = await axios.put(`${API_URL}/${bookId}`, book, getAuthHeaders());
    return response.data;
};

export const deleteBook = async (bookId) => {
    await axios.delete(`${API_URL}/${bookId}`, getAuthHeaders());
};

export const getBookById = async (bookId) => {
    const response = await axios.get(`${API_URL}/${bookId}`, getAuthHeaders());
    return response.data;
};

export const getAllBooks = async () => {
    const response = await axios.get(API_URL, getAuthHeaders());
    return response.data;
};