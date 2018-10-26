import * as api from './api.js'

export const getAll = async () => {
  const response = await api.get()
  return response.data
}

export const add = async content => {
  const response = await api.post(content)
  return response.data
}

export const update = async (id, done) => {
  const response = await api.put(id, done)
  return response
}
