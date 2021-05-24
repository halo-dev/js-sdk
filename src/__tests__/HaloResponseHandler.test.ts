import { Response } from "../http/HttpClientInterface";
import { HaloResponseHandler } from "../HaloResponseHandler";

describe("HaloResponseHandler", () => {
  describe("handle", () => {
    it("should pass", async () => {
      const responseHandler = new HaloResponseHandler();
      const response: Response = {
        data: { status: "success" },
        headers: {
          "hello": "world",
        },
      };
      await expect(
        responseHandler.handle(Promise.resolve(response))
      ).resolves.toStrictEqual({ status: "success" });
    });
  });
});
