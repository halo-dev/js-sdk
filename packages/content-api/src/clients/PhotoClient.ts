import { HttpClient } from '@halo-dev/rest-api-client'
import { buildPath } from '../url'
import { Page, Photo, PhotoQuery, Response } from '../types'

export class PhotoClient {
  private client: HttpClient

  constructor(client: HttpClient) {
    this.client = client
  }

  public latest(sort: Array<string>): Promise<Response<Array<Photo>>> {
    const path = buildPath({
      endpointName: 'photos/latest',
    })
    return this.client.get(path, { sort })
  }

  public list(params: PhotoQuery): Promise<Page<Photo>> {
    const path = buildPath({
      endpointName: 'photos',
    })
    return this.client.get(path, { ...params })
  }
}
