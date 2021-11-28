import { HttpClient } from '@halo-dev/rest-api-client'
import { buildPath } from '../url'
import { Menu, MenuTree, Response } from '../types'

export class MenuClient {
  private client: HttpClient

  constructor(client: HttpClient) {
    this.client = client
  }

  public list(sort?: Array<string>): Promise<Response<Array<Menu>>> {
    const path = buildPath({
      endpointName: 'menus',
    })
    return this.client.get(path, { sort })
  }

  public listAsTreeView(sort?: Array<string>): Promise<Response<Array<MenuTree>>> {
    const path = buildPath({
      endpointName: 'menus/tree_view',
    })
    return this.client.get(path, { sort })
  }
}
