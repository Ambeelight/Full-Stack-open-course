import { useEffect } from 'react'
import { useLogIn, useUserValue } from './UserContext'
import { useQuery } from '@tanstack/react-query'
import LoginForm from './components/LoginForm'
import LogoutForm from './components/LogoutForm'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import Notification from './components/Notification'

import blogService from './services/blogs'

const App = () => {
  const logIn = useLogIn()
  const user = useUserValue()

  useEffect(() => {
    const loggedUserJSON = window.sessionStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)
      logIn(loggedUser)
      blogService.setToken(loggedUser.token)
    }
  }, [])

  const { isError, isLoading } = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
    refetchOnWindowFocus: false,
  })

  if (!user) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification />
        <LoginForm />
      </div>
    )
  }

  if (isLoading) {
    return <h1>Loading data...</h1>
  } else if (isError) {
    return <h1>Server is not available</h1>
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <LogoutForm />
      <BlogForm />
      <BlogList />
    </div>
  )
}

export default App
