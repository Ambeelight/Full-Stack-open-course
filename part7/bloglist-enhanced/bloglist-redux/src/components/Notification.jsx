import { useSelector } from 'react-redux'

export const Notification = () => {
  const notification = useSelector((state) => state.notification)

  const messageStylesSuccess = {
    color: 'green',
    background: 'black',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }

  const messageStylesError = {
    color: 'red',
    background: 'black',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }

  if (!(notification && notification.message)) return null

  const { message, type } = notification

  const messageStyle =
    type === 'success' ? messageStylesSuccess : messageStylesError

  return <div style={messageStyle}>{message}</div>
}

export default Notification
