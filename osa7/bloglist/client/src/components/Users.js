import { useQuery } from 'react-query'
import { Link, Route, Routes, useMatch } from 'react-router-dom'
import userService from '../services/users'

const User = ({ user }) => {
  if (!user) return null
  return (
    <div>
      <h2>{user.username}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  )
}

const UserList = ({ users }) => {
  const sortedUsers = users.sort((a, b) => b.blogs.length - a.blogs.length)
  return (
    <table>
      <thead>
        <tr>
          <th>User</th>
          <th>Blogs created</th>
        </tr>
      </thead>
      <tbody>
        {sortedUsers.map((user) => (
          <tr key={user.id}>
            <td>
              <Link to={`/users/${user.id}`}>{user.username}</Link>
            </td>
            <td>{user.blogs.length}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export const Users = () => {
  const { data: users = [] } = useQuery('users', userService.getAllUsers)
  const userById = (id) => users.find((a) => a.id === id)
  const match = useMatch('/users/:id')
  const user = match ? userById(match.params.id) : null

  return (
    <div>
      <h2>Users</h2>
      <Routes>
        <Route path="/" element={<UserList users={users} />} />
        <Route path="/:id" element={<User user={user} />} />
      </Routes>
    </div>
  )
}
