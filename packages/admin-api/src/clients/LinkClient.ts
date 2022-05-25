import { HttpClient } from '@halo-dev/rest-api-client'
import { buildPath } from '../url'
import { Link, Response } from '../types'

export class LinkClient {
  private client: HttpClient

  constructor(client: HttpClient) {
    this.client = client
  }

  public list(sort?: Array<string>): Promise<Response<Array<Link>>> {
    const path = buildPath({
      endpointName: 'links',
    })
    return this.client.get(path, { sort })
  }

  public create(params: Link): Promise<Response<Link>> {
    const path = buildPath({
      endpointName: 'links',
    })
    return this.client.post(path, { ...params })
  }

  public get(id: number): Promise<Response<Link>> {
    const path = buildPath({
      endpointName: `links/${id}`,
    })
    return this.client.get(path, {})
  }

  public update(linkId: number, params: Link): Promise<Response<Link>> {
    const path = buildPath({
      endpointName: `links/${linkId}`,
    })
    return this.client.put(path, { ...params })
  }

  public updateInBatch(params: Array<Link>): Promise<Response<Array<Link>>> {
    const path = buildPath({
      endpointName: 'links/batch',
    })
    return this.client.put(path, [...params])
  }

  public async delete(id: number): Promise<void> {
    const path = buildPath({
      endpointName: `links/${id}`,
    })
    await this.client.delete(path, {})
  }

  public listTeams(): Promise<Response<Array<string>>> {
    const path = buildPath({
      endpointName: 'links/teams',
    })
    return this.client.get(path, {})
  }
}
