import { Credentials, TokenType, AccessToken } from './CredentialsInterface'

export class TokenProvider {
  private credentials: Credentials;
  private headerName: string

  constructor(credentials: Credentials, tokenType?: TokenType) {
    this.credentials = credentials
    this.headerName = this.buildTokenHeader(tokenType)
  }

  private buildTokenHeader(tokenType?: TokenType): string {
    if (!tokenType) {
      return 'Admin-Authorization'
    }
    switch (tokenType) {
      case 'admin': {
        return 'Admin-Authorization'
      }
      case 'api': {
        return 'API-Authorization'
      }
      default: {
        return tokenType
      }
    }
  }

}