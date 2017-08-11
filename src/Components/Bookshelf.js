import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Book from './Book'


function Bookshelf(props) {
  const title = props.title
  const key = props.ukey
  const books = props.books
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {
            books.filter((book) => book.shelf === key).map((book) =>
            /**
             * TODO: More robust industry indentifier fetch
             */
            <li key={book.industryIdentifiers[0].identifier}>
              <Book book={book} />
            </li>
          )}
        </ol>
      </div>
    </div>
  )
}

Bookshelf.PropTypes = {
  title: PropTypes.string.isRequired,
  key: PropTypes.string.isRequired
}



export default Bookshelf
