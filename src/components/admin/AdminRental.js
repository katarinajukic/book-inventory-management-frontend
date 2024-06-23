import React, { useEffect, useState } from 'react';
import AdminNavbar from '../../navbar/AdminNavbar';
import '../../styles/BooksPage.css';
import RentalModal from '../modals/AdminRentalModal';
import { fetchRentalRequests, approveRental, rejectRental, markReturned } from '../../services/adminRentalBookService';

const AdminRental = () => {
  const [rentals, setRentals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRental, setSelectedRental] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');

  useEffect(() => {
    const loadRentals = async () => {
      setLoading(true);
      try {
        const data = await fetchRentalRequests();
        setRentals(data || []);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    loadRentals();
  }, []);

  const openModal = (rental) => {
    setSelectedRental(rental);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedRental(null);
    setModalIsOpen(false);
  };

  const handleApprove = async (rental) => {
    try {
      await approveRental(rental.id);
      const updatedRentals = rentals.map(r => (r.id === rental.id ? { ...r, status: 'RENTED' } : r));
      setRentals(updatedRentals);
    } catch (error) {
      console.error('Error approving rental:', error);
    }
    closeModal();
  };

  const handleReject = async (rental) => {
    try {
      await rejectRental(rental.id);
      const updatedRentals = rentals.map(r => (r.id === rental.id ? { ...r, status: 'REJECTED' } : r));
      setRentals(updatedRentals);
    } catch (error) {
      console.error('Error rejecting rental:', error);
    }
    closeModal();
  };

  const handleReturn = async (rental) => {
    try {
      await markReturned(rental.id);
      const updatedRentals = rentals.map(r => (r.id === rental.id ? { ...r, status: 'RETURNED' } : r));
      setRentals(updatedRentals);
    } catch (error) {
      console.error('Error marking rental as returned:', error);
    }
    closeModal();
  };

  const filterRentals = (rentals, filterStatus) => {
    switch (filterStatus) {
      case 'REQUESTED':
        return rentals.filter(rental => rental.status === 'REQUESTED');
      case 'RENTED':
        return rentals.filter(rental => rental.status === 'RENTED');
      case 'REJECTED':
        return rentals.filter(rental => rental.status === 'REJECTED');
      case 'RETURNED':
        return rentals.filter(rental => rental.status === 'RETURNED');
      default:
        return rentals;
    }
  };

  const handleFilterChange = (event) => {
    setFilterStatus(event.target.value);
  };

  return (
    <div>
      <AdminNavbar />
      <div className="books-page">
        <div className="books-header">
          <h2>Rental Requests</h2>
          <div className="filter-container">
            <label>Filter by Status:</label>
            <select value={filterStatus} onChange={handleFilterChange}>
              <option value="all">View all</option>
              <option value="REQUESTED">Requested</option>
              <option value="RENTED">Rented</option>
              <option value="REJECTED">Rejected</option>
              <option value="RETURNED">Returned</option>
            </select>
          </div>
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error loading rental requests: {error.message}</p>
        ) : (
          <div className="books-list">
            {filterRentals(rentals, filterStatus).map(rental => (
              <div key={rental.id} className="book-item" onClick={() => openModal(rental)}>
                <h3>{rental.book.title}</h3>
                <p>User: {rental.user.username}</p>
                <p>Status: {rental.status}</p>
              </div>
            ))}
          </div>
        )}
        <RentalModal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          rental={selectedRental}
          onApprove={handleApprove}
          onReject={handleReject}
          onReturn={handleReturn}
        />
      </div>
    </div>
  );
};

export default AdminRental;