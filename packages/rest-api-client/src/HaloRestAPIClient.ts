import { DefaultHttpClient } from "./http/";
import { ProxyConfig } from "./http/HttpClientInterface";
import { BasicAuth, DiscriminatedAuth, CustomizeAuth } from "./types/auth";
import { HaloRequestConfigBuilder } from "./HaloRequestConfigBuilder";
import { HaloResponseHandler } from "./HaloResponseHandler";
import { platformDeps } from "./platform/index";
import { UnsupportedPlatformError } from "./platform/UnsupportedPlatformError";

type OmitTypePropertyFromUnion<T> = T extends unknown ? Omit<T, "type"> : never;
type Auth = OmitTypePropertyFromUnion<DiscriminatedAuth>;

type Options = {
  baseUrl?: string;
  auth?: Auth;
  guestSpaceId?: number | string;
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
  featureFlags?: {
    enableAbortSearchError: boolean;
  };
  userAgent?: string;
};

const buildDiscriminatedAuth = (auth: Auth): DiscriminatedAuth => {
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
    return auth as CustomizeAuth
  }
  try {
    return platformDeps.getDefaultAuth();
  } catch (e) {
    if (e instanceof UnsupportedPlatformError) {
      throw new Error(
        `session authentication is not supported in ${e.platform} environment.`
      );
    }
    throw e;
  }
};

export class HaloRestAPIClient {
  private baseUrl?: string;
  private httpClient: DefaultHttpClient;

  constructor(options: Options = {}) {
    this.baseUrl = platformDeps.buildBaseUrl(options.baseUrl);

    const auth = buildDiscriminatedAuth(options.auth ?? {});
    const requestConfigBuilder = new HaloRequestConfigBuilder({
      ...options,
      baseUrl: this.baseUrl,
      auth,
    });
    const responseHandler = new HaloResponseHandler();
    this.httpClient = new DefaultHttpClient({
      responseHandler,
      requestConfigBuilder,
    });
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
}
