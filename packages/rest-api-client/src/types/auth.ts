type AdminTokenAuth = {
  type: 'adminToken'
  adminToken: string
}

type ApiTokenAuth = {
  type: 'apiToken'
  apiToken: string | string[]
}

type PasswordAuth = {
  type: 'password'
  username: string
  password: string
}

type SessionAuth = {
  type: 'session'
}

type OAuthTokenAuth = {
  type: 'oAuthToken'
  oAuthToken: string
}

export type CustomizeAuth = {
  type: 'customizeAuth'
  authHeader: string
  getToken(): string
}

export type DiscriminatedAuth =
  | AdminTokenAuth
  | ApiTokenAuth
  | PasswordAuth
  | SessionAuth
  | OAuthTokenAuth
  | CustomizeAuth

export type BasicAuth = {
  username: string
  password: string
}

export const SESSION_TOKEN_KEY = '__REQUEST_TOKEN__'
