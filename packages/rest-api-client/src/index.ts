import { injectPlatformDeps } from "./platform/";
import * as nodeDeps from "./platform/node";

injectPlatformDeps(nodeDeps);

export { HaloRestAPIClient } from "./HaloRestAPIClient";
export { HttpClient } from "./http/HttpClientInterface";