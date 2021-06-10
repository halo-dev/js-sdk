import { TokenProvider } from "../auth/TokenProvider";
import { TokenStorage } from "../auth/TokenStorage";
import { AccessToken } from "../auth/CredentialsInterface";
var fs = require("fs");
describe("TokenProvider", () => {
  describe("constructor", () => {
    let tokenProvider: TokenProvider;
    beforeEach(() => {
      const tokenStorage = new FileTokenStorage();
      tokenProvider = new TokenProvider(
        {
          username: "guqing",
          password: "12345678",
        },
        "http://localhost:8090",
        tokenStorage
      );
    });

    it("doAuthenticate", async () => {
      const res = await tokenProvider.getToken();
      console.log(res);
    });
  });
});
class FileTokenStorage implements TokenStorage {
  set(token: AccessToken): void {
    fs.writeFile(
      "/Users/guqing/token.json",
      JSON.stringify(token),
      (err: any) => {
        if (err) {
          throw new Error("Write token failure.");
        }
      }
    );
  }
  async get(): Promise<AccessToken> {
    return fs.readFile("/Users/guqing/token.json", (err: any, res: any) => {
      console.log("read file err:", err);
      return res.toString();
    });
  }
  clear(): void {
    throw new Error("Method not implemented.");
  }
}
