import { HttpClient, RequestConfigBuilder, ResponseHandler } from '../types'
import FormData from 'form-data'
import { HaloResponseHandler } from '../HaloResponseHandler'

type Log = {
  method: 'get' | 'post' | 'put' | 'delete'
  path: string
  params: {
    [key: string]: any
  }
}

export class MockClient implements HttpClient {
  logs: Log[]
  responses: any[]
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
    this.logs = []
    this.responses = []
  }

  public mockResponse(mock: unknown, headers: Record<string, string> = {}) {
    this.responses.push({ data: mock, headers })
  }

  public async get<T extends object>(path: string, params: any): Promise<T> {
    const requestConfig = await this.requestConfigBuilder.build('get', path, params)
    this.logs.push({ method: requestConfig.method, path, params })
    return this.createResponse<T>()
  }

  public async getData(path: string, params: any): Promise<ArrayBuffer> {
    const requestConfig = await this.requestConfigBuilder.build('get', path, params)
    this.logs.push({ method: requestConfig.method, path, params })
    return this.createResponse<ArrayBuffer>()
  }

  public async post<T extends object>(path: string, params: any): Promise<T> {
    const requestConfig = await this.requestConfigBuilder.build('post', path, params)
    this.logs.push({ method: requestConfig.method, path, params })
    return this.createResponse<T>()
  }

  public async postData<T extends object>(path: string, formData: FormData): Promise<T> {
    const requestConfig = await this.requestConfigBuilder.build('post', path, formData)
    this.logs.push({
      method: requestConfig.method,
      path,
      params: { formData },
    })
    return this.createResponse<T>()
  }

  public async put<T extends object>(path: string, params: any): Promise<T> {
    const requestConfig = await this.requestConfigBuilder.build('put', path, params)
    this.logs.push({ method: requestConfig.method, path, params })
    return this.createResponse<T>()
  }

  public async delete<T extends object>(path: string, params: any): Promise<T> {
    const requestConfig = await this.requestConfigBuilder.build('delete', path, params)
    this.logs.push({ method: requestConfig.method, path, params })
    return this.createResponse<T>()
  }

  public getLogs(): Log[] {
    return this.logs
  }

  private createResponse<T extends object>(): T {
    const response = this.responses.shift() || { data: {}, headers: {} }
    return this.responseHandler.handle(
      response.data instanceof Error ? Promise.reject(response.data) : Promise.resolve(response),
    ) as T
  }
}

export const buildMockClient = (
  requestConfigBuilder: RequestConfigBuilder,
  responseHandler = new HaloResponseHandler(),
) => {
  return new MockClient({ requestConfigBuilder, responseHandler })
}
