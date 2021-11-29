import { HttpClient } from '@halo-dev/rest-api-client'
import { buildPath } from '../url'
import { Response, Statistic, StatisticWithUser } from '../types'

export class StatisticClient {
  private client: HttpClient

  constructor(client: HttpClient) {
    this.client = client
  }

  public statistics(): Promise<Response<Statistic>> {
    const path = buildPath({
      endpointName: 'statistics',
    })
    return this.client.get(path, {})
  }

  public statisticsWithUser(): Promise<Response<StatisticWithUser>> {
    const path = buildPath({
      endpointName: 'statistics/user',
    })
    return this.client.get(path, {})
  }
}
