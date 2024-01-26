import { createSlice } from '@reduxjs/toolkit'

const initialState = { message: null, type: 'success' }

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification(state, action) {
      return action.payload
    },
  },
})

export const { setNotification } = notificationSlice.actions

export const showNotification = (notification, time) => {
  return (dispatch) => {
    dispatch(setNotification(notification))
    setTimeout(() => dispatch(setNotification(null)), time * 1000)
  }
}

export default notificationSlice.reducer
