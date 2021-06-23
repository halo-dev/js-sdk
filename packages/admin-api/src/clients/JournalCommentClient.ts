import { HttpClient } from "@halo-dev/rest-api-client";
import { buildPath } from "../url";
import {
  Response,
  Page,
  JournalCommentQuery,
  JournalCommentWithJournal,
  BaseComment,
  BaseCommentParam,
  CommentStatus
} from "../types";

export class JournalCommentClient {
  private client: HttpClient;

  constructor(client: HttpClient) {
    this.client = client;
  }

  public async list(params: JournalCommentQuery): Promise<Page<JournalCommentWithJournal>> {
    const path = buildPath({
      endpointName: "journals/comments"
    });
    return this.client.get(path, { ...params })
  }

  public create(params: BaseCommentParam): Promise<Response<BaseComment>> {
    const path = buildPath({
      endpointName: "journals/comments"
    });
    return this.client.post(path, { ...params })
  }

  public deleteById(commentId: number): Promise<Response<BaseComment>> {
    const path = buildPath({
      endpointName: `journals/comments/${commentId}`
    });
    return this.client.delete(path, {})
  }

  public updateById(commentId: number, status: CommentStatus): Promise<Response<BaseComment>> {
    const path = buildPath({
      endpointName: `journals/comments/${commentId}/status/${status}`
    });
    return this.client.put(path, {})
  }

  public listAsView(params: {
    journalId: number
    sort?: Array<string>
    page?: number
  }): Promise<Page<BaseComment>> {
    const path = buildPath({
      endpointName: `journals/comments/${params.journalId}/list_view`
    });
    return this.client.get(path, { ...params })
  }

  public listAsTree(params: {
    journalId: number
    sort?: Array<string>
    page?: number
  }): Promise<Page<BaseComment>> {
    const path = buildPath({
      endpointName: `journals/comments/${params.journalId}/tree_view`
    });
    return this.client.get(path, { ...params })
  }

  public latest(params: {
    top?: number
    status?: CommentStatus
  }): Promise<Response<Array<BaseComment>>> {
    const path = buildPath({
      endpointName: "journals/comments/latest"
    });
    return this.client.get(path, { ...params })
  }
}