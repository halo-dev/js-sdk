import { AdminClient } from "../AdminClient";
import { HaloRestAPIClient } from "../../HaloRestAPIClient";
describe("AdminClient", () => {
  console.log("world");
});

describe("Admin client real environment test", () => {
  let adminClient: AdminClient;
  let haloRestApiClient: HaloRestAPIClient;
  beforeEach(() => {
    haloRestApiClient = new HaloRestAPIClient({
      baseUrl: "http://127.0.0.1:8090",
      auth: { type: "adminToken", adminToken: "d3372d58cdd045ef99bd92ec593dec54" },
    });
    adminClient = haloRestApiClient.adminClient;
  });
  describe("getEnvironment", () => {
    it("should pass the path to the http client", async () => {
      let data = await adminClient.getEnvironment();
      console.log(data);
    });
  });
});
