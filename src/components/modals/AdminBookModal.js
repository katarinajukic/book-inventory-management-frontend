import React, { useState } from 'react';
import Modal from 'react-modal';
import '../../styles/BookModal.css';
import UpdateBookModal from '../modals/UpdateBookModal';
import { deleteBook } from '../../services/adminBookService';

Modal.setAppElement('#root');

const AdminBookModal = ({ isOpen, onRequestClose, book, fetchBooks }) => {
    const [message, setMessage] = useState('');
    const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

    const handleDelete = async () => {
        try {
            await deleteBook(book.id);
            fetchBooks(); 
            onRequestClose(); 
        } catch (error) {
            console.error('Error deleting book:', error);
        }
    };

    const openUpdateModal = () => {
        setIsUpdateModalOpen(true);
    };

    const closeUpdateModal = () => {
        setIsUpdateModalOpen(false);
    };

    if (!book) return null;

    return (
        <>
            <Modal isOpen={isOpen} onRequestClose={onRequestClose} className="book-modal">
                <h2>{book.book.title}</h2>
                <p><strong>Summary:</strong> {book.book.summary}</p>
                <p><strong>Author:</strong> {book.authors.map(author => author.fullName).join(', ')}</p>
                <p><strong>Genre:</strong> {book.genres.map(genre => genre.name).join(', ')}</p>
                <button onClick={openUpdateModal} className="accept-button">Update</button>
                <button onClick={handleDelete} className="reject-button">Delete</button>
                <button onClick={onRequestClose} className="close-button">Close</button>
                {message && <p className="message">{message}</p>}
            </Modal>
            {isUpdateModalOpen && (
                <UpdateBookModal
                    isOpen={isUpdateModalOpen}
                    onRequestClose={closeUpdateModal}
                    book={book}
                    fetchBooks={fetchBooks}
                />
            )}
        </>
    );
};

export default AdminBookModal;
