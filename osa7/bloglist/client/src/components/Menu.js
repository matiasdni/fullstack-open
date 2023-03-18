import { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import { NotificationContext } from '../context/NotificationContext'
import blogService from '../services/blogs'
import { Link } from 'react-router-dom'

export const Menu = () => {
  const { state, dispatch } = useContext(UserContext)
  const { dispatch: notificationDispatch } = useContext(NotificationContext)
  const logOutHandler = () => {
    window.localStorage.removeItem('loggedUser')
    blogService.setToken(null)
    dispatch({ type: 'CLEAR_USER' })
    notificationDispatch({
      type: 'SET_NOTIFICATION',
      message: 'logout successful',
      style: 'info',
    })
  }
  return (
    <div>
      <Link to="/">blogs </Link>
      <Link to="/users">users </Link>
      <span>{`${state.user.name} logged in`}</span>
      <button onClick={logOutHandler}>logout</button>
    </div>
  )
}
