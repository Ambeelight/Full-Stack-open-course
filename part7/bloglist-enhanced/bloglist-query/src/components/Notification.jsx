import { useNotificationValue } from '../NotificationContext'

export const Notification = () => {
  const notification = useNotificationValue()

  const messageStyle = {
    color: notification?.type === 'success' ? 'green' : 'red',
    background: 'black',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }

  if (!(notification && notification.message)) return null

  return <div style={messageStyle}>{notification.message}</div>
}

export default Notification
