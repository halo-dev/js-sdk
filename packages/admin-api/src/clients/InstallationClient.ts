import { HttpClient } from '@halo-dev/rest-api-client'
import { buildPath } from '../url'
import { InstallParam, Response } from '../types'

export class InstallationClient {
  private client: HttpClient

  constructor(client: HttpClient) {
    this.client = client
  }

  /**
   * Initializes the blog.
   *
   * @param params installation parameter
   * @returns A response of installation status message.
   */
  public install(params: InstallParam): Promise<Response<string>> {
    const path = buildPath({
      endpointName: 'installations',
    })
    return this.client.post(path, { ...params })
  }
}
