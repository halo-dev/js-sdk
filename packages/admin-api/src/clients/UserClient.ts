import { HttpClient } from "@guching/rest-api-client";
import { buildPath } from "../url";
import { MultiFactorAuthParam, Response, User } from "../types";

export class UserClient {
  private client: HttpClient;

  constructor(client: HttpClient) {
    this.client = client;
  }

  public getProfile(): Promise<Response<User>> {
    const path = buildPath({
      endpointName: "users/profiles",
    });
    return this.client.get(path, {});
  }

  public updatePassword(params: {
    oldPassword: string;
    newPassword: string;
  }): Promise<Response<String>> {
    const path = buildPath({
      endpointName: "users/profiles/password",
    });
    return this.client.put(path, { ...params });
  }

  public generateMFAQrImage(params: MultiFactorAuthParam) {
    const path = buildPath({
      endpointName: "users/mfa/generate",
    });
    return this.client.put(path, { ...params });
  }

  public updateMFAuth(params: MultiFactorAuthParam) {
    const path = buildPath({
      endpointName: "users/mfa/update",
    });
    return this.client.put(path, { ...params });
  }
}
