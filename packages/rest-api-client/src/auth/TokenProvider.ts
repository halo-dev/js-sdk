import { AccessToken, Credentials, TokenType } from "./CredentialsInterface";
import { HttpAuthenticator } from "./HttpAuthenticator";
import { TokenStorage } from "./TokenStorage";
export class TokenProvider {
  private credentials: Credentials;
  private headerName: string;
  private httpAuthenticator: HttpAuthenticator;
  private tokenStarage: TokenStorage;

  constructor(
    credentials: Credentials,
    baseUrl: string,
    tokenStarage: TokenStorage,
    tokenType?: TokenType
  ) {
    this.credentials = credentials;
    this.tokenStarage = tokenStarage;
    this.headerName = this.buildTokenHeader(tokenType);
    this.httpAuthenticator = new HttpAuthenticator(baseUrl);
  }

  public async getToken() {
    const tokenString = await this.tokenStarage.get();
    let storagedToken: AccessToken;
    if (!tokenString) {
      console.log("token 不存在:", tokenString);
      const response = await this.httpAuthenticator.authenticate(
        this.credentials
      );
      let token = response.data;
      console.log(1000 * token.expired_in);
      const expireTime = Date.now() + 1000 * token.expired_in;
      token.expired_in = expireTime;
      console.log(token);
      this.tokenStarage.set(token);
      storagedToken = token;
    } else {
      storagedToken = JSON.parse(tokenString.toString());
    }
    if (Date.now() > storagedToken.expired_in) {
      console.log("刷新token:", storagedToken.expired_in, Date.now());
      // token过期
      let refreshedToken = await this.httpAuthenticator.refreshToken(
        storagedToken.refresh_token
      );
      this.tokenStarage.set(refreshedToken.data);
      storagedToken = refreshedToken.data;
    }
    return {
      [this.headerName]: storagedToken.access_token,
    };
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
