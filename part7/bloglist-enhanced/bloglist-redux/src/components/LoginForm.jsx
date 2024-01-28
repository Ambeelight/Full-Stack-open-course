import { useDispatch } from 'react-redux'
import { logIn } from '../reducers/loginReducer'
import { showNotification } from '../reducers/notificationReducer'

const LoginForm = () => {
  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const credentials = {
        username: event.target.username.value,
        password: event.target.password.value,
      }
      console.log('Credentials', credentials)
      dispatch(logIn(credentials))
    } catch (error) {
      dispatch(
        showNotification(
          { message: 'Wrong username or password', type: 'error' },
          5
        )
      )
    }
    event.target.username.value = ''
    event.target.password.value = ''
  }

  return (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input id='username' type='text' name='Username' autoComplete='off' />
      </div>
      <div>
        password
        <input
          id='password'
          type='password'
          name='Password'
          autoComplete='off'
        />
      </div>
      <button id='login-btn' type='submit'>
        log in
      </button>
    </form>
  )
}

export default LoginForm
