import { HttpClient } from '@halo-dev/rest-api-client'
import { buildPath } from '../url'
import { Response, ThemeProperty } from '../types'

export class ThemeClient {
  private client: HttpClient

  constructor(client: HttpClient) {
    this.client = client
  }

  public getProperty(): Promise<Response<ThemeProperty>> {
    const path = buildPath({
      endpointName: 'themes/activation',
    })
    return this.client.get(path, {})
  }

  public listSettings(): Promise<Response<Record<string, any>>> {
    const path = buildPath({
      endpointName: 'themes/activation/settings',
    })
    return this.client.get(path, {})
  }

  public getPropertyById(themeId: string): Promise<Response<ThemeProperty>> {
    const path = buildPath({
      endpointName: `themes/${themeId}`,
    })
    return this.client.get(path, {})
  }

  public listSettingsById(themeId: string): Promise<Response<Record<string, any>>> {
    const path = buildPath({
      endpointName: `themes/${themeId}/settings`,
    })
    return this.client.get(path, {})
  }
}
