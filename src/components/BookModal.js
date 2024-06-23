import React, { useState } from 'react';
import Modal from 'react-modal';
import '../styles/BookModal.css';
import axios from 'axios';
import { getCurrentUser } from '../services/authService';

Modal.setAppElement('#root');

const BookModal = ({ isOpen, onRequestClose, book }) => {
    const [message, setMessage] = useState('');

    const requestRental = async () => {
        const currentUser = getCurrentUser();
        if (currentUser && currentUser.accessToken) {
            try {
                const response = await axios.post('http://localhost:8080/api/v1/books/rentals', 
                    { bookId: book.id },
                    { headers: { Authorization: `Bearer ${currentUser.accessToken}` } }
                );
                setMessage('You requested to rent this book. You will get an email when that rental has been approved.');
            } catch (error) {
                console.error('Error requesting rental:', error);
                setMessage('You already requested to rent this book!');
            }
        } else {
            setMessage('You must be logged in to request a rental.');
        }
    };

    if (!book) return null;

    return (
        <Modal isOpen={isOpen} onRequestClose={onRequestClose} className="book-modal">
            <h2>{book.book.title}</h2>
            <p><strong>Summary:</strong> {book.book.summary}</p>
            <p><strong>Author:</strong> {book.authors.map(author => author.fullName).join(', ')}</p>
            <p><strong>Genre:</strong> {book.genres.map(genre => genre.name).join(', ')}</p>
            <button onClick={onRequestClose} className="close-button">Close</button>
            <button onClick={requestRental} className="rental-button">Request for Rental</button>
            {message && <p className="message">{message}</p>}
        </Modal>
    );
};

export default BookModal;
