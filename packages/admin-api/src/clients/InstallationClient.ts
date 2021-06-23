import { HttpClient } from "@halo-dev/rest-api-client";
import { buildPath } from "../url";
import {
  InstallParam,
} from "../types";

export class InstallationClient {
  private client: HttpClient;

  constructor(client: HttpClient) {
    this.client = client;
  }

  public install(params: InstallParam) {
    const path = buildPath({
      endpointName: "installations",
    });
    return this.client.post(path, { ...params });
  }
}