import { HttpClient } from "@halo-dev/rest-api-client";
import { buildPath } from "../url";
import {
  Response,
  Tag,
  TagParam
} from "../types";

export class TagClient {
  private client: HttpClient;

  constructor(client: HttpClient) {
    this.client = client;
  }

  public list(params: {
    sort?: string
    more?: boolean
  }): Promise<Response<Array<Tag>>> {
    const path = buildPath({
      endpointName: "tags",
    });
    return this.client.get(path, { ...params });
  }

  public create(params: TagParam): Promise<Response<Tag>> {
    const path = buildPath({
      endpointName: "tags",
    });
    return this.client.post(path, { ...params });
  }

  public getById(tagId: number): Promise<Response<Tag>> {
    const path = buildPath({
      endpointName: `tags/${tagId}`,
    });
    return this.client.get(path, {});
  }

  public updateById(tagId: number, params: TagParam): Promise<Response<Tag>> {
    const path = buildPath({
      endpointName: `tags/${tagId}`,
    });
    return this.client.put(path, { ...params });
  }

  public deleteById(tagId: number): Promise<Response<Tag>> {
    const path = buildPath({
      endpointName: `tags/${tagId}`,
    });
    return this.client.delete(path, {});
  }
}