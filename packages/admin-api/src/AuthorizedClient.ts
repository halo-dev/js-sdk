import { buildPath } from './url'
import { AccessToken, LoginPreCheck, Response } from './types'
import { DefaultHttpClient, HaloRequestConfigBuilder, HaloResponseHandler } from '@halo-dev/rest-api-client'

export class AuthorizedClient {
  private client: DefaultHttpClient

  constructor(baseUrl: string) {
    const requestConfigBuilder = new HaloRequestConfigBuilder({
      baseUrl: baseUrl,
    })
    const responseHandler = new HaloResponseHandler()
    this.client = new DefaultHttpClient({
      responseHandler,
      requestConfigBuilder,
    })
  }

  public isInstalled(): Promise<Response<boolean>> {
    const path = buildPath({
      endpointName: 'is_installed',
    })
    return this.client.get(path, {})
  }

  public sendResetPasswordCode(params: {
    username: string
    email: string
    code?: string
    password?: string
  }): Promise<object> {
    const path = buildPath({
      endpointName: 'password/code',
    })
    return this.client.post(path, params)
  }

  public resetPassword(params: { username: string; email: string; code?: string; password?: string }): Promise<object> {
    const path = buildPath({
      endpointName: 'password/reset',
    })
    return this.client.post(path, params)
  }

  public refreshToken(refreshToken: string): Promise<Response<AccessToken>> {
    const path = buildPath({
      endpointName: `refresh/${refreshToken}`,
    })
    return this.client.post(path, {})
  }

  public login(params: { username: string; password: string; authcode: boolean }): Promise<Response<AccessToken>> {
    const path = buildPath({
      endpointName: 'login',
    })
    return this.client.post(path, { ...params })
  }

  public needMFACode(params: { username: string; password: string }): Promise<Response<LoginPreCheck>> {
    const path = buildPath({
      endpointName: 'login/precheck',
    })
    return this.client.post(path, { ...params })
  }
}
