import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'
import blogService from '../services/blogs'
import loginService from '../services/login'
import { useLogIn } from '../UserContext'
import { useNotification } from '../NotificationContext'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const logIn = useLogIn()
  const navigate = useNavigate()
  const notification = useNotification()
  const queryClient = useQueryClient()

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })

      window.sessionStorage.setItem('loggedBloglistUser', JSON.stringify(user))
      blogService.setToken(user.token)

      logIn(user)
      notification(`Welcome ${user.name}`, 'success')
      queryClient.invalidateQueries(['blogs'])

      setUsername('')
      setPassword('')
    } catch (error) {
      notification('Wrong username or password', error)
    }

    navigate('/')
  }

  return (
    <div className='flex flex-1 flex-col justify-center min-h-full px-6 py-52 lg:px-8"'>
      <h2 className='text-center text-2xl font-bold'>Log in to application</h2>
      <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
        <form className='space-y-6' onSubmit={handleLogin}>
          <div>
            <label className='block text-base font-medium leading-6 text-gray-900'>
              username
            </label>
            <div className='mt-2'>
              <input
                id='username'
                type='text'
                value={username}
                name='username'
                onChange={({ target }) => setUsername(target.value)}
                autoComplete='off'
                required
                className='block w-full px-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-base sm:leading-6'
              />
            </div>
          </div>
          <div>
            <label className='block text-base font-medium leading-6 text-gray-900'>
              password
            </label>
            <div className='mt-2'>
              <input
                id='password'
                type='password'
                value={password}
                name='password'
                onChange={({ target }) => setPassword(target.value)}
                autoComplete='off'
                required
                className='block w-full px-2 text-lg rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-xl sm:leading-6'
              />
            </div>
          </div>
          <button
            id='login-btn'
            type='submit'
            className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-base font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
          >
            log in
          </button>
        </form>
      </div>
    </div>
  )
}

export default LoginForm
