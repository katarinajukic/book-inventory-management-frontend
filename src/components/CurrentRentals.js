import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getCurrentUser } from '../services/authService';
import RentalModal from './RentalModal';
import UserNavbar from '../navbar/UserNavbar';

const CurrentRentals = () => {
    const [currentRentals, setCurrentRentals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedRental, setSelectedRental] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchCurrentRentals = async () => {
            try {
                const user = getCurrentUser();
                const response = await axios.get('http://localhost:8080/api/v1/books/rentals', {
                    headers: { 
                        'Authorization': `Bearer ${user.accessToken}`
                    }
                });
                setCurrentRentals(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching current rentals:', error);
                setLoading(false);
            }
        };

        fetchCurrentRentals();
    }, []);

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
                    <h2>Current Rentals</h2>
                </div>
                <div className="books-list">
                    {currentRentals.length > 0 ? (
                        currentRentals.map(rental => (
                            <div key={rental.id} className="book-item" onClick={() => handleRentalClick(rental)}>
                                <h3>{rental.book.title}</h3>
                                <p>Status: {rental.status}</p>
                            </div>
                        ))
                    ) : (
                        <p>No current rentals found</p>
                    )}
                </div>
                <RentalModal isOpen={isModalOpen} onRequestClose={closeModal} rental={selectedRental} />
            </div>
        </div>
    );
};

export default CurrentRentals;
