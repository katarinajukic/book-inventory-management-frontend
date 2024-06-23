import React from 'react';
import Modal from 'react-modal';
import '../../styles/BookModal.css';

Modal.setAppElement('#root');

const RentalModal = ({ isOpen, onRequestClose, rental, onApprove, onReject, onReturn }) => {
  const handleApprove = () => {
    onApprove(rental);
  };

  const handleReject = () => {
    onReject(rental);
  };

  const handleReturn = () => {
    onReturn(rental);
  };

  if (!rental) return null;

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} className="book-modal">
      <h2>{rental.book.title}</h2>
      <p><strong>User:</strong> {rental.user.username}</p>
      <p><strong>Start Date:</strong> {rental.startDate}</p>
      <p><strong>End Date:</strong> {rental.endDate}</p>
      <p><strong>Status:</strong> {rental.status}</p>
      <div className="modal-buttons">
        {rental.status === 'REQUESTED' && (
          <>
            <button onClick={handleApprove} className="accept-button">Approve</button>
            <button onClick={handleReject} className="reject-button">Reject</button>
          </>
        )}
        {rental.status === 'RENTED' && (
          <>
            <button onClick={handleReturn} className="accept-button">Mark as Returned</button>
          </>
        )}
        <button onClick={onRequestClose} className="close-button">Close</button>
      </div>
    </Modal>
  );
};

export default RentalModal;