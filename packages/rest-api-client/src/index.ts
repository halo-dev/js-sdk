import { injectPlatformDeps } from "./platform/";
import * as nodeDeps from "./platform/node";
import FormData from "form-data";

injectPlatformDeps(nodeDeps);

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
