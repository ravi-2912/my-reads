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
                            background: 'imageLinks' in book ? `url(${book.imageLinks.thumbnail})` : '#333'
                        }}
                    />
                    <div className="book-shelf-changer">
                        <select
                            onChange={event => onShelfChange(book, event.target.value)}
                            value={'shelf' in book ? book.shelf : 'none'}
                        >
                            <option key="move" value="move" disabled={true}>
                                Move to...
                            </option>
                            {shelfs /*.filter(shelf => shelf !== book.shelf)*/
                                .map(shelf => (
                                    <option key={shelf} value={shelf}>
                                        {UTIL.camelToFormattedString(shelf)}
                                    </option>
                                ))}
                            <option key="none" value="none">
                                None
                            </option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{book.title}</div>
                {'authors' in book > 0 &&
                    book.authors.map((author, index) => (
                        <div key={index} className="book-authors">
                            {author}
                        </div>
                    ))}
            </div>
        );
    }
}

export default Book;
