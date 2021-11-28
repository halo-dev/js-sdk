<h3 align="center">Admin API Client</h3>

<p align="center">
  <a href="https://www.npmjs.com/package/@halo-dev/admin-api">
    <img src="https://img.shields.io/npm/v/@halo-dev/admin-api.svg" alt="npm version"/>
  </a>
  <a href="https://www.npmjs.com/package/@halo-dev/admin-api">
      <img alt="npm" src="https://img.shields.io/npm/dm/@halo-dev/admin-api" alt="Downloads"/>
  </a>
  <a href="https://github.com/halo-dev/js-sdk/blob/master/packages/admin-api/package.json">
      <img alt="node-current" src="https://img.shields.io/node/v/@halo-dev/admin-api?color=blue">
  </a>
  <a href="https://github.com/halo-dev/js-sdk/blob/master/LICENSE">
    <img alt="NPM" src="https://img.shields.io/npm/l/@halo-dev/admin-api" alt="LICENSE">
  </a>
</p>

<p>A js sdk for Halo's Admin APIs,implemented with TypeScript,encapsulating parameter types and return value types to make the use of API more brief.</p>

## Installation

```shell
npm install @halo-dev/admin-api --save
```

## Usage

Here is a simple code for obtaining a list of articles.

```javascript
import {AdminApiClient, HaloRestAPIClient} from "@halo-dev/admin-api";
// http request tool for halo rest api.
const haloRestApiClient = new HaloRestAPIClient({
  baseUrl: process.env.HALO_BASE_URL,
  auth: {adminToken: "halo admin token"},
});
// create adminApiClient by haloRestApiCLient.
const haloAdminClient = new AdminApiClient(haloRestApiClient);
// obtaining a list of articles.
haloAdminClient.post.list().then((res) => {
  console.log(res);
});
```

Specific use example reference [example](https://github.com/halo-dev/js-sdk/tree/master/example)

### License

[MIT license](/LICENSE)
