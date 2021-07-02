import { HttpClient, FormData } from "@halo-dev/rest-api-client";
import { buildPath } from "../url";
import { Response, Backup, BasePostDetail } from "../types";

export class BackupClient {
  private client: HttpClient;

  constructor(client: HttpClient) {
    this.client = client;
  }

  /**
   * List all exported data
   *
   * @returns Returns a response of exported data.
   */
  public list(): Promise<Response<Array<Backup>>> {
    const path = buildPath({
      endpointName: "backups/data",
    });
    return this.client.get(path, {});
  }

  /**
   * Export all data.
   *
   * @returns Returns a response of all exported backup data.
   */
  public exportAll(): Promise<Response<Backup>> {
    const path = buildPath({
      endpointName: "backups/data",
    });
    return this.client.post(path, {});
  }

  /**
   * Delete a exported data by filename.
   *
   * @param filename file name
   */
  public async delete(filename: string): Promise<void> {
    const path = buildPath({
      endpointName: "backups/data",
    });
    await this.client.delete(path, { filename });
  }

  /**
   * Download a exported data by filename.
   *
   * @param filename a filename of exported data
   * @returns Returns a resource object of exported data file.
   */
  public download(filename: string): Promise<any> {
    const path = buildPath({
      endpointName: `backups/data/${filename}`,
    });
    return this.client.get(path, {});
  }

  /**
   * Fetch a backup.
   *
   * @param filename filename
   * @returns Returns a response of fetched backup.
   */
  public fetch(filename: string): Promise<Response<Backup>> {
    const path = buildPath({
      endpointName: "backups/data/fetch",
    });
    return this.client.get(path, { filename });
  }

  /**
   * Get all markdown backups.
   *
   * @returns Returns a response of exported markdown backup.
   */
  public listMarkdown(): Promise<Response<Array<Backup>>> {
    const path = buildPath({
      endpointName: "backups/markdown/export",
    });
    return this.client.get(path, {});
  }

  /**
   * Export backup to markdown.
   *
   * @param needFrontMatter true if need frontMatter
   * @returns Returns a response of markdown backup.
   */
  public exportToMarkdown(
    needFrontMatter?: boolean
  ): Promise<Response<Backup>> {
    const path = buildPath({
      endpointName: "backups/markdown/export",
    });
    return this.client.post(path, { needFrontMatter });
  }

  /**
   * Delete a exported markdown backup by filename.
   *
   * @param filename filename
   */
  public async deleteMarkdown(filename: string): Promise<void> {
    const path = buildPath({
      endpointName: "backups/markdown/export",
    });
    await this.client.delete(path, { filename });
  }

  /**
   * Download a exported markdown backup file.
   *
   * @param filename filename
   * @returns Returns a binary stream of exported markdown backup file.
   */
  public downloadMarkdown(filename: string): Promise<any> {
    const path = buildPath({
      endpointName: `backups/markdown/export/${filename}`,
    });
    return this.client.get(path, { filename });
  }

  /**
   * Fetch a markdown backup by filename.
   *
   * @param filename filename
   * @returns Returns a response of markdown backup.
   */
  public fetchMarkdown(filename: string): Promise<Response<Backup>> {
    const path = buildPath({
      endpointName: "backups/markdown/fetch",
    });
    return this.client.get(path, { filename });
  }

  /**
   * Import a backup by file.
   *
   * @param data a backuped markdown file.
   * @returns Returns a response of imported post detail by backup file.
   */
  public importMarkdown(data: unknown): Promise<Response<BasePostDetail>> {
    const path = buildPath({
      endpointName: "backups/markdown/import",
    });
    const formData = new FormData();
    formData.append("file", data);
    return this.client.post(path, formData);
  }

  /**
   * Get all work directory backups.
   *
   * @returns Returns a response of all backups from work dir.
   */
  public listFromWorkDir(): Promise<Response<Backup>> {
    const path = buildPath({
      endpointName: "backups/work-dir",
    });
    return this.client.get(path, {});
  }

  /**
   * Delete a backup from work directory by filename.
   *
   * @param filename filename
   */
  public async deleteFromWorkDir(filename: string): Promise<void> {
    const path = buildPath({
      endpointName: "backups/work-dir",
    });
    await this.client.delete(path, { filename });
  }

  /**
   * Download a backup file from workdir.
   *
   * @param filename filename
   * @returns Returns a binary stream of backup from work directory.
   */
  public downloadFromWorkDir(filename: string): Promise<any> {
    const path = buildPath({
      endpointName: `backups/work-dir/${filename}`,
    });
    return this.client.get(path, { filename });
  }

  /**
   * Fetch a backup from work directory.
   *
   * @param filename filename
   * @returns Returns a response of backup from work directory.
   */
  public fetchFromWorkDir(filename: string): Promise<Response<Backup>> {
    const path = buildPath({
      endpointName: "backups/work-dir/fetch",
    });
    return this.client.get(path, { filename });
  }
}
