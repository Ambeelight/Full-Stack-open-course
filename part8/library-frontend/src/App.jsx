import { useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import LogoutBtn from './components/LogoutBtn'
import UserRecommendations from './components/UserRecommendations'

const styles = {
  padding: 5,
  textDecoration: 'none',
}

const App = () => {
  const [token, setToken] = useState(null)

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
