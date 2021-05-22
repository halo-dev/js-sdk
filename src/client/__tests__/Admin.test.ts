import { MockClient, buildMockClient } from "../../http/MockClient";
import { HaloRequestConfigBuilder } from "../../HaloRequestConfigBuilder";
import { AdminClient } from "../AdminClient";

describe("AdminClient", () => {
  let mockClient: MockClient;
  let adminClient: AdminClient;
  beforeEach(() => {
    const requestConfigBuilder = new HaloRequestConfigBuilder({
      baseUrl: "https://example.halo.run",
      auth: { type: "adminToken", adminToken: "foo" },
    });
    mockClient = buildMockClient(requestConfigBuilder);
    adminClient = new AdminClient(mockClient);
  });
  describe("getEnvironment", () => {
    beforeEach(async () => {
      await adminClient.getEnvironment();
    });
    it("should pass the path to the http client", () => {
      console.log(mockClient.getLogs());
      console.log(adminClient);
    });
  });
});
