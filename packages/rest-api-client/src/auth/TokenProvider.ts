import { Credentials, TokenType, TokenProvider, TokenStore } from "../types";
import { RejectedFn, ResolvedFn } from "../types/auth";
import { HttpAuthenticator } from "./HttpAuthenticator";
import { InMemeryTokenStore } from "./InMemeryTokenStore";
import logger from "../logger";

export class DefaultTokenProvider implements TokenProvider {
  private credentials: Credentials;
  private headerName: string;
  private tokenStore: TokenStore;
  httpAuthenticator: HttpAuthenticator;

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
      this.httpAuthenticator
        .refreshToken(storagedToken.refresh_token)
        .then((res) => {
          this.tokenStore.set(res.data);
          storagedToken = res.data;
        })
        .catch((err) => {
          if (/登录状态已失效，请重新登录/.test(err.message)) {
            console.warn("Refresh token failed.", err.message);
            storagedToken = undefined;
          } else {
            throw err;
          }
        });
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

  public useAuthenticateRequestInterceptor(
    resolved: ResolvedFn<Credentials>,
    rejected?: RejectedFn
  ): number {
    return this.httpAuthenticator.interceptors.use(resolved, rejected);
  }
}
