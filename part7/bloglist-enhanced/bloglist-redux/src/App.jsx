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
import { fetchBlogs } from './reducers/blogReducer'

const App = () => {
  const dispatch = useDispatch()

  const blogs = useSelector((state) => state.blogs)

  const [user, setUser] = useState(null)

  useEffect(() => {
    dispatch(fetchBlogs())
  }, [dispatch])

  // useEffect(() => {
  //   const fetchBlogs = async () => {
  //     if (user) {
  //       try {
  //         const blogs = await blogService.getAll()
  //         setBlogs(blogs)
  //       } catch (error) {
  //         console.error('Error fetching blogs:', error.message)
  //       }
  //     }
  //   }

  //   fetchBlogs()
  // }, [user])

  useEffect(() => {
    const loggedUserJSON = window.sessionStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const loginFormRef = useRef()

  const handleLogin = async (credentials) => {
    try {
      loginFormRef.current.toggleVisibility()
      const user = await loginService.login(credentials)

      window.sessionStorage.setItem('loggedBloglistUser', JSON.stringify(user))
      blogService.setToken(user.token)

      setUser(user)
    } catch (exception) {
      dispatch(
        showNotification(
          { message: 'Wrong username or password', type: 'error' },
          5
        )
      )
    }
  }

  const handleLogout = async (event) => {
    event.preventDefault()
    console.log('logout executed')

    window.sessionStorage.removeItem('loggedBloglistUser')

    setUser(null)
  }

  const blogForm = () => {
    return (
      <div>
        <Togglable buttonLabel='Create'>
          <BlogForm />
        </Togglable>
      </div>
    )
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification />
        <Togglable buttonLabel='log in' ref={loginFormRef}>
          <LoginForm createLogin={handleLogin} />
        </Togglable>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <h4>{user.name} logged in</h4>
      <button id='logout' onClick={handleLogout}>
        logout
      </button>
      <h2>create new</h2>
      {blogForm()}
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog key={blog.id} blog={blog} user={user} />
        ))}
    </div>
  )
}

export default App
