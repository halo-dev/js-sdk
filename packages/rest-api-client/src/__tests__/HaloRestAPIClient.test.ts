import { HaloRestAPIClient } from "../HaloRestAPIClient";
import { injectPlatformDeps } from "../platform";
import * as browserDeps from "../platform/browser";

describe("HaloRestAPIClient", () => {
  describe("constructor", () => {
    let originalHalo: any;
    let originalServer: any;
    beforeEach(() => {
      originalHalo = global.halo;
      originalServer = global.server;
      global.halo = {
        getRequestToken: () => "dummy request token",
      };
      global.server = {
        host: "example.com",
        protocol: "https:",
      };
    });
    afterEach(() => {
      global.halo = originalHalo;
      global.server = originalServer;
    });
    describe("Header", () => {
      it("should use a location object in browser environment if baseUrl param is not specified", async () => {
        injectPlatformDeps(browserDeps);
        const client = new HaloRestAPIClient();
        expect(client.getBaseUrl()).toBe("https://example.com");
      });

      it("should raise an error in Node.js environment if baseUrl param is not specified", () => {
        const USERNAME = "user";
        const PASSWORD = "password";
        const auth = {
          username: USERNAME,
          password: PASSWORD,
        };
        expect(() => new HaloRestAPIClient({ auth })).toThrow(
          "in Node.js environment, baseUrl is required"
        );
      });
    });
  });

  describe("version", () => {
    it("should provide this library version", () => {
      expect(HaloRestAPIClient.version).toBe(
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        require("../../package.json").version
      );
    });
  });
});
