import { HttpClient, FormData } from "@guching/rest-api-client";
import { buildPath } from "../url";
import {
  Response,
  Backup,
  BasePostDetail,
} from "../types";

export class BackupClient {
  private client: HttpClient;

  constructor(client: HttpClient) {
    this.client = client;
  }

  public list(): Promise<Response<Array<Backup>>> {
    const path = buildPath({
      endpointName: "backups/data"
    });
    return this.client.get(path, {})
  }

  public exportAll(): Promise<Response<Backup>> {
    const path = buildPath({
      endpointName: "backups/data"
    });
    return this.client.post(path, {})
  }

  public async delete(filename: string): Promise<void> {
    const path = buildPath({
      endpointName: "backups/data"
    });
    await this.client.delete(path, { filename })
  }

  public download(filename: string): Promise<any> {
    const path = buildPath({
      endpointName: `backups/data/${filename}`
    });
    return this.client.get(path, {})
  }

  public fetch(filename: string): Promise<Response<Backup>> {
    const path = buildPath({
      endpointName: "backups/data/fetch"
    });
    return this.client.get(path, { filename })
  }

  public listMarkdown(): Promise<Response<Array<Backup>>> {
    const path = buildPath({
      endpointName: "backups/markdown/export"
    });
    return this.client.get(path, {})
  }

  public exportToMarkdown(needFrontMatter?: boolean): Promise<Response<Backup>> {
    const path = buildPath({
      endpointName: "backups/markdown/export"
    });
    return this.client.post(path, { needFrontMatter })
  }

  public async deleteMarkdown(filename: string): Promise<void> {
    const path = buildPath({
      endpointName: "backups/markdown/export"
    });
    await this.client.delete(path, { filename })
  }

  public downloadMarkdown(filename: string): Promise<any> {
    const path = buildPath({
      endpointName: `backups/markdown/export/${filename}`
    });
    return this.client.get(path, { filename })
  }

  public fetchMarkdown(filename: string): Promise<Response<Backup>> {
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

  public listFromWorkDir(): Promise<Response<Backup>> {
    const path = buildPath({
      endpointName: "backups/work-dir"
    });
    return this.client.get(path, {})
  }

  public async deleteFromWorkDir(filename: string): Promise<void> {
    const path = buildPath({
      endpointName: "backups/work-dir"
    });
    await this.client.delete(path, { filename })
  }

  public downloadFromWorkDir(filename: string): Promise<any> {
    const path = buildPath({
      endpointName: `backups/work-dir/${filename}`
    });
    return this.client.get(path, { filename })
  }

  public fetchFromWorkDir(filename: string): Promise<Response<Backup>> {
    const path = buildPath({
      endpointName: "backups/work-dir/fetch"
    });
    return this.client.get(path, { filename })
  }
}