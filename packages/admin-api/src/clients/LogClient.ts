import { HttpClient } from "@guching/rest-api-client";
import { buildPath } from "../url";
import {
  Page,
  Log,
} from "../types";

export class LogClient {
  private client: HttpClient;

  constructor(client: HttpClient) {
    this.client = client;
  }

  public list(params: {
    page: number
    size: number
    sort: Array<string>
  }): Promise<Page<Log>> {
    const path = buildPath({
      endpointName: "logs"
    });
    return this.client.get(path, { ...params })
  }

  public async clear(): Promise<void> {
    const path = buildPath({
      endpointName: "logs/clear"
    });
    await this.client.get(path, {})
  }

  public latest(top: number): Promise<Array<Log>> {
    const path = buildPath({
      endpointName: "logs/latest"
    });
    return this.client.get(path, { top })
  }
}