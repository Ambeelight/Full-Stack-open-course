import { useEffect } from 'react'
import { useLogIn, useUserValue } from './UserContext'
import { useQuery } from '@tanstack/react-query'
import { Routes, Route } from 'react-router-dom'
import LoginForm from './components/LoginForm'
import LogoutForm from './components/LogoutForm'
import BlogForm from './components/BlogForm'
import BlogList from './components/BlogList'
import Notification from './components/Notification'

import Blog from './components/Blog'
import User from './components/User'
import UserList from './components/UserList'

import blogService from './services/blogs'
import userService from './services/users'

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

  const users = useQuery({
    queryKey: ['users'],
    queryFn: userService.getAll,
    refetchOnWindowFocus: false,
  })

  if (users.isLoading) {
    return <h1>Loading data...</h1>
  } else if (users.isError) {
    return <h1>Users are not available</h1>
  }

  const usersData = users.data

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
      {/* <UserList /> */}
      {/* <BlogForm /> */}
      {/* <BlogList /> */}

      <Routes>
        <Route path='/' element={<BlogList />} />
        <Route path='/blogs/:id' element={<Blog />} />
        <Route path='/blogs/create' element={<BlogForm />} />

        <Route path='/users' element={<UserList users={usersData} />} />
        <Route path='/users/:id' element={<User users={usersData} />} />
      </Routes>
    </div>
  )
}

export default App
