import React, { Component } from 'react'
import PropTypes from 'prop-types'

function Cover(props) {
  const url = props.book.imageLinks.thumbnail;
  return <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${url})` }}></div>
}

export default Cover
