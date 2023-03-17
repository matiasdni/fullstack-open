import { useQuery } from 'react-query'
import userService from '../services/users'

const Users = () => {
  const { data: users = [] } = useQuery('users', userService.getAllUsers)
  console.log(users)
  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th>user header</th>
            <th>blog header</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>username</td>
              <td>blogs</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Users
