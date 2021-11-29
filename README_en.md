<p align="center">
    <a href="https://halo.run" target="_blank" rel="noopener noreferrer">
        <img width="100" src="https://halo.run/logo" alt="Halo logo" />
    </a>
</p>

<h3 align="center">Halo SDK</h3>

<p align="center">
  <a href="https://github.com/halo-dev/js-sdk/actions">
    <img src="https://github.com/halo-dev/js-sdk/actions/workflows/node.js.yml/badge.svg" alt="Project Build"/>
  </a>
  <a href="https://www.npmjs.com/package/@halo-dev/admin-api">
      <img alt="npm" src="https://img.shields.io/npm/dm/@halo-dev/admin-api?label=admin%20downloads" alt="Admin Api Downloads"/>
  </a>
  <a href="https://www.npmjs.com/package/@halo-dev/content-api">
      <img alt="npm" src="https://img.shields.io/npm/dm/@halo-dev/content-api?label=content%20downloads&color=blue" alt="Content Api Downloads"/>
  </a>
  <a href="https://www.npmjs.com/package/@halo-dev/admin-api">
    <img src="https://img.shields.io/npm/v/@halo-dev/admin-api.svg" alt="npm version"/>
  </a>
</p>

<p align="center">A collection of tools for interacting with Halo's APIs.</p>

[简体中文](./README.md)

## Feature

- Encapsulated authentication to simplify development.
- Exception handling
- More convenient to request halo rest api.
- Written using TypeScript, declared api parameter and response types.

## SDK for Admin API

### Installation

Install this library using npm as follows

```shell
npm install @halo-dev/admin-api --save
```

### Usage

Here is a simple code for obtaining a list of articles.

```javascript
import { AdminApiClient, HaloRestAPIClient } from '@halo-dev/admin-api'
//http request tool for halo rest api.
const haloRestApiClient = new HaloRestAPIClient({
  baseUrl: process.env.HALO_BASE_URL,
  auth: { adminToken: 'halo admin token' },
})
//create adminApiClient by haloRestApiCLient.
const haloAdminClient = new AdminApiClient(haloRestApiClient)
//obtaining a list of articles.
haloAdminClient.post.list().then((res) => {
  console.log(res)
})
```

You can also view the complete implementation of the halo-admin
project: [@halo-dev/halo-admin](https://github.com/halo-dev/halo-admin).

The `@halo-dev/admin-api` package relies on `@halo-dev/rest-api-client`，since `@halo-dev/rest-api-client` is based
on [axios](https://axios-http.com/docs/intro), so you can use the `axios` interceptor

```javascript
import axios from 'axios'

// Add a request interceptor
axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error)
  },
)

// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error)
  },
)
```

The `@halo-dev/content-api`package can also use interceptors like this.

## Sdk for Content API

### Installation

```shell
npm install @halo-dev/content-api --save
```

### Usage

Here is a simple code for obtaining a list of articles.

```javascript
import { ContentApiClient, HaloRestAPIClient } from '@halo-dev/content-api'
//http request tool for halo rest api.
const haloRestApiClient = new HaloRestAPIClient({
  baseUrl: process.env.HALO_BASE_URL,
  auth: { apiToken: process.env.HALO_API_TOKEN },
})
//create contentApiClient by haloRestApiCLient.
const haloContentClient = new ContentApiClient(haloRestApiClient)
//obtaining a list of articles.
haloContentClient.post.list().then((res) => {
  console.log(res)
})
```

## Rest Api Client library

### Installation

Install this library using npm as follows

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

### Usage

```javascript
const client = new HaloRestAPIClient({
  baseUrl: 'https://example.halo.run',
  // Use password authentication
  auth: {
    username: process.env.HALO_USERNAME,
    password: process.env.HALO_PASSWORD,
  },
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

// Use LocalStorageTokenStore to persistence AccessToken to localStorage (in browser only)
//you can use FileTokenStore if in the Node environment.
// If there is no suitable Token store implemention, you can implement your own token storage strategy through the TokenStore interface.
const localStorageTokenStore = new LocalStorageTokenStore()

//halo api base url.
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
//now you can use haloRestApiClient to build your api client
```

### Http Request

```javascript
const haloRestApiClient = new HaloRestAPIClient({
  baseUrl: 'https://example.halo.run',
  basicAuth: { username: 'user', password: 'password' },
})
//build http client to perform http request
const client = haloRestApiClient.buildHttpClient()

//api parameters
const parameters = {}
//http get
client.get('https://example.halo.run', parameters)
//http post
client.post('https://example.halo.run', parameters)
```

## Logger client library

### Installation

Install this library using npm as follows

```shell
npm install @halo-dev/logger --save
```

### Key Concepts

The `@halo-dev/logger` package supports the following log levels specified in order of most verbose to least verbose:

- debug
- info
- warning
- error

When setting a log level, either programmatically or via the `HALO_LOG_LEVEL` environment variable, any logs that are
written using a log level less than or equal to the one you choose will be emitted.

For example, setting the log level to `warning` will cause all logs that have the log level `warning` or `error` to be
emitted.

### Usage

#### example 1 - basic usage

```javascript
import * as Logger from "@halo-dev/logger";

Logger.setLogLevel("info");

//operations will now emit info, warning, and error logs

//create a namespaced logger
const logger = Logger.createClientLogger("posts");
const client = new AdminApiClient(/* params */);
client.post.list()
  .then(res => {
    /* write an info log */
    logger.info("Successfully acquired a list of articles", res);
  })
  .catch(e => { /* do work */
  });
})
;
```

#### example 2 - redirect log output

```javascript
import { HaloLogger, setLogLevel } from '@halo-dev/logger'

setLogLevel('warning')

//override logging to output to console.log (default location is stderr)
HaloLogger.log = (...args) => {
  console.log(...args)
}
HaloLogger.log('hello world!')
```

## License

[MIT license](./LICENSE)
