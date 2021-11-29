import { HttpClient } from '@halo-dev/rest-api-client'
import { buildPath } from '../url'
import {
  BaseComment,
  BaseCommentParam,
  BaseCommentWithParent,
  CommentQuery,
  CommentStatus,
  Page,
  Response,
  SheetCommentWithSheet,
} from '../types'

export class SheetCommentClient {
  private client: HttpClient

  constructor(client: HttpClient) {
    this.client = client
  }

  public list(params: CommentQuery): Promise<Response<Page<SheetCommentWithSheet>>> {
    const path = buildPath({
      endpointName: 'sheets/comments',
    })
    return this.client.get(path, { ...params })
  }

  public get(commentId: number): Promise<Response<SheetCommentWithSheet>> {
    const path = buildPath({
      endpointName: `sheets/comments/${commentId}`,
    })
    return this.client.get(path, {})
  }

  public listAsView(params: {
    sheetId: number
    sort?: Array<string>
    page?: number
  }): Promise<Response<Page<BaseCommentWithParent>>> {
    const path = buildPath({
      endpointName: `sheets/comments/${params.sheetId}/list_view`,
    })
    return this.client.get(path, { ...params })
  }

  public listAsTreeView(params: {
    sheetId: number
    sort?: Array<string>
    page?: number
  }): Promise<Response<Page<BaseComment>>> {
    const path = buildPath({
      endpointName: `sheets/comments/${params.sheetId}/tree_view`,
    })
    return this.client.get(path, { ...params })
  }

  public latest(params: { top?: number; status?: CommentStatus }): Promise<Response<Array<SheetCommentWithSheet>>> {
    const path = buildPath({
      endpointName: 'sheets/comments/latest',
    })
    return this.client.get(path, { ...params })
  }

  public create(params: BaseCommentParam): Promise<Response<BaseComment>> {
    const path = buildPath({
      endpointName: 'sheets/comments',
    })
    return this.client.post(path, { ...params })
  }

  public update(commentId: number, params: BaseCommentParam): Promise<Response<BaseComment>> {
    const path = buildPath({
      endpointName: `sheets/comments/${commentId}`,
    })
    return this.client.put(path, { ...params })
  }

  public updateStatusById(commentId: number, status: CommentStatus): Promise<Response<BaseComment>> {
    const path = buildPath({
      endpointName: `sheets/comments/${commentId}/status/${status}`,
    })
    return this.client.put(path, {})
  }

  public updateStatusInBatch(commentIds: Array<number>, status: CommentStatus): Promise<Response<BaseComment>> {
    const path = buildPath({
      endpointName: `sheets/comments/status/${status}`,
    })
    return this.client.put(path, commentIds)
  }

  public deleteInBatch(commentIds: Array<number>): Promise<Response<Array<BaseComment>>> {
    const path = buildPath({
      endpointName: 'sheets/comments',
    })
    return this.client.delete(path, commentIds)
  }

  public delete(commentId: number): Promise<Response<BaseComment>> {
    const path = buildPath({
      endpointName: `sheets/comments/${commentId}`,
    })
    return this.client.delete(path, {})
  }
}
