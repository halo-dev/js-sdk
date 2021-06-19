import { AdminApiClient, HaloRestAPIClient } from "@guching/admin-api";
import {
  LocalStorageTokenStore,
  DefaultTokenProvider
} from "@guching/rest-api-client";
import encryptUtil from "../utils/encrypt";

const userCredentials = encryptUtil.decrypt(
  localStorage.getItem("UserCredentials")
);

const localStorageTokenStore = new LocalStorageTokenStore();

const baseUrl = process.env.VUE_APP_BASE_URL;

const haloRestApiClient = new HaloRestAPIClient({
  baseUrl: baseUrl
});

const buildTokenProvider = credentials => {
  return new DefaultTokenProvider(
    {
      ...credentials
    },
    baseUrl,
    localStorageTokenStore
  );
};

if (userCredentials) {
  const tokenProvider = buildTokenProvider(userCredentials);
  haloRestApiClient.setTokenProvider(tokenProvider);
}

const haloAdminClient = new AdminApiClient(haloRestApiClient);

export const doAuthorize = credentials => {
  const encodedCredentials = encryptUtil.encrypt({ ...credentials });

  localStorage.setItem("UserCredentials", encodedCredentials);
  const tokenProvider = buildTokenProvider(credentials);
  haloRestApiClient.setTokenProvider(tokenProvider);
  return tokenProvider.getToken();
};

export { haloRestApiClient, haloAdminClient, localStorageTokenStore };
