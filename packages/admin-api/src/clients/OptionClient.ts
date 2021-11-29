import { HttpClient } from '@halo-dev/rest-api-client'
import { buildPath } from '../url'
import { Option, OptionQuery, Response } from '../types'

export class OptionClient {
  private client: HttpClient

  constructor(client: HttpClient) {
    this.client = client
  }

  public list(): Promise<Response<Array<Option>>> {
    const path = buildPath({
      endpointName: 'options',
    })
    return this.client.get(path, {})
  }

  public create(params: Option): Promise<Response<Option>> {
    const path = buildPath({
      endpointName: 'options',
    })
    return this.client.post(path, { ...params })
  }

  public get(id: number): Promise<Response<Option>> {
    const path = buildPath({
      endpointName: `options/${id}`,
    })
    return this.client.get(path, {})
  }

  public update(optionId: number, params: Option): Promise<Response<Option>> {
    const path = buildPath({
      endpointName: `options/${optionId}`,
    })
    return this.client.put(path, { ...params })
  }

  public async delete(optionId: number): Promise<void> {
    const path = buildPath({
      endpointName: `options/${optionId}`,
    })
    await this.client.delete(path, {})
  }

  public listAsView(params: OptionQuery): Promise<Response<Array<Option>>> {
    const path = buildPath({
      endpointName: 'options/list_view',
    })
    return this.client.get(path, { ...params })
  }

  public listAsMapView(): Promise<Response<Record<string, any>>> {
    const path = buildPath({
      endpointName: 'options/map_view',
    })
    return this.client.get(path, {})
  }

  public listAsMapViewByKeys(params: Array<string>): Promise<Response<Record<string, any>>> {
    const path = buildPath({
      endpointName: 'options/map_view/keys',
    })
    return this.client.post(path, params)
  }

  public async saveMapView(params: any): Promise<void> {
    const path = buildPath({
      endpointName: 'options/map_view/saving',
    })
    await this.client.post(path, { ...params })
  }

  public async save(params: Array<Option>): Promise<void> {
    const path = buildPath({
      endpointName: 'options/saving',
    })
    await this.client.post(path, [...params])
  }
}
