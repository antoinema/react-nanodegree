import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Bookshelf from './Components/Bookshelf'
import Search from './Components/Search'
import { Route, Link } from 'react-router-dom'


class BooksApp extends React.Component {
  state = {
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
          <Route exact path='/' render={() => (
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
                <Link to='/search'>Add a book</Link>
              </div>
            </div>
          )}/>
          <Route path='/search' component={Search} />
      </div>
    )
  }
}

export default BooksApp
