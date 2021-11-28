import { HttpClient } from '@halo-dev/rest-api-client'
import { buildPath } from '../url'
import { Page, PageQuery, PostList, Response, Tag } from '../types'

export class TagClient {
  private client: HttpClient

  constructor(client: HttpClient) {
    this.client = client
  }

  public list(params: { sort: Array<string>; more: boolean }): Promise<Response<Array<Tag>>> {
    const path = buildPath({
      endpointName: 'tags',
    })
    return this.client.get(path, { ...params })
  }

  public listPostsBySlug(slug: string, params?: PageQuery): Promise<Page<PostList>> {
    const path = buildPath({
      endpointName: `tags/${slug}/posts`,
    })
    return this.client.get(path, { ...params })
  }
}
