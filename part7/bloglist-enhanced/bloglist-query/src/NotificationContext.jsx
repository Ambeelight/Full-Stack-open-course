import { createContext, useReducer, useContext } from 'react'

const notificationReducer = (
  state = { message: null, type: 'test' },
  action
) => {
  switch (action.type) {
    case 'SET':
      return action.payload
    default:
      return state
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer)

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
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

export const useNotification = () => {
  const [notification, notificationDispatch] = useContext(NotificationContext)

  return (message, type = 'notification', time = 5) => {
    notificationDispatch({ type: 'SET', payload: { message, type } })
    setTimeout(
      () => notificationDispatch({ type: 'SET', payload: null }),
      time * 1000
    )
  }
}

export default NotificationContext
