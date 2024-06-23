import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/UserNavbar.css';
import { logout } from '../services/authService';

const UserNavbar = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const navigate = useNavigate();

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleLogout = () => {
        logout(); 
        navigate('/login');
    };

    return (
        <nav className="user-navbar">
            <div className="navbar-container">
                <Link to="/user-dashboard" className="nav-link">Books</Link>
                <div className="nav-link rentals-dropdown" onMouseEnter={toggleDropdown} onMouseLeave={toggleDropdown}>
                    Rentals
                    {dropdownOpen && (
                        <div className="dropdown-menu">
                            <Link to="/rentals/history" className="dropdown-link">History</Link>
                            <Link to="/rentals/current" className="dropdown-link">Current</Link>
                        </div>
                    )}
                </div>
                <Link to="/orders" className="nav-link">Orders</Link>
                <button className="logout-button" onClick={handleLogout}>Logout</button>
            </div>
        </nav>
    );
};

export default UserNavbar;
