import { injectPlatformDeps } from "./platform/";
import * as nodeDeps from "./platform/node";
import FormData from "form-data";
import { HaloResponseHandler } from "./HaloResponseHandler";
import { HaloRequestConfigBuilder } from "./HaloRequestConfigBuilder";
import { DefaultHttpClient } from "./http";

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

export {
  FormData,
  HaloResponseHandler,
  HaloRequestConfigBuilder,
  DefaultHttpClient,
};
