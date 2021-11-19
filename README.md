<p align="center">
  <a href="https://github.com/uiwjs/react-amap">
    <img src="https://camo.githubusercontent.com/f801d89b0df13d68318cf5e47c888b4d4ad30f68b442ec6928e158e130650a02/68747470733a2f2f68616c6f2e72756e2f6c6f676f" height="80px" alt="Halo logo" />
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
<p align="center"> 一个与 Halo api 交互的工具集 </p>

[English Document](./README_en.md)

## 特性

- 封装认证以简化开发.
- 异常处理
- 使用 Halo rest api 更方便
- 使用 `TypeScript` 编写，更明确的参数和返回值类型，更好的代码提示

## 管理后台 API 库

### 安装

使用 `npm` 方式安装示例如下：

```shell
npm install @halo-dev/admin-api --save
```

### 使用示例

以下是一个获取后台文章列表的简单示例：

```javascript
import { AdminApiClient, HaloRestAPIClient } from "@halo-dev/admin-api";
//halo http 请求客户端.
const haloRestApiClient = new HaloRestAPIClient({
  baseUrl: process.env.HALO_BASE_URL,
  auth: { adminToken: "halo admin token" },
});
// 通过 haloRestApiCLient 创建 adminApiClient。
const haloAdminClient = new AdminApiClient(haloRestApiClient);
// 获取文章列表
haloAdminClient.post.list().then((res) => {
  console.log(res);
});
```

关于如何通过用户名和密码进行自动认证，这里提供了一个示例 [example](https://github.com/halo-dev/js-sdk/tree/master/example)

由于 `@halo-dev/admin-api` 依赖 `@halo-dev/rest-api-client`，而其是基于 `axios` 进行 `http` 通信的，因此如果你有需要的话，可以使用 [axios](https://axios-http.com/docs/intro), 的拦截器对 `halo api` 的请求与响应进行一些处理。

```javascript
import axios from "axios";

// Add a request interceptor
axios.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);
```

`@halo-dev/content-api` 也可以这样使用拦截器。

## 前台 API 库

使用 `npm` 安装示例如下：

```shell
npm install @halo-dev/content-api --save
```

### 使用示例

同样我们使用一个获取博客前台文章列表的示例如下：

```javascript
import { ContentApiClient, HaloRestAPIClient } from "@halo-dev/content-api";
// 创建 halo http 请求客户端
const haloRestApiClient = new HaloRestAPIClient({
  baseUrl: process.env.HALO_BASE_URL,
  auth: { apiToken: process.env.HALO_API_TOKEN },
});
// 通过 http 客户端创建 halo 前台 api 客户端
const haloContentClient = new ContentApiClient(haloRestApiClient);
// 获取文章列表
haloContentClient.post.list().then((res) => {
  console.log(res);
});
```

## Halo Rest API Http 通信库

### 安装

你可以使用 `npm` 安装它，示例如下：

```shell
npm install @halo-dev/rest-api-client
```

使用 `require` 或 `import` 导入

```javascript
// CommonJS
const { HaloRestAPIClient } = require("@halo-dev/rest-api-client");
// ES modules
import { HaloRestAPIClient } from "@halo-dev/rest-api-client";
```

### 使用示例

```javascript
const client = new HaloRestAPIClient({
  baseUrl: "https://example.halo.run",
  // Use password authentication
  auth: {
    username: process.env.HALO_USERNAME,
    password: process.env.HALO_PASSWORD,
  },
});
```

`auth` 参数为认证方式，支持以下几种认证方式，示例如下:

1. 使用 API token 认证，它适用于 halo 博客前台 api 认证

```javascript
auth: {
  apiToken: process.env.HALO_API_TOKEN;
}
```

2. 使用 Admin token 认证，它适用于 halo 后台管理 api 认证

```javascript
auth: {
  adminToken: process.env.HALO_ADMIN_TOKEN;
}
```

3. 使用自定义请求头认证方式

```javascript
auth: {
    type: "customizeAuth",
    authHeader: "Admin-Authorization",
      getToken () {
      return localStorage.getItem ("Access_Token")
    }
}
```

4. 使用 OAuth2 Bearer token 的认证方式，最终会在请求头添加 `Authorization: bearer some-token`

```javascript
auth: {
  oAuthToken: process.env.HALO_OAUTH_TOKEN;
}
```

**Basic 认证**

会在请求头添加例如 `Authorization: Basic dXNlci1jbGllbi1zZWNyZXQtODg4OA==` 这样的 pair

```javascript
const client = new HaloRestAPIClient({
  baseUrl: "https://example.halo.run",
  // Use basic authentication
  basicAuth: { username: "user", password: "password" },
});
```

另外还支持通过提供一个 `TokenProvider` 来接管 `halo` 的认证，这样不需要在考虑如何实现登录和 `token` 过期怎么续期的逻辑，示例如下：

```javascript
import {
  HaloRestAPIClient,
  LocalStorageTokenStore,
  // FileTokenStore,
  // TokenStore,
  DefaultTokenProvider,
} from "@halo-dev/rest-clint-api";

// Use LocalStorageTokenStore to persistence AccessToken to localStorage (in browser only)
//you can use FileTokenStore if in the Node environment.
// If there is no suitable Token store implemention, you can implement your own token storage strategy through the TokenStore interface.
const localStorageTokenStore = new LocalStorageTokenStore();

//halo api base url.
const baseUrl = process.env.VUE_APP_BASE_URL;

const haloRestApiClient = new HaloRestAPIClient({
  baseUrl: baseUrl,
});

const buildTokenProvider = (credentials) => {
  return new DefaultTokenProvider(
    {
      ...credentials,
    },
    baseUrl,
    localStorageTokenStore
  );
};

const tokenProvider = buildTokenProvider({
  username: "your halo username",
  password: "your password",
});
haloRestApiClient.setTokenProvider(tokenProvider);
//now you can use haloRestApiClient to build your api client
```

完整的例子可以点 [这里](https://github.com/halo-dev/js-sdk/tree/master/example)

### 发送 Http 请求

```javascript
const haloRestApiClient = new HaloRestAPIClient({
  baseUrl: "https://example.halo.run",
  basicAuth: { username: "user", password: "password" },
});
//build http client to perform http request
const client = haloRestApiClient.buildHttpClient();

//api parameters
const parameters = {};
//http get
client.get("https://example.halo.run", parameters);
//http post
client.post("https://example.halo.run", parameters);
```

## Logger 日志库

### 安装

使用 `npm` 安装示例如下：

```shell
npm install @halo-dev/logger --save
```

### 主要概念

`@halo-dev/logger` 包支持按从最详细到最不详细的顺序指定的以下日志级别:

- debug
- info
- warning
- error

当以编程方式或通过 `HALO_LOG_LEVEL` 环境变量设置日志级别时，使用小于或等于您选择的日志级别时写入的任何日志都将被显示。

例如，将日志级别设置为 `warning` 将导致所有日志级别为 `warning` 或 `error` 的日志被显示。

### 使用示例

#### 示例 1 - 基本使用

```javascript
import * as Logger from "@halo-dev/logger";
Logger.setLogLevel ("info");

//operations will now emit info, warning, and error logs

//create a namespaced logger
const logger = Logger.createClientLogger ("posts");
const client = new AdminApiClient (/* params */);
client.post.list ()
  .then (res => {
    /* write an info log */
    logger.info ("Successfully acquired a list of articles", res);
  })
  .catch (e => { /* do work */ });
});
```

#### 示例 2 - 覆盖原先日志输出方式

```javascript
import { HaloLogger, setLogLevel } from "@halo-dev/logger";

setLogLevel("warning");

//override logging to output to console.log (default location is stderr)
HaloLogger.log = (...args) => {
  console.log(...args);
};
HaloLogger.log("hello world!");
```

## License

[MIT license](./LICENSE)
