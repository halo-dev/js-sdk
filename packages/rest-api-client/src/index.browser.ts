import { injectPlatformDeps } from "./platform/";
import * as browserDeps from "./platform/browser";
import FormData from "form-data";

injectPlatformDeps(browserDeps);

export { HaloRestAPIClient } from "./HaloRestAPIClient";
export { HaloResponseHandler } from "./HaloResponseHandler";
export { HaloRequestConfigBuilder } from "./HaloRequestConfigBuilder";
export { DefaultHttpClient } from "./http";

export {
  CustomizeAuth,
  DiscriminatedAuth,
  BasicAuth,
  AccessToken,
  TokenType,
  Credentials,
  TokenProvider,
  TokenStore,
  HttpClient,
  ResponseHandler,
} from "./types";

export {
  FileTokenStore,
  LocalStorageTokenStore,
  DefaultTokenProvider,
} from "./auth";

export { FormData };
