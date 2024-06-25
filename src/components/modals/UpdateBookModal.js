import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import '../../styles/BookModal.css';
import { getAllAuthors } from '../../services/authorService';
import { getAllGenres } from '../../services/genreService';
import { updateBook } from '../../services/adminBookService';

Modal.setAppElement('#root');

const UpdateBookModal = ({ isOpen, onRequestClose, book, fetchBooks }) => {
    const [genres, setGenres] = useState([]);
    const [authors, setAuthors] = useState([]);
    const [title, setTitle] = useState(book ? book.book.title : '');
    const [summary, setSummary] = useState(book ? book.book.summary : '');
    const [selectedAuthors, setSelectedAuthors] = useState(
        book && book.authors ? book.authors.map(author => ({ author })) : []
      );
    const [selectedGenres, setSelectedGenres] = useState(
        book && book.genres ? book.genres.map(genre => ({ genre })) : []
      );
    const [searchTermAuthors, setSearchTermAuthors] = useState('');
    const [searchTermGenres, setSearchTermGenres] = useState('');
    const [searchTermAuthorsBook, setSearchTermAuthorsBook] = useState('');
    const [searchTermGenresBook, setSearchTermGenresBook] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchAuthors();
        fetchGenres();
    }, []);
    

    const fetchAuthors = async () => {
        try {
            const data = await getAllAuthors();
            setAuthors(data);
        } catch (error) {
            console.error('Error fetching authors:', error);
        }
    };

    const fetchGenres = async () => {
        try {
            const data = await getAllGenres();
            setGenres(data);
        } catch (error) {
            console.error('Error fetching genres:', error);
        }
    };

    const handleUpdateBook = async (e) => {
        e.preventDefault();
        try {
            const updatedBook = {
                title,
                summary,
                authors: selectedAuthors.map(author => ({ fullName: author.author.fullName })),
                genres: selectedGenres.map(genre => ({ name: genre.genre.name }))
            };

            await updateBook(book.id, updatedBook);
            setMessage('Book updated successfully.');
            fetchBooks();
            onRequestClose();
        } catch (error) {
            console.error('Error updating book:', error);
            setMessage('Error updating book.');
        }
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
        <Modal isOpen={isOpen} onRequestClose={onRequestClose} className="book-modal">
            <h2>Update Book</h2>
            <form onSubmit={handleUpdateBook} className="create-author-form">
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
                    <input
                        type="text"
                        value={searchTermAuthorsBook}
                        onChange={handleSearchAuthorsBook}
                        placeholder="Search Authors"
                    />
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
                    <input
                        type="text"
                        value={searchTermGenresBook}
                        onChange={handleSearchGenresBook}
                        placeholder="Search Genres"
                    />
                    <ul>
                        {filteredGenresBook.map(genre => (
                            <li key={genre.id} onClick={() => addGenre(genre)}>
                                {genre.genre.name}
                            </li>
                        ))}
                    </ul>
                </div>
                <button type="submit">Update Book</button>
            </form>
            {message && <p className="message">{message}</p>}
        </Modal>
    );
};

export default UpdateBookModal;
