import { HttpClient } from "../http";
import { buildPath } from "../url";
import { Environment } from "./types";
export class AdminClient {
  private client: HttpClient;

  constructor(client: HttpClient) {
    this.client = client;
  }

  public getEnvironment(): Promise<Environment> {
    const path = this.buildPathWithScope({
      endpointName: "environments",
    });
    return this.client.get(path, {});
  }

  private buildPathWithScope(params: {
    endpointName: string;
    scope?: number | string;
  }) {
    return buildPath({
      ...params,
    });
  }
}
