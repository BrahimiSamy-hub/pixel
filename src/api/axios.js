import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:3000/',
  // baseURL: 'https://api.pixeldz.store/posters',

  headers: {
    'Content-Type': 'application/json',
  },
})

export default instance
