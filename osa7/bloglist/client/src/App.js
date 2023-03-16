import { useEffect, useState, useRef, useContext, useReducer } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import { LoginForm } from './components/LoginForm'
import { CreateForm } from './components/CreateForm'
import Togglable from './components/Togglable'
import { NotificationProvider, NotificationContext } from './NotificationContext';

const Notification = ({ notification }) => {
  const { state } = useContext(NotificationContext);
  if (state.message === null) {
    return null
  }

  const style = {
    color: notification.type === 'alert' ? 'red' : 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }

  return (
    <div style={style} id="notification">
      {NotificationProvider(state.message)}
    </div>
  )
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const createFormRef = useRef()
  const { state, dispatch } = useContext(NotificationContext);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLikes = async (updatedBlog) => {
    await blogService.update(updatedBlog)
    const newBlogs = [...blogs]
    newBlogs.at(
      blogs.indexOf(blogs.find((blog) => blog.id === updatedBlog.id))
    ).likes += 1
    setBlogs(newBlogs)
  }

  const notify = (message, type) => {
    if (!type) {
      type = 'info'
    }
    dispatch({ type: 'SET_NOTIFICATION', message, notificationType: type });
    setTimeout(() => {
      dispatch({ type: 'CLEAR_NOTIFICATION' });
    }, 3000)
  }

  const handleLogin = async ({ username, password }) => {
    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      notify('login successful')
    } catch (exception) {
      notify('wrong username or password', 'alert')
    }
  }

  const logOutHandler = () => {
    window.localStorage.removeItem('loggedUser')
    blogService.setToken(null)
    setUser(null)
    notify('logout successful')
  }

  const createBlog = async (newBlog) => {
    try {
      const blog = await blogService.create(newBlog)
      blog.user = user
      setBlogs(blogs.concat(blog))
      notify(`a new blog ${blog.title} by ${blog.author} added`)
      createFormRef.current.toggleVisibility()
    } catch (e) {
      notify('title or url missing', 'alert')
    }
  }

  const removeBlog = async (blog) => {
    await blogService.remove(blog)
    setBlogs(blogs.filter((b) => b.id !== blog.id))
    notify(`${blog.title} by ${blog.author} removed`)
  }

  if (user === null)
    return (
      <>
        <Notification />
        <LoginForm handleSubmit={handleLogin} />
      </>
    )

  return (
    <>
      <h2>blogs</h2>
        <Notification />
      <p>
        {user.name} logged in <button onClick={logOutHandler}>logout</button>
      </p>
      <Togglable buttonLabel="create new blog" ref={createFormRef}>
        <CreateForm handleSubmit={createBlog} />
      </Togglable>
      <div>
        {blogs
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              handleLikes={handleLikes}
              user={user}
              deleteBlog={removeBlog}
            />
          ))}
      </div>
    </>
  )
}

export default App
