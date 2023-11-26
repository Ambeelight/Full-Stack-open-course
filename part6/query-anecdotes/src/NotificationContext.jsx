import { useReducer, useContext, createContext } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'SET':
      return action.payload
    case 'CLEAR':
      return null
    default:
      return state
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatcher] = useReducer(notificationReducer, null)
  console.log('Notify', notification)
  return (
    <NotificationContext.Provider value={[notification, notificationDispatcher]}>
      {props.children}
    </NotificationContext.Provider>
  )
}

export const useNotificationValue = () => {
  const [notification] = useContext(NotificationContext)
  return notification
}

export const useNotificationDispatch = () => {
  const [notificationDispatch] = useContext(NotificationContext)
  return notificationDispatch
}

export const useNotification = (payload) => {
  const [notification, notificationDispatcher] = useContext(NotificationContext)
  console.log('Payload before', payload)
  return (payload) => {
    console.log('Payload after', payload)
    notificationDispatcher({ type: 'SET', payload })
    setTimeout(() => notificationDispatcher({ type: 'CLEAR' }), 5000)
  }
}

export default NotificationContext
