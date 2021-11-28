import { HttpClient } from '@halo-dev/rest-api-client'
import { buildPath } from '../url'
import { Response } from '../types'

export class MailClient {
  private client: HttpClient

  constructor(client: HttpClient) {
    this.client = client
  }

  public testSmtpService(params: { content: string; subject: string; to: string }): Promise<Response<string>> {
    const path = buildPath({
      endpointName: 'mails/test',
    })
    return this.client.post(path, { ...params })
  }

  public testConnect(): Promise<Response<string>> {
    const path = buildPath({
      endpointName: 'mails/test/connection',
    })
    return this.client.post(path, {})
  }
}
