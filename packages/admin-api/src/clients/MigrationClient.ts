import { HttpClient, FormData } from "@guching/rest-api-client";
import { buildPath } from "../url";

export class MigrationClient {
  private client: HttpClient;

  constructor(client: HttpClient) {
    this.client = client;
  }

  public async migrate(data: unknown): Promise<void> {
    const path = buildPath({
      endpointName: "migrations/halo"
    });
    const formData = new FormData()
    formData.append("file", data)
    await this.client.post(path, formData)
  }
}