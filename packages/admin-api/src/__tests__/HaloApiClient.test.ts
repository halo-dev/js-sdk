import { AdminApiClient } from "../AdminApiClient";
import { HaloRestAPIClient } from "@guching/rest-api-client";
import Axios from 'axios'

describe("Halo admin api test", () => {
  let client: AdminApiClient;

  beforeEach(() => {
    const haloRestApiClient = new HaloRestAPIClient({
      baseUrl: "http://127.0.0.1:8090",
      auth: {
        type: "customizeAuth",
        authHeader: "Admin-Authorization",
        getToken() {
          return "5b868ef2645c4629854699bfa35dde13"
        }
      }
    });
    client = new AdminApiClient(haloRestApiClient);
  })

  // it("getEnvironment", async () => {
  //   const result = await client.getEnvironment();
  //   console.log(result)
  // })

  // it("getLogFile", async () => {
  //   const result = await client.getLogFile(10);
  //   expect(result).toStrictEqual({ status: 200, message: 'OK', devMessage: null, data: '' })
  // })

  // it("isInstalled", async () => {
  //   const result = await client.isInstalled();
  //   console.log(result)
  // })
  it("test axios interceptor", async () => {
    Axios.interceptors.request.use(config => {
      console.log('请求拦截器-1')
      return config
    })
    Axios.interceptors.request.use(config => {
      console.log('请求拦截器-2')
      return config
    })
    await client.isInstalled();
  })
});