import { HttpClient } from '@halo-dev/rest-api-client'
import { buildPath } from '../url'
import { Backup, BasePostDetail, Response, UploadOptions } from '../types'

export class BackupClient {
  private client: HttpClient

  constructor(client: HttpClient) {
    this.client = client
  }

  public getWorkdirBackup(filename: string): Promise<Response<Backup>> {
    const path = buildPath({
      endpointName: `backups/work-dir/fetch?filename=${filename}`,
    })

    return this.client.get(path, {})
  }

  public getDataBackup(filename: string): Promise<Response<Backup>> {
    const path = buildPath({
      endpointName: `backups/data/fetch?filename=${filename}`,
    })

    return this.client.get(path, {})
  }

  public getMarkdownBackup(filename: string): Promise<Response<Backup>> {
    const path = buildPath({
      endpointName: `backups/markdown/fetch?filename=${filename}`,
    })

    return this.client.get(path, {})
  }

  public backupWorkdir(options: Array<string>): Promise<Response<Backup>> {
    const path = buildPath({
      endpointName: 'backups/work-dir',
    })
    return this.client.post(path, options)
  }

  public getWorkdirBackupOptions(): Promise<Response<Array<string>>> {
    const path = buildPath({
      endpointName: 'backups/work-dir/options',
    })
    return this.client.get(path, {})
  }

  public listWorkdirBackups(): Promise<Response<Array<Backup>>> {
    const path = buildPath({
      endpointName: 'backups/work-dir',
    })
    return this.client.get(path, {})
  }

  public deleteWorkdirBackup(filename: string): Promise<Response<Backup>> {
    const path = buildPath({
      endpointName: `backups/work-dir`,
    })
    return this.client.delete(path, { filename })
  }

  public backupData(): Promise<Response<Backup>> {
    const path = buildPath({
      endpointName: 'backups/data',
    })
    return this.client.post(path, {})
  }

  public listDataBackups(): Promise<Response<Array<Backup>>> {
    const path = buildPath({
      endpointName: 'backups/data',
    })
    return this.client.get(path, {})
  }

  public deleteDataBackup(filename: string): Promise<Response<Backup>> {
    const path = buildPath({
      endpointName: `backups/data`,
    })
    return this.client.delete(path, { filename })
  }

  public backupMarkdown(params: { needFrontMatter: boolean }): Promise<Response<Backup>> {
    const path = buildPath({
      endpointName: 'backups/markdown/export',
    })
    return this.client.post(path, params)
  }

  public listMarkdownBackups(): Promise<Response<Array<Backup>>> {
    const path = buildPath({
      endpointName: 'backups/markdown/export',
    })
    return this.client.get(path, {})
  }

  public deleteMarkdownBackup(filename: string): Promise<Response<Backup>> {
    const path = buildPath({
      endpointName: `backups/markdown/export`,
    })
    return this.client.delete(path, { filename })
  }

  public importMarkdown(data: any, options: UploadOptions): Promise<Response<BasePostDetail>> {
    const path = buildPath({
      endpointName: 'backups/markdown/import',
    })
    const formData = new FormData()
    formData.append('file', data)
    return this.client.post(path, formData, { ...options })
  }
}
