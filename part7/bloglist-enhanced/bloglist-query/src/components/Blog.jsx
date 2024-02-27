import { useQueryClient, useMutation } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'
import { useNotification } from '../NotificationContext'
import { useUserValue } from '../UserContext'
import blogService from '../services/blogs'

const Blog = () => {
  const { id } = useParams()
  const user = useUserValue()
  const queryClient = useQueryClient()
  const blogs = queryClient.getQueryData(['blogs'])
  const notification = useNotification()

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

  const addCommentMutation = useMutation({
    mutationFn: blogService.addComment,
    onSuccess: (updatedBlog) => {
      queryClient.setQueryData(
        ['blogs'],
        blogs.map((blog) => (blog.id === updatedBlog.id ? updatedBlog : blog))
      )
      notification(`A comment has been added`, 'success')
      queryClient.invalidateQueries(['blogs'])
    },
    onError: (error) => notification(error.response.data.error),
  })

  if (!blogs) {
    return <div>No blogs available</div>
  }

  const blog = blogs.find((b) => b.id === id)

  const addComment = (event) => {
    event.preventDefault()
    const comment = event.target.elements.comment.value

    addCommentMutation.mutate({ id, comment })
  }

  return (
    <div>
      <div>
        <h2 className='text-xl font-bold'>
          {blog.title}{' '}
          <span className='text-xl font-bold text-indigo-600'>
            {blog.author}
          </span>
        </h2>
      </div>
      {
        <div className='text-base'>
          <div className=''>
            Website:{' '}
            <span className='font-bold text-indigo-600'>{blog.url}</span>
          </div>
          <div>
            Likes:{' '}
            <span className='font-bold text-indigo-600'>{blog.likes}</span>
            <button
              onClick={() => likeBlog(blog)}
              className='rounded-md bg-indigo-600 px-2 ml-2 text-sm font-semibold leading-1 text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
            >
              like
            </button>
          </div>

          <div>
            Added by{' '}
            <span className='text-indigo-600 font-bold'>{blog.user.name} </span>
          </div>
          {blog.user.name === user.name ? (
            <button
              onClick={() => removeBlog(blog)}
              className='rounded-md bg-indigo-600 px-1 py-1 text-sm font-semibold leading-1 text-white shadow-sm hover:bg-red-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
            >
              remove
            </button>
          ) : (
            ''
          )}
        </div>
      }
      <div>
        <h3 className='font-bold'>comments:</h3>
        <form onSubmit={addComment}>
          <input
            id='comment'
            type='text'
            name='comment'
            autoComplete='off'
            placeholder='write a comment'
            className='w-80 px-2 rounded-md border-0 py-1.5 mr-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-base sm:leading-6'
          ></input>
          <input
            id='addComment'
            type='submit'
            value='add comment'
            className='rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold leading-1 text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
          ></input>
        </form>
        <ul>
          {blog.comments.map((comment, index) => (
            <li key={index} className='text-base list-disc my-2 ml-6'>
              {comment}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Blog
