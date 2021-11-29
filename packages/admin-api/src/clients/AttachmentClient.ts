import { FormData, HttpClient } from '@halo-dev/rest-api-client'
import { buildPath } from '../url'
import { Attachment, AttachmentQuery, Page, Response, UploadOptions } from '../types'

export class AttachmentClient {
  private client: HttpClient

  constructor(client: HttpClient) {
    this.client = client
  }

  /**
   * Gets attachment detail by id.
   *
   * @param attachmentId attachment id
   * @returns Returns attachment detail response.
   */
  public get(attachmentId: number): Promise<Response<Attachment>> {
    const path = buildPath({
      endpointName: `attachments/${attachmentId}`,
    })
    return this.client.get(path, {})
  }

  /**
   * Page query attachment list.
   *
   * @param params attachment query parameter
   * @returns Returns attachment page response.
   */
  public list(params: AttachmentQuery): Promise<Response<Page<Attachment>>> {
    const path = buildPath({
      endpointName: 'attachments',
    })
    return this.client.get(path, { ...params })
  }

  /**
   * Batch delete attachment permanently by attachment ids.
   *
   * @param attachmentIds a collection of attachment id
   * @returns Returns attachments of deleted
   */
  public deleteInBatch(attachmentIds: Array<number>): Promise<Response<Array<Attachment>>> {
    const path = buildPath({
      endpointName: 'attachments',
    })
    return this.client.delete(path, attachmentIds)
  }

  /**
   * Delete attachment permanently by attachment id.
   *
   * @param attachmentId attachment id
   * @returns Returns attachment detail of deleted
   */
  public delete(attachmentId: number): Promise<Response<Array<Attachment>>> {
    const path = buildPath({
      endpointName: `attachments/${attachmentId}`,
    })
    return this.client.delete(path, {})
  }

  /**
   * Update attachment name by id.
   *
   * @param attachmentId attachment id
   * @param name a new attachment name
   * @returns Returns an updated attachment response.
   */
  public update(attachmentId: number, name: string): Promise<Response<Attachment>> {
    const path = buildPath({
      endpointName: `attachments/${attachmentId}`,
    })
    return this.client.put(path, { name })
  }

  /**
   * List all of attachment media types.
   *
   * @returns Returns attachment media types response.
   */
  public listMediaTypes(): Promise<Response<Array<string>>> {
    const path = buildPath({
      endpointName: 'attachments/media_types',
    })
    return this.client.get(path, {})
  }

  /**
   * List all of attachment types.
   *
   * @returns Returns a response of attachment types.
   */
  public listTypes(): Promise<Response<Array<string>>> {
    const path = buildPath({
      endpointName: 'attachments/types',
    })
    return this.client.get(path, {})
  }

  /**
   * Upload a single attachment file.
   *
   * @param data attachment file object.
   * @param options other upload options.
   * @returns Returns a response of uploaded attachment
   */
  public upload(data: unknown, options?: UploadOptions): Promise<Response<Attachment>> {
    const path = buildPath({
      endpointName: 'attachments/upload',
    })
    const formData = new FormData()
    formData.append('file', data)
    return this.client.post(path, formData, { ...options })
  }

  /**
   * Batch upload attachments.
   *
   * @param data attachment file object.
   * @param options other upload options.
   * @returns Returns a response of uploaded attachments.
   */
  public uploadInBatch(data: Array<unknown>, options?: UploadOptions): Promise<Response<Array<Attachment>>> {
    const path = buildPath({
      endpointName: 'attachments/uploads',
    })
    const formData = new FormData()
    data.forEach((fileStream) => {
      formData.append('files', fileStream)
    })
    return this.client.post(path, formData, { ...options })
  }
}
