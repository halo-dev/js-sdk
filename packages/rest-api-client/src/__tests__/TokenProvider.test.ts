import { TokenProvider, DefaultTokenProvider } from "../auth/TokenProvider";
import { FileTokenStore } from "../auth/FileTokenStore";
describe("TokenProvider", () => {
  describe("constructor", () => {
    let tokenProvider: TokenProvider;
    beforeEach(() => {
      const tokenStore = new FileTokenStore("/home/guqing/token.json");
      tokenProvider = new DefaultTokenProvider(
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
