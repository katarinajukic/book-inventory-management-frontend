import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './components/HomePage';
import Login from './components/Login';
import Register from './components/Register';
import RentalHistory from './components/user/RentalHistory';
import CurrentRentals from './components/user/CurrentRentals';
import { getCurrentUser } from './services/authService';
import BookOrders from './components/user/BookOrder';
import AdminDashboard from './components/dashboards/AdminDashboard';
import UserDashboard from './components/dashboards/UserDashboard';
import AdminBookOrder from './components/admin/AdminBookOrder';

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
        <Route path="/admin/orders" element={<AdminBookOrder />} />
      </Routes>
    </Router>
    );
};

export default App;