import { useState } from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ createLogin }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()

    createLogin({ username, password })

    setUsername('')
    setPassword('')
  }

  return (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          id="username"
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
          id="password"
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
          autoComplete="off"
        />
      </div>
      <button id="login-btn" type="submit">
        log in
      </button>
    </form>
  )
}

LoginForm.propTypes = {
  createLogin: PropTypes.func.isRequired,
}

export default LoginForm
