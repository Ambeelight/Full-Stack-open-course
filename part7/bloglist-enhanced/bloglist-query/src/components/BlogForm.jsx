import { useQueryClient, useMutation } from '@tanstack/react-query'
import blogService from '../services/blogs'
import { useNotification } from '../NotificationContext'
import { Link, useNavigate } from 'react-router-dom'

const BlogForm = () => {
  const queryClient = useQueryClient()
  const notification = useNotification()
  const navigate = useNavigate()

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
      navigate('/')
    },
    onError: (error) => {
      notification(`Error ${error} of adding a new blog`)
    },
  })

  const newBlogData = (event) => {
    event.preventDefault()

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
    <div>
      <h2 className='text-lg text-indigo-600 font-bold'>Create a new blog</h2>

      <form onSubmit={newBlogData}>
        <div className='flex mb-2'>
          <div className='text-lg pr-2 py-1.5  w-16'>title:</div>
          <input
            id='title'
            type='text'
            name='title'
            autoComplete='off'
            placeholder='write title'
            className='w-80 px-2 rounded-md border-0 py-1.5 mr-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-base sm:leading-6'
          />
        </div>
        <div className='flex mb-2'>
          <div className='text-lg pr-2 py-1.5 w-16'>author:</div>
          <input
            id='author'
            type='text'
            name='author'
            autoComplete='off'
            placeholder='write author'
            className='w-80 px-2 rounded-md border-0 py-1.5 mr-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-base sm:leading-6'
          />
        </div>
        <div className='flex mb-2'>
          <div className='text-lg pr-2 py-1.5 w-16'>url:</div>
          <input
            id='url'
            type='text'
            name='url'
            autoComplete='off'
            placeholder='write url'
            className='w-80 px-2 rounded-md border-0 py-1.5 mr-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-base sm:leading-6'
          />
        </div>
        <input
          id='createBlog'
          type='submit'
          value='Create'
          className='cursor-pointer rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold leading-1 text-white shadow-sm hover:bg-indigo-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
        />
        <Link
          to={'/'}
          className='rounded-md bg-neutral-200 px-4 py-2 text-sm font-semibold leading-1 text-black shadow-sm hover:bg-red-600 hover:text-white  ml-4'
        >
          Cancel
        </Link>
      </form>
    </div>
  )
}

export default BlogForm
