import { useContext } from 'react'
import { NotificationContext } from '../context/NotificationContext'
import { Alert } from 'react-bootstrap'

export const Notification = () => {
  const { state, dispatch } = useContext(NotificationContext)
  if (state.message === null) {
    return null
  }

  setTimeout(() => {
    dispatch({ type: 'CLEAR_NOTIFICATION' })
  }, 3000)

  return (
    <Alert
      variant={state.style !== 'alert' ? 'success' : 'danger'}
      id="notification"
    >
      {state.message}
    </Alert>
  )
}
