import {
  ErrorResponse,
  HttpClientError,
  Response,
  ResponseHandler,
} from "./http/HttpClientInterface";
import { HaloRestAPIError, HaloErrorResponse } from "./error/HaloRestAPIError";

export class HaloResponseHandler implements ResponseHandler {
  constructor() { }

  handle<T>(response: Promise<Response<T>>): Promise<T> {
    return response.then(
      (res) => this.handleSuccessResponse<T>(res),
      (error) => this.handleErrorResponse(error)
    );
  }
  private handleSuccessResponse<T>(response: Response<T>): T {
    return response.data;
  }
  private handleErrorResponse(
    error: HttpClientError<ErrorResponse<string> | HaloErrorResponse>
  ): never {
    if (!error.response) {
      // FIXME: find a better way to handle this error
      if (/MAC address verify failure/.test(error.toString())) {
        throw new Error("invalid clientCertAuth setting");
      }
      throw error;
    }
    const errorResponse = error.response;

    const { data, ...rest } = errorResponse;
    if (typeof data === "string") {
      throw new Error(`${rest.status}: ${rest.statusText}`);
    }
    throw new HaloRestAPIError({ data, ...rest });
  }
}
