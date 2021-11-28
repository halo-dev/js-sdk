import { DefaultHttpClient } from './http/'
import { BasicAuth, CustomizeAuth, DiscriminatedAuth, ProxyConfig } from './types'
import { HaloRequestConfigBuilder } from './HaloRequestConfigBuilder'
import { HaloResponseHandler } from './HaloResponseHandler'
import { platformDeps } from './platform'
import { Interceptors } from './http/AxiosClient'

type OmitTypePropertyFromUnion<T> = T extends unknown ? Omit<T, 'type'> : never
type Auth = OmitTypePropertyFromUnion<DiscriminatedAuth>

type Options = {
  baseUrl?: string
  auth?: Auth
  basicAuth?: BasicAuth
  clientCertAuth?:
    | {
        pfx: Buffer
        password: string
      }
    | {
        pfxFilePath: string
        password: string
      }
  proxy?: ProxyConfig
  userAgent?: string
}

const buildDiscriminatedAuth = (auth: Auth): DiscriminatedAuth | undefined => {
  if ('username' in auth) {
    return { type: 'password', ...auth }
  }
  if ('apiToken' in auth) {
    return { type: 'apiToken', ...auth }
  }
  if ('adminToken' in auth) {
    return { type: 'adminToken', ...auth }
  }
  if ('oAuthToken' in auth) {
    return { type: 'oAuthToken', ...auth }
  }
  if ('type' in auth && auth['type'] == 'customizeAuth') {
    return auth as CustomizeAuth
  }
  return undefined
}

export class HaloRestAPIClient {
  private readonly baseUrl?: string
  private readonly httpClient: DefaultHttpClient
  private readonly _interceptors: Interceptors

  constructor(options: Options = {}) {
    this.baseUrl = platformDeps.buildBaseUrl(options.baseUrl)
    const auth = buildDiscriminatedAuth(options.auth ?? {})
    const requestConfigBuilder = new HaloRequestConfigBuilder({
      ...options,
      baseUrl: this.baseUrl,
      auth,
    })
    const responseHandler = new HaloResponseHandler()
    this.httpClient = new DefaultHttpClient({
      responseHandler,
      requestConfigBuilder,
    })
    this._interceptors = this.httpClient.interceptors
  }

  public static get version() {
    return platformDeps.getVersion()
  }

  public get interceptors() {
    return this._interceptors
  }

  public getBaseUrl() {
    return this.baseUrl
  }

  public buildHttpClient() {
    return this.httpClient
  }
}
