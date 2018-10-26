import axios from './axiosConfig.js'

export const get = () => axios.get()

export const post = content => axios.post('', { content })

export const put = (id, done) => axios.put(`${id}`, { done })

export const del = id => axios.delete(`${id}`)

export const delAll = () => axios.delete('deleteall')
