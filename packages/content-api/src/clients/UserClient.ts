import { HttpClient } from '@halo-dev/rest-api-client'
import { buildPath } from '../url'
import { Response, User } from '../types'

export class UserClient {
  private client: HttpClient

  constructor(client: HttpClient) {
    this.client = client
  }

  public getProfile(): Promise<Response<User>> {
    const path = buildPath({
      endpointName: 'users/profile',
    })
    return this.client.get(path, {})
  }
}
