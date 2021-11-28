import { FormData, HttpClient } from '@halo-dev/rest-api-client'
import { buildPath } from '../url'
import { UploadOptions } from '../types'

export class MigrationClient {
  private client: HttpClient

  constructor(client: HttpClient) {
    this.client = client
  }

  public async migrate(data: unknown, options: UploadOptions): Promise<void> {
    const path = buildPath({
      endpointName: 'migrations/halo',
    })
    const formData = new FormData()
    formData.append('file', data)
    await this.client.post(path, formData, { ...options })
  }
}
