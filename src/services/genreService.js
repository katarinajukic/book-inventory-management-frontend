import axios from 'axios';
import { getCurrentUser } from './authService';

const API_URL = 'http://localhost:8080/api/v1/genres';

const getAuthHeaders = () => {
    const user = getCurrentUser();
    return {
        headers: { Authorization: `Bearer ${user.accessToken}` }
    };
};

export const createGenre = async (genre) => {
    const response = await axios.post(API_URL, genre, getAuthHeaders());
    return response.data;
};

export const updateGenre = async (genreId, genre) => {
    const response = await axios.put(`${API_URL}/${genreId}`, genre, getAuthHeaders());
    return response.data;
};

export const deleteGenre = async (genreId) => {
    await axios.delete(`${API_URL}/${genreId}`, getAuthHeaders());
};

export const getGenreById = async (genreId) => {
    const response = await axios.get(`${API_URL}/${genreId}`, getAuthHeaders());
    return response.data;
};

export const getAllGenres = async () => {
    const response = await axios.get(API_URL, getAuthHeaders());
    return response.data;
};