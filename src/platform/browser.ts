import { UnsupportedPlatformError } from "./UnsupportedPlatformError";
import { DiscriminatedAuth } from "../types/auth";

export const readFileFromPath = () => {
  throw new UnsupportedPlatformError("Browser");
};

export const getRequestToken = async () => {
  if (
    typeof halo === "object" &&
    halo !== null &&
    typeof halo.getRequestToken === "function"
  ) {
    return halo.getRequestToken();
  }
  throw new Error("session authentication must specify a request token");
};

export const getDefaultAuth = (): DiscriminatedAuth => {
  return {
    type: "session",
  };
};

export const buildPlatformDependentConfig = () => {
  return {};
};

export const buildHeaders = () => {
  return {};
};

export const buildFormDataValue = (data: any) => {
  return new Blob([data]);
};

export const buildBaseUrl = (baseUrl?: string) => {
  // We assume that location always exists in a browser environment
  const { host, protocol } = global.server!;
  return baseUrl ?? `${protocol}//${host}`;
};

export const getVersion = () => {
  return PACKAGE_VERSION;
};
