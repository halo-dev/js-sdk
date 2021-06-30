import { HttpClient } from "@halo-dev/rest-api-client";
import { buildPath } from "../url";
import {
  BaseComment,
  BaseCommentParam,
  BaseCommentQuery,
  BaseCommentTree,
  BaseCommentWithParent,
  CommentWithHasChildren,
  Journal,
  JournalWithCmtCount,
  Page,
  Response,
} from "../types";

export class JournalClient {
  private client: HttpClient;

  constructor(client: HttpClient) {
    this.client = client;
  }

  public list(): Promise<Page<JournalWithCmtCount>> {
    const path = buildPath({
      endpointName: "journals",
    });
    return this.client.get(path, {});
  }

  public listChildrenComments(
    journalId: number,
    commentParentId: number,
    sort?: Array<string>
  ): Promise<Response<Array<BaseComment>>> {
    const path = buildPath({
      endpointName: `journals/${journalId}/comments/${commentParentId}/children`,
    });
    return this.client.get(path, { sort });
  }

  public getById(journalId: number): Promise<Response<Journal>> {
    const path = buildPath({
      endpointName: `journals/${journalId}`,
    });
    return this.client.get(path, {});
  }

  public async like(journalId: number): Promise<void> {
    const path = buildPath({
      endpointName: `journals/${journalId}/likes`,
    });
    await this.client.post(path, {});
  }

  public listCommentsAsView(
    journalId: number,
    params?: BaseCommentQuery
  ): Promise<Page<BaseCommentWithParent>> {
    const path = buildPath({
      endpointName: `journals/${journalId}/comments/list_view`,
    });
    return this.client.get(path, { ...params });
  }

  public listCommentsAsTopView(
    journalId: number,
    params?: BaseCommentQuery
  ): Promise<Page<CommentWithHasChildren>> {
    const path = buildPath({
      endpointName: `journals/${journalId}/comments/top_view`,
    });
    return this.client.get(path, { ...params });
  }

  public listCommentsAsTreeView(
    journalId: number,
    params?: BaseCommentQuery
  ): Promise<Page<BaseCommentTree>> {
    const path = buildPath({
      endpointName: `journals/${journalId}/comments/tree_view`,
    });
    return this.client.get(path, { ...params });
  }

  public comment(params: BaseCommentParam): Promise<Response<BaseComment>> {
    const path = buildPath({
      endpointName: "journals/comments",
    });
    return this.client.post(path, { ...params });
  }
}
