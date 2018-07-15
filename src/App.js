import React from 'react';
import { Route, Link } from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import './App.css';
import BooksShelf from './BooksShelf';
import SearchPage from './SearchPage';

class BooksApp extends React.Component {
    state = {
        /**
         * TODO: Instead of using this state variable to keep track of which page
         * we're on, use the URL in the browser's address bar. This will ensure that
         * users can use the browser's back and forward buttons to navigate between
         * pages, as well as provide a good URL they can bookmark and share.
         */
        showSearchPage: false,
        books: [],
        shelfs: ['currentlyReading', 'wantToRead', 'read']
    };

    onShelfChange = (book, shelf) => {
        BooksAPI.update(book, shelf).then(response => {
            book.shelf = shelf;
            var updatedBooks = this.state.books.filter(b => b.id !== book.id);
            updatedBooks.push(book);
            this.setState({ books: updatedBooks });
        });
    };

    componentDidMount() {
        BooksAPI.getAll()
            .then(books => this.setState({ books }))
            .then(() => (window.booksArr = this.state.books)); //comment later
    }

    goToPrevious = history => {
        history.push('/');
    };

    render() {
        return (
            <div>
                <Route
                    exact
                    path="/"
                    render={() => (
                        <div className="list-books">
                            <div className="list-books-title">
                                <h1>MyReads</h1>
                            </div>
                            {this.state.shelfs.map(shelf => (
                                <div key={shelf} className="list-books-content">
                                    <BooksShelf
                                        shelf={shelf}
                                        books={this.state.books}
                                        shelfs={this.state.shelfs}
                                        onShelfChange={this.onShelfChange}
                                        isSearchPage={false}
                                    />;
                                </div>
                            ))}
                            <div className="open-search">
                                <Link to="/search">Add a book</Link>
                            </div>
                        </div>
                    )}
                />
                <Route
                    path="/search"
                    render={() => (
                        <SearchPage
                            shelfs={this.state.shelfs}
                            books={this.state.books}
                            onShelfChange={this.onShelfChange}
                            goToPrevious={this.goToPrevious}
                        />
                    )}
                />
            </div>
        );
    }
}
export default BooksApp;
