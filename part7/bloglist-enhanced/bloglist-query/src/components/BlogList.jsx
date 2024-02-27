import { Link } from 'react-router-dom'

const BlogList = ({ blogs }) => {
  if (!blogs) {
    return <div>No blogs available</div>
  }

  return (
    <div className=''>
      <Link
        to={'/blogs/create'}
        className='text-lg text-indigo-600 hover:font-bold'
      >
        Create a new blog
      </Link>
      <h2 className='text-xl font-bold'>Blogs:</h2>
      <ul className='list-disc pl-8 text-lg'>
        {blogs
          .slice()
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <li
              key={blog.id}
              className='hover:text-indigo-600 hover:font-bold  my-2'
            >
              <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
            </li>
          ))}
      </ul>
    </div>
  )
}

export default BlogList
