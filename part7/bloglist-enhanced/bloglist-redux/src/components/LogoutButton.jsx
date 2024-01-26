import { useDispatch } from 'react-redux'
import { logOut } from '../reducers/loginReducer'

const LogoutButton = () => {
  const dispatch = useDispatch()
  const handleLogout = () => {
    dispatch(logOut())
  }

  return (
    <div>
      <button id='logout' onClick={handleLogout}>
        logout
      </button>
    </div>
  )
}

export default LogoutButton
