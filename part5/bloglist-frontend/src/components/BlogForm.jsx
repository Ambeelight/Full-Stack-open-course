import { useState } from 'react'

const BlogForm = ({ createBlog, showNotification }) => {
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: '',
  })

  const handleNewBlog = async (event) => {
    event.preventDefault()

    try {
      const newBlogData = {
        title: newBlog.title,
        author: newBlog.author,
        url: newBlog.url,
      }

      createBlog(newBlogData)
      setNewBlog({ title: '', author: '', url: '' })

      showNotification({
        message: `A new blog ${newBlogData.title} by ${newBlogData.author} added`,
        type: 'success',
      })
    } catch (error) {
      console.log('Error creating a new blog', error.message)
    }
  }

  return (
    <div>
      <h2>Blogs</h2>

      <form onSubmit={handleNewBlog}>
        <div>
          title:
          <input
            type="text"
            value={newBlog.title}
            name="title"
            onChange={(target) => setNewBlog({ ...newBlog, title: target.target.value })}
            autoComplete="off"
          />
        </div>
        <div>
          author:
          <input
            type="text"
            value={newBlog.author}
            name="author"
            onChange={(target) => setNewBlog({ ...newBlog, author: target.target.value })}
            autoComplete="off"
          />
        </div>
        <div>
          url:
          <input
            type="text"
            value={newBlog.url}
            name="url"
            onChange={(target) => setNewBlog({ ...newBlog, url: target.target.value })}
            autoComplete="off"
          />
        </div>
        <input type="submit" value="Create" />
      </form>
    </div>
  )
}

export default BlogForm
