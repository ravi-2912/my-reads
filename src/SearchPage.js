import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Book from './Book';
import PropTypes from 'prop-types';
import * as BooksAPI from './BooksAPI';

class SearchPage extends Component {
    state = {
        query: '',
        searchedBooks: [],
        searchErr: true
    };

    static propTypes = {
        shelfs: PropTypes.array.isRequired,
        onShelfChange: PropTypes.func.isRequired
    };

    onUpdateQuery = query => {
        this.setState({ query });

        // if user input => run the search
        if (query) {
            BooksAPI.search(query, 20)
                .then(books => {
                    books.length > 0
                        ? this.setState({ searchedBooks: books, searchErr: false })
                        : this.setState({ searchedBooks: [], searchErr: true });
                })
                .then(() => {
                    window.searchArr = this.state.searchedBooks;
                });

            // if query is empty => reset state to default
        } else this.setState({ searchedBooks: [], searchErr: false });
    };

    render() {
        const { shelfs, onShelfChange } = this.props;
        const query = this.state.query;
        const books = this.state.searchedBooks;

        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to="/">
                        Close
                    </Link>
                    <div className="search-books-input-wrapper">
                        <input
                            type="text"
                            placeholder="Search by title or author"
                            value={query}
                            onChange={event => this.onUpdateQuery(event.target.value)}
                        />
                    </div>
                </div>
                <div className="search-books-results">
                    {!this.state.searchErr && (
                        <ol className="books-grid">
                            {books.map(book => (
                                <li key={book.id}>
                                    <Book book={book} shelfs={shelfs} onShelfChange={onShelfChange} />
                                </li>
                            ))}
                        </ol>
                    )}
                </div>
            </div>
        );
    }
}

export default SearchPage;
