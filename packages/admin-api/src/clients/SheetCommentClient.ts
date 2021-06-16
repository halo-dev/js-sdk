import { HttpClient } from "@guching/rest-api-client";
import { buildPath } from "../url";
import {
  Response,
  Page,
  BaseComment,
  BaseCommentParam,
  CommentStatus,
  CommentQuery,
  SheetCommentWithSheet,
  BaseCommentWithParent,
} from "../types";

export class SheetCommentClient {
  private client: HttpClient;

  constructor(client: HttpClient) {
    this.client = client;
  }

  public list(params: CommentQuery): Promise<Page<SheetCommentWithSheet>> {
    const path = buildPath({
      endpointName: "sheets/comments"
    });
    return this.client.get(path, { ...params })
  }

  public getById(commentId: number): Promise<Response<SheetCommentWithSheet>> {
    const path = buildPath({
      endpointName: `sheets/comments/${commentId}`
    });
    return this.client.get(path, {})
  }

  public listAsView(params: {
    sheetId: number
    sort?: Array<string>
    page?: number
  }): Promise<Page<BaseCommentWithParent>> {
    const path = buildPath({
      endpointName: `sheets/comments/${params.sheetId}/list_view`
    });
    return this.client.get(path, { ...params })
  }

  public listAsTreeView(params: {
    sheetId: number
    sort?: Array<string>
    page?: number
  }): Promise<Page<BaseComment>> {
    const path = buildPath({
      endpointName: `sheets/comments/${params.sheetId}/tree_view`
    });
    return this.client.get(path, { ...params })
  }

  public latest(params: {
    top?: number
    status?: CommentStatus
  }): Promise<Response<Array<SheetCommentWithSheet>>> {
    const path = buildPath({
      endpointName: "sheets/comments/latest"
    });
    return this.client.get(path, { ...params })
  }

  public create(params: BaseCommentParam): Promise<Response<BaseComment>> {
    const path = buildPath({
      endpointName: "sheets/comments"
    });
    return this.client.post(path, { ...params })
  }

  public updateById(commentId: number, params: BaseCommentParam): Promise<Response<BaseComment>> {
    const path = buildPath({
      endpointName: `sheets/comments/${commentId}`
    });
    return this.client.put(path, { ...params })
  }

  public updateStatusById(commentId: number, status: CommentStatus): Promise<Response<BaseComment>> {
    const path = buildPath({
      endpointName: `sheets/comments/${commentId}/status/${status}`
    });
    return this.client.put(path, {})
  }

  public updateStatusInBatch(commentIds: Array<number>,
    status: CommentStatus): Promise<Response<BaseComment>> {
    const path = buildPath({
      endpointName: `sheets/comments/status/${status}`
    });
    return this.client.put(path, commentIds)
  }

  public deleteInBatch(commentIds: Array<number>): Promise<Response<Array<BaseComment>>> {
    const path = buildPath({
      endpointName: "sheets​/comments​​"
    });
    return this.client.delete(path, commentIds)
  }

  public deleteById(commentId: number): Promise<Response<BaseComment>> {
    const path = buildPath({
      endpointName: `sheets/comments/${commentId}`
    });
    return this.client.delete(path, {})
  }
}