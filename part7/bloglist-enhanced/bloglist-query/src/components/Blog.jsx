import { useQueryClient, useMutation } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import blogService from '../services/blogs'
import { useNotification } from '../NotificationContext'
import { useUserValue } from '../UserContext'

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

const Blog = () => {
  const { id } = useParams()
  const queryClient = useQueryClient()
  const blogs = queryClient.getQueryData(['blogs'])
  const user = useUserValue()
  const notification = useNotification()

  if (!blogs) {
    return <div>No blogs available</div>
  }

  const blog = blogs.find((b) => b.id === id)

  const likeBlogMutation = useMutation({
    mutationFn: blogService.update,
    onSuccess: (updatedBlog) => {
      queryClient.setQueryData(
        ['blogs'],
        blogs.map((blog) => (blog.id === updatedBlog.id ? updatedBlog : blog))
      )
      notification(
        `The blog ${updatedBlog.title} by ${updatedBlog.author} has been liked`,
        'success'
      )
    },
    onError: (error) => {
      notification(error.response.data.error)
    },
  })

  const likeBlog = (blog) => {
    const blogToUpdate = { ...blog, likes: blog.likes + 1 }
    likeBlogMutation.mutate(blogToUpdate)
  }

  const removeBlogMutation = useMutation({
    mutationFn: blogService.remove,
    onSuccess: (deletedBlog) => {
      const prevBlogs = queryClient.getQueryData(['blogs'])
      const updatedBlogs = prevBlogs.filter(
        (blogs) => blogs.id !== deletedBlog.id
      )
      queryClient.setQueryData(['blogs'], updatedBlogs)
      notification(
        `The blog ${deletedBlog.title} by ${deletedBlog.author} has been removed`,
        'success'
      )
      queryClient.invalidateQueries(['blogs'])
    },
    onError: (error) => notification(error.response.data.error),
  })

  const removeBlog = (blog) => {
    if (window.confirm(`Remove ${blog.title} by ${blog.author}?`)) {
      removeBlogMutation.mutate(blog)
    }
  }

  return (
    <div className='blog' style={blogStyle}>
      <div>
        {blog.title} {blog.author}
      </div>
      {
        <div className='blog__hided'>
          Website: {blog.url} <br />
          Likes: {blog.likes}
          <button className='like' onClick={() => likeBlog(blog)}>
            like
          </button>{' '}
          <br />
          Added by {blog.user.name} <br />
          {blog.user.name === user.name ? (
            <button
              className='removeBlog'
              onClick={() => removeBlog(blog)}
              style={deleteBtnStyle}
            >
              remove
            </button>
          ) : (
            ''
          )}
        </div>
      }
    </div>
  )
}

export default Blog
