import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateBlog, deleteBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const blogStyle = {
  paddingTop: 10,
  paddingLeft: 2,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5,
}

const deleteBtnStyle = {
  backgroundColor: '#526FFF',
  color: 'white',
}

const Blog = ({ blog, user }) => {
  const dispatch = useDispatch()
  // const blogs = useSelector((state) => state.blogs)
  const [showData, setShowData] = useState(false)

  const toggleData = () => setShowData(!showData)

  const likeHandler = (blog) => {
    const blogToUpdate = { ...blog, likes: blog.likes + 1 }
    try {
      dispatch(updateBlog(blogToUpdate))
      dispatch(
        setNotification(
          {
            message: `A like for the blog '${blog.title}' by '${blog.author} has been added'`,
            type: 'success',
          },
          5
        )
      )
    } catch (error) {
      console.log('Error in adding likes', error)
    }
  }

  const deleteHandler = (id) => {
    if (window.confirm(`Delete blog "${blog.title}" by ${blog.author}?`)) {
      try {
        dispatch(deleteBlog(id))
        dispatch(
          setNotification(
            {
              message: `The blog' ${blog.title}' by '${blog.author} deleted`,
              type: 'success',
            },
            5
          )
        )
      } catch (error) {
        console.log('Error in deleting a blog', error)
      }
    }
  }

  return (
    <div className='blog' style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={toggleData}>{showData ? 'Hide' : 'Show'}</button>
      </div>
      {showData && (
        <div className='blog__hided'>
          Website: {blog.url} <br />
          Likes: {blog.likes}
          <button className='like' onClick={() => likeHandler(blog)}>
            like
          </button>{' '}
          <br />
          Added by {blog.user.name} <br />
          {blog.user.name === user.name ? (
            <button
              className='removeBlog'
              onClick={() => deleteHandler(blog)}
              style={deleteBtnStyle}
            >
              remove
            </button>
          ) : (
            ''
          )}
        </div>
      )}
    </div>
  )
}

export default Blog
