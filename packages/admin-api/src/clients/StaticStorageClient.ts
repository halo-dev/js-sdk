import {HttpClient} from "@halo-dev/rest-api-client";
import {Response, StaticContentParam, StaticFile} from "../types";
import {buildPath} from "../url";

export class StaticStorageClient {
  private client: HttpClient

  constructor(client: HttpClient) {
    this.client = client
  }

  public list(): Promise<Response<Array<StaticFile>>> {
    const path = buildPath({
      endpointName: `statics`
    })
    return this.client.get(path, {})
  }

  public delete(filePath: string): Promise<Response<any>> {
    const path = buildPath({
      endpointName: `statics`
    })
    return this.client.delete(path, {
      path: filePath
    })
  }

  public createFolder(basePath: string, folderName: string): Promise<Response<any>> {
    const path = buildPath({
      endpointName: `statics`
    })
    return this.client.post(path, {
      basePath,
      folderName
    })
  }


  public upload(basePath: string, file: File): Promise<Response<any>> {
    const path = buildPath({
      endpointName: `statics/upload`
    })
    return this.client.post(path, {
      basePath,
      file
    })
  }

  public rename(basePath: string, newName: string): Promise<Response<any>> {
    const path = buildPath({
      endpointName: `statics/rename`
    })
    return this.client.put(path, {
      basePath,
      newName
    })
  }

  public saveContent(params: StaticContentParam): Promise<Response<any>> {
    const path = buildPath({
      endpointName: `statics/files`
    })
    return this.client.put(path, params)
  }
}
