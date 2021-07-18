import { HttpClient } from "@halo-dev/rest-api-client";
import { buildPath } from "../url";
import {
  Response,
  Page,
  PageQuery,
  Sheet,
  SheetParam,
  SheetDetail,
  PostStatus,
  BasePostDetail,
  IndependentSheet,
} from "../types";

export class SheetClient {
  private client: HttpClient;

  constructor(client: HttpClient) {
    this.client = client;
  }

  public list(params: PageQuery): Promise<Page<Sheet>> {
    const path = buildPath({
      endpointName: "sheets",
    });
    return this.client.get(path, { ...params });
  }

  public listIndependents(): Promise<Response<IndependentSheet>> {
    const path = buildPath({
      endpointName: "sheets/independent",
    });
    return this.client.get(path, {});
  }

  public create(params: SheetParam): Promise<Response<SheetDetail>> {
    const path = buildPath({
      endpointName: "sheets",
    });
    return this.client.post(path, { ...params });
  }

  public get(sheetId: number): Promise<Response<SheetDetail>> {
    const path = buildPath({
      endpointName: `sheets/${sheetId}`,
    });
    return this.client.get(path, {});
  }

  public getPreviewLinkById(sheetId: number): Promise<Response<String>> {
    const path = buildPath({
      endpointName: `sheets/preview/${sheetId}`,
    });
    return this.client.get(path, {});
  }

  public update(
    sheetId: number,
    params: SheetParam,
    autoSave?: boolean
  ): Promise<Response<SheetDetail>> {
    const path = buildPath({
      endpointName: `sheets/${sheetId}?autoSave=${autoSave}`,
    });
    return this.client.put(path, { ...params });
  }

  public async updateStatusById(
    sheetId: number,
    status: PostStatus
  ): Promise<void> {
    const path = buildPath({
      endpointName: `sheets/${sheetId}/${status}`,
    });
    await this.client.put(path, {});
  }

  public updateDraftById(
    sheetId: number,
    content?: string
  ): Promise<BasePostDetail> {
    const path = buildPath({
      endpointName: `sheets/${sheetId}/status/draft/content`,
    });
    return this.client.put(path, { content });
  }

  public delete(sheetId: number): Promise<Response<SheetDetail>> {
    const path = buildPath({
      endpointName: `sheets/${sheetId}`,
    });
    return this.client.delete(path, {});
  }
}
