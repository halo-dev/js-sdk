import { HttpClient } from '@halo-dev/rest-api-client'
import { buildPath } from '../url'
import { BasePostSimple, Page, PageQuery, PostDetail, PostList, Response } from '../types'

export class PostClient {
  private client: HttpClient

  constructor(client: HttpClient) {
    this.client = client
  }

  public list(params: PageQuery, keyword?: string, categoryId?: number): Promise<Page<PostList>> {
    const path = buildPath({
      endpointName: 'posts',
    })
    return this.client.get(path, { keyword, categoryId, ...params })
  }

  public search(keyword: string, pageQuery?: PageQuery): Promise<Page<BasePostSimple>> {
    const path = buildPath({
      endpointName: 'posts/search',
    })
    return this.client.get(path, { keyword, ...pageQuery })
  }

  public get(
    postId: number,
    params?: {
      formatDisabled: boolean
      sourceDisabled: boolean
    },
  ): Promise<Response<PostDetail>> {
    const path = buildPath({
      endpointName: `posts/${postId}`,
    })
    return this.client.get(path, { ...params })
  }

  public getBySlug(
    slug: string,
    params: {
      formatDisabled: boolean
      sourceDisabled: boolean
    },
  ): Promise<Response<PostDetail>> {
    const path = buildPath({
      endpointName: 'posts/slug',
    })
    return this.client.get(path, { slug, ...params })
  }

  public getPrevPostById(postId: number): Promise<Response<PostDetail>> {
    const path = buildPath({
      endpointName: `posts/${postId}/prev`,
    })
    return this.client.get(path, {})
  }

  public getNextPostById(postId: number): Promise<Response<PostDetail>> {
    const path = buildPath({
      endpointName: `posts/${postId}/next`,
    })
    return this.client.get(path, {})
  }

  public async like(postId: number): Promise<void> {
    const path = buildPath({
      endpointName: `posts/${postId}/likes`,
    })
    await this.client.get(path, {})
  }
}
