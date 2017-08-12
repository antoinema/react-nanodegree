import React from 'react'
import PropTypes from 'prop-types'
import Cover from './Cover'


function Book(props) {
	const book = props.book

	return (
	  <div className="book">
	    <div className="book-top">
	    	<Cover book={book}/>
	      <div className="book-shelf-changer">
          <select defaultValue={book.shelf} onChange={(event) => props.changeShelf(book, event.target.value)}>
	          <option value="none" disabled>Move to...</option>
	          <option value="currentlyReading">Currently Reading</option>
	          <option value="wantToRead">Want to Read</option>
	          <option value="read">Read</option>
	          <option value="none">None</option>
	        </select>
	      </div>
	    </div>
	    <div className="book-title">{book.title}</div>
	    <div className="book-authors">{book.authors}</div>
	  </div>
  )
}

Book.PropTypes = {
    book: PropTypes.object.isRequired,
    changeShelf: PropTypes.func.isRequired
}



export default Book
