import { injectPlatformDeps } from "./platform/";
import * as nodeDeps from "./platform/node";
import FormData from 'form-data';

injectPlatformDeps(nodeDeps);

export { HaloRestAPIClient } from "./HaloRestAPIClient";
export { HttpClient } from "./http/HttpClientInterface";
export * from './auth'
export { FormData }