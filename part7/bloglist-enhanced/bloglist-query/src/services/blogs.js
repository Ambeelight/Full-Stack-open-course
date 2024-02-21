import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'

let token = null
let headers = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
  headers = {
    Authorization: token,
  }
}

const getAll = async () => {
  const request = await axios.get(baseUrl, { headers })
  return request.data
}

const create = async (newObject) => {
  const response = await axios.post(baseUrl, newObject, { headers })
  return response.data
}

const update = async (newObject) => {
  const request = await axios.put(`${baseUrl}/${newObject.id}`, newObject, {
    headers,
  })
  return request.data
}

const createComment = async (id, comment) => {
  const request = await axios.post(
    `${baseUrl}/${id}/comments`,
    { comment },
    { headers }
  )
  return request.data
}

const remove = async (object) => {
  const request = await axios.delete(`${baseUrl}/${object.id}`, { headers })
  return request.data
}

export default { getAll, create, update, createComment, setToken, remove }
