import React, { useEffect, useState } from 'react';
import { fetchBookOrders, acceptBookOrder, rejectBookOrder, markBookOrderAsDone } from '../../services/adminBookOrderService';
import AdminNavbar from '../../navbar/AdminNavbar'; 
import '../../styles/BooksPage.css';
import AdminBookOrderModal from '../modals/AdminBookOrderModal';

const AdminBookOrder = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        const loadOrders = async () => {
            setLoading(true);
            try {
                const data = await fetchBookOrders();
                setOrders(data || []);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        loadOrders();
    }, []);

    const openModal = (order) => {
        setSelectedOrder(order);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setSelectedOrder(null);
        setModalIsOpen(false);
    };

    const handleAccept = async (order) => {
        try {
            await acceptBookOrder(order.id);
            const updatedOrders = orders.map(o => o.id === order.id ? { ...o, status: 'ACCEPTED' } : o);
            setOrders(updatedOrders);
        } catch (error) {
            console.error('Error accepting order:', error);
        }
        closeModal();
    };

    const handleReject = async (order) => {
        try {
            await rejectBookOrder(order.id);
            const updatedOrders = orders.map(o => o.id === order.id ? { ...o, status: 'REJECTED' } : o);
            setOrders(updatedOrders);
        } catch (error) {
            console.error('Error rejecting order:', error);
        }
        closeModal();
    };

    const handleMarkAsDone = async (order) => {
        try {
            await markBookOrderAsDone(order.id);
            const updatedOrders = orders.map(o => o.id === order.id ? { ...o, status: 'DONE' } : o);
            setOrders(updatedOrders);
        } catch (error) {
            console.error('Error marking order as done:', error);
        }
        closeModal();
    };

    const filterOrders = (orders, filter) => {
        switch (filter) {
            case 'ACCEPTED':
                return orders.filter(order => order.status === 'ACCEPTED');
            case 'REJECTED':
                return orders.filter(order => order.status === 'REJECTED');
            case 'DONE':
                return orders.filter(order => order.status === 'DONE');
            case 'REQUESTED':
                return orders.filter(order => order.status === 'REQUESTED');
            default:
                return orders;
        }
    };

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
    };

    return (
        <div>
            <AdminNavbar />
            <div className="books-page">
                <div className="books-header">
                    <h2>Book Orders</h2>
                    <div className="filter-section">
                        <label htmlFor="filter">Filter by Status:</label>
                        <select id="filter" value={filter} onChange={handleFilterChange}>
                            <option value="all">View all</option>
                            <option value="REQUESTED">Requested</option>
                            <option value="ACCEPTED">Accepted</option>
                            <option value="REJECTED">Rejected</option>
                            <option value="DONE">Done</option>
                        </select>
                    </div>
                </div>
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p>Error loading orders: {error.message}</p>
                ) : (
                    <div className="books-list">
                        {filterOrders(orders, filter).map(order => (
                            <div key={order.id} className="book-item" onClick={() => openModal(order)}>
                                <h3>{order.bookTitle}</h3>
                                <p>User: {order.user.username}</p>
                                <p>Requested Date: {order.requestDate}</p>
                                <p>Status: {order.status}</p>
                            </div>
                        ))}
                    </div>
                )}
                <AdminBookOrderModal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    order={selectedOrder}
                    onAccept={handleAccept}
                    onReject={handleReject}
                    onMarkAsDone={handleMarkAsDone}
                />
            </div>
        </div>
    );
};

export default AdminBookOrder;