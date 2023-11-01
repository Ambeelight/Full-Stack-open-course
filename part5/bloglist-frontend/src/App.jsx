import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import { Notification } from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
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

  const blogFormRef = useRef()

  const addBlog = async (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility()

      const returnedBlog = await blogService.create(blogObject)
      setBlogs((blogs) => [...blogs, returnedBlog])
      returnedBlog.user = { name: user.name }
    } catch (error) {
      console.error('Error adding a blog:', error)
    }
  }

  const blogForm = () => {
    return (
      <div>
        <Togglable buttonLabel="Create" ref={blogFormRef}>
          <BlogForm createBlog={addBlog} showNotification={showNotification} />
        </Togglable>
      </div>
    )
  }

  const likeHandler = async (blog) => {
    try {
      const updatedBlog = await blogService.update(blog.id, {
        ...blog,
        likes: blog.likes + 1,
      })

      setBlogs((blogs) => blogs.map((blog) => (blog.id === updatedBlog.id ? updatedBlog : blog)))
      updatedBlog.user = { name: user.name }
    } catch (error) {
      console.log('Error in adding a like', error)
    }
  }

  const deleteBlog = async (blog) => {
    const confirmDeleting = window.confirm(`Delete blog "${blog.title}" by ${blog.author}?`)
    if (!confirmDeleting) {
      return
    }

    try {
      await blogService.remove(blog.id)

      setBlogs((blogs) => blogs.filter((b) => b.id !== blog.id))
    } catch (error) {
      console.log('Error in deleting a blog', error)
    }
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
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            likeHandler={likeHandler}
            deleteBlog={deleteBlog}
            user={user}
          />
        ))}
    </div>
  )
}

export default App
