import { HttpClient, FormData } from "@halo-dev/rest-api-client";
import { buildPath } from "../url";
import { Response, Page, AttachmentQuery, Attachment } from "../types";

export class AttachmentClient {
  private client: HttpClient;

  constructor(client: HttpClient) {
    this.client = client;
  }

  public getById(attachmentId: number): Promise<Response<Attachment>> {
    const path = buildPath({
      endpointName: `attachments/${attachmentId}`,
    });
    return this.client.get(path, {});
  }

  public list(params: AttachmentQuery): Promise<Page<Attachment>> {
    const path = buildPath({
      endpointName: "attachments",
    });
    return this.client.get(path, { ...params });
  }

  public deleteInBatch(
    attachmentIds: Array<number>
  ): Promise<Response<Array<Attachment>>> {
    const path = buildPath({
      endpointName: "attachments",
    });
    return this.client.delete(path, attachmentIds);
  }

  public deleteById(
    attachmentId: number
  ): Promise<Response<Array<Attachment>>> {
    const path = buildPath({
      endpointName: `attachments/${attachmentId}`,
    });
    return this.client.delete(path, {});
  }

  public updateById(
    attachmentId: number,
    name: string
  ): Promise<Response<Attachment>> {
    const path = buildPath({
      endpointName: `attachments/${attachmentId}`,
    });
    return this.client.put(path, { name });
  }

  public listMediaTypes(): Promise<Response<Array<string>>> {
    const path = buildPath({
      endpointName: "attachments/media_types",
    });
    return this.client.get(path, {});
  }

  public listTypes(): Promise<Response<Array<string>>> {
    const path = buildPath({
      endpointName: "attachments/types",
    });
    return this.client.get(path, {});
  }

  public upload(data: unknown): Promise<Response<Array<string>>> {
    const path = buildPath({
      endpointName: "attachments/upload",
    });
    const formData = new FormData();
    formData.append("file", data);
    return this.client.post(path, formData);
  }

  public uploadInBatch(data: Array<unknown>): Promise<Response<Array<string>>> {
    const path = buildPath({
      endpointName: "attachments/uploads",
    });
    const formData = new FormData();
    data.forEach((fileStream) => {
      formData.append("files", fileStream);
    });
    return this.client.post(path, formData);
  }
}
