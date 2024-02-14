import { useRef } from 'react'
import { useQueryClient, useMutation } from '@tanstack/react-query'
import blogService from '../services/blogs'
import Togglable from './Togglable'
import { useNotification } from '../NotificationContext'

const BlogForm = () => {
  const queryClient = useQueryClient()
  const blogFormRef = useRef()
  const notification = useNotification()

  const createNewBlog = useMutation({
    mutationFn: blogService.create,
    onSuccess: (newBlog) => {
      const prevBlogs = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(['blogs'], [...prevBlogs, newBlog])
      notification(
        `A new blog ${newBlog.title} by ${newBlog.author} has been added`,
        'success'
      )
      queryClient.invalidateQueries(['blogs'])
    },
    onError: (error) => {
      notification(`Error ${error} of adding a new blog`)
    },
  })

  const newBlogData = (event) => {
    event.preventDefault()
    blogFormRef.current.toggleVisibility()

    const blogs = {
      title: event.target.title.value,
      author: event.target.author.value,
      url: event.target.url.value,
    }

    event.target.title.value = ''
    event.target.author.value = ''
    event.target.url.value = ''

    createNewBlog.mutate(blogs)
  }

  return (
    <Togglable buttonLabel='Create' ref={blogFormRef}>
      <h2>Create a new blog</h2>

      <form onSubmit={newBlogData}>
        <div>
          title:
          <input
            id='title'
            type='text'
            name='title'
            autoComplete='off'
            placeholder='write title'
          />
        </div>
        <div>
          author:
          <input
            id='author'
            type='text'
            name='author'
            autoComplete='off'
            placeholder='write author'
          />
        </div>
        <div>
          url:
          <input
            id='url'
            type='text'
            name='url'
            autoComplete='off'
            placeholder='write url'
          />
        </div>
        <input id='createBlog' type='submit' value='Create' />
      </form>
    </Togglable>
  )
}

export default BlogForm
