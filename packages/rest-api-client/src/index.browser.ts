import { injectPlatformDeps } from "./platform/";
import * as browserDeps from "./platform/browser";
import FormData from 'form-data';

injectPlatformDeps(browserDeps);

export { HaloRestAPIClient } from "./HaloRestAPIClient";
export { HttpClient } from "./http/HttpClientInterface";
export * from "./auth";
export * from "./types/auth";
export { FormData };