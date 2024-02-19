import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
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

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })

      window.sessionStorage.setItem('loggedBloglistUser', JSON.stringify(user))
      blogService.setToken(user.token)

      logIn(user)
      notification(`Welcome ${user.name}`, 'success')

      setUsername('')
      setPassword('')
    } catch (error) {
      notification('Wrong username or password', error)
    }

    navigate('/')
  }

  return (
    <div>
      <h2>Log in to application</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            id='username'
            type='text'
            value={username}
            name='Username'
            onChange={({ target }) => setUsername(target.value)}
            autoComplete='off'
          />
        </div>
        <div>
          password
          <input
            id='password'
            type='password'
            value={password}
            name='Password'
            onChange={({ target }) => setPassword(target.value)}
            autoComplete='off'
          />
        </div>
        <button id='login-btn' type='submit'>
          log in
        </button>
      </form>
    </div>
  )
}

export default LoginForm
