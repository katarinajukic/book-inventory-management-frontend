import React from 'react';
import AdminNavbar from '../../navbar/AdminNavbar';
import AdminBookPage from '../admin/AdminBooksPage';

const AdminDashboard = () => {
    return (
        <div>
            <AdminNavbar />
            <AdminBookPage />
        </div>
    );
};

export default AdminDashboard;
