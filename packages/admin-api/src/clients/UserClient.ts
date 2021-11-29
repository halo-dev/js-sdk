import { HttpClient } from '@halo-dev/rest-api-client'
import { buildPath } from '../url'
import { MultiFactorAuth, MultiFactorAuthParam, Response, User } from '../types'

export class UserClient {
  private client: HttpClient

  constructor(client: HttpClient) {
    this.client = client
  }

  /**
   * Get user profile
   */
  public getProfile(): Promise<Response<User>> {
    const path = buildPath({
      endpointName: 'users/profiles',
    })
    return this.client.get(path, {})
  }

  /**
   * Update user profile
   *
   * @param user {@link User}
   */
  public updateProfile(user: User): Promise<Response<User>> {
    const path = buildPath({
      endpointName: 'users/profiles',
    })
    return this.client.put(path, user)
  }

  public updatePassword(params: { oldPassword: string; newPassword: string }): Promise<Response<string>> {
    const path = buildPath({
      endpointName: 'users/profiles/password',
    })
    return this.client.put(path, { ...params })
  }

  public generateMFAQrImage(params: MultiFactorAuthParam): Promise<Response<MultiFactorAuth>> {
    const path = buildPath({
      endpointName: 'users/mfa/generate',
    })
    return this.client.put(path, { ...params })
  }

  public updateMFAuth(params: MultiFactorAuthParam): Promise<Response<MultiFactorAuth>> {
    const path = buildPath({
      endpointName: 'users/mfa/update',
    })
    return this.client.put(path, { ...params })
  }
}
