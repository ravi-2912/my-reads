import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Book from './Book';
import PropTypes from 'prop-types';
import * as BooksAPI from './BooksAPI';

class SearchPage extends Component {
    state = {
        query: '',
        searchedBooks: [],
        shelvedBooks: []
    };

    static propTypes = {
        shelfs: PropTypes.array.isRequired,
        books: PropTypes.array.isRequired,
        onShelfChange: PropTypes.func.isRequired
    };

    onUpdateQuery = (query, shelvedBooks) => {
        if (!query) {
            this.setState({ query: '', searchedBooks: [] });
            return;
        }
        this.setState(
            {
                query: query,
                searchedBooks: [],
                shelvedBooks: shelvedBooks
            },
            function() {
                this.search();
            }.bind(this)
        );
    };

    search = () => {
        const app = this;
        const query = this.state.query;
        if (query.trim() === '') {
            this.setState({ query: '', searchedBooks: [] });
            return;
        }

        BooksAPI.search(query)
            .then(books => {
                if (query !== this.state.query) return;

                if ('error' in books) {
                    books = [];
                } else {
                    books.map(book =>
                        this.state.shelvedBooks.filter(b => b.id === book.id).map(b => (book.shelf = b.shelf))
                    );
                }
                this.setState({
                    searchedBooks: books
                });
            })
            .catch(function() {
                app.setState(state => ({
                    searchedBooks: []
                }));
            });
    };

    render() {
        const { shelfs, books, onShelfChange } = this.props;

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
                            value={this.state.query}
                            onChange={event => this.onUpdateQuery(event.target.value, books)}
                        />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {this.state.searchedBooks.map(book => (
                            <li key={book.id}>
                                <Book book={book} shelfs={shelfs} onShelfChange={onShelfChange} />
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        );
    }
}

export default SearchPage;
