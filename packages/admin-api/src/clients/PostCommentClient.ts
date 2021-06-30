import { HttpClient } from "@halo-dev/rest-api-client";
import { buildPath } from "../url";
import {
  Response,
  Page,
  BaseCommentParam,
  CommentStatus,
  BaseComment,
  PostCommentWithPost,
  CommentQuery,
} from "../types";

export class PostCommentClient {
  private client: HttpClient;

  constructor(client: HttpClient) {
    this.client = client;
  }

  public list(params: CommentQuery): Promise<Page<PostCommentWithPost>> {
    const path = buildPath({
      endpointName: "posts/comments",
    });
    return this.client.get(path, { ...params });
  }

  public listAsView(params: {
    postId: number;
    sort?: Array<string>;
    page?: number;
  }): Promise<Page<BaseComment>> {
    const path = buildPath({
      endpointName: `posts/comments/${params.postId}/list_view`,
    });
    return this.client.get(path, { ...params });
  }

  public listAsTreeView(params: {
    postId: number;
    sort?: Array<string>;
    page?: number;
  }): Promise<Page<BaseComment>> {
    const path = buildPath({
      endpointName: `posts/comments/${params.postId}/tree_view`,
    });
    return this.client.get(path, { ...params });
  }

  public latest(params: {
    top?: number;
    status?: CommentStatus;
  }): Promise<Response<Array<PostCommentWithPost>>> {
    const path = buildPath({
      endpointName: "posts/comments/latest",
    });
    return this.client.get(path, { ...params });
  }

  public create(params: BaseCommentParam): Promise<Response<BaseComment>> {
    const path = buildPath({
      endpointName: "posts/comments",
    });
    return this.client.post(path, { ...params });
  }

  public updateById(
    commentId: number,
    params: BaseCommentParam
  ): Promise<Response<BaseComment>> {
    const path = buildPath({
      endpointName: `posts/comments/${commentId}`,
    });
    return this.client.get(path, { ...params });
  }

  public updateStatusById(
    commentId: number,
    status: CommentStatus
  ): Promise<Response<BaseComment>> {
    const path = buildPath({
      endpointName: `posts/comments/${commentId}/status/${status}`,
    });
    return this.client.put(path, {});
  }

  public updateStatusInBatch(
    commentIds: Array<number>,
    status: CommentStatus
  ): Promise<Response<Array<BaseComment>>> {
    const path = buildPath({
      endpointName: `posts/comments/status/${status}`,
    });
    return this.client.put(path, commentIds);
  }

  public deleteById(commentId: number): Promise<Response<BaseComment>> {
    const path = buildPath({
      endpointName: `posts/comments/${commentId}`,
    });
    return this.client.delete(path, {});
  }

  public deleteInBatch(
    postCommentIds: Array<number>
  ): Promise<Response<Array<BaseComment>>> {
    const path = buildPath({
      endpointName: "posts/comments",
    });
    return this.client.delete(path, postCommentIds);
  }
}
