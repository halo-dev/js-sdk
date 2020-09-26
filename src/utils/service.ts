import axios from 'axios'

const service = axios.create({
  baseURL: '/',
  timeout: 5000,
  withCredentials: true
})

service.interceptors.request.use(
  config => {
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    return response
  },
  error => {

    if (axios.isCancel(error)) {
      return Promise.reject(error)
    }

    const response = error.response
    // const status = response ? response.status : -1

    const data = response ? response.data : null
    if (data) {
      // Business response
      if (data.status === 400) {
        // TODO handle 400 status error
      } else if (data.status === 401) {
        // TODO Handle 401 status error
      } else if (data.status === 403) {
        // TODO handle 403 status error
      } else if (data.status === 404) {
        // TODO handle 404 status error
      } else if (data.status === 500) {
        // TODO handle 500 status error
      }
    } else {
      // TODO Server unavailable
    }

    return Promise.reject(error)
  }
)

export default service
