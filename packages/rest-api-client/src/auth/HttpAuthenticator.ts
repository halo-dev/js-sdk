import Axios from "axios";
import { RequestConfig } from "../http/HttpClientInterface";
import { Credentials } from './CredentialsInterface'
import { HaloResponseHandler } from '../HaloResponseHandler'
import { platformDeps } from "../platform/";

export class HttpAuthenticator {
  private baseUrl: string
  private responseHandler: HaloResponseHandler

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl
    this.responseHandler = new HaloResponseHandler()
  }

  public authenticate(credentials: Credentials) {
    return this.sendRequest({
      method: 'post',
      url: `${this.baseUrl}/api/admin/login`,
      headers: {
        ...platformDeps.buildHeaders({})
      },
      data: {
        ...credentials
      }
    })
  }

  public refreshToken(refreshToken: string) {
    return this.sendRequest({
      method: 'post',
      url: `${this.baseUrl}/api/admin/refresh/${refreshToken}`,
      headers: {
        ...platformDeps.buildHeaders({})
      }
    })
  }

  public needMFACode(credentials: Credentials) {
    return this.sendRequest({
      method: 'post',
      url: `${this.baseUrl}/api/admin/login/precheck`,
      headers: {
        ...platformDeps.buildHeaders({})
      },
      data: {
        ...credentials
      }
    })
  }

  public sendRequest(requestConfig: RequestConfig) {
    return this.responseHandler.handle(
      Axios({
        ...requestConfig
      })
    )
  }
}