export interface Credentials {
  username: string;
  password: string;
  authcode?: string;
}

export type TokenType = "admin" | "api";

export type AccessToken = {
  access_token: string;
  expired_in: number;
  refresh_token: string;
  expired_at: number;
};

export interface TokenProvider {
  getToken(): Promise<AccessToken>;
  clearToken(): void;
  getAuthHeader(): string;
}

export interface TokenStore {
  set(token: AccessToken | undefined): void;
  get(): Promise<AccessToken | undefined>;
  clear(): void;
}
