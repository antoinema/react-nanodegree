import React, { Component } from 'react'
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
import * as BooksAPI from '../BooksAPI'
import Book from './Book'
import { Link } from 'react-router-dom'


class Search extends Component {

  state = {
    query: '',
    searchResults: [],
    searching: false
  }

  updateQuery = (query) => {
    this.setState({ query: query.trim() })
    if (query) {
      this.setState({
        searching: true
      })
      BooksAPI.search(escapeRegExp(query), 20).then(res => {
        if (res.error) {
          this.setState({
            searchResults: [],
            searching: false
          })
          return
        }
        const finalRes = res.map((book) => {
          const alreadyOnShelf = this.props.books.find(shelvedBook => shelvedBook.id === book.id)
          if (alreadyOnShelf) {
            return alreadyOnShelf
          } else {
            book.shelf = "none"
            return book
          }
        })
        this.setState({
          searchResults: finalRes,
          searching: false
        })
      })
    } else {
        this.setState({
          searchResults: [],
          searching: false
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
          <Link className='close-search' to='/'>Close</Link>

          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author"
            onChange={(event) => this.updateQuery(event.target.value)}/>
          </div>

          { this.state.searching ?
            <div className='search-loading'>Loading...</div>
            : null
          }
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
          {
          !query ? null :
            searchResults.length > 0 ? searchResults.map((book) =>
              <li key={book.id}>
                <Book book={book} changeShelf={this.props.changeShelf} shelves={this.props.shelves}/>
              </li>
            ) : "No results"
          }
          </ol>
        </div>
      </div>
    )
  }
}

Book.PropTypes = {
    book: PropTypes.object.isRequired,
    changeShelf: PropTypes.func.isRequired,
    shelves: PropTypes.array.isRequired
}

export default Search
