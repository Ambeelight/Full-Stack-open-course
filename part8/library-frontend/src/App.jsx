import { Routes, Route, Link } from 'react-router-dom'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'

const styles = {
  padding: 5,
  textDecoration: 'none',
}

const App = () => {
  return (
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

      <Routes>
        <Route path='/' element={<Authors />} />
        <Route path='/books' element={<Books />} />
        <Route path='/add' element={<NewBook />} />
      </Routes>
    </div>
  )
}

export default App
