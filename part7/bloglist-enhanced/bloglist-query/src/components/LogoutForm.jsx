import { useLogOut, useUserValue } from '../UserContext'
import { useNotification } from '../NotificationContext'
import { useNavigate } from 'react-router-dom'

const LogoutForm = () => {
  const user = useUserValue()
  const logOut = useLogOut()
  const navigate = useNavigate()
  const notification = useNotification()

  const handleLogout = (event) => {
    event.preventDefault()

    window.sessionStorage.removeItem('loggedBloglistUser')
    logOut()
    notification(`${user.name} logged out`, 'success')
    navigate('/login')
  }
  return (
    <div className='flex justify-end'>
      <h3 className='pe-2'>{user.name} is logged in</h3>
      <button
        onClick={handleLogout}
        className='rounded-md bg-indigo-600 px-2 text-sm font-semibold leading-1 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
      >
        logout
      </button>
    </div>
  )
}

export default LogoutForm
