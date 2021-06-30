import { injectPlatformDeps } from "./platform/";
import * as browserDeps from "./platform/browser";

injectPlatformDeps(browserDeps);

export * from "./logger/debug";
export * from "./logger/index";
