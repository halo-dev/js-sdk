import { HaloRestAPIClient } from '../HaloRestAPIClient'
import { TokenProvider, FileTokenStore } from '../auth'
describe("Halo admin api test", () => {
  let client: any
  beforeEach(() => {
    const tokenStore = new FileTokenStore("/home/guqing/token.json")
    const tokenProvider = new TokenProvider({
      username: "guqing",
      password: "12345678"
    }, "http://127.0.0.1:8090", tokenStore)
    const haloRestApiClient = new HaloRestAPIClient({
      baseUrl: "http://127.0.0.1:8090",
      tokenProvider
    });
    client = haloRestApiClient.buildHttpClient()
  })
  it("test real access", async () => {
    const res = await client.get('/api/admin/environments', {})
    console.log(res)
  })
})