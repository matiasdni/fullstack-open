import { useContext, useEffect, useRef, useState } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import { LoginForm } from './components/LoginForm'
import { CreateForm } from './components/CreateForm'
import Togglable from './components/Togglable'
import { NotificationContext } from './NotificationContext'
import { Notification } from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const createFormRef = useRef()
  const { dispatch } = useContext(NotificationContext)

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
    if (!type) type = 'info'
    dispatch({ type: 'SET_NOTIFICATION', message, style: type })
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

  return user === null ? (
    <>
      <Notification />
      <LoginForm handleSubmit={handleLogin} />
    </>
  ) : (
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
