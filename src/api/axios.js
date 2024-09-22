import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://212.132.119.74:3003',
  headers: {
    'Content-Type': 'application/json',
  },
})

export default instance
