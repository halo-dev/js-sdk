import { AdminApiClient, HaloRestAPIClient } from "../AdminApiClient";


describe("HaloRestAPIClient", () => {
  it("api client test", () => {
    let haloRestApiClient = new HaloRestAPIClient({
      baseUrl: "127.0.0.1:8090",
      auth: {
        type: "customizeAuth",
        headerName: "Admin-Authentication",
        getToken() {
          return "admin-token-123"
        }
      }
    });
    const client = new AdminApiClient(haloRestApiClient);
    let result = client.getEnvironment();
    result.then(res => {
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
  })
});