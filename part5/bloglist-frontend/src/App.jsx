import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import { Notification } from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: '',
  })
  const [notification, setNotification] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    const fetchBlogs = async () => {
      if (user) {
        try {
          const blogs = await blogService.getAll()
          setBlogs(blogs)
        } catch (error) {
          console.error('Error fetching blogs:', error.message)
        }
      }
    }

    fetchBlogs()
  }, [user])

  useEffect(() => {
    const loggedUserJSON = window.sessionStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const showNotification = ({ message, type }) => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)

    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.sessionStorage.setItem('loggedBloglistUser', JSON.stringify(user))
      blogService.setToken(user.token)

      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      showNotification({ message: 'Wrong username or password', type: 'error' })
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    console.log('logout executed')

    window.sessionStorage.removeItem('loggedBloglistUser')

    setUser(null)
    setUsername('')
    setPassword('')
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
          autoComplete="off"
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
          autoComplete="off"
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  const handleNewBlog = async (event) => {
    event.preventDefault()

    try {
      const newBlogData = {
        title: newBlog.title,
        author: newBlog.author,
        url: newBlog.url,
      }

      const createdBlog = await blogService.create(newBlogData)

      setBlogs([...blogs, createdBlog])
      setNewBlog({ title: '', author: '', url: '' })
      showNotification({
        message: `A new blog ${newBlogData.title} by ${newBlogData.author} added`,
        type: 'success',
      })
    } catch (error) {
      console.log('Error creating a new blog', error.message)
    }
  }

  const blogForm = () => {
    return (
      <form onSubmit={handleNewBlog}>
        <div>
          title:
          <input
            type="text"
            value={newBlog.title}
            name="title"
            onChange={(target) => setNewBlog({ ...newBlog, title: target.target.value })}
            autoComplete="off"
          />
        </div>
        <div>
          author:
          <input
            type="text"
            value={newBlog.author}
            name="author"
            onChange={(target) => setNewBlog({ ...newBlog, author: target.target.value })}
            autoComplete="off"
          />
        </div>
        <div>
          url:
          <input
            type="text"
            value={newBlog.url}
            name="url"
            onChange={(target) => setNewBlog({ ...newBlog, url: target.target.value })}
            autoComplete="off"
          />
        </div>
        <input type="submit" value="Create" />
      </form>
    )
  }
  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        {notification && (
          <Notification message={notification.message} classType={notification.type} />
        )}
        {loginForm()}
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      {notification && (
        <Notification message={notification.message} classType={notification.type} />
      )}
      <h4>{user.name} logged in</h4>
      <button onClick={handleLogout}>logout</button>
      <h2>create new</h2>
      {blogForm()}
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  )
}

export default App
