import { useEffect, useRef } from 'react'
import Blog from './components/Blog'
import { Notification } from './components/Notification'
import LoginForm from './components/LoginForm'
import LogoutButton from './components/LogoutButton'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

import { useDispatch, useSelector } from 'react-redux'
import { fetchBlogs } from './reducers/blogReducer'
import { loggedUser } from './reducers/loginReducer'
import { fetchUsers } from './reducers/userReducer'

const App = () => {
  const dispatch = useDispatch()

  const blogs = useSelector((state) => state.blogs)
  const loggedIn = useSelector((state) => state.login)
  // const users = useSelector((state) => state.users)

  useEffect(() => {
    dispatch(loggedUser()), dispatch(fetchUsers())
  }, [dispatch])

  useEffect(() => {
    const getBlogs = async () => {
      if (loggedIn) {
        try {
          dispatch(fetchBlogs())
        } catch (error) {
          console.error('Error fetching blogs:', error.message)
        }
      }
    }

    getBlogs()
  }, [dispatch, loggedIn])

  const loginFormRef = useRef()

  if (!loggedIn) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification />
        <Togglable buttonLabel='log in' ref={loginFormRef}>
          <LoginForm />
        </Togglable>
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <h4>{loggedIn.name} logged in</h4>
      <LogoutButton />
      <h2>create new</h2>
      <Togglable buttonLabel='Create'>
        <BlogForm />
      </Togglable>
      {blogs
        .slice()
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog key={blog.id} blog={blog} user={loggedIn} />
        ))}
    </div>
  )
}

export default App
