import { useContext, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import { LoginForm } from './components/LoginForm'
import { NotificationContext } from './context/NotificationContext'
import { Notification } from './components/Notification'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { UserContext } from './context/UserContext'
import { Users } from './components/Users'
import { Link, Route, Routes, useMatch } from 'react-router-dom'
import Togglable from './components/Togglable'
import { CreateForm } from './components/CreateForm'
import { Menu } from './components/Menu'
import { BlogDetails } from './components/BlogDetails'
import { Table } from 'react-bootstrap'

const BlogList = ({ blogs, createFormRef, createMutation }) => {
  const createBlog = async (blog) => {
    try {
      await createMutation.mutateAsync(blog, {
        onSuccess: () => {
          createFormRef.current.toggleVisibility()
        },
        onError: (error) => {
          console.error(error)
        },
      })
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <div>
      <Table striped bordered responsive="md" hover>
        <tbody>
          {blogs.map((blog) => (
            <tr key={blog.id}>
              <td>
                <Link to={`/blogs/${blog.id}`}>
                  {blog.title} {blog.author}
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Togglable buttonLabel="create new" ref={createFormRef}>
        <CreateForm handleSubmit={createBlog} />
      </Togglable>
    </div>
  )
}

const App = () => {
  const createFormRef = useRef()
  const { state: userState, dispatch: userDispatch } = useContext(UserContext)
  const { dispatch: notificationDispatch } = useContext(NotificationContext)
  const queryClient = useQueryClient()
  const { data: blogs = [] } = useQuery('blogs', blogService.getAll)
  useEffect(async () => {
    const user = window.localStorage.getItem('loggedUser')
    if (user) {
      blogService.setToken(user)
      userDispatch({ type: 'SET_USER', user: JSON.parse(user) })
    }
  }, [])

  const updateMutation = useMutation(
    (updatedBlog) => blogService.update(updatedBlog),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('blogs')
      },
    }
  )

  const commentMutation = useMutation(
    (props) => blogService.addComment(props.id, props.comment),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('comments')
      },
    }
  )

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

  const handleComment = async (id, comment) => {
    try {
      await commentMutation.mutateAsync({ id, comment })
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

  const blogById = (id) => blogs.find((a) => a.id === id)
  const match = useMatch('/blogs/:id')
  const blog = match ? blogById(match.params.id) : null

  return (
    <div className="container">
      {userState.user === null ? (
        <>
          <Notification />
          <LoginForm handleSubmit={handleLogin} />
        </>
      ) : (
        <div className="container">
          <h2>blogs</h2>
          <Menu />
          <Notification />
          <Routes>
            <Route path={'/users/*'} element={<Users />} />
            <Route
              path={'/blogs/:id'}
              element={
                <BlogDetails
                  blog={blog}
                  handleLikes={handleLikes}
                  handleComment={handleComment}
                />
              }
            />
            <Route
              path={'/'}
              element={
                <BlogList
                  blogs={blogs}
                  createFormRef={createFormRef}
                  createMutation={createMutation}
                />
              }
            />
          </Routes>
        </div>
      )}
    </div>
  )
}

export default App
