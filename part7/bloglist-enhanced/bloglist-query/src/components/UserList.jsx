import { Link } from 'react-router-dom'

const UserList = ({ users }) => {
  return (
    <div>
      <h2 className='text-xl font-bold'>Users</h2>
      <table className='table-fixed'>
        <thead>
          <tr>
            <th></th>
            <th className='text-lg'>Blogs Created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr
              key={user.id}
              className='hover:text-indigo-600 hover:font-bold my-2 text-lg'
            >
              <td className='w-40'>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td className='text-center w-32'>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UserList
