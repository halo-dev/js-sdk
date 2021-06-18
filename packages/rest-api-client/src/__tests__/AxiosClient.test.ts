import { HaloRestAPIClient } from "../HaloRestAPIClient";
import { DefaultTokenProvider, FileTokenStore } from "../auth";
describe("Halo admin api test", () => {
  let client: any;
  let haloRestApiClient: HaloRestAPIClient;
  beforeEach(() => {
    haloRestApiClient = new HaloRestAPIClient({
      baseUrl: "http://127.0.0.1:8090",
    });
    client = haloRestApiClient.buildHttpClient();
  });
  it("test set token provider", async () => {
    const tokenStore = new FileTokenStore("/home/guqing/token.json");
    const tokenProvider = new DefaultTokenProvider(
      {
        username: "guqing",
        password: "12345678",
      },
      "http://127.0.0.1:8090",
      tokenStore
    );
    haloRestApiClient.setTokenProvider(tokenProvider);
    const res = await client.get("/api/admin/environments", {});
    console.log(res);
  });
});
