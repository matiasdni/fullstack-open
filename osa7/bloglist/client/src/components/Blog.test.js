import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import { CreateForm } from './CreateForm'

describe('<Blog />', () => {
  const user = {
    username: 'testUser',
    name: 'testUsers name',
  }

  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Test Test',
    url: 'www.testing.com',
    likes: 0,
    user: { username: 'testUser', name: 'testUsers name' },
  }

  test('renders title and author', () => {
    render(
      <Blog
        blog={blog}
        user={user}
        deleteBlog={() => console.log('delete')}
        handleLikes={() => console.log('like')}
      />
    )
    const title = screen.findByText(blog.title)
    const author = screen.findByText(blog.author)
    expect(title).toBeDefined()
    expect(author).toBeDefined()
  })

  test('at start url and likes are not rendered', () => {
    let container
    container = render(
      <Blog
        blog={blog}
        user={user}
        deleteBlog={() => console.log('delete')}
        handleLikes={() => console.log('like')}
      />
    ).container
    const div = container.querySelector('.blogDetails')
    expect(div).toBeNull()
  })

  test('event handler called when clicking like button', async () => {
    const blog = {
      title: 'Testing like button functionality',
      author: 'Test Test',
      url: 'www.testing.com',
      likes: 0,
      user: { username: 'testUser', name: 'testUsers name' },
    }

    const mockHandler = jest.fn()

    render(
      <Blog
        blog={blog}
        user={{ username: 'testUser', name: 'testUsers name' }}
        deleteBlog={() => console.log('delete')}
        handleLikes={mockHandler}
      />
    )

    const user = userEvent.setup()
    const viewButton = screen.getByText('view')
    await user.click(viewButton)
    const likeButton = screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)
    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})

describe('create new blog', () => {
  test('<CreateForm /> updates parent state and calls onSubmit', async () => {
    const user = userEvent.setup()
    const createBlog = jest.fn()

    render(<CreateForm handleSubmit={createBlog} />)

    const title = screen.getByPlaceholderText('blog title')
    const author = screen.getByPlaceholderText('blog author')
    const url = screen.getByPlaceholderText('blog url')
    const createButton = screen.getByText('create')

    await user.type(title, 'testing form title')
    await user.type(author, 'test user')
    await user.type(url, 'www.testing.com')
    await user.click(createButton)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0].title).toBe('testing form title')
    expect(createBlog.mock.calls[0][0].author).toBe('test user')
    expect(createBlog.mock.calls[0][0].url).toBe('www.testing.com')
  })
})
