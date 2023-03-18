import { useState } from 'react'
import { useQuery } from 'react-query'
import blogService from '../services/blogs'

export const BlogDetails = ({ blog, handleLikes, handleComment }) => {
  const [comment, setComment] = useState('')
  const { data: comments } = useQuery(['comments', blog.id], () =>
    blogService.getComments(blog.id)
  )
  const updateLikes = () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id,
    }
    handleLikes(updatedBlog)
  }

  const addComment = (e) => {
    e.preventDefault()
    handleComment(blog.id, comment)
    setComment('')
  }

  if (!blog) return null
  return (
    <div>
      <div>
        <h2>
          {blog.title} {blog.author}
        </h2>
        <a href={blog.url}>{blog.url}</a>
        <br />
        {blog.likes} likes <button onClick={updateLikes}>like</button>
        <br />
        <>added by {blog.user.name}</>
      </div>
      <div>
        <h3>comments</h3>
        <div>
          <form onSubmit={addComment}>
            <input type="text" onChange={(e) => setComment(e.target.value)} />
            <button>add comment</button>
          </form>
        </div>
        <ul>
          {comments
            ? comments.map((comment) => <li key={comment}>{comment}</li>)
            : null}
        </ul>
      </div>
    </div>
  )
}
