import { injectPlatformDeps } from "./platform/";
import * as nodeDeps from "./platform/node";
import FormData from "form-data";

injectPlatformDeps(nodeDeps);

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
  HttpClient,
  ResponseHandler,
} from "./types";

export { FormData };
