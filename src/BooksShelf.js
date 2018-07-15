import React, { Component } from 'react';
import Book from './Book';
import PropTypes from 'prop-types';
import * as UTIL from './util';

class BooksShelf extends Component {
    static propTypes = {
        shelf: PropTypes.string.isRequired,
        books: PropTypes.array.isRequired,
        shelfs: PropTypes.array.isRequired,
        onShelfChange: PropTypes.func.isRequired
    };

    render() {
        const { shelf, books, shelfs, onShelfChange } = this.props;

        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{UTIL.camelToFormattedString(shelf)}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {books.map(
                            book =>
                                book.shelf === shelf && (
                                    <li key={book.id}>
                                        <Book book={book} shelfs={shelfs} onShelfChange={onShelfChange} />
                                    </li>
                                )
                        )}
                    </ol>
                </div>
            </div>
        );
    }
}

export default BooksShelf;
