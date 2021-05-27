import { AdminApiClient, HaloRestAPIClient } from "../AdminApiClient";


describe("HaloRestAPIClient", () => {
  it("api client test", async () => {
    let haloRestApiClient = new HaloRestAPIClient({
      baseUrl: "http://127.0.0.1:8090",
      auth: {
        type: "customizeAuth",
        headerName: "Admin-Authentication",
        getToken() {
          return "admin-token-123"
        }
      }
    });
    const client = new AdminApiClient(haloRestApiClient);
    let result = await client.getEnvironment();
    console.log(result)
  })
});