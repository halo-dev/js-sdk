import { HttpClient } from "@guching/rest-api-client";
import { buildPath } from "../url";
import {
  Response,
  ArchiveYear,
  ArchiveMonth
} from "../types";

export class ArchiveClient {
  private client: HttpClient;

  constructor(client: HttpClient) {
    this.client = client;
  }

  public listYearArchives(): Promise<Response<Array<ArchiveYear>>> {
    const path = buildPath({
      endpointName: "archives/years",
    });
    return this.client.get(path, {});
  }

  public listMonthArchives(): Promise<Response<Array<ArchiveMonth>>> {
    const path = buildPath({
      endpointName: "archives/years",
    });
    return this.client.get(path, {});
  }
}
