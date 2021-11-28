import { HttpClient } from '@halo-dev/rest-api-client'
import {
  BaseComment,
  BaseCommentParam,
  CommentQuery,
  CommentStatus,
  Page,
  PostCommentWithPost,
  Response,
} from '../types'
import { buildPath } from '../url'

type commentTargets = 'posts' | 'sheets' | 'journals'

export class CommentClient {
  private client: HttpClient

  constructor(client: HttpClient) {
    this.client = client
  }

  public list(target: commentTargets, params: CommentQuery): Promise<Response<Page<PostCommentWithPost>>> {
    const path = buildPath({
      endpointName: `${target}/comments`,
    })
    return this.client.get(path, params)
  }

  public latest(
    target: commentTargets,
    top: number,
    status: CommentStatus,
  ): Promise<Response<Page<PostCommentWithPost>>> {
    const path = buildPath({
      endpointName: `${target}/comments/latest`,
    })
    return this.client.get(path, { top, status })
  }

  public listAsView(
    target: commentTargets,
    targetId: number,
    params: { page: number; sort?: Array<string> },
  ): Promise<Response<Page<BaseComment>>> {
    const path = buildPath({
      endpointName: `${target}/comments/${targetId}/list_view`,
    })
    return this.client.get(path, params)
  }

  public listAsTreeView(
    target: commentTargets,
    targetId: number,
    params: {
      sort?: Array<string>
      page?: number
    },
  ): Promise<Response<Page<BaseComment>>> {
    const path = buildPath({
      endpointName: `${target}/comments/${targetId}/tree_view`,
    })
    return this.client.get(path, params)
  }

  public get(target: commentTargets, commentId: number): Promise<Response<PostCommentWithPost>> {
    const path = buildPath({
      endpointName: `${target}/comments/${commentId}`,
    })
    return this.client.get(path, {})
  }

  public create(target: commentTargets, params: BaseCommentParam): Promise<Response<BaseComment>> {
    const path = buildPath({
      endpointName: `${target}/comments`,
    })
    return this.client.post(path, params)
  }

  public update(target: commentTargets, commentId: number, params: BaseCommentParam): Promise<Response<BaseComment>> {
    const path = buildPath({
      endpointName: `${target}/comments/${commentId}`,
    })
    return this.client.get(path, params)
  }

  public updateStatusById(
    target: commentTargets,
    commentId: number,
    status: CommentStatus,
  ): Promise<Response<BaseComment>> {
    const path = buildPath({
      endpointName: `${target}/comments/${commentId}/status/${status}`,
    })
    return this.client.put(path, {})
  }

  public updateStatusInBatch(
    target: commentTargets,
    commentIds: Array<number>,
    status: CommentStatus,
  ): Promise<Response<Array<BaseComment>>> {
    const path = buildPath({
      endpointName: `${target}/comments/status/${status}`,
    })
    return this.client.put(path, commentIds)
  }

  public delete(target: commentTargets, commentId: number): Promise<Response<BaseComment>> {
    const path = buildPath({
      endpointName: `${target}/comments/${commentId}`,
    })
    return this.client.delete(path, {})
  }

  public deleteInBatch(target: commentTargets, postCommentIds: Array<number>): Promise<Response<Array<BaseComment>>> {
    const path = buildPath({
      endpointName: `${target}/comments`,
    })
    return this.client.delete(path, postCommentIds)
  }
}
