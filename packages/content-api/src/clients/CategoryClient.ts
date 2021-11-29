import { HttpClient } from '@halo-dev/rest-api-client'
import { buildPath } from '../url'
import { Category, CategoryQuery, Page, PostList, Response } from '../types'

export class CategoryClient {
  private client: HttpClient

  constructor(client: HttpClient) {
    this.client = client
  }

  public list(params: { sort: Array<string>; more: boolean }): Promise<Response<Array<Category>>> {
    const path = buildPath({
      endpointName: 'categories',
    })
    return this.client.get(path, { ...params })
  }

  public listPostBySlug(params: CategoryQuery): Promise<Page<PostList>> {
    const path = buildPath({
      endpointName: `categories/${params.slug}/posts`,
    })
    return this.client.get(path, { ...params })
  }
}
