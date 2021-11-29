import { HttpClient } from '@halo-dev/rest-api-client'
import { buildPath } from '../url'
import { Log, Page, Response } from '../types'

export class LogClient {
  private client: HttpClient

  constructor(client: HttpClient) {
    this.client = client
  }

  /**
   * List action logs by params.
   *
   * @param params
   */
  public list(params: { page: number; size: number; sort?: Array<string> }): Promise<Response<Page<Log>>> {
    const path = buildPath({
      endpointName: 'logs',
    })
    return this.client.get(path, { ...params })
  }

  /**
   * Clear action logs
   */
  public async clear(): Promise<void> {
    const path = buildPath({
      endpointName: 'logs/clear',
    })
    await this.client.get(path, {})
  }

  /**
   * Get latest action logs
   *
   * @param top the number of logs to get
   */
  public latest(top: number): Promise<Response<Array<Log>>> {
    const path = buildPath({
      endpointName: 'logs/latest',
    })
    return this.client.get(path, { top })
  }
}
