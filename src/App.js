import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './components/HomePage';
import Login from './components/Login';
import Register from './components/Register';
import UserDashboard from './components/UserDashboard';
import AdminDashboard from './components/AdminDashboard';
import RentalHistory from './components/RentalHistory';
import CurrentRentals from './components/CurrentRentals';
import { getCurrentUser } from './services/authService';
import BookOrders from './components/BookOrder';

const App = () => {
    const user = getCurrentUser();

    return (
      <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/rentals/history" element={<RentalHistory />} />
        <Route path="/rentals/current" element={<CurrentRentals />} />
        <Route path="/orders" element={<BookOrders />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
    );
};

export default App;