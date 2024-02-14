import { useLogOut, useUserValue } from '../UserContext'
import { useNotification } from '../NotificationContext'

const LogoutForm = () => {
  const user = useUserValue()
  const logOut = useLogOut()
  const notification = useNotification()

  const handleLogout = (event) => {
    event.preventDefault()

    window.sessionStorage.removeItem('loggedBloglistUser')
    logOut()
    notification(`${user.name} logged out`, 'success')
  }
  return (
    <div>
      {user.name} logged in
      <button onClick={handleLogout}>logout</button>
    </div>
  )
}

export default LogoutForm
