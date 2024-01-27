import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'

const loginSlice = createSlice({
  name: 'login',
  initialState: null,
  reducers: {
    setLogin(state, action) {
      return action.payload
    },
  },
})

export const { setLogin } = loginSlice.actions

export const loggedUser = () => {
  return async (dispatch) => {
    const loggedUserJSON = window.sessionStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      loginService.setToken(user.token)
      dispatch(setLogin(user))
    }
  }
}

export const logIn = (credentials) => {
  return async (dispatch) => {
    const user = await loginService.login(credentials)
    window.sessionStorage.setItem('loggedBloglistUser', JSON.stringify(user))
    blogService.setToken(user.token)
    dispatch(setLogin(user))
  }
}

export const logOut = () => {
  return async (dispatch) => {
    window.sessionStorage.removeItem('loggedBloglistUser')
    dispatch(setLogin(null))
  }
}

export default loginSlice.reducer
