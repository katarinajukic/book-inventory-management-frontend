import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getCurrentUser } from '../../services/authService';
import BookOrderService from '../../services/bookOrderService';
import '../../styles/BooksPage.css';
import UserNavbar from '../../navbar/UserNavbar';

const API_URL = 'http://localhost:8080/api/v1/books/orders';

const BookOrders = () => {
  const [bookTitle, setBookTitle] = useState('');
  const [bookOrders, setBookOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const user = getCurrentUser();

  useEffect(() => {
    fetchBookOrders();
  }, []);

  const handleBookOrderSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const newBookOrder = await BookOrderService.createBookOrder(bookTitle, user.accessToken);
      setBookOrders([...bookOrders, newBookOrder]);
      setBookTitle('');
    } catch (error) {
      console.error('Error creating book order:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchBookOrders = async () => {
    setLoading(true);
    try {
      const response = await axios.get(API_URL, {
        headers: { Authorization: `Bearer ${user.accessToken}` }
      });
      setBookOrders(response.data);
    } catch (error) {
      console.error('Error fetching book orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTitleChange = (e) => {
    setBookTitle(e.target.value);
  };

  return (
    <div>
      <UserNavbar />
      <div className="books-page">
        <div className="books-header">
          <h2>Book Orders</h2>
          <form onSubmit={handleBookOrderSubmit}>
            <input
              type="text"
              value={bookTitle}
              onChange={handleTitleChange}
              placeholder="Enter book title"
              required
            />
            <button type="submit" disabled={loading}>
              {loading ? 'Submitting...' : 'Request Book Order'}
            </button>
          </form>
        </div>
        <div className="books-list">
          {loading ? (
            <p>Loading...</p>
          ) : bookOrders.length > 0 ? (
            bookOrders.map(order => (
              <div key={order.id} className="book-item">
                <h3>{order.bookTitle}</h3>
                <p>Status: {order.status}</p>
                <p>Requested Date: {order.requestDate}</p>
              </div>
            ))
          ) : (
            <p>No book orders found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookOrders;