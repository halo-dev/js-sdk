import { CancelToken } from 'axios'
import FormData from 'form-data'

export interface HttpClient {
  get: <T extends object>(path: string, params: object, options?: RequestOptions) => Promise<T>
  getData: (path: string, params: object, options?: RequestOptions) => Promise<ArrayBuffer>
  post: <T extends object>(path: string, params: object, options?: RequestOptions) => Promise<T>
  postData: <T extends object>(path: string, params: FormData, options?: RequestOptions) => Promise<T>
  put: <T extends object>(path: string, params: object, options?: RequestOptions) => Promise<T>
  delete: <T extends object>(path: string, params: object, options?: RequestOptions) => Promise<T>
}

export type ErrorResponse<T = any> = {
  data: T
  status: number
  statusText: string
  headers: any
}

export type HttpResponse<T = any> = {
  data: T
  headers: any
}

export type HttpMethod = 'get' | 'post' | 'put' | 'delete'
export type Params = { [key: string]: unknown }

export type ProxyConfig = {
  host: string
  port: number
  auth?: {
    username: string
    password: string
  }
}

export interface HttpClientError<T = ErrorResponse> extends Error {
  response?: T
}

export interface ResponseHandler {
  handle: <T = any>(response: Promise<HttpResponse<T>>) => Promise<T>
}

export interface RequestConfig {
  method: HttpMethod
  url: string
  headers: any
  httpsAgent?: any
  data?: any
  proxy?: ProxyConfig
}

export interface RequestConfigBuilder {
  build: (
    method: HttpMethod,
    path: string,
    params: Params | FormData | Array<any>,
    options?: RequestOptions,
  ) => Promise<RequestConfig>
}

export interface RequestOptions {
  timeout?: number
  maxBodyLength?: number
  maxRedirects?: number
  responseType?: string
  transformRequest?: object | object[]
  transformResponse?: object | object[]
  cancelToken?: CancelToken
  withCredentials?: boolean
  xsrfCookieName?: string
  xsrfHeaderName?: string
  onDownloadProgress?: (e: any) => void
  onUploadProgress?: (e: any) => void
  validateStatus?: (status: number) => boolean
  paramsSerializer?: (params: any) => string

  [propsName: string]: any
}

export interface ResolvedFn<T> {
  (val: T): T | Promise<T>
}

export interface RejectedFn {
  (error: any): any
}
