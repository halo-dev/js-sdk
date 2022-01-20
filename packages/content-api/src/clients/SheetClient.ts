import { HttpClient } from '@halo-dev/rest-api-client'
import { buildPath } from '../url'
import { ContentQuery, Page, PageQuery, Response, SheetDetail, SheetList } from '../types'

export class SheetClient {
  private client: HttpClient

  constructor(client: HttpClient) {
    this.client = client
  }

  public list(params: PageQuery): Promise<Page<SheetList>> {
    const path = buildPath({
      endpointName: 'sheets',
    })
    return this.client.get(path, { ...params })
  }

  public get(sheetId: number, params?: ContentQuery): Promise<Response<SheetDetail>> {
    const path = buildPath({
      endpointName: `sheets/${sheetId}`,
    })
    return this.client.get(path, { ...params })
  }

  public getBySlug(slug: string, params?: ContentQuery): Promise<Response<SheetDetail>> {
    const path = buildPath({
      endpointName: 'sheets/slug',
    })
    return this.client.get(path, { slug, ...params })
  }
}
