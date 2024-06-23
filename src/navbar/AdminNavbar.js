import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/UserNavbar.css';
import { logout } from '../services/authService';

const AdminNavbar = () => {
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
            <div className="nav-link rentals-dropdown" onMouseEnter={toggleDropdown} onMouseLeave={toggleDropdown}>
                    Books
                    {dropdownOpen && (
                        <div className="dropdown-menu">
                            <Link to="/books/create" className="dropdown-link">Create</Link>
                            <Link to="/books/view" className="dropdown-link">View</Link>
                        </div>
                    )}
                </div>
                <Link to="/admin/rentals" className="nav-link">Rentals</Link>
                <Link to="/admin/orders" className="nav-link">Orders</Link>
                <button className="logout-button" onClick={handleLogout}>Logout</button>
            </div>
        </nav>
    );
};

export default AdminNavbar;
