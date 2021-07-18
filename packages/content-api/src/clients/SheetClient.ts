import { HttpClient } from "@halo-dev/rest-api-client";
import { buildPath } from "../url";
import {
  BaseComment,
  BaseCommentParam,
  BaseCommentWithParent,
  CommentWithHasChildren,
  ContentQuery,
  Page,
  PageQuery,
  Response,
  SheetDetail,
  SheetList,
  BaseCommentQuery,
} from "../types";

export class SheetClient {
  private client: HttpClient;

  constructor(client: HttpClient) {
    this.client = client;
  }

  public list(params: PageQuery): Promise<Page<SheetList>> {
    const path = buildPath({
      endpointName: "sheets",
    });
    return this.client.get(path, { ...params });
  }

  public get(
    sheetId: number,
    params?: ContentQuery
  ): Promise<Response<SheetDetail>> {
    const path = buildPath({
      endpointName: `sheets/${sheetId}`,
    });
    return this.client.get(path, { ...params });
  }

  public getBySlug(
    slug: string,
    params?: ContentQuery
  ): Promise<Response<SheetDetail>> {
    const path = buildPath({
      endpointName: "sheets/slug",
    });
    return this.client.get(path, { slug, ...params });
  }

  public listTopComments(
    sheetId: number,
    params?: BaseCommentQuery
  ): Promise<Page<CommentWithHasChildren>> {
    const path = buildPath({
      endpointName: `sheets/${sheetId}/comments/top_view`,
    });
    return this.client.get(path, { ...params });
  }

  public listChildrenComments(
    sheetId: number,
    commentParentId: number,
    sort?: Array<string>
  ): Promise<Response<Array<BaseComment>>> {
    const path = buildPath({
      endpointName: `sheets/${sheetId}/comments/${commentParentId}/children`,
    });
    return this.client.get(path, { sort });
  }

  public listCommentsAsTree(
    sheetId: number,
    params?: BaseCommentQuery
  ): Promise<Page<BaseComment>> {
    const path = buildPath({
      endpointName: `sheets/${sheetId}/comments/tree_view`,
    });
    return this.client.get(path, { ...params });
  }

  public listComments(
    sheetId: number,
    params?: BaseCommentQuery
  ): Promise<Page<BaseCommentWithParent>> {
    const path = buildPath({
      endpointName: `sheets/${sheetId}/comments/list_view`,
    });
    return this.client.get(path, { ...params });
  }

  public comment(params: BaseCommentParam) {
    const path = buildPath({
      endpointName: "sheets/comments",
    });
    return this.client.post(path, { ...params });
  }
}
