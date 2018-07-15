import React, { Component } from 'react';
import Book from './Book';

class BooksShelf extends Component {
    camelToFormattedString = string => {
        const res = string.replace(/([A-Z])/g, ' $1');
        return res.charAt(0).toUpperCase() + res.slice(1);
    };
    render() {
        const { shelf, books } = this.props;
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{this.camelToFormattedString(shelf)}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {books.map(
                            book =>
                                book.shelf === shelf && (
                                    <li key={book.id}>
                                        {book.shelf}
                                        <Book book={book} />
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
