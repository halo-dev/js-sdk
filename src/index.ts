import { createComment, listComments } from './content/comment'
import axios, { AxiosInstance, AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import { sdkOptionsInter } from '../types'

export default class HaloSDK {
  basePath: string
  $axios: AxiosInstance

  constructor(sdkOptions: sdkOptionsInter) {
    const { basePath } = sdkOptions

    this.basePath = basePath

    this.$axios = axios.create({
      baseURL: basePath || '/',
      timeout: 5000,
      withCredentials: true
    })

    this.$axios.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        return config
      },
      (error: AxiosError) => {
        return Promise.reject(error)
      }
    )

    this.$axios.interceptors.response.use(
      (response: AxiosResponse) => {
        return response
      },
      (error: AxiosError) => {

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
  }

  commentsApi() {
    return {
      createComment: (target: string, comment: string) => {
        return createComment(target, comment, this.$axios)
      },
      listComments: (target: string, targetId: number, view: string = 'tree_view', pagination: any) => {
        return listComments(target, targetId, view, pagination, this.$axios)
      }
    }
  }
}
