import { AccessToken } from "./CredentialsInterface";
export interface TokenStorage {
  set(token: AccessToken): void;
  get(): Promise<AccessToken>;
  clear(): void;
}
