import { useState } from 'react'
import { Button, Form } from 'react-bootstrap'

export const CreateForm = ({ handleSubmit }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    handleSubmit({ title: title, author: author, url: url })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>create new</h2>
      <Form onSubmit={addBlog}>
        <Form.Group className={'mb-3'}>
          <Form.Label>Title:</Form.Label>
          <Form.Control
            type={'text'}
            value={title}
            name={'title'}
            onChange={({ target }) => setTitle(target.value)}
            placeholder="blog title"
            id="title"
          />
          <Form.Label>Author:</Form.Label>
          <Form.Control
            type={'text'}
            value={author}
            name={'author'}
            onChange={({ target }) => setAuthor(target.value)}
            placeholder="blog author"
            id="author"
          />
          <Form.Label>Url:</Form.Label>
          <Form.Control
            type={'text'}
            value={url}
            name={'url'}
            onChange={({ target }) => setUrl(target.value)}
            placeholder="blog url"
            id="url"
          />
          <Button
            variant="primary"
            type="submit"
            id="createButton"
            className={'mt-4'}
          >
            create
          </Button>
        </Form.Group>
      </Form>
    </div>
  )
}
