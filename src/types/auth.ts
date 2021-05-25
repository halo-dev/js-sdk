type AdminTokenAuth = {
  type: "adminToken";
  adminToken: string;
};

type ApiTokenAuth = {
  type: "apiToken";
  apiToken: string | string[];
};

type PasswordAuth = {
  type: "password";
  username: string;
  password: string;
};

type SessionAuth = {
  type: "session";
};

type OAuthTokenAuth = {
  type: "oAuthToken";
  oAuthToken: string;
};

type CustomizeAuth = {
  type: "customizeAuth",
  headerName: string,
  getToken(): string;
}

export type DiscriminatedAuth =
  | AdminTokenAuth
  | ApiTokenAuth
  | PasswordAuth
  | SessionAuth
  | OAuthTokenAuth
  | CustomizeAuth;

export type BasicAuth = {
  username: string;
  password: string;
};

export type HaloAuthHeader =
  | {
    "Admin-Authorization": string;
    Authorization?: string;
  }
  | {
    "API-Authorization": string;
    Authorization?: string;
  }
  | {
    "X-Requested-With": "XMLHttpRequest";
    Authorization?: string;
  }
  | {
    Authorization: string;
  };

export const SESSION_TOKEN_KEY = "__REQUEST_TOKEN__";