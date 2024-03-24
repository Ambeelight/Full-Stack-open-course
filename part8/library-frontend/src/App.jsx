import { useState, useEffect } from 'react'
import { useApolloClient, useSubscription } from '@apollo/client'
import { Routes, Route, Link } from 'react-router-dom'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import LogoutBtn from './components/LogoutBtn'
import UserRecommendations from './components/UserRecommendations'
import { ALL_BOOKS, BOOK_ADDED, BOOK_DETAILS } from './queries'

// export const updateCache = (cache, query, addedBook) => {
//   const uniqByTitle = (books) => {
//     let seen = new Set()
//     return books.filter((book) => {
//       let k = book.title
//       return seen.has(k) ? false : seen.add(k)
//     })
//   }

//   cache.updateQuery(query, ({ allBooks }) => {
//     return {
//       allBooks: uniqByTitle(allBooks.concat(addedBook)),
//     }
//   })
// }

export const updateCache = (cache, query, addedBook) => {
  cache.modify({
    fields: {
      allBooks(existingBooks = []) {
        const newBookRef = cache.writeFragment({
          data: addedBook,
          fragment: BOOK_DETAILS,
        })
        return [newBookRef, ...existingBooks]
      },
    },
  })
}

const styles = {
  padding: 5,
  textDecoration: 'none',
}

const App = () => {
  const client = useApolloClient()
  const [token, setToken] = useState(null)

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      const addedBook = data.data.bookAdded
      window.alert(`Book "${data.data.bookAdded.title}" added!`)
      updateCache(client.cache, { query: ALL_BOOKS }, addedBook)
    },
  })

  useEffect(() => {
    const userToken = localStorage.getItem('library-user-token')

    if (userToken) setToken(userToken)
  }, [])

  return (
    <div>
      {token ? (
        <div>
          <Link style={styles} to='/'>
            authors
          </Link>
          <Link style={styles} to='/books'>
            books
          </Link>
          <Link style={styles} to='/add'>
            add book
          </Link>
          <Link style={styles} to='/recommendations'>
            recommend
          </Link>
          <LogoutBtn setToken={setToken} />

          <Routes>
            <Route path='/' element={<Authors />} />
            <Route path='/books' element={<Books />} />
            <Route path='/add' element={<NewBook />} />
            <Route path='recommendations' element={<UserRecommendations />} />
            <Route path='/login' element={<LoginForm setToken={setToken} />} />
          </Routes>
        </div>
      ) : (
        <LoginForm setToken={setToken} />
      )}
    </div>
  )
}

export default App
