import { AccessToken } from "./CredentialsInterface";
export interface TokenStore {
  set(token: AccessToken | undefined): void
  get(): Promise<AccessToken | undefined>
  clear(): void
}
