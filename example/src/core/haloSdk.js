import {
  AdminApiClient,
  HaloRestAPIClient,
  LocalStorageTokenStore,
  DefaultTokenProvider
} from "@halo-dev/admin-api";

import encryptUtil from "../utils/encrypt";

const baseUrl = process.env.VUE_APP_BASE_URL;

const buildTokenProvider = credentials => {
  return new DefaultTokenProvider(
    {
      ...credentials
    },
    baseUrl,
    new LocalStorageTokenStore()
  );
};

const haloRestApiClient = new HaloRestAPIClient({
  baseUrl: baseUrl,
  tokenProvider: (function tokenProvider() {
    const credentials = localStorage.getItem("UserCredentials");
    const userCredentials = encryptUtil.decrypt(credentials);
    if (userCredentials) {
      return buildTokenProvider(userCredentials);
    }
    return null;
  })()
});

const haloAdminClient = new AdminApiClient(haloRestApiClient);

export const doAuthorize = credentials => {
  const encodedCredentials = encryptUtil.encrypt({ ...credentials });

  localStorage.setItem("UserCredentials", encodedCredentials);
  const tokenProvider = buildTokenProvider(credentials);
  haloRestApiClient.setTokenProvider(tokenProvider);
  return tokenProvider.getToken();
};

const tokenProvider = haloRestApiClient.getTokenProvider();
if (tokenProvider) {
  haloRestApiClient
    .getTokenProvider()
    .useAuthenticateRequestInterceptor(credentials => {
      console.log(credentials);
      return credentials;
    });
}

export { haloRestApiClient, haloAdminClient };
