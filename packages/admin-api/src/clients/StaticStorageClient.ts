import { FormData, HttpClient } from '@halo-dev/rest-api-client'
import { Response, StaticContentParam, StaticFile, UploadOptions } from '../types'
import { buildPath } from '../url'

export class StaticStorageClient {
  private client: HttpClient

  constructor(client: HttpClient) {
    this.client = client
  }

  public list(): Promise<Response<Array<StaticFile>>> {
    const path = buildPath({
      endpointName: `statics`,
    })
    return this.client.get(path, {})
  }

  public delete(filePath: string): Promise<Response<any>> {
    const path = buildPath({
      endpointName: `statics`,
    })
    return this.client.delete(path, {
      path: filePath,
    })
  }

  public createFolder(basePath: string, folderName: string): Promise<Response<any>> {
    const path = buildPath({
      endpointName: `statics?basePath=${basePath}&folderName=${folderName}`,
    })
    return this.client.post(path, {})
  }

  public upload(file: File, options: UploadOptions, basePath: string): Promise<Response<any>> {
    const path = buildPath({
      endpointName: `statics/upload?basePath=${basePath}`,
    })
    const formData = new FormData()
    formData.append('file', file)
    return this.client.post(path, formData, { ...options })
  }

  public rename(basePath: string, newName: string): Promise<Response<any>> {
    const path = buildPath({
      endpointName: `statics/rename?basePath=${basePath}&newName=${newName}`,
    })
    return this.client.post(path, {})
  }

  public saveContent(params: StaticContentParam): Promise<Response<any>> {
    const path = buildPath({
      endpointName: `statics/files`,
    })
    return this.client.put(path, params)
  }
}
