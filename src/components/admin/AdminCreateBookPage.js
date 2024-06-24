import React, { useState, useEffect } from 'react';
import { createAuthor, getAllAuthors } from '../../services/authorService';
import { createGenre, getAllGenres } from '../../services/genreService';
import { createBook } from '../../services/adminBookService';
import '../../styles/BooksPage.css'; 
import AdminNavbar from '../../navbar/AdminNavbar';
import AuthorModal from '../modals/AuthorModal';
import GenreModal from '../modals/GenreModal';

const AdminCreateBookPage = () => {
    const [fullName, setFullName] = useState('');
    const [name, setName] = useState('');
    const [genres, setGenres] = useState([]);
    const [authors, setAuthors] = useState([]);
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [selectedAuthors, setSelectedAuthors] = useState([]);
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [searchTermAuthors, setSearchTermAuthors] = useState('');
    const [searchTermGenres, setSearchTermGenres] = useState('');
    const [searchTermAuthorsBook, setSearchTermAuthorsBook] = useState('');
    const [searchTermGenresBook, setSearchTermGenresBook] = useState('');
    const [messageAuthor, setMessageAuthor] = useState('');
    const [messageGenre, setMessageGenre] = useState('');
    const [messageBook, setMessageBook] = useState('');
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
            setMessageAuthor('Author created successfully.');
            setFullName('');
            fetchAuthors();
        } catch (error) {
            console.error('Error creating author:', error);
            setMessageAuthor('Error creating author.');
        }
    };

    const handleCreateGenre = async (e) => {
        e.preventDefault();
        try {
            const newGenre = { name };
            await createGenre(newGenre);
            setMessageGenre('Genre created successfully.');
            setName('');
            fetchGenres();
        } catch (error) {
            console.error('Error creating genre:', error);
            setMessageGenre('Error creating genre.');
        }
    };

    const handleCreateBook = async (e) => {
        e.preventDefault();
        try {
            const newBook = {
                title,
                summary,
                authors: selectedAuthors.map(author => ({ fullName: author.author.fullName })),
                genres: selectedGenres.map(genre => ({ name: genre.genre.name }))
            };
    
            await createBook(newBook);
            setMessageBook('Book created successfully.');
            setTitle('');
            setSummary('');
            setSelectedAuthors([]);
            setSelectedGenres([]);
        } catch (error) {
            console.error('Error creating book:', error);
            if (error.response) {
                console.error('Response data:', error.response.data);
            }
            setMessageBook('Error creating book.');
        }
    };
    
    
    const handleSearchAuthors = (e) => {
        setSearchTermAuthors(e.target.value);
    };

    const handleSearchGenres = (e) => {
        setSearchTermGenres(e.target.value);
    };

    const handleSearchAuthorsBook = (e) => {
        setSearchTermAuthorsBook(e.target.value);
    };

    const handleSearchGenresBook = (e) => {
        setSearchTermGenresBook(e.target.value);
    };

    const filteredAuthors = authors.filter(author => 
        author.author.fullName.toLowerCase().includes(searchTermAuthors.toLowerCase())
    );

    const filteredGenres = genres.filter(genre => 
        genre.genre.name.toLowerCase().includes(searchTermGenres.toLowerCase())
    );

    const filteredAuthorsBook = searchTermAuthorsBook 
    ? authors.filter(author =>
        author.author.fullName.toLowerCase().includes(searchTermAuthorsBook.toLowerCase())
      )
    : [];


    const filteredGenresBook = searchTermGenresBook 
    ? genres.filter(genre =>
        genre.genre.name.toLowerCase().includes(searchTermGenresBook.toLowerCase())
      )
    : [];


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

    const addAuthor = (author) => {
        setSelectedAuthors([...selectedAuthors, author]);
    };

    const removeAuthor = (author) => {
        const updatedAuthors = selectedAuthors.filter(a => a.id !== author.id);
        setSelectedAuthors(updatedAuthors);
    };

    const addGenre = (genre) => {
        setSelectedGenres([...selectedGenres, genre]);
    };

    const removeGenre = (genre) => {
        const updatedGenres = selectedGenres.filter(g => g.id !== genre.id);
        setSelectedGenres(updatedGenres);
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
                            {messageAuthor && <p>{messageAuthor}</p>}
                            <div className="authors-list">
                                <h4>Authors</h4>
                                <form className="create-author-form">
                                    <input
                                        type="text"
                                        value={searchTermAuthors}
                                        onChange={handleSearchAuthors}
                                        placeholder="Search Authors"
                                    />
                                    <button type="button" onClick={fetchAuthors}>Search</button>
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
                            {messageGenre && <p>{messageGenre}</p>}
                            <div className="authors-list">
                                <h4>Genres</h4>
                                <form className="create-author-form">
                                    <input
                                        type="text"
                                        value={searchTermGenres}
                                        onChange={handleSearchGenres}
                                        placeholder="Search Genres"
                                    />
                                    <button type="button" onClick={fetchGenres}>Search</button>
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
                            <form onSubmit={handleCreateBook} className="create-author-form">
                                <input
                                    type="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="Book Title"
                                    required
                                />
                                <textarea
                                    value={summary}
                                    onChange={(e) => setSummary(e.target.value)}
                                    placeholder="Book Summary"
                                    required
                                />
                                <div className="authors-list">
                                    <h4>Selected Authors:</h4>
                                    <ul>
                                        {selectedAuthors.map(author => (
                                            <li key={author.id} onClick={() => removeAuthor(author)}>
                                                {author.author.fullName}
                                            </li>
                                        ))}
                                    </ul>
                                    <h4>Choose Authors:</h4>
                                    <form className="create-author-form">
                                        <input
                                            type="text"
                                            value={searchTermAuthorsBook}
                                            onChange={handleSearchAuthorsBook}
                                            placeholder="Search Authors"
                                        />
                                    </form>
                                    <ul>
                                        {filteredAuthorsBook.map(author => (
                                            <li key={author.id} onClick={() => addAuthor(author)}>
                                                {author.author.fullName}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="authors-list">
                                    <h4>Selected Genres:</h4>
                                    <ul>
                                        {selectedGenres.map(genre => (
                                            <li key={genre.id} onClick={() => removeGenre(genre)}>
                                                {genre.genre.name}
                                            </li>
                                        ))}
                                    </ul>
                                    <h4>Choose Genres:</h4>
                                    <form className="create-author-form">
                                        <input
                                            type="text"
                                            value={searchTermGenresBook}
                                            onChange={handleSearchGenresBook}
                                            placeholder="Search Genres"
                                        />
                                    </form>
                                    <ul>
                                        {filteredGenresBook.map(genre => (
                                            <li key={genre.id} onClick={() => addGenre(genre)}>
                                                {genre.genre.name}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <button type="submit">Create Book</button>
                            </form>
                            {messageBook && <p>{messageBook}</p>}
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