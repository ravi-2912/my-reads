import React, { Component } from 'react';
//import React, { Link } from 'react-dom';
import PropTypes from 'prop-types';
import * as UTIL from './util';

class Book extends Component {
    static propTypes = {
        book: PropTypes.object.isRequired,
        shelfs: PropTypes.array.isRequired,
        onShelfChange: PropTypes.func.isRequired
    };

    render() {
        const { book, shelfs, onShelfChange } = this.props;

        return (
            <div className="book">
                <div className="book-top">
                    <div
                        className="book-cover"
                        style={{
                            width: 128,
                            height: 188,
                            backgroundImage: `url(${book.imageLinks.thumbnail})`
                        }}
                    />
                    <div className="book-shelf-changer">
                        <select onChange={event => onShelfChange(book, event.target.value)} defaultValue={book.shelf}>
                            <option key="move" value="move" disabled={true}>
                                Move to...
                            </option>
                            {shelfs.filter(shelf => shelf !== book.shelf).map(shelf => (
                                <option key={shelf} value={shelf}>
                                    {UTIL.camelToFormattedString(shelf)}
                                </option>
                            ))}
                            <option key="close" value="close">
                                Close
                            </option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{book.title}</div>
                {book.authors.map((author, index) => (
                    <div key={index} className="book-authors">
                        {author}
                    </div>
                ))}
                <div>{book.shelf}</div>
            </div>
        );
    }
}

export default Book;
