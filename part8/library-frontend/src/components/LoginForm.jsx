import { useEffect, useState } from 'react'
import { useMutation } from '@apollo/client'
import { useNavigate } from 'react-router-dom'
import { LOGIN } from '../queries'

const LoginForm = ({ setToken }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      console.log('Error', error.graphQLErrors[0].message)
    },
  })

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('library-user-token', token)
    }
  }, [result.data, setToken])

  const submit = async (event) => {
    event.preventDefault()

    const variables = { username, password }
    console.log('Variables', variables)

    login({ variables })

    setUsername('')
    setPassword('')
    navigate('/')
  }

  return (
    <div>
      <h2>Login to the library</h2>
      <form onSubmit={submit}>
        <div>
          <label>login</label>
          <div>
            <input
              type='text'
              value={username}
              name='username'
              onChange={({ target }) => setUsername(target.value)}
              autoComplete='off'
              required
            />
          </div>
        </div>
        <div>
          <label>password</label>
          <div>
            <input
              type='password'
              value={password}
              name='password'
              onChange={({ target }) => setPassword(target.value)}
              autoComplete='off'
              required
            />
          </div>
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )
}

export default LoginForm
