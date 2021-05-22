import { HaloAbortSearchError } from "../error/HaloAbortSearchError";
import { Response } from "../http/HttpClientInterface";
import { HaloResponseHandler } from "../HaloResponseHandler";

describe("HaloResponseHandler", () => {
  describe("handle", () => {
    it("should throw an error if HaloAbortSearchError is enabled and x-cybozu-warning is'Filter aborted because of too many search results'", async () => {
      const responseHandler = new HaloResponseHandler({
        enableAbortSearchError: true,
      });
      const response: Response = {
        data: { status: "success" },
        headers: {
          "x-cybozu-warning":
            "Filter aborted because of too many search results",
        },
      };
      let results = responseHandler.handle(Promise.resolve(response));
      await expect(results).rejects.toThrow(HaloAbortSearchError);
    });

    it("should not throw an error if enableAbortSearchError is disabled and x-cybozu-warning is'Filter aborted because of too many search results'", async () => {
      const responseHandler = new HaloResponseHandler({
        enableAbortSearchError: false,
      });
      const response: Response = {
        data: { status: "success" },
        headers: {
          "x-cybozu-warning":
            "Filter aborted because of too many search results",
        },
      };
      await expect(
        responseHandler.handle(Promise.resolve(response))
      ).resolves.toStrictEqual({ status: "success" });
    });
  });
});
