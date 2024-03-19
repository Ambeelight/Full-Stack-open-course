import { useState, useEffect } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import LogoutBtn from './components/LogoutBtn'

const styles = {
  padding: 5,
  textDecoration: 'none',
}

const App = () => {
  const [token, setToken] = useState(null)

  console.log('Token:', token)

  // if (!token) {
  //   return <LoginForm setToken={setToken} />
  // }

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
          <LogoutBtn setToken={setToken} />

          <Routes>
            <Route path='/' element={<Authors />} />
            <Route path='/books' element={<Books />} />
            <Route path='/add' element={<NewBook />} />
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
