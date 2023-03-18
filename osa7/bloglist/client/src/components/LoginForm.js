import { useState } from 'react'
import PropTypes from 'prop-types'
import { Button, Form } from 'react-bootstrap'

export const LoginForm = ({ handleSubmit }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const login = (event) => {
    event.preventDefault()
    handleSubmit({ username, password })
    setUsername('')
    setPassword('')
  }

  return (
    <div>
      <h2>Log in to application</h2>
      <Form onSubmit={login}>
        <Form.Group>
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            name="username"
            onChange={({ target }) => setUsername(target.value)}
            id="username"
            value={username}
          />
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            value={password}
            name={'Password'}
            onChange={({ target }) => setPassword(target.value)}
            id="password"
          />
          <Button variant="primary" type="submit" id="loginButton">
            login
          </Button>
        </Form.Group>
      </Form>
    </div>
  )
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
}
