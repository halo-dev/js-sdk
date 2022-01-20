import { HttpClient } from '@halo-dev/rest-api-client'
import { buildPath } from '../url'
import { Journal, JournalWithCmtCount, Page, Response } from '../types'

export class JournalClient {
  private client: HttpClient

  constructor(client: HttpClient) {
    this.client = client
  }

  public list(): Promise<Page<JournalWithCmtCount>> {
    const path = buildPath({
      endpointName: 'journals',
    })
    return this.client.get(path, {})
  }

  public get(journalId: number): Promise<Response<Journal>> {
    const path = buildPath({
      endpointName: `journals/${journalId}`,
    })
    return this.client.get(path, {})
  }

  public async like(journalId: number): Promise<void> {
    const path = buildPath({
      endpointName: `journals/${journalId}/likes`,
    })
    await this.client.post(path, {})
  }
}
