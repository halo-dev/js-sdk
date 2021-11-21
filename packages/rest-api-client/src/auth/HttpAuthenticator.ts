import Axios from "axios";
import {
  AccessToken,
  Credentials,
  HttpResponse,
  RequestConfig,
} from "../types";
import { HaloResponseHandler } from "../HaloResponseHandler";
import { platformDeps } from "../platform/";
import InterceptorManager from "./InterceptorManager";
import { RejectedFn, ResolvedFn } from "../types/auth";

interface PromiseChain<T> {
  resolved: ResolvedFn<T> | ((credentials: Credentials) => Credentials);
  rejected?: RejectedFn;
}

export class HttpAuthenticator {
  private baseUrl: string;
  private responseHandler: HaloResponseHandler;
  interceptors: InterceptorManager<Credentials>;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
    this.responseHandler = new HaloResponseHandler();
    this.interceptors = new InterceptorManager<Credentials>();
  }

  public async authenticate(
    credentials: Credentials
  ): Promise<HttpResponse<AccessToken>> {
    const chain: PromiseChain<any>[] = [];
    this.interceptors.forEach((interceptor) => chain.unshift(interceptor));
    let credentialsParamPromise = Promise.resolve(credentials);
    while (chain.length) {
      const { resolved, rejected } = chain.shift()!;
      credentialsParamPromise = credentialsParamPromise.then(
        resolved,
        rejected
      );
    }
    credentials = await credentialsParamPromise;
    return this.sendRequest({
      method: "post",
      url: `${this.baseUrl}/api/admin/login`,
      headers: {
        ...platformDeps.buildHeaders({}),
      },
      data: {
        ...credentials,
      },
    });
  }

  public refreshToken(
    refreshToken: string
  ): Promise<HttpResponse<AccessToken>> {
    return this.sendRequest({
      method: "post",
      url: `${this.baseUrl}/api/admin/refresh/${refreshToken}`,
      headers: {
        ...platformDeps.buildHeaders({}),
      },
    });
  }

  public needMFACode(credentials: Credentials) {
    return this.sendRequest({
      method: "post",
      url: `${this.baseUrl}/api/admin/login/precheck`,
      headers: {
        ...platformDeps.buildHeaders({}),
      },
      data: {
        ...credentials,
      },
    });
  }

  public sendRequest(requestConfig: RequestConfig) {
    return this.responseHandler.handle(
      Axios({
        ...requestConfig,
      })
    );
  }
}
