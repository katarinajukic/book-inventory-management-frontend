import axios from 'axios';
import { getCurrentUser } from './authService';

const API_URL = 'http://localhost:8080/api/v1/admin/books/rentals';

export const fetchRentalRequests = async () => {
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

export const approveRental = async (rentalId) => {
  const currentUser = getCurrentUser();
  if (!currentUser) {
    throw new Error('User not authenticated');
  }
  try {
    const response = await axios.put(`${API_URL}/approve/${rentalId}`, null, {
      headers: {
        'Authorization': `Bearer ${currentUser.accessToken}`
      }
    });
    console.log('Rental Approved:', response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const rejectRental = async (rentalId) => {
  const currentUser = getCurrentUser();
  if (!currentUser) {
    throw new Error('User not authenticated');
  }
  try {
    const response = await axios.put(`${API_URL}/reject/${rentalId}`, null, {
      headers: {
        'Authorization': `Bearer ${currentUser.accessToken}`
      }
    });
    console.log('Rental Rejected:', response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const markReturned = async (rentalId) => {
  const currentUser = getCurrentUser();
  if (!currentUser) {
    throw new Error('User not authenticated');
  }
  try {
    const response = await axios.put(`${API_URL}/return/${rentalId}`, null, {
      headers: {
        'Authorization': `Bearer ${currentUser.accessToken}`
      }
    });
    console.log('Rental Marked as Returned:', response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
};
