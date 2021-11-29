import { HttpClient } from '@halo-dev/rest-api-client'
import { buildPath } from '../url'
import {
  BaseComment,
  BaseCommentParam,
  CommentStatus,
  JournalCommentQuery,
  JournalCommentWithJournal,
  Page,
  Response,
} from '../types'

export class JournalCommentClient {
  private client: HttpClient

  constructor(client: HttpClient) {
    this.client = client
  }

  /**
   * Lists journal comments.
   *
   * @param params parameter for queries
   * @returns A page response of journals.
   */
  public async list(params: JournalCommentQuery): Promise<Response<Page<JournalCommentWithJournal>>> {
    const path = buildPath({
      endpointName: 'journals/comments',
    })
    return this.client.get(path, { ...params })
  }

  /**
   * Creates a journal comment.
   *
   * @param params comment parameter for creates
   * @returns A response of created journal comment.
   */
  public create(params: BaseCommentParam): Promise<Response<BaseComment>> {
    const path = buildPath({
      endpointName: 'journals/comments',
    })
    return this.client.post(path, { ...params })
  }

  /**
   * Deletes a journal comment by id.
   *
   * @param commentId journal comment id.
   * @returns A response of deleted journal comment.
   */
  public delete(commentId: number): Promise<Response<BaseComment>> {
    const path = buildPath({
      endpointName: `journals/comments/${commentId}`,
    })
    return this.client.delete(path, {})
  }

  /**
   * Updates journal comment status by id.
   *
   * @param commentId journal comment id
   * @param status comment status
   * @returns A response of updated journal comment.
   */
  public update(commentId: number, status: CommentStatus): Promise<Response<BaseComment>> {
    const path = buildPath({
      endpointName: `journals/comments/${commentId}/status/${status}`,
    })
    return this.client.put(path, {})
  }

  /**
   * Lists comment with list view.
   *
   * @param params parameter for queries
   * @returns A page response of journal comments.
   */
  public listAsView(params: {
    journalId: number
    sort?: Array<string>
    page?: number
  }): Promise<Response<Page<BaseComment>>> {
    const path = buildPath({
      endpointName: `journals/comments/${params.journalId}/list_view`,
    })
    return this.client.get(path, { ...params })
  }

  /**
   * Lists comment with tree view.
   *
   * @param params parameter for queries
   * @returns A page response of journal comments tree.
   */
  public listAsTree(params: {
    journalId: number
    sort?: Array<string>
    page?: number
  }): Promise<Response<Page<BaseComment>>> {
    const path = buildPath({
      endpointName: `journals/comments/${params.journalId}/tree_view`,
    })
    return this.client.get(path, { ...params })
  }

  /**
   * Lists latest journal comments.
   *
   * @param params parameter for queries
   * @returns A response of latest journal comments.
   */
  public latest(params: { top?: number; status?: CommentStatus }): Promise<Response<Array<BaseComment>>> {
    const path = buildPath({
      endpointName: 'journals/comments/latest',
    })
    return this.client.get(path, { ...params })
  }
}
