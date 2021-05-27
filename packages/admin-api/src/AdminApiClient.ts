import { HaloRestAPIClient, HttpClient } from "../../rest-api-client";
import { buildPath } from "./url";
import {
  Environment,
  Response,
  AccessToken,
  AttachmentQuery,
  Attachment
} from "./types";

export class AdminApiClient {
  private client: HttpClient;

  constructor(client: HaloRestAPIClient) {
    this.client = client.buildHttpClient();
  }

  public getEnvironment(): Promise<Response<Environment>> {
    const path = buildPath({
      endpointName: "environments",
    });
    return this.client.get(path, {});
  }

  public getLogFile(lines: number): Promise<Response<String>> {
    const path = buildPath({
      endpointName: "halo/logfile",
    });
    return this.client.get(path, { lines });
  }

  public isInstalled(): Promise<Response<Boolean>> {
    const path = buildPath({
      endpointName: "is_installed",
    });
    return this.client.get(path, {});
  }

  public logout(): void {
    const path = buildPath({
      endpointName: "logout",
    });
    this.client.post(path, {});
  }

  public sendResetPasswordCode(params: {
    username: string
    email: string,
    code?: string,
    password?: string,
  }): void {
    const path = buildPath({
      endpointName: "password/code",
    });
    this.client.post(path, params);
  }

  public resetPassword(params: {
    username: string
    email: string,
    code?: string,
    password?: string,
  }): void {
    const path = buildPath({
      endpointName: "password/reset",
    });
    this.client.post(path, params);
  }

  public refreshToken(refreshToken: string): Promise<Response<AccessToken>> {
    const path = buildPath({
      endpointName: `refresh/${refreshToken}`,
    });
    return this.client.post(path, {});
  }

  public listAttachments(params: AttachmentQuery): Promise<Response<Attachment>> {
    const path = buildPath({
      endpointName: "attachments"
    });
    return this.client.get(path, { ...params })
  }

  public deleteAttachments(attachmentIds: Array<number>): Promise<Response<Attachment>> {
    const path = buildPath({
      endpointName: "attachments"
    });
    return this.client.delete(path, attachmentIds)
  }
}

export { HaloRestAPIClient }