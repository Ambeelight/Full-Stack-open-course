import { Link, useParams } from 'react-router-dom'

const User = ({ users }) => {
  const { id } = useParams()
  const user = users.find((u) => u.id === id)
  return (
    <div>
      {user ? (
        <div>
          <h2 className='text-xl font-bold text-indigo-600'>{user.name}</h2>
          <div>
            <h3 className='text-lg font-bold pl-3'>Added blogs:</h3>
            <ul className='list-decimal pl-10 text-base'>
              {user.blogs.map((blog) => (
                <li
                  key={blog.id}
                  className='hover:text-indigo-600 hover:font-bold my-2'
                >
                  <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <div>User not found</div>
      )}
    </div>
  )
}

export default User
