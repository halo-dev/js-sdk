import { injectPlatformDeps } from "./platform/";
import * as browserDeps from "./platform/browser";
import FormData from "form-data";

injectPlatformDeps(browserDeps);

export { HaloRestAPIClient } from "./HaloRestAPIClient";

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
