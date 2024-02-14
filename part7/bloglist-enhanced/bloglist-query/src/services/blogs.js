import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'

let token = null

const setToken = (newToken) => {
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const config = {
    headers: { Authorization: token },
  }

  const request = await axios.get(baseUrl, config)
  return request.data
}

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  }

  const request = await axios.put(
    `${baseUrl}/${newObject.id}`,
    newObject,
    config
  )
  return request.data
}

const remove = async (object) => {
  const config = {
    headers: { Authorization: token },
  }

  const request = await axios.delete(`${baseUrl}/${object.id}`, config)
  return request.data
}

export default { getAll, create, update, setToken, remove }
