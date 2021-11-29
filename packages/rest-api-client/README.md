<h3 align="center">Halo Rest API Client</h3>

<p align="center">
  <a href="https://www.npmjs.com/package/@halo-dev/rest-api-client">
    <img src="https://img.shields.io/npm/v/@halo-dev/rest-api-client.svg" alt="npm version"/>
  </a>
  <a href="https://www.npmjs.com/package/@halo-dev/rest-api-client">
      <img alt="npm" src="https://img.shields.io/npm/dm/@halo-dev/rest-api-client" alt="Downloads"/>
  </a>
  <a href="https://github.com/halo-dev/js-sdk/blob/master/packages/rest-api-client/package.json">
      <img alt="node-current" src="https://img.shields.io/node/v/@halo-dev/rest-api-client?color=blue">
  </a>
  <a href="https://github.com/halo-dev/js-sdk/blob/master/LICENSE">
    <img alt="NPM" src="https://img.shields.io/npm/l/@halo-dev/rest-api-client" alt="LICENSE">
  </a>
</p>

<p align="center">HTTP Client for Halo RESTful API. </p>

## Installation

```shell
npm install @halo-dev/rest-api-client
```

use `require` or `import` to import the library.

```javascript
// CommonJS
const { HaloRestAPIClient } = require('@halo-dev/rest-api-client')

// ES modules
import { HaloRestAPIClient } from '@halo-dev/rest-api-client'
```

## Usage

```javascript
const client = new HaloRestAPIClient({
  baseUrl: 'https://example.halo.run',
})
```

The `auth` parameter supports the following ways:

1. Use API token authentication

```javascript
auth: {
  apiToken: process.env.HALO_API_TOKEN
}
```

2. Use Admin token authentication

```javascript
auth: {
  adminToken: process.env.HALO_ADMIN_TOKEN
}
```

3. Use custom header auth

```javascript
auth: {
  type: "customizeAuth",
    authHeader
:
  "Admin-Authorization",
    getToken()
  {
    return localStorage.getItem("Access_Token")
  }
}
```

4. Use OAuth token authentication

```javascript
auth: {
  oAuthToken: process.env.HALO_OAUTH_TOKEN
}
```

**Basic Auth**

```javascript
const client = new HaloRestAPIClient({
  baseUrl: 'https://example.halo.run',
  // Use basic authentication
  basicAuth: { username: 'user', password: 'password' },
})
```

In addition to this, it also supports automatic authentication of Token Provider:

```javascript
import {
  HaloRestAPIClient,
  LocalStorageTokenStore,
  // FileTokenStore,
  // TokenStore,
  DefaultTokenProvider,
} from '@halo-dev/rest-clint-api'

// Use LocalStorageTokenStore to persistence AccessToken to localStorage(in browser only)
// you can use FileTokenStore if in the Node environment.
// If there is no suitable Token store implemention, you can implement your own token storage strategy through the TokenStore interface.
const localStorageTokenStore = new LocalStorageTokenStore()

// halo api base url.
const baseUrl = process.env.VUE_APP_BASE_URL

const haloRestApiClient = new HaloRestAPIClient({
  baseUrl: baseUrl,
})

const buildTokenProvider = (credentials) => {
  return new DefaultTokenProvider(
    {
      ...credentials,
    },
    baseUrl,
    localStorageTokenStore,
  )
}

const tokenProvider = buildTokenProvider({
  username: 'your halo username',
  password: 'your password',
})
haloRestApiClient.setTokenProvider(tokenProvider)
// now you can use haloRestApiClient to build your api client
```

## Http Request

```javascript
const haloRestApiClient = new HaloRestAPIClient({
  baseUrl: 'https://example.halo.run',
  basicAuth: { username: 'user', password: 'password' },
})
// build http client to perform http request
const client = haloRestApiClient.buildHttpClient()

// api parameters
const parameters = {}
// http get
client.get('https://example.halo.run', parameters)
// http post
client.post('https://example.halo.run', parameters)
```

### License

[MIT license](../../LICENSE)
