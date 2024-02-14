import { useQueryClient, useMutation } from '@tanstack/react-query'
import blogService from '../services/blogs'
import Blog from './Blog'
import { useNotification } from '../NotificationContext'
import { useUserValue } from '../UserContext'

const BlogList = () => {
  const queryClient = useQueryClient()
  const blogs = queryClient.getQueryData(['blogs'])
  const user = useUserValue()
  const notification = useNotification()

  if (!blogs) {
    return <div>No blogs available</div>
  }

  const likeBlogMutation = useMutation({
    mutationFn: blogService.update,
    onSuccess: (updatedBlog) => {
      const blogs = queryClient.getQueryData(['blogs'])
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
    <div>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            likeBlog={() => likeBlog(blog)}
            deleteBlog={() => removeBlog(blog)}
            user={user}
          />
        ))}
    </div>
  )
}

export default BlogList
