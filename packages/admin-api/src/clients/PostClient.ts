import { HttpClient } from "@guching/rest-api-client";
import { buildPath } from "../url";
import {
  Response,
  Page,
  PostQuery,
  BasePostSimple,
  PostParam,
  Post,
  PostDetail,
  PostStatus,
  BasePostMinimal,
} from "../types";

export class PostClient {
  private client: HttpClient;

  constructor(client: HttpClient) {
    this.client = client;
  }

  public list(params: PostQuery): Promise<Page<BasePostSimple>> {
    const path = buildPath({
      endpointName: "posts"
    });
    return this.client.get(path, { ...params })
  }

  public getById(postId: number): Promise<Page<PostDetail>> {
    const path = buildPath({
      endpointName: `posts/${postId}`
    });
    return this.client.get(path, {})
  }

  public getPreviewLinkById(postId: number): Promise<Response<string>> {
    const path = buildPath({
      endpointName: `posts/${postId}/preview`
    });
    return this.client.get(path, {})
  }

  public latest(top?: number): Promise<Response<Array<BasePostMinimal>>> {
    const path = buildPath({
      endpointName: "posts/latest"
    });
    return this.client.get(path, { top })
  }

  public listByStatus(status: PostStatus, query?: PostQuery): Promise<Page<BasePostSimple>> {
    const path = buildPath({
      endpointName: `posts/status/${status}`
    });
    return this.client.get(path, { ...query })
  }

  public create(params: PostParam): Promise<Response<PostDetail>> {
    const path = buildPath({
      endpointName: "posts"
    });
    return this.client.post(path, { ...params })
  }

  public updateById(postId: number, params: {
    autoSave?: boolean
    post: PostParam
  }): Promise<Response<PostDetail>> {
    const path = buildPath({
      endpointName: `posts/${postId}`
    });
    return this.client.put(path, { ...params })
  }

  public updateStatusById(postId: number, status: PostStatus): Promise<Response<BasePostMinimal>> {
    const path = buildPath({
      endpointName: `posts/${postId}/status/${status}`
    });
    return this.client.put(path, {})
  }

  public updateStatusInBatch(postIds: Array<number>, status: PostStatus): Promise<Response<Array<Post>>> {
    const path = buildPath({
      endpointName: `posts/status/${status}`
    });
    return this.client.put(path, postIds)
  }

  public updateDraftById(postId: number, content?: string): Promise<Response<BasePostMinimal>> {
    const path = buildPath({
      endpointName: `posts/${postId}/status/draft/content`
    });
    return this.client.put(path, { content })
  }

  public async like(postId: number): Promise<void> {
    const path = buildPath({
      endpointName: `posts/${postId}/likes`
    });
    await this.client.put(path, {})
  }

  public deleteById(postId: number): Promise<Response<Post>> {
    const path = buildPath({
      endpointName: `posts/${postId}`
    });
    return this.client.delete(path, {})
  }

  public deleteInBatch(postIds: Array<number>): Promise<Response<Array<Post>>> {
    const path = buildPath({
      endpointName: "posts"
    });
    return this.client.delete(path, postIds)
  }

}