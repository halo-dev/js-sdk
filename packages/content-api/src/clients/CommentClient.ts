import { HttpClient } from '@halo-dev/rest-api-client'
import { buildPath } from '../url'
import { BaseComment, BaseCommentParam, BaseCommentWithParent, CommentWithHasChildren, Page, Response } from '../types'

type commentTargets = 'posts' | 'sheets' | 'journals'

export class CommentClient {
  private client: HttpClient

  constructor(client: HttpClient) {
    this.client = client
  }

  /**
   * Get top comments
   *
   * @param target posts, sheets, or journals
   * @param targetId the id of the target
   * @param params optional query params
   */
  public listTopComments(
    target: commentTargets,
    targetId: number,
    params?: { page: number; sort?: Array<string> },
  ): Promise<Response<Page<CommentWithHasChildren>>> {
    const path = buildPath({
      endpointName: `${target}/${targetId}/comments/top_view`,
    })
    return this.client.get(path, { ...params })
  }

  /**
   * Get children comments
   *
   * @param target posts, sheets, or journals
   * @param targetId the id of the target
   * @param commentId the id of the top comment
   * @param params optional query params
   */
  public listChildren(
    target: commentTargets,
    targetId: number,
    commentId: number,
    params?: { sort?: Array<string> },
  ): Promise<Response<Array<BaseComment>>> {
    const path = buildPath({
      endpointName: `${target}/${targetId}/comments/${commentId}/children`,
    })
    return this.client.get(path, { ...params })
  }

  /**
   * Get comments as tree view
   *
   * @param target posts, sheets, or journals
   * @param targetId the id of the target
   * @param params optional query params
   */
  public listAsTreeView(
    target: commentTargets,
    targetId: number,
    params?: {
      page?: number
      sort?: Array<string>
    },
  ): Promise<Response<Page<BaseComment>>> {
    const path = buildPath({
      endpointName: `${target}/${targetId}/comments/tree_view`,
    })
    return this.client.get(path, { ...params })
  }

  /**
   * Get comments as list view
   *
   * @param target posts, sheets, or journals
   * @param targetId the id of the target
   * @param params optional query params
   */
  public listAsView(
    target: commentTargets,
    targetId: number,
    params?: {
      page?: number
      sort?: Array<string>
    },
  ): Promise<Response<Page<BaseCommentWithParent>>> {
    const path = buildPath({
      endpointName: `${target}/${targetId}/comments/list_view`,
    })
    return this.client.get(path, { ...params })
  }

  /**
   * Create a comment
   *
   * @param target posts, sheets, or journals
   * @param params the comment params
   */
  public create(target: commentTargets, params: BaseCommentParam) {
    const path = buildPath({
      endpointName: `${target}/comments`,
    })
    return this.client.post(path, params)
  }
}
