import axios from 'axios';
import { getCurrentUser } from './authService';

const API_URL = 'http://localhost:8080/api/v1/authors';

const getAuthHeaders = () => {
    const user = getCurrentUser();
    return {
        headers: { Authorization: `Bearer ${user.accessToken}` }
    };
};

export const createAuthor = async (author) => {
    const response = await axios.post(API_URL, author, getAuthHeaders());
    return response.data;
};

export const updateAuthor = async (authorId, author) => {
    const response = await axios.put(`${API_URL}/${authorId}`, author, getAuthHeaders());
    return response.data;
};

export const deleteAuthor = async (authorId) => {
    await axios.delete(`${API_URL}/${authorId}`, getAuthHeaders());
};

export const getAuthorById = async (authorId) => {
    const response = await axios.get(`${API_URL}/${authorId}`, getAuthHeaders());
    return response.data;
};

export const getAllAuthors = async () => {
    const response = await axios.get(API_URL, getAuthHeaders());
    return response.data;
};