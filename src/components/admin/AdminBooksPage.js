import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../styles/BooksPage.css'; 
import AdminBookModal from '../modals/AdminBookModal';
import { getCurrentUser } from '../../services/authService';

const AdminBookPage = () => {
    const [books, setBooks] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [authorSearchTerm, setAuthorSearchTerm] = useState('');
    const [genreSearchTerm, setGenreSearchTerm] = useState('');
    const [selectedBook, setSelectedBook] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const user = getCurrentUser();

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        try {
            let url = 'http://localhost:8080/api/v1/books';

            if (searchTerm || authorSearchTerm || genreSearchTerm) {
                url += '?';

                if (searchTerm) {
                    url += `search=${encodeURIComponent(searchTerm)}&`;
                }
                if (authorSearchTerm) {
                    url += `author=${encodeURIComponent(authorSearchTerm)}&`;
                }
                if (genreSearchTerm) {
                    url += `genre=${encodeURIComponent(genreSearchTerm)}&`;
                }

                url = url.slice(0, -1);
            }

            const response = await axios.get(url, {
                headers: { Authorization: `Bearer ${user.accessToken}` }
            });
            setBooks(response.data.content);
            console.log(response);
        } catch (error) {
            console.error('Error fetching books:', error);
        }
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        fetchBooks();
    };

    const handleBookClick = (book) => {
        setSelectedBook(book);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedBook(null);
    };

    return (
        <div className="books-page">
            <div className="books-header">
                <h2>Books</h2>
                <form onSubmit={handleSearchSubmit}>
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search by title"
                    />
                    <input
                        type="text"
                        value={authorSearchTerm}
                        onChange={(e) => setAuthorSearchTerm(e.target.value)}
                        placeholder="Search by author"
                    />
                    <input
                        type="text"
                        value={genreSearchTerm}
                        onChange={(e) => setGenreSearchTerm(e.target.value)}
                        placeholder="Search by genre"
                    />
                    <button type="submit">Search</button>
                </form>
            </div>
            <div className="books-list">
                {books.length > 0 ? (
                    books.map(book => (
                        <div key={book.id} className="book-item" onClick={() => handleBookClick(book)}>
                            <h3>{book.book.title}</h3>
                            <p>Author: {book.authors.map(author => author.fullName).join(', ')}</p>
                            <p>Genre: {book.genres.map(genre => genre.name).join(', ')}</p>
                        </div>
                    ))
                ) : (
                    <p></p>
                )}
            </div>
            <AdminBookModal isOpen={isModalOpen} onRequestClose={closeModal} book={selectedBook} fetchBooks={fetchBooks} />
        </div>
    );
};

export default AdminBookPage;