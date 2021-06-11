import { AdminApiClient } from "../AdminApiClient";
import { HaloRestAPIClient } from "@guching/rest-api-client";

describe("Halo admin api test", () => {
  let client: AdminApiClient;

  beforeEach(() => {
    const haloRestApiClient = new HaloRestAPIClient({
      baseUrl: "http://127.0.0.1:8090",
      auth: {
        type: "customizeAuth",
        authHeader: "Admin-Authorization",
        getToken() {
          return "b84681a66bd14865a0179367d3406b04"
        }
      }
    });
    client = new AdminApiClient(haloRestApiClient);
  })

  it("getEnvironment", async () => {
    const result = await client.getEnvironment();
    console.log(result)
  })

  it("getLogFile", async () => {
    const result = await client.getLogFile(10);
    expect(result).toStrictEqual({ status: 200, message: 'OK', devMessage: null, data: '' })
  })

  it("isInstalled", async () => {
    const result = await client.isInstalled();
    console.log(result)
  })

  it("listAttachments", async () => {
    const result = await client.listAttachments({
      page: 1,
      size: 20
    });
    console.log(result)
  })

  it("listAttachments", async () => {
    const result = await client.listMenusTreeView();
    console.log(result)
  })
});