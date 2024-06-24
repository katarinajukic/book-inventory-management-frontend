import React, { useState } from 'react';
import Modal from 'react-modal';
import '../../styles/BookModal.css';
import { updateAuthor, deleteAuthor } from '../../services/authorService';

Modal.setAppElement('#root');

const AuthorModal = ({ isOpen, onRequestClose, author, fetchAuthors }) => {
    const [newFullName, setNewFullName] = useState(author ? author.author.fullName : '');

    const handleUpdate = async () => {
        try {
            await updateAuthor(author.id, { fullName: newFullName });
            setNewFullName('');
            fetchAuthors(); // Refresh the author list
            onRequestClose(); // Close the modal
        } catch (error) {
            console.error('Error updating author:', error);
        }
    };

    const handleDelete = async () => {
        try {
            await deleteAuthor(author.id);
            fetchAuthors(); // Refresh the author list
            onRequestClose(); // Close the modal
        } catch (error) {
            console.error('Error deleting author:', error);
        }
    };

    if (!author) return null;

    return (
        <Modal isOpen={isOpen} onRequestClose={onRequestClose} className="book-modal">
            <h2>{author.author.fullName}</h2>
            <input
                type="text"
                value={newFullName}
                onChange={(e) => setNewFullName(e.target.value)}
                placeholder="Update Full Name"
                required
                className="author-modal-input"
            />
            <div className="modal-buttons">
                <button onClick={handleUpdate} className="accept-button">Update</button>
                <button onClick={handleDelete} className="reject-button">Delete</button>
                <button onClick={onRequestClose} className="close-button">Close</button>
            </div>
        </Modal>
    );
};

export default AuthorModal;
