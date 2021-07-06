import { HttpClient } from "@halo-dev/rest-api-client";
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

  /**
   * Lists journals.
   *
   * @param params parameter for queries
   * @returns A page response of journals.
   */
  public list(params: JournalQuery): Promise<Page<JournalWithCmtCount>> {
    const path = buildPath({
      endpointName: "journals",
    });
    return this.client.get(path, { ...params });
  }

  /**
   * Creates a journal.
   *
   * @param params parameter for creates
   * @returns A response of created journal.
   */
  public create(params: Journal): Promise<Response<Journal>> {
    const path = buildPath({
      endpointName: "journals",
    });
    return this.client.post(path, { ...params });
  }

  /**
   * Updates a journal by id.
   *
   * @param journalId journal id
   * @param params parameter for updates
   * @returns A response of updated journal.
   */
  public updateById(
    journalId: number,
    params: {
      sourceContent: string;
      type?: JournalType;
    }
  ): Promise<Response<Journal>> {
    const path = buildPath({
      endpointName: `journals/${journalId}`,
    });
    return this.client.put(path, { ...params });
  }

  /**
   * Deletes a journal by id.
   * @param journalId journal id
   */
  public async deleteById(journalId: number): Promise<void> {
    const path = buildPath({
      endpointName: `journals/${journalId}`,
    });
    await this.client.delete(path, {});
  }

  /**
   * Gets latest journals.
   *
   * @param top top option for queries
   * @returns A response of lastes journals.
   */
  public latest(top: number): Promise<Response<Array<Journal>>> {
    const path = buildPath({
      endpointName: "journals/latest",
    });
    return this.client.get(path, { top });
  }
}
