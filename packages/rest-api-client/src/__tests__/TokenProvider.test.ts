import { TokenProvider } from "../auth/TokenProvider";
import { FileTokenStore } from "../auth/FileTokenStore";
describe("TokenProvider", () => {
  describe("constructor", () => {
    let tokenProvider: TokenProvider;
    beforeEach(() => {
      const tokenStore = new FileTokenStore("/Users/guqing/token.json");
      tokenProvider = new TokenProvider(
        {
          username: "guqing",
          password: "12345678",
        },
        "http://localhost:8090",
        tokenStore
      );
    });

    it("doAuthenticate", async () => {
      await tokenProvider.getToken();
      //console.log(res);
    });
  });
});
