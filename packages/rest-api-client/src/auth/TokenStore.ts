import { AccessToken } from "./CredentialsInterface";
export interface TokenStore {
  set(token: AccessToken): void
  get(): Promise<AccessToken>
  clear(): void
}
