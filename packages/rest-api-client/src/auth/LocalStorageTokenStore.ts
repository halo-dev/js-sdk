import { AccessToken, TokenStore } from "../types";
import store from "store";

export class LocalStorageTokenStore implements TokenStore {
  private tokenKey: string;

  constructor(tokenKey: string = "ACCESS_TOKEN") {
    this.tokenKey = tokenKey;
  }

  set(token: AccessToken): void {
    store.set(this.tokenKey, token);
  }

  get(): Promise<AccessToken> {
    return Promise.resolve(store.get(this.tokenKey));
  }

  clear(): void {
    store.remove(this.tokenKey);
  }
}
