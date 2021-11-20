import {HttpClient} from "@halo-dev/rest-api-client";
import {buildPath} from "../url";
import {Backup, BasePostDetail, Response} from "../types";

export class BackupClient {
  private client: HttpClient;

  constructor(client: HttpClient) {
    this.client = client;
  }

  public getWorkdirBackup(): Promise<Response<Backup>> {
    const path = buildPath({
      endpointName: 'backups/work-dir/fetch'
    })

    return this.client.get(path, {})
  }

  public getDataBackup(): Promise<Response<Backup>> {
    const path = buildPath({
      endpointName: 'backups/data/fetch'
    })

    return this.client.get(path, {})
  }

  public getMarkdownBackup(): Promise<Response<Backup>> {
    const path = buildPath({
      endpointName: 'backups/markdown/fetch'
    })

    return this.client.get(path, {})
  }

  public backupWorkdir(): Promise<Response<Backup>> {
    const path = buildPath({
      endpointName: 'backups/work-dir'
    })
    return this.client.post(path, {})
  }

  public getWorkdirBackupOptions(): Promise<Response<Array<string>>> {
    const path = buildPath({
      endpointName: 'backups/work-dir/options'
    })
    return this.client.get(path, {})
  }

  public listWorkdirBackups(): Promise<Response<Array<Backup>>> {
    const path = buildPath({
      endpointName: 'backups/work-dir'
    })
    return this.client.get(path, {})
  }

  public deleteWorkdirBackup(filename: string): Promise<Response<Backup>> {
    const path = buildPath({
      endpointName: `backups/work-dir?filename=${filename}`
    })
    return this.client.delete(path, {})
  }

  public backupData(): Promise<Response<Backup>> {
    const path = buildPath({
      endpointName: 'backups/data'
    })
    return this.client.post(path, {})
  }

  public listDataBackups(): Promise<Response<Array<Backup>>> {
    const path = buildPath({
      endpointName: 'backups/data'
    })
    return this.client.get(path, {})
  }


  public deleteDataBackup(filename: string): Promise<Response<Backup>> {
    const path = buildPath({
      endpointName: `backups/data?filename=${filename}`
    })
    return this.client.delete(path, {})
  }

  public backupMarkdown(): Promise<Response<Backup>> {
    const path = buildPath({
      endpointName: 'backups/markdown'
    })
    return this.client.post(path, {})
  }

  public listMarkdownBackups(): Promise<Response<Array<Backup>>> {
    const path = buildPath({
      endpointName: 'backups/markdown'
    })
    return this.client.get(path, {})
  }

  public deleteMarkdownBackup(filename: string): Promise<Response<Backup>> {
    const path = buildPath({
      endpointName: `backups/markdown?filename=${filename}`
    })
    return this.client.delete(path, {})
  }

  public importMarkdown(data: unknown): Promise<Response<BasePostDetail>> {
    const path = buildPath({
      endpointName: "backups/markdown/import",
    });
    const formData = new FormData();
    formData.append("file", data);
    return this.client.post(path, formData);
  }
}
