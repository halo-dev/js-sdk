import Axios from 'axios'
import { HttpClient, RequestConfig, RequestConfigBuilder, ResponseHandler } from '../types'
import FormData from 'form-data'
import { RequestInterceptor, ResponseInterceptor } from './InterceptorManager'
import { RequestOptions } from '../types/HttpClientInterface'

export interface Interceptors {
  request: RequestInterceptor
  response: ResponseInterceptor
}

export class AxiosClient implements HttpClient {
  interceptors: Interceptors
  private responseHandler: ResponseHandler
  private requestConfigBuilder: RequestConfigBuilder

  constructor({
    responseHandler,
    requestConfigBuilder,
  }: {
    responseHandler: ResponseHandler
    requestConfigBuilder: RequestConfigBuilder
  }) {
    this.responseHandler = responseHandler
    this.requestConfigBuilder = requestConfigBuilder
    this.interceptors = {
      request: new RequestInterceptor(),
      response: new ResponseInterceptor(),
    }
  }

  public async get(path: string, params: any) {
    const requestConfig = await this.requestConfigBuilder.build('get', path, params)
    return this.sendRequest(requestConfig)
  }

  public async getData(path: string, params: any) {
    const requestConfig = await this.requestConfigBuilder.build('get', path, params, {
      responseType: 'arraybuffer',
    })
    return this.sendRequest(requestConfig)
  }

  public async post(path: string, params: any, options?: RequestOptions) {
    const requestConfig = await this.requestConfigBuilder.build('post', path, params, options)
    return this.sendRequest(requestConfig)
  }

  public async postData(path: string, formData: FormData) {
    const requestConfig = await this.requestConfigBuilder.build('post', path, formData)
    return this.sendRequest(requestConfig)
  }

  public async put(path: string, params: any, options?: RequestOptions) {
    const requestConfig = await this.requestConfigBuilder.build('put', path, params, options)
    return this.sendRequest(requestConfig)
  }

  public async delete(path: string, params: any, options?: RequestOptions) {
    const requestConfig = await this.requestConfigBuilder.build('delete', path, params, options)
    return this.sendRequest(requestConfig)
  }

  private async sendRequest(requestConfig: RequestConfig) {
    return this.responseHandler.handle(
      // eslint-disable-next-line new-cap
      Axios({
        ...requestConfig,

        // NOTE: For defining the max size of the http request content, `maxBodyLength` will be used after version 0.20.0.
        // `maxContentLength` will be still needed for defining the max size of the http response content.
        // ref: https://github.com/axios/axios/pull/2781/files
        // maxBodyLength: Infinity,

        maxContentLength: Infinity,
      }),
    )
  }
}
