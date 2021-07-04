import { Credentials, TokenType, TokenProvider, TokenStore } from "../types";
import { HttpAuthenticator } from "./HttpAuthenticator";
import { InMemeryTokenStore } from "./InMemeryTokenStore";
import { logger } from "../logger";

export class DefaultTokenProvider implements TokenProvider {
  private credentials: Credentials;
  private headerName: string;
  private httpAuthenticator: HttpAuthenticator;
  private tokenStore: TokenStore;

  constructor(
    credentials: Credentials,
    baseUrl: string,
    tokenStore?: TokenStore,
    tokenType?: TokenType
  ) {
    this.credentials = credentials;
    if (tokenStore) {
      this.tokenStore = tokenStore;
    } else {
      this.tokenStore = new InMemeryTokenStore();
    }
    this.headerName = this.buildTokenHeader(tokenType);
    this.httpAuthenticator = new HttpAuthenticator(baseUrl);
  }

  public async getToken() {
    let storagedToken = await this.tokenStore.get();
    if (!storagedToken || Object.keys(storagedToken).length < 1) {
      logger.info("Token does not exist, ready to re-acquire.");
      const response = await this.httpAuthenticator.authenticate(
        this.credentials
      );
      const token = response.data;
      const expireTime = Date.now() + 1000 * token.expired_in;
      token.expired_at = expireTime;
      logger.info("Get a new token and ready to store.");
      this.tokenStore.set(token);
      storagedToken = token;
    }

    if (Date.now() > storagedToken.expired_at) {
      logger.warning(
        `Token has expired at ${storagedToken.expired_at}, ready to refresh token.`
      );
      // token过期
      const refreshedToken = await this.httpAuthenticator.refreshToken(
        storagedToken.refresh_token
      );
      this.tokenStore.set(refreshedToken.data);
      storagedToken = refreshedToken.data;
    }
    return storagedToken;
  }

  public clearToken(): void {
    this.tokenStore.clear();
  }

  public getAuthHeader(): string {
    return this.headerName;
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
