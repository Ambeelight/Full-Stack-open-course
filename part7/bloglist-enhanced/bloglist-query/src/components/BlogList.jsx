import { Link } from 'react-router-dom'

const BlogList = ({ blogs }) => {
  if (!blogs) {
    return <div>No blogs available</div>
  }

  return (
    <div>
      <table>
        <tbody>
          {blogs.map((blog) => (
            <tr key={blog.id}>
              <td>
                <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default BlogList
