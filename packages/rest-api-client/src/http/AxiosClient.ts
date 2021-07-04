import Axios from "axios";
import {
  HttpClient,
  RequestConfigBuilder,
  RequestConfig,
  ResponseHandler,
} from "../types";
import FormData from "form-data";
import { logger } from "../logger";

export class AxiosClient implements HttpClient {
  private responseHandler: ResponseHandler;
  private requestConfigBuilder: RequestConfigBuilder;
  private retryCount = 0;

  constructor({
    responseHandler,
    requestConfigBuilder,
  }: {
    responseHandler: ResponseHandler;
    requestConfigBuilder: RequestConfigBuilder;
  }) {
    this.responseHandler = responseHandler;
    this.requestConfigBuilder = requestConfigBuilder;
  }

  public async get(path: string, params: any) {
    const requestConfig = await this.requestConfigBuilder.build(
      "get",
      path,
      params
    );
    return this.sendRequest(requestConfig);
  }

  public async getData(path: string, params: any) {
    const requestConfig = await this.requestConfigBuilder.build(
      "get",
      path,
      params,
      {
        responseType: "arraybuffer",
      }
    );
    return this.sendRequest(requestConfig);
  }

  public async post(path: string, params: any) {
    const requestConfig = await this.requestConfigBuilder.build(
      "post",
      path,
      params
    );
    return this.sendRequest(requestConfig);
  }

  public async postData(path: string, formData: FormData) {
    const requestConfig = await this.requestConfigBuilder.build(
      "post",
      path,
      formData
    );
    return this.sendRequest(requestConfig);
  }

  public async put(path: string, params: any) {
    const requestConfig = await this.requestConfigBuilder.build(
      "put",
      path,
      params
    );
    return this.sendRequest(requestConfig);
  }

  public async delete(path: string, params: any) {
    const requestConfig = await this.requestConfigBuilder.build(
      "delete",
      path,
      params
    );
    return this.sendRequest(requestConfig);
  }

  private async sendRequest(requestConfig: RequestConfig) {
    const tokenProvider = this.requestConfigBuilder.getTokenProvider();
    if (tokenProvider) {
      const token = await tokenProvider.getToken();
      Axios.interceptors.response.use(
        (config) => {
          return config;
        },
        async (error) => {
          const response = error.response;
          const status = response ? response.status : -1;
          logger.info("Server response status", status);

          const data = response ? response.data : null;
          if (/登录状态已失效，请重新登录/.test(data.message)) {
            // refresh token has expired
            tokenProvider.clearToken();
          } else if (data && data.status === 401 && this.retryCount < 3) {
            if (token) {
              this.retryCount++;
              tokenProvider.clearToken();
              const newAccessToken = await tokenProvider.getToken();
              response.config.headers[tokenProvider.getAuthHeader()] =
                newAccessToken.access_token;
              return Axios(response.config);
            }
          }
        }
      );
    }
    return this.responseHandler.handle(
      // eslint-disable-next-line new-cap
      Axios({
        ...requestConfig,

        // NOTE: For defining the max size of the http request content, `maxBodyLength` will be used after version 0.20.0.
        // `maxContentLength` will be still needed for defining the max size of the http response content.
        // ref: https://github.com/axios/axios/pull/2781/files
        // maxBodyLength: Infinity,

        maxContentLength: Infinity,
      })
    );
  }
}
