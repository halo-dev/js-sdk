import { HttpClient } from '@halo-dev/rest-api-client'
import { Response } from '../types'
import { buildPath } from '../url'

export class ActuatorClient {
  private client: HttpClient

  constructor(client: HttpClient) {
    this.client = client
  }

  public getLogfile(): Promise<Response<any>> {
    const path = buildPath({
      endpointName: 'actuator/logfile',
    })
    return this.client.get(path, {})
  }

  public getEnv(): Promise<Response<any>> {
    const path = buildPath({
      endpointName: 'actuator/env',
    })
    return this.client.get(path, {})
  }

  public getSystemCpuCount(): Promise<Response<any>> {
    const path = buildPath({
      endpointName: 'actuator/metrics/system.cpu.count',
    })
    return this.client.get(path, {})
  }

  public getSystemCpuUsage(): Promise<Response<any>> {
    const path = buildPath({
      endpointName: 'actuator/metrics/system.cpu.usage',
    })
    return this.client.get(path, {})
  }

  public getProcessUptime(): Promise<Response<any>> {
    const path = buildPath({
      endpointName: 'actuator/metrics/process.uptime',
    })
    return this.client.get(path, {})
  }

  public getProcessStartTime(): Promise<Response<any>> {
    const path = buildPath({
      endpointName: 'actuator/metrics/process.start.time',
    })
    return this.client.get(path, {})
  }

  public getProcessCpuUsage(): Promise<Response<any>> {
    const path = buildPath({
      endpointName: 'actuator/metrics/process.cpu.usage',
    })
    return this.client.get(path, {})
  }

  public getJvmMemoryMax(): Promise<Response<any>> {
    const path = buildPath({
      endpointName: 'actuator/metrics/jvm.memory.max',
    })
    return this.client.get(path, {})
  }

  public getJvmMemoryCommitted(): Promise<Response<any>> {
    const path = buildPath({
      endpointName: 'actuator/metrics/jvm.memory.committed',
    })
    return this.client.get(path, {})
  }

  public getJvmMemoryUsed(): Promise<Response<any>> {
    const path = buildPath({
      endpointName: 'actuator/metrics/jvm.memory.used',
    })
    return this.client.get(path, {})
  }

  public getJvmGcPause(): Promise<Response<any>> {
    const path = buildPath({
      endpointName: 'actuator/metrics/jvm.gc.pause',
    })
    return this.client.get(path, {})
  }
}
