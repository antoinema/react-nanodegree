import React, { Component } from 'react'
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
import * as BooksAPI from '../BooksAPI'
import Book from './Book'


class Search extends Component {

  state = {
    query: '',
    searchResults: []
  }

  updateQuery = (query) => {
    this.setState({ query: query.trim() })
    if (query) {
      const match = new RegExp(escapeRegExp(query), 'i')
      BooksAPI.search(query, 20).then(res => {
        this.setState({
          searchResults: res
        })
      })
    } else {
        this.setState({
          searchResults: []
        })
    }
  }

  clearQuery = () => {
    this.setState({ query: '' })
  }

  render() {
    const { searchResults, query } = this.state
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <a className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</a>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author"
            onChange={(event) => this.updateQuery(event.target.value)}/>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
          {
            !query ? null :
            searchResults.length ? searchResults.map((book) =>
            <li key={book.id}>
              <Book book={book} />
            </li>
          ) : "No results"
          }
          </ol>
        </div>
      </div>
    )
  }
}

export default Search
