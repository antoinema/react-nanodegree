import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Bookshelf from './Components/Bookshelf'
import Search from './Components/Search'
import ReactRouter from 'react-router-dom';


class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    showSearchPage: false,
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  render() {
    const allBooks = this.state.books
    return (
      <div className="app">


        {this.state.showSearchPage ? (
          <Search />
        ) : (
          <div className="list-books">
            <div className="list-books-title">
              <h1>My Reads</h1>
            </div>
            <div className="list-books-content">
                {!allBooks.length ? <p className="loading-message">Fetching your books...</p> :
                <div>
                    <Bookshelf title='Currently reading' ukey='currentlyReading' books={allBooks} />
                    <Bookshelf title='Want to read' ukey='wantToRead' books={allBooks} />
                    <Bookshelf title='Read' ukey='read' books={allBooks} />
                </div>
                }

            </div>
            <div className="open-search">
              <a onClick={() => this.setState({ showSearchPage: true })}>Add a book</a>
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default BooksApp
