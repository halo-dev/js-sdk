import { Credentials, TokenType } from "./CredentialsInterface";
import { HttpAuthenticator } from "./HttpAuthenticator";
import { TokenStore } from "./TokenStore";

export class TokenProvider {
  private credentials: Credentials;
  private headerName: string;
  private httpAuthenticator: HttpAuthenticator;
  private tokenStore: TokenStore;

  constructor(
    credentials: Credentials,
    baseUrl: string,
    tokenStarage: TokenStore,
    tokenType?: TokenType
  ) {
    this.credentials = credentials;
    this.tokenStore = tokenStarage;
    this.headerName = this.buildTokenHeader(tokenType);
    this.httpAuthenticator = new HttpAuthenticator(baseUrl);
  }

  public async getToken() {
    let storagedToken = await this.tokenStore.get();
    if (!storagedToken || Object.keys(storagedToken).length < 1) {
      console.info("Token does not exist, ready to re-acquire.");
      const response = await this.httpAuthenticator.authenticate(
        this.credentials
      );
      const token = response.data;
      const expireTime = Date.now() + 1000 * token.expired_in;
      token.expired_at = expireTime;
      console.info("Get a new token and ready to store.");
      this.tokenStore.set(token);
      storagedToken = token;
    }

    if (Date.now() > storagedToken.expired_at) {
      console.info(`Token has expired at ${storagedToken.expired_at}, ready to refresh token.`);
      // token过期
      const refreshedToken = await this.httpAuthenticator.refreshToken(
        storagedToken.refresh_token
      );
      this.tokenStore.set(refreshedToken.data);
      storagedToken = refreshedToken.data;
    }
    return storagedToken
  }

  public clearToken(): void {
    this.tokenStore.clear()
  }

  public getAuthHeader(): string {
    return this.headerName
  }

  private buildTokenHeader(tokenType?: TokenType): string {
    if (!tokenType) {
      return "Admin-Authorization";
    }
    switch (tokenType) {
      case "admin": {
        return "Admin-Authorization";
      }
      case "api": {
        return "API-Authorization";
      }
      default: {
        return tokenType;
      }
    }
  }
}
