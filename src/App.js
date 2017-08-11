import React from 'react'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Bookshelf from './Components/Bookshelf'
import Search from './Components/Search'
import { Route, Link } from 'react-router-dom'
import update from 'immutability-helper';


class BooksApp extends React.Component {
  state = {
    books: null
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books })
    })
  }

  changeShelf = (book, newShelf) => {
    BooksAPI.update(book, newShelf).then(pro => {
      book.shelf = newShelf
      this.setState((state) => ({
        books: update(this.state.books, {$merge: book})
      }))
    })
  }

  render() {
    const shelves = [
      {ukey: "currentlyReading", title: "Currently reading"},
      {ukey: "wantToRead", title: "Want to read"},
      {ukey: "read", title: "Read"}
    ]
    return (
      <div className="app">
          <Route exact path='/' render={() => (
            <div className="list-books">
              <div className="list-books-title">
                <h1>My Reads</h1>
              </div>
              <div className="list-books-content">
                  {this.state.books == null ? <p className="loading-message">Fetching your books...</p> :
                  <div>
                      {shelves.map((shelf) =>
                        <Bookshelf title={shelf.title} key={shelf.ukey} ukey={shelf.ukey} books={this.state.books} changeShelf={this.changeShelf} />
                      )}
                  </div>
                  }

              </div>
              <div className="open-search">
                <Link to='/search'>Add a book</Link>
              </div>
            </div>
          )}/>
          <Route path='/search' render={() => (
            <Search books={this.state.books} changeShelf={this.changeShelf} />
            )}/>
      </div>
    )
  }
}

export default BooksApp
