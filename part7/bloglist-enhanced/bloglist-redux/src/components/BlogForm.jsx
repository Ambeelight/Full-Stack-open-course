import { useDispatch } from 'react-redux'
import { showNotification } from '../reducers/notificationReducer'
import { createBlog } from '../reducers/blogReducer'

const BlogForm = () => {
  const dispatch = useDispatch()

  const handleNewBlog = async (event) => {
    event.preventDefault()

    try {
      const newBlogData = {
        title: event.target.title.value,
        author: event.target.author.value,
        url: event.target.url.value,
      }

      dispatch(createBlog(newBlogData))
      dispatch(
        showNotification(
          {
            message: `A new blog ${newBlogData.title} by ${newBlogData.author} added`,
            type: 'success',
          },
          5
        )
      )
    } catch (error) {
      console.log('Error creating a new blog', error.message)
      dispatch(
        showNotification(
          {
            message: 'Error adding a new blog',
            type: 'error',
          },
          5
        )
      )
    }
    event.target.title.value = ''
    event.target.author.value = ''
    event.target.url.value = ''
  }

  return (
    <div>
      <h2>Blogs</h2>

      <form onSubmit={handleNewBlog}>
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
    </div>
  )
}
export default BlogForm
