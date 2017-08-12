import React from 'react'
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
            <li key={book.id}>
              <Book book={book} changeShelf={props.changeShelf} shelves={props.shelves}/>
            </li>
          )}
        </ol>
      </div>
    </div>
  )
}

Bookshelf.PropTypes = {
  title: PropTypes.string.isRequired,
  key: PropTypes.string.isRequired,
  shelves: PropTypes.array.isRequired
}



export default Bookshelf
