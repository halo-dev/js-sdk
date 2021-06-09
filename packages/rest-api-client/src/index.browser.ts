import { injectPlatformDeps } from "./platform/";
import * as browserDeps from "./platform/browser";

injectPlatformDeps(browserDeps);

export { HaloRestAPIClient } from "./HaloRestAPIClient";
