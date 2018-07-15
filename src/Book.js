import React, { Component } from 'react';
//import React, { Link } from 'react-dom';

class Book extends Component {
    render() {
        const { book } = this.props;
        return (
            <div className="book">
                <div className="book-top">
                    <div
                        //to={`/${book.key}`}
                        className="book-cover"
                        style={{
                            width: 128,
                            height: 188,
                            backgroundImage: `url(${book.imageLinks.thumbnail})`
                        }}
                    />
                    <div className="book-shelf-changer">
                        <select>
                            <option value="move" disabled>
                                Move to...
                            </option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{book.title}</div>
                {book.authors.map((author, index) => (
                    <div key={index} className="book-authors">
                        {author}
                    </div>
                ))}
            </div>
        );
    }
}

export default Book;
