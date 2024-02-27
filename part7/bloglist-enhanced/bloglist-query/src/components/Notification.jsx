import { useNotificationValue } from '../NotificationContext'

export const Notification = () => {
  const notification = useNotificationValue()

  if (!(notification && notification.message)) return null

  return (
    <div
      className={`${
        notification.type === 'success' ? 'text-green-600' : 'text-red-600'
      } 
       bg-stone-300
        text-center
        text-2xl
        font-bold 
        border-solid 
        border 
        rounded 
        p-4 
        mb-4`}
    >
      {notification.message}
    </div>
  )
}

export default Notification
