import { HttpAuthenticator } from "../auth/HttpAuthenticator";

describe("HttpAuthenticator", () => {
  describe("constructor", () => {
    let httpAuthenticator: HttpAuthenticator;
    beforeEach(() => {
      httpAuthenticator = new HttpAuthenticator("http://localhost:8090");
      httpAuthenticator.interceptors.use((credentials) => {
        credentials.authcode = "auth code 12345678";
        return credentials;
      });
    });
    it("doAuthenticate", async () => {
      // const res = await httpAuthenticator.authenticate({
      //   username: "guqing",
      //   password: "12345678",
      // });
      console.log(httpAuthenticator);
    });
  });
});
