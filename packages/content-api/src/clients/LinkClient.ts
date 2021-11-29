import { HttpClient } from '@halo-dev/rest-api-client'
import { buildPath } from '../url'
import { Link, LinkTeam, Response } from '../types'

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

  public listTeams(sort?: Array<string>): Promise<Response<Array<LinkTeam>>> {
    const path = buildPath({
      endpointName: 'links/team_view',
    })
    return this.client.get(path, { sort })
  }
}
