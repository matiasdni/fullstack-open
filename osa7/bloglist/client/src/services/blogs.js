import axios from 'axios'

const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then((response) => response.data)
}

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (newObject) => {
  const response = await axios.put(`${baseUrl}/${newObject.id}`, newObject)
  return response.data
}

const remove = async (object) => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.delete(`${baseUrl}/${object.id}`, config)
  return response.data
}

const addComment = async (id, comment) => {
  const response = await axios.post(`${baseUrl}/${id}/comments`, {
    id,
    comment,
  })
  return response.data
}

const getComments = (id) => {
  const request = axios.get(`${baseUrl}/${id}/comments`)
  return request.then((response) => response.data)
}

const exportedObject = {
  getAll,
  setToken,
  create,
  update,
  remove,
  addComment,
  getComments,
}

export default exportedObject
