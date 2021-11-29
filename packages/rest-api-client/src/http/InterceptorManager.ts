import Axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { RejectedFn, ResolvedFn } from '../types/HttpClientInterface'

export default interface InterceptorManager<T> {
  use(resolved: ResolvedFn<T>, rejected?: RejectedFn): number

  eject(id: number): void
}

export class RequestInterceptor implements InterceptorManager<AxiosRequestConfig> {
  use(resolved: ResolvedFn<AxiosRequestConfig>, rejected?: RejectedFn): number {
    return Axios.interceptors.request.use(resolved, rejected)
  }

  eject(id: number): void {
    Axios.interceptors.request.eject(id)
  }
}

export class ResponseInterceptor implements InterceptorManager<AxiosRequestConfig> {
  use(resolved: ResolvedFn<AxiosResponse>, rejected?: RejectedFn): number {
    return Axios.interceptors.response.use(resolved, rejected)
  }

  eject(id: number): void {
    Axios.interceptors.response.eject(id)
  }
}
