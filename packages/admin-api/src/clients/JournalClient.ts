import { HttpClient } from "@guching/rest-api-client";
import { buildPath } from "../url";
import {
  Response,
  Page,
  Journal,
  JournalType,
  JournalQuery,
  JournalWithCmtCount,
} from "../types";

export class JournalClient {
  private client: HttpClient;

  constructor(client: HttpClient) {
    this.client = client;
  }

  public list(params: JournalQuery): Promise<Page<JournalWithCmtCount>> {
    const path = buildPath({
      endpointName: "journals"
    });
    return this.client.get(path, { ...params })
  }

  public create(params: Journal): Promise<Response<Journal>> {
    const path = buildPath({
      endpointName: "journals"
    });
    return this.client.post(path, { ...params })
  }

  public updateById(journalId: number, params: {
    sourceContent: string
    type?: JournalType
  }): Promise<Response<Journal>> {
    const path = buildPath({
      endpointName: `journals/${journalId}`
    });
    return this.client.put(path, { ...params })
  }

  public async deleteById(journalId: number): Promise<void> {
    const path = buildPath({
      endpointName: `journals/${journalId}`
    });
    await this.client.delete(path, {})
  }

  public latest(top: number): Promise<Response<Array<Journal>>> {
    const path = buildPath({
      endpointName: "journals/latest"
    });
    return this.client.get(path, { top })
  }
}