import { TokenStore } from "../auth/TokenStore";
import { AccessToken } from "../auth/CredentialsInterface";

export class InMemeryTokenStore implements TokenStore {
  private accessToken?: AccessToken = undefined;

  set(token: AccessToken | undefined): void {
    this.accessToken = token;
  }

  get(): Promise<AccessToken | undefined> {
    return Promise.resolve(this.accessToken);
  }

  clear(): void {
    this.accessToken = undefined;
  }
}
