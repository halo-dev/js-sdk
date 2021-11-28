export interface Credentials {
  username: string
  password: string
  authcode?: string
}

export type TokenType = 'admin' | 'api'

export type AccessToken = {
  access_token: string
  expired_in: number
  refresh_token: string
  expired_at: number
}
