import { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query'
import { useLogIn, useUserValue } from './UserContext'
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
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
  const navigate = useNavigate()

  useEffect(() => {
    const loggedUserJSON = window.sessionStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const loggedUser = JSON.parse(loggedUserJSON)
      logIn(loggedUser)
      blogService.setToken(loggedUser.token)
    } else {
      navigate('/login')
    }
  }, [navigate])

  const { data: blogs } = useQuery({
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

  return (
    <div className='mx-auto max-w-5xl'>
      {user && (
        <div className='flex flex-row justify-between items-center pt-2 '>
          <nav className='text-xl'>
            <Link className='p-1' to='/'>
              blogs
            </Link>
            <Link className='p-1' to='/users'>
              users
            </Link>
          </nav>
          <LogoutForm />
        </div>
      )}

      {/* {user && <LogoutForm />} */}
      <Notification />

      <Routes>
        <Route path='/login' element={<LoginForm />} />

        <Route path='/' element={<BlogList blogs={blogs} />} />
        <Route path='/blogs/:id' element={<Blog />} />
        <Route path='/blogs/create' element={<BlogForm />} />

        <Route path='/users' element={<UserList users={usersData} />} />
        <Route path='/users/:id' element={<User users={usersData} />} />
      </Routes>
    </div>
  )
}

export default App
