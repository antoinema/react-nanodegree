import React from 'react'
import PropTypes from 'prop-types'
import Cover from './Cover'


function Book(props) {
	const book = props.book
	const shelves = props.shelves

	return (
	  <div className="book">
	    <div className="book-top">
	    	<Cover book={book}/>
	      <div className="book-shelf-changer">
          <select defaultValue={book.shelf} onChange={(event) => props.changeShelf(book, event.target.value)}>
	          <option value="none" disabled>Move to...</option>
	          {shelves.map((shelf) =>
						  <option key={shelf.ukey} value={shelf.ukey}>{shelf.title}</option>

	          )}
	          <option value="none">None</option>
	        </select>
	      </div>
	    </div>
	    <div className="book-title">{book.title}</div>
	    <div className="book-authors">{book.authors.join(', ')}</div>
	  </div>
  )
}

Book.PropTypes = {
  book: PropTypes.object.isRequired,
  changeShelf: PropTypes.func.isRequired,
  shelves: PropTypes.array.isRequired
}



export default Book
