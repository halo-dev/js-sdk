import module from "module";

const require = module.createRequire(import.meta.url);

export const {
  HaloRestAPIClient,
  HaloRestAPIError,
  // eslint-disable-next-line @typescript-eslint/no-var-requires
} = require(".");
