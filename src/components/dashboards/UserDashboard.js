import React from 'react';
import UserNavbar from '../../navbar/UserNavbar';
import BooksPage from '../user/BooksPage';

const UserDashboard = () => {
    return (
        <div>
            <UserNavbar />
            <BooksPage />
        </div>
    );
};

export default UserDashboard;