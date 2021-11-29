// import { getRequestToken } from "../browser";
//
// describe("getRequestToken()", () => {
//   let originalHalo: any;
//   beforeEach(() => {
//     originalHalo = global.halo;
//   });
//   afterEach(() => {
//     global.halo = originalHalo;
//   });
//   it("should get a request token in halo", async () => {
//     const TOKEN = "dummy request token from halo";
//     global.halo = {
//       getRequestToken: () => TOKEN,
//     };
//     const requestToken = await getRequestToken();
//     expect(requestToken).toBe(TOKEN);
//   });
//   it("should throw an error in other service", async () => {
//     await expect(getRequestToken()).rejects.toThrow(
//       "session authentication must specify a request token"
//     );
//   });
// });
