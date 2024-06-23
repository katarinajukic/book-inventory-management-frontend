import React, { useState } from 'react';
import Modal from 'react-modal';
import '../../styles/BookModal.css';

Modal.setAppElement('#root');

const RentalModal = ({ isOpen, onRequestClose, rental }) => {

    const handleDone = () => {
        onRequestClose();
    };

    if (!rental) return null;

    return (
        <Modal isOpen={isOpen} onRequestClose={onRequestClose} className="book-modal">
            <h2>{rental.book.title}</h2>
            <p><strong>Status:</strong> {rental.status}</p>
            <p><strong>Start date:</strong> {rental.startDate}</p>
            <p><strong>End date:</strong> {rental.endDate}</p>
            <button onClick={handleDone} className="close-button">Close</button>
        </Modal>
    );
};

export default RentalModal;