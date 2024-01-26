import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    addBlog(state, action) {
      return [...state, action.payload]
    },
    removeBlog(state, action) {
      return state.filter((blog) => blog.id !== action.payload)
    },
    updateBlog(state, action) {
      return state.map((blog) =>
        blog.id !== action.payload.id ? blog : action.payload
      )
    },
  },
})

export const { setBlogs, addBlog, removeBlog, updateBlog } = blogSlice.actions

export const fetchBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (blog) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blog)
    dispatch(addBlog(newBlog))
  }
}

export const updateBlogData = (blog) => {
  return async (dispatch) => {
    const updatedBlog = await blogService.update(blog.id)
    dispatch(updateBlog(updatedBlog))
  }
}

export const deleteBlog = (blog) => {
  return async (dispatch) => {
    await blogService.remove(blog.id)
    dispatch(removeBlog(blog.id))
  }
}

export default blogSlice.reducer
