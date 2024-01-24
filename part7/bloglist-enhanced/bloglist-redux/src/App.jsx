import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import { Notification } from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

import { useDispatch, useSelector } from 'react-redux'
import { showNotification } from './reducers/notificationReducer'

const App = () => {
  const dispatch = useDispatch()
  const notification = useSelector((state) => state.notification)

  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

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

  const showAlert = ({ message, type }) => {
    console.log('Calling showAlert with:', { message, type })
    dispatch(showNotification({ message, type }, 5))
  }

  const loginFormRef = useRef()

  const handleLogin = async (credentials) => {
    try {
      loginFormRef.current.toggleVisibility()
      const user = await loginService.login(credentials)

      window.sessionStorage.setItem('loggedBloglistUser', JSON.stringify(user))
      blogService.setToken(user.token)

      setUser(user)
    } catch (exception) {
      showAlert({ message: 'Wrong username or password', type: 'error' })
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    console.log('logout executed')

    window.sessionStorage.removeItem('loggedBloglistUser')

    setUser(null)
  }

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
        <Togglable buttonLabel='Create' ref={blogFormRef}>
          <BlogForm createBlog={addBlog} showNotification={showAlert} />
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

      setBlogs((blogs) =>
        blogs.map((blog) => (blog.id === updatedBlog.id ? updatedBlog : blog))
      )
      updatedBlog.user = { name: user.name }
    } catch (error) {
      console.log('Error in adding a like', error)
    }
  }

  const deleteBlog = async (blog) => {
    const confirmDeleting = window.confirm(
      `Delete blog "${blog.title}" by ${blog.author}?`
    )
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
        {notification && <Notification />}
        <Togglable buttonLabel='log in' ref={loginFormRef}>
          <LoginForm createLogin={handleLogin} />
        </Togglable>
      </div>
    )
  }

  console.log('Notification state:', notification)

  return (
    <div>
      <h2>blogs</h2>
      {notification && <Notification />}
      <h4>{user.name} logged in</h4>
      <button id='logout' onClick={handleLogout}>
        logout
      </button>
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
