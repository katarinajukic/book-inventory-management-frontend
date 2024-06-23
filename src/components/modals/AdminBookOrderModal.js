import React from 'react';
import Modal from 'react-modal';
import '../../styles/BookModal.css';

Modal.setAppElement('#root');

const AdminBookOrderModal = ({ isOpen, onRequestClose, order, onAccept, onReject, onMarkAsDone }) => {
    const handleAccept = () => {
        onAccept(order); // Call the onAccept function with the order object
    };

    const handleReject = () => {
        onReject(order); // Call the onReject function with the order object
    };

    const handleMarkAsDone = () => {
        onMarkAsDone(order); // Call the onMarkAsDone function with the order object
    };

    const handleClose = () => {
        onRequestClose(); // Close the modal
    };

    if (!order) return null;

    let buttons;
    switch (order.status) {
        case 'ACCEPTED':
            buttons = (
                <div className="modal-buttons">
                    <button onClick={handleMarkAsDone} className="accept-button">Mark as done</button>
                    <button onClick={handleClose} className="close-button">Close</button>
                </div>
            );
            break;
        case 'REJECTED':
            buttons = (
                <div className="modal-buttons">
                    <button onClick={handleClose} className="close-button">Close</button>
                </div>
            );
            break;
        case 'DONE':
            buttons = (
                <div className="modal-buttons">
                    <button onClick={handleClose} className="close-button">Close</button>
                </div>
            );
            break;
        default:
            buttons = (
                <div className="modal-buttons">
                    <button onClick={handleAccept} className="accept-button">Accept</button>
                    <button onClick={handleReject} className="reject-button">Reject</button>
                    <button onClick={handleClose} className="close-button">Close</button>
                </div>
            );
            break;
    }

    return (
        <Modal isOpen={isOpen} onRequestClose={onRequestClose} className="book-modal">
            <h2>{order.bookTitle}</h2>
            <p><strong>User:</strong> {order.user.username}</p>
            <p><strong>Requested Date:</strong> {order.requestDate}</p>
            <p><strong>Status:</strong> {order.status}</p>
            {buttons}
        </Modal>
    );
};

export default AdminBookOrderModal;
