import { useContext, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import { LoginForm } from './components/LoginForm'
import { CreateForm } from './components/CreateForm'
import Togglable from './components/Togglable'
import { NotificationContext } from './context/NotificationContext'
import { Notification } from './components/Notification'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { UserContext } from './context/UserContext'

const App = () => {
  useEffect(() => {
    const user = window.localStorage.getItem('loggedUser')
    if (user) {
      blogService.setToken(user.token)
      userDispatch({ type: 'SET_USER', user })
    }
  }, [])
  const { state: userState, dispatch: userDispatch } = useContext(UserContext)
  const createFormRef = useRef()
  const { dispatch: notificationDispatch } = useContext(NotificationContext)
  const queryClient = useQueryClient()
  const { data: blogs = [] } = useQuery('blogs', blogService.getAll)

  const updateMutation = useMutation(
    (updatedBlog) => blogService.update(updatedBlog),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('blogs')
      },
    }
  )

  const removeMutation = useMutation((blog) => blogService.remove(blog), {
    onSuccess: () => {
      queryClient.invalidateQueries('blogs')
    },
  })

  const createMutation = useMutation((newBlog) => blogService.create(newBlog), {
    onSuccess: (data) => {
      queryClient.invalidateQueries('blogs')
      createFormRef.current.toggleVisibility()
      notify(`a new blog ${data.title} by ${data.author} added`)
    },
    onError: () => {
      notify('title or url missing', 'alert')
    },
  })

  const handleLikes = async (updatedBlog) => {
    try {
      await updateMutation.mutateAsync(updatedBlog)
    } catch (e) {
      console.error(e)
    }
  }

  const notify = (message, type) => {
    if (!type) type = 'info'
    notificationDispatch({ type: 'SET_NOTIFICATION', message, style: type })
  }

  const handleLogin = async ({ username, password }) => {
    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
      blogService.setToken(user.token)
      userDispatch({ type: 'SET_USER', user })
      notify('login successful')
    } catch (exception) {
      notify('wrong username or password', 'alert')
    }
  }

  const logOutHandler = () => {
    window.localStorage.removeItem('loggedUser')
    blogService.setToken(null)
    userDispatch({ type: 'CLEAR_USER' })
    notify('logout successful')
  }

  const createBlog = async (newBlog) => {
    try {
      await createMutation.mutateAsync(newBlog)
    } catch (e) {
      console.error(e)
    }
  }

  const removeBlog = async (blog) => {
    try {
      await removeMutation.mutateAsync(blog)
      notify(`${blog.title} by ${blog.author} removed`)
    } catch (e) {
      console.error(e)
      notify('error removing blog', 'alert')
    }
  }

  return userState.user === null ? (
    <>
      <Notification />
      <LoginForm handleSubmit={handleLogin} />
    </>
  ) : (
    <>
      <h2>blogs</h2>
      <Notification />
      <p>
        {userState.name} logged in{' '}
        <button onClick={logOutHandler}>logout</button>
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
              user={Object(userState.user)}
              deleteBlog={removeBlog}
            />
          ))}
      </div>
    </>
  )
}

export default App
