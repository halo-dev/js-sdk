import { HaloRestAPIClient, HttpClient, FormData } from "../../rest-api-client";
import { buildPath } from "./url";
import {
  Environment,
  Response,
  Page,
  AccessToken,
  AttachmentQuery,
  Attachment,
  Backup,
  BasePostDetail
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

  public getAttachment(attachmentId: number): Promise<Response<Attachment>> {
    const path = buildPath({
      endpointName: `attachments/${attachmentId}`
    });
    return this.client.get(path, {})
  }

  public listAttachments(params: AttachmentQuery): Promise<Page<Attachment>> {
    const path = buildPath({
      endpointName: "attachments"
    });
    return this.client.get(path, { ...params })
  }

  public deleteAttachments(attachmentIds: Array<number>): Promise<Response<Array<Attachment>>> {
    const path = buildPath({
      endpointName: "attachments"
    });
    return this.client.delete(path, attachmentIds)
  }

  public deleteAttachmentById(attachmentId: number): Promise<Response<Array<Attachment>>> {
    const path = buildPath({
      endpointName: `attachments/${attachmentId}`
    });
    return this.client.delete(path, {})
  }

  public updateAttachmentById(attachmentId: number, name: string): Promise<Response<Attachment>> {
    const path = buildPath({
      endpointName: `attachments/${attachmentId}`
    });
    return this.client.put(path, { name })
  }

  public listAttachmentMediaTypes(): Promise<Response<Array<string>>> {
    const path = buildPath({
      endpointName: "attachments/media_types"
    });
    return this.client.get(path, {})
  }

  public listAttachmentTypes(): Promise<Response<Array<string>>> {
    const path = buildPath({
      endpointName: "attachments/types"
    });
    return this.client.get(path, {})
  }

  public uploadAttachment(data: unknown): Promise<Response<Array<string>>> {
    const path = buildPath({
      endpointName: "attachments/upload"
    });
    const formData = new FormData()
    formData.append("file", data)
    return this.client.post(path, formData)
  }

  public uploadAttachments(data: Array<unknown>): Promise<Response<Array<string>>> {
    const path = buildPath({
      endpointName: "attachments/uploads"
    });
    const formData = new FormData()
    data.forEach(fileStream => {
      formData.append("files", fileStream)
    })
    return this.client.post(path, formData)
  }

  public listBackups(): Promise<Response<Array<Backup>>> {
    const path = buildPath({
      endpointName: "backups/data"
    });
    return this.client.get(path, {})
  }

  public exportAllBackups(): Promise<Response<Backup>> {
    const path = buildPath({
      endpointName: "backups/data"
    });
    return this.client.post(path, {})
  }

  public async deleteBackup(filename: string): Promise<void> {
    const path = buildPath({
      endpointName: "backups/data"
    });
    await this.client.delete(path, { filename })
  }

  public downloadBackup(filename: string): Promise<any> {
    const path = buildPath({
      endpointName: `backups/data/${filename}`
    });
    return this.client.get(path, {})
  }

  public fetchBackup(filename: string): Promise<Response<Backup>> {
    const path = buildPath({
      endpointName: "backups/data/fetch"
    });
    return this.client.get(path, { filename })
  }

  public listMarkdownBackups(): Promise<Response<Array<Backup>>> {
    const path = buildPath({
      endpointName: "backups/markdown/export"
    });
    return this.client.get(path, {})
  }

  public exportMarkdownBackup(needFrontMatter?: boolean): Promise<Response<Backup>> {
    const path = buildPath({
      endpointName: "backups/markdown/export"
    });
    return this.client.post(path, { needFrontMatter })
  }

  public async deleteMarkdownBackup(filename: string): Promise<void> {
    const path = buildPath({
      endpointName: "backups/markdown/export"
    });
    await this.client.delete(path, { filename })
  }

  public downloadMarkdownBackup(filename: string): Promise<any> {
    const path = buildPath({
      endpointName: `backups/markdown/export/${filename}`
    });
    return this.client.get(path, { filename })
  }

  public fetchMarkdownBackup(filename: string): Promise<Response<Backup>> {
    const path = buildPath({
      endpointName: "backups/markdown/fetch"
    });
    return this.client.get(path, { filename })
  }

  public importMarkdown(data: unknown): Promise<Response<BasePostDetail>> {
    const path = buildPath({
      endpointName: "backups/markdown/import"
    });
    const formData = new FormData()
    formData.append("file", data)
    return this.client.post(path, formData)
  }

  public listBackupsFromWorkDir(): Promise<Response<Backup>> {
    const path = buildPath({
      endpointName: "backups/work-dir"
    });
    return this.client.get(path, {})
  }

  public async deleteBackupsFromWorkDir(filename: string): Promise<void> {
    const path = buildPath({
      endpointName: "backups/work-dir"
    });
    await this.client.delete(path, { filename })
  }

  public downloadBackupsFromWorkDir(filename: string): Promise<any> {
    const path = buildPath({
      endpointName: `backups/work-dir/${filename}`
    });
    return this.client.get(path, { filename })
  }

  public fetchBackupsFromWorkDir(filename: string): Promise<Response<Backup>> {
    const path = buildPath({
      endpointName: "backups/work-dir/fetch"
    });
    return this.client.get(path, { filename })
  }
}

export { HaloRestAPIClient }