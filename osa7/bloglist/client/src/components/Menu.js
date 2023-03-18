import { useContext } from 'react'
import { UserContext } from '../context/UserContext'
import { NotificationContext } from '../context/NotificationContext'
import blogService from '../services/blogs'
import { Link } from 'react-router-dom'
import { Button, Nav, Navbar } from 'react-bootstrap'

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
    <Navbar
      collapseOnSelect={true}
      expand="lg"
      bg="dark"
      variant="dark"
      className={'mw-100'}
    >
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="">
          <Nav.Link href="#" as="span">
            <Link to="/">Blogs</Link>
          </Nav.Link>
          <Nav.Link href="#" as="span">
            <Link to="/users">Users</Link>
          </Nav.Link>
          <Nav.Link href="#" as="span" className={'d-lg-inline-flex'}>
            {state.user ? (
              <em>
                {state.user.name} logged in
                <Button
                  onClick={logOutHandler}
                  variant={'secondary'}
                  size={'sm'}
                  className={'mx-lg-3'}
                >
                  logout
                </Button>
              </em>
            ) : (
              <Link to="/login">login</Link>
            )}
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}
