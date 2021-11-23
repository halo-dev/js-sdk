import { DefaultHttpClient } from "./http/";
import { ProxyConfig, TokenProvider } from "./types";
import { BasicAuth, DiscriminatedAuth, CustomizeAuth } from "./types/auth";
import { HaloRequestConfigBuilder } from "./HaloRequestConfigBuilder";
import { HaloResponseHandler } from "./HaloResponseHandler";
import { platformDeps } from "./platform/index";
import { Interceptors } from "./http/AxiosClient";

type OmitTypePropertyFromUnion<T> = T extends unknown ? Omit<T, "type"> : never;
type Auth = OmitTypePropertyFromUnion<DiscriminatedAuth>;

type Options = {
  baseUrl?: string;
  auth?: Auth;
  basicAuth?: BasicAuth;
  clientCertAuth?:
    | {
        pfx: Buffer;
        password: string;
      }
    | {
        pfxFilePath: string;
        password: string;
      };
  proxy?: ProxyConfig;
  userAgent?: string;
  tokenProvider?: TokenProvider;
};

const buildDiscriminatedAuth = (
  auth: Auth,
  tokenProvider?: TokenProvider
): DiscriminatedAuth | undefined => {
  if (tokenProvider) {
    return {
      type: "customizeAuth",
      authHeader: tokenProvider.getAuthHeader(),
      getToken() {
        return "";
      },
    };
  }
  if ("username" in auth) {
    return { type: "password", ...auth };
  }
  if ("apiToken" in auth) {
    return { type: "apiToken", ...auth };
  }
  if ("adminToken" in auth) {
    return { type: "adminToken", ...auth };
  }
  if ("oAuthToken" in auth) {
    return { type: "oAuthToken", ...auth };
  }
  if ("type" in auth && auth["type"] == "customizeAuth") {
    return auth as CustomizeAuth;
  }
  return undefined;
};

export class HaloRestAPIClient {
  private baseUrl?: string;
  tokenProvider?: TokenProvider;
  private httpClient: DefaultHttpClient;
  private requestConfigBuilder: HaloRequestConfigBuilder;
  private _interceptors: Interceptors;

  constructor(options: Options = {}) {
    this.baseUrl = platformDeps.buildBaseUrl(options.baseUrl);
    this.tokenProvider = options.tokenProvider;
    const auth = buildDiscriminatedAuth(
      options.auth ?? {},
      options.tokenProvider
    );
    const requestConfigBuilder = new HaloRequestConfigBuilder({
      ...options,
      baseUrl: this.baseUrl,
      auth,
    });
    this.requestConfigBuilder = requestConfigBuilder;
    const responseHandler = new HaloResponseHandler();
    this.httpClient = new DefaultHttpClient({
      responseHandler,
      requestConfigBuilder,
    });
    this._interceptors = this.httpClient.interceptors;
  }

  public static get version() {
    return platformDeps.getVersion();
  }

  public getBaseUrl() {
    return this.baseUrl;
  }

  public buildHttpClient() {
    return this.httpClient;
  }

  public getTokenProvider() {
    return this.tokenProvider;
  }

  public setTokenProvider(tokenProvider: TokenProvider) {
    this.tokenProvider = tokenProvider;
    this.requestConfigBuilder.setTokenProvider(tokenProvider);
  }

  public get interceptors() {
    return this._interceptors;
  }
}
