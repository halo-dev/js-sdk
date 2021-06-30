import { injectPlatformDeps } from "./platform/";
import * as nodeDeps from "./platform/node";

injectPlatformDeps(nodeDeps);

export * from "./logger/debug";
export * from "./logger/index";
