import React, { useState } from 'react';
import Modal from 'react-modal';
import '../../styles/BookModal.css';
import axios from 'axios';
import { getCurrentUser } from '../../services/authService';

Modal.setAppElement('#root');

const AdminBookModal = ({ isOpen, onRequestClose, book }) => {
    const [message, setMessage] = useState('');

    const handleUpdate = () => {
        setMessage('Update functionality not implemented yet.');
    };

    const handleDelete = async () => {
        const currentUser = getCurrentUser();
        if (currentUser && currentUser.accessToken) {
            try {
                await axios.delete(`http://localhost:8080/api/v1/books/${book.id}`, {
                    headers: { Authorization: `Bearer ${currentUser.accessToken}` }
                });
                setMessage('Book deleted successfully.');
                onRequestClose();
            } catch (error) {
                console.error('Error deleting book:', error);
                setMessage('Error deleting book.');
            }
        } else {
            setMessage('You must be logged in to delete a book.');
        }
    };

    if (!book) return null;

    return (
        <Modal isOpen={isOpen} onRequestClose={onRequestClose} className="book-modal">
            <h2>{book.book.title}</h2>
            <p><strong>Summary:</strong> {book.book.summary}</p>
            <p><strong>Author:</strong> {book.authors.map(author => author.fullName).join(', ')}</p>
            <p><strong>Genre:</strong> {book.genres.map(genre => genre.name).join(', ')}</p>
            <button onClick={handleUpdate} className="accept-button">Update</button>
            <button onClick={handleDelete} className="reject-button">Delete</button>
            <button onClick={onRequestClose} className="close-button">Close</button>
            {message && <p className="message">{message}</p>}
        </Modal>
    );
};

export default AdminBookModal;
