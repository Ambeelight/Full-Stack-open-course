import { Link, useParams } from 'react-router-dom'

const User = ({ users }) => {
  const { id } = useParams()
  const user = users.find((u) => u.id === id)
  return (
    <div>
      {user ? (
        <div>
          <h2>{user.name}</h2>
          <div>
            <h3>added blogs</h3>
            <table>
              <tbody>
                {user.blogs.map((blog) => (
                  <tr key={blog.id}>
                    <td>
                      <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div>User not found</div>
      )}
    </div>
  )
}

export default User
