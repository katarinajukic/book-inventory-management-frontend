import axios from 'axios';

const API_URL = 'http://localhost:8080/api/v1/books/orders';

const createBookOrder = async (bookTitle, accessToken) => {
  const response = await axios.post(
    `${API_URL}`,
    { bookTitle },
    { headers: { Authorization: `Bearer ${accessToken}` } }
  );
  return response.data;
};

const getBookOrderById = async (orderId, accessToken) => {
  const response = await axios.get(`${API_URL}/${orderId}`, {
    headers: { Authorization: `Bearer ${accessToken}` }
  });
  return response.data;
};

export default {
  createBookOrder,
  getBookOrderById
};
