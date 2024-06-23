import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getCurrentUser } from '../services/authService';
import '../styles/BooksPage.css';
import RentalModal from './RentalModal';
import UserNavbar from '../navbar/UserNavbar';

const RentalHistory = () => {
    const [rentalHistory, setRentalHistory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedRental, setSelectedRental] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        fetchRentalHistory();
    }, [searchTerm]);

    const fetchRentalHistory = async () => {
        try {
            const user = getCurrentUser();
            let url = 'http://localhost:8080/api/v1/books/rentals/history';

            const params = {
                search: searchTerm || ''
            };

            if (params.search) {
                url += `?search=${encodeURIComponent(params.search)}`;
            }

            const response = await axios.get(url, {
                headers: {
                    'Authorization': `Bearer ${user.accessToken}`
                }
            });

            setRentalHistory(response.data.content);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching rental history:', error);
            setLoading(false);
        }
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        fetchRentalHistory();
    };

    const handleRentalClick = (rental) => {
        setSelectedRental(rental);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedRental(null);
    };

    return (
        <div>
            <UserNavbar /> 
            <div className="books-page">
                <div className="books-header">
                    <h2>Rental History</h2>
                    <form onSubmit={handleSearchSubmit}>
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search by title"
                        />
                        <button type="submit">Search</button>
                    </form>
                </div>
                <div className="books-list">
                    {rentalHistory.length > 0 ? (
                        rentalHistory.map(rental => (
                            <div key={rental.id} className="book-item" onClick={() => handleRentalClick(rental)}>
                                <h3>{rental.book.title}</h3>
                                <p>Status: {rental.status}</p>
                            </div>
                        ))
                    ) : (
                        <p></p>
                    )}
                </div>
                <RentalModal isOpen={isModalOpen} onRequestClose={closeModal} rental={selectedRental} />
            </div>
        </div>
    );
};

export default RentalHistory;