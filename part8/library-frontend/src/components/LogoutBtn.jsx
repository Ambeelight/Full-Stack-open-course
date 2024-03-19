import { useApolloClient } from '@apollo/client'
import { useNavigate } from 'react-router-dom'

const LogoutBtn = ({ setToken }) => {
  const client = useApolloClient()
  const navigate = useNavigate()

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    navigate('/login')
  }

  return (
    <div>
      <button onClick={logout}>logout</button>
    </div>
  )
}

export default LogoutBtn
