import React, { useState } from 'react';
import Modal from 'react-modal';
import '../../styles/BookModal.css';
import { updateGenre, deleteGenre } from '../../services/genreService';

Modal.setAppElement('#root');

const GenreModal = ({ isOpen, onRequestClose, genre, fetchGenres }) => {
    const [name, setName] = useState(genre.genre.name);
    const [message, setMessage] = useState('');

    const handleUpdate = async () => {
        try {
            await updateGenre(genre.id, { name });
            setMessage('Genre updated successfully.');
            fetchGenres();
            onRequestClose();
        } catch (error) {
            console.error('Error updating genre:', error);
            setMessage('Error updating genre.');
        }
    };

    const handleDelete = async () => {
        try {
            await deleteGenre(genre.id);
            setMessage('Genre deleted successfully.');
            fetchGenres();
            onRequestClose();
        } catch (error) {
            console.error('Error deleting genre:', error);
            setMessage('Error deleting genre.');
        }
    };

    if (!genre) return null;

    return (
        <Modal isOpen={isOpen} onRequestClose={onRequestClose} className="book-modal">
            <h2>{genre.genre.name}</h2>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Update Name"
                required
                className="author-modal-input"
            />
            <button onClick={handleUpdate} className="accept-button">Update</button>
            <button onClick={handleDelete} className="reject-button">Delete</button>
            <button onClick={onRequestClose} className="close-button">Close</button>
            {message && <p className="message">{message}</p>}
        </Modal>
    );
};

export default GenreModal;
