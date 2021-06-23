import { HttpClient } from "@halo-dev/rest-api-client";
import { buildPath } from "../url";
import {
  Option,
  Response
} from "../types";

export class OptionClient {
  private client: HttpClient;

  constructor(client: HttpClient) {
    this.client = client;
  }

  public listAll(): Promise<Response<Array<Option>>> {
    const path = buildPath({
      endpointName: "options/list_view",
    });
    return this.client.get(path, {});
  }

  public listAllAsMapView(key?: String): Promise<Response<Record<string, any>>> {
    const path = buildPath({
      endpointName: "options/map_view",
    });
    return this.client.get(path, { key });
  }

  public getByKey(key: string): Promise<Response> {
    const path = buildPath({
      endpointName: `options/keys/${key}`,
    });
    return this.client.get(path, { key });
  }

  public comment(): Promise<Record<string, any>> {
    const path = buildPath({
      endpointName: "options/comment",
    });
    return this.client.get(path, {});
  }
}
