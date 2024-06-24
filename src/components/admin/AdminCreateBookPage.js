import React, { useState, useEffect } from 'react';
import { createAuthor, getAllAuthors } from '../../services/authorService';
import { createGenre, getAllGenres } from '../../services/genreService';
import '../../styles/BooksPage.css'; // Adjust the import according to your file structure
import AdminNavbar from '../../navbar/AdminNavbar';
import AuthorModal from '../modals/AuthorModal';
import GenreModal from '../modals/GenreModal';

const AdminCreateBookPage = () => {
    const [fullName, setFullName] = useState('');
    const [name, setName] = useState('');
    const [genres, setGenres] = useState([]);
    const [authors, setAuthors] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [message, setMessage] = useState('');
    const [selectedAuthor, setSelectedAuthor] = useState(null);
    const [selectedGenre, setSelectedGenre] = useState(null);
    const [isAuthorModalOpen, setIsAuthorModalOpen] = useState(false);
    const [isGenreModalOpen, setIsGenreModalOpen] = useState(false);

    useEffect(() => {
        fetchAuthors();
        fetchGenres();
    }, []);

    const fetchAuthors = async () => {
        try {
            const data = await getAllAuthors();
            const sortedAuthors = data.sort((a, b) => 
                a.author.fullName.localeCompare(b.author.fullName)
            );
            setAuthors(sortedAuthors);
        } catch (error) {
            console.error('Error fetching authors:', error);
        }
    };

    const fetchGenres = async () => {
        try {
            const data = await getAllGenres();
            const sortedGenres = data.sort((a, b) => 
                a.genre.name.localeCompare(b.genre.name)
            );
            setGenres(sortedGenres);
        } catch (error) {
            console.error('Error fetching genres:', error);
        }
    };

    const handleCreateAuthor = async (e) => {
        e.preventDefault();
        try {
            const newAuthor = { fullName };
            await createAuthor(newAuthor);
            setMessage('Author created successfully.');
            setFullName('');
            fetchAuthors(); // Refresh the author list
        } catch (error) {
            console.error('Error creating author:', error);
            setMessage('Error creating author.');
        }
    };

    const handleCreateGenre = async (e) => {
        e.preventDefault();
        try {
            const newGenre = { name };
            await createGenre(newGenre);
            setMessage('Genre created successfully.');
            setName('');
            fetchGenres();
        } catch (error) {
            console.error('Error creating genre:', error);
            setMessage('Error creating genre.');
        }
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const filteredAuthors = authors.filter(author => 
        author.author.fullName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filteredGenres = genres.filter(genre => 
        genre.genre.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const openAuthorModal = (author) => {
        setSelectedAuthor(author);
        setIsAuthorModalOpen(true);
    };

    const closeAuthorModal = () => {
        setSelectedAuthor(null);
        setIsAuthorModalOpen(false);
    };

    const openGenreModal = (genre) => {
        setSelectedGenre(genre);
        setIsGenreModalOpen(true);
    };

    const closeGenreModal = () => {
        setSelectedGenre(null);
        setIsGenreModalOpen(false);
    };

    return (
        <div>
            <AdminNavbar />
            <div className="books-page">
                <div className="split-screen">
                    <div className="left-column">
                        <div className="admin-header">
                            <h2>Create Author</h2>
                        </div>
                        <div className="admin-section">
                            <form onSubmit={handleCreateAuthor} className="create-author-form">
                                <input
                                    type="text"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    placeholder="Author Full Name"
                                    required
                                />
                                <button type="submit">Create Author</button>
                            </form>
                            {message && <p>{message}</p>}
                            <div className="authors-list">
                                <h4>Authors</h4>
                                <form className="create-author-form">
                                    <input
                                        type="text"
                                        value={searchTerm}
                                        onChange={handleSearch}
                                        placeholder="Search Authors"
                                    />
                                    <button onClick={fetchAuthors}>Search</button>
                                </form>
                                <ul>
                                    {filteredAuthors.map(author => (
                                        <li key={author.id} onClick={() => openAuthorModal(author)}>
                                            {author.author.fullName}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="middle-column">
                        <div className="admin-header">
                            <h2>Create Genre</h2>
                        </div>
                        <div className="admin-section">
                            <form onSubmit={handleCreateGenre} className="create-author-form">
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Genre Name"
                                    required
                                />
                                <button type="submit">Create Genre</button>
                            </form>
                            {message && <p>{message}</p>}
                            <div className="authors-list">
                                <h4>Genres</h4>
                                <form className="create-author-form">
                                    <input
                                        type="text"
                                        value={searchTerm}
                                        onChange={handleSearch}
                                        placeholder="Search Genres"
                                    />
                                    <button onClick={fetchGenres}>Search</button>
                                </form>
                                <ul>
                                    {filteredGenres.map(genre => (
                                        <li key={genre.id} onClick={() => openGenreModal(genre)}>
                                            {genre.genre.name}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="right-column">
                        <div className="admin-header">
                            <h2>Create Book</h2>
                        </div>
                        <div className="admin-section">
                            {/* Book functionalities will go here */}
                        </div>
                    </div>
                </div>
            </div>
            {selectedAuthor && (
                <AuthorModal 
                    isOpen={isAuthorModalOpen}
                    onRequestClose={closeAuthorModal}
                    author={selectedAuthor}
                    fetchAuthors={fetchAuthors}
                />
            )}
            {selectedGenre && (
                <GenreModal 
                    isOpen={isGenreModalOpen}
                    onRequestClose={closeGenreModal}
                    genre={selectedGenre}
                    fetchGenres={fetchGenres}
                />
            )}
        </div>
    );
};

export default AdminCreateBookPage;
