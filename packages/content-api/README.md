<h3 align="center">Content API Client</h3>

<p align="center">
  <a href="https://www.npmjs.com/package/@halo-dev/content-api">
    <img src="https://img.shields.io/npm/v/@halo-dev/content-api.svg" alt="npm version"/>
  </a>
  <a href="https://www.npmjs.com/package/@halo-dev/content-api">
      <img alt="npm" src="https://img.shields.io/npm/dm/@halo-dev/content-api" alt="Downloads"/>
  </a>
  <a href="https://github.com/halo-dev/js-sdk/blob/master/packages/content-api/package.json">
      <img alt="node-current" src="https://img.shields.io/node/v/@halo-dev/content-api?color=blue">
  </a>
  <a href="https://github.com/halo-dev/js-sdk/blob/master/LICENSE">
    <img alt="NPM" src="https://img.shields.io/npm/l/@halo-dev/content-api" alt="LICENSE">
  </a>
</p>

<p>JavaScript SDK for Halo's Content API,implemented with TypeScript,encapsulating parameter types and return value types to make the use of API more brief.</p>

## Installation

```shell
npm install @halo-dev/content-api --save
```

## Usage

Here is a simple code for obtaining a list of posts.

```javascript
import { ContentApiClient, HaloRestAPIClient } from '@halo-dev/content-api'

// http request tool for halo rest api.
const haloRestApiClient = new HaloRestAPIClient({
  baseUrl: process.env.HALO_BASE_URL,
  auth: { apiToken: process.env.HALO_API_TOKEN },
})

// create contentApiClient by haloRestApiCLient.
const haloContentClient = new ContentApiClient(haloRestApiClient)

// obtaining a list of articles.
haloContentClient.post.list().then((res) => {
  console.log(res)
})
```

### License

[MIT license](../../LICENSE)
