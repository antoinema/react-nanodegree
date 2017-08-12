import React from 'react'
import PropTypes from 'prop-types'

function Cover(props) {
  const url = props.book.imageLinks ? props.book.imageLinks.thumbnail : 'https://books.google.com/googlebooks/images/no_cover_thumb.gif';
  return <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${url})` }}></div>
}

Cover.PropTypes = {
    book: PropTypes.object.isRequired
}

export default Cover
