import { HaloRestAPIClient, HttpClient } from "../../rest-api-client";
import { buildPath } from "./url";
import { Environment, Response } from "./types";

export class AdminApiClient {
  private client: HttpClient;

  constructor(client: HaloRestAPIClient) {
    this.client = client.buildHttpClient();
  }

  public getEnvironment(): Promise<Response<Environment>> {
    const path = buildPath({
      endpointName: "environments",
    });
    console.log(path)
    return this.client.get(path, {});
  }
}

export { HaloRestAPIClient }