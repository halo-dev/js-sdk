import { HaloRequestConfigBuilder } from '../HaloRequestConfigBuilder'
import FormData from 'form-data'
import { injectPlatformDeps } from '../platform'
import * as browserDeps from '../platform/browser'
import { Base64 } from 'js-base64'
import { SESSION_TOKEN_KEY } from '../types/auth'
import os from 'os'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const packageJson = require('../../package.json')
const nodeVersion = process.version
const osName = os.type()
const packageName = packageJson.name
const packageVersion = packageJson.version
const expectedDefaultUa = `Node.js/${nodeVersion}(${osName}) ${packageName}@${packageVersion}`

describe('HaloRequestConfigBuilder in Node.js environment', () => {
  const baseUrl = 'https://example.halo.run'
  const apiToken = 'apiToken'

  let haloRequestConfigBuilder: HaloRequestConfigBuilder
  describe('specify a User-Agent', () => {
    it('should use a specified User-Agent', async () => {
      haloRequestConfigBuilder = new HaloRequestConfigBuilder({
        baseUrl,
        auth: {
          type: 'apiToken',
          apiToken,
        },
        userAgent: 'foo',
      })
      const requestConfig = await haloRequestConfigBuilder.build('get', '/v1/record.json', { key: 'value' })
      expect(requestConfig).toStrictEqual({
        method: 'get',
        proxy: undefined,
        url: `${baseUrl}/v1/record.json?key=value`,
        headers: {
          'User-Agent': `${expectedDefaultUa} foo`,
          'API-Authorization': apiToken,
        },
      })
    })
  })

  describe('not specified a User-Agent', () => {
    beforeEach(() => {
      haloRequestConfigBuilder = new HaloRequestConfigBuilder({
        baseUrl,
        auth: {
          type: 'apiToken',
          apiToken,
        },
      })
    })

    it('should build get method requestConfig', async () => {
      const requestConfig = await haloRequestConfigBuilder.build('get', '/v1/record.json', { key: 'value' })
      expect(requestConfig).toStrictEqual({
        method: 'get',
        proxy: undefined,
        url: `${baseUrl}/v1/record.json?key=value`,
        headers: {
          'User-Agent': expectedDefaultUa,
          'API-Authorization': apiToken,
        },
      })
    })

    it('should build post method requestConfig if the request URL is over the threshold', async () => {
      const value = 'a'.repeat(4096)
      const requestConfig = await haloRequestConfigBuilder.build('get', '/v1/record.json', { key: value })
      expect(requestConfig).toStrictEqual({
        method: 'post',
        proxy: undefined,
        url: `${baseUrl}/v1/record.json`,
        headers: {
          'User-Agent': expectedDefaultUa,
          'API-Authorization': apiToken,
          'X-HTTP-Method-Override': 'GET',
        },
        data: { key: value },
      })
    })

    it('should build post method requestConfig for data', async () => {
      const formData = new FormData()
      formData.append('key', 'value')
      const requestConfig = await haloRequestConfigBuilder.build('post', '/v1/record.json', formData)
      const { data, ...config } = requestConfig
      expect(config).toStrictEqual({
        method: 'post',
        proxy: undefined,
        url: `${baseUrl}/v1/record.json`,
        headers: {
          'User-Agent': expectedDefaultUa,
          'API-Authorization': apiToken,
          ...formData.getHeaders(),
        },
      })
      expect(data).toBeInstanceOf(FormData)
    })

    it('should build put method requestConfig', async () => {
      const requestConfig = await haloRequestConfigBuilder.build('put', '/v1/record.json', { key: 'value' })
      expect(requestConfig).toStrictEqual({
        method: 'put',
        proxy: undefined,
        url: `${baseUrl}/v1/record.json`,
        headers: {
          'User-Agent': expectedDefaultUa,
          'API-Authorization': apiToken,
        },
        data: {
          key: 'value',
        },
      })
    })

    it('should build delete method requestConfig', async () => {
      const requestConfig = await haloRequestConfigBuilder.build('delete', '/v1/record.json', { key: 'value' })
      expect(requestConfig).toStrictEqual({
        method: 'delete',
        proxy: undefined,
        url: `${baseUrl}/v1/record.json?key=value`,
        headers: {
          'User-Agent': expectedDefaultUa,
          'API-Authorization': apiToken,
        },
      })
    })
  })
})

describe('HaloRequestConfigBuilder in Browser environment', () => {
  const baseUrl = 'https://example.halo.run'
  const requestToken = 'requestToken'
  let haloRequestConfigBuilder: HaloRequestConfigBuilder
  beforeEach(() => {
    injectPlatformDeps({
      ...browserDeps,
      getRequestToken: async () => requestToken,
    })

    haloRequestConfigBuilder = new HaloRequestConfigBuilder({
      baseUrl,
      auth: {
        type: 'session',
      },
    })
  })

  it('should build get method requestConfig', async () => {
    const requestConfig = await haloRequestConfigBuilder.build('get', '/v1/record.json', { key: 'value' })
    expect(requestConfig).toStrictEqual({
      method: 'get',
      proxy: undefined,
      url: `${baseUrl}/v1/record.json?key=value`,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
      },
    })
  })

  it('should build post method requestConfig if the request URL is over the threshold', async () => {
    const value = 'a'.repeat(4096)
    const requestConfig = await haloRequestConfigBuilder.build('get', '/v1/record.json', { key: value })
    expect(requestConfig).toStrictEqual({
      method: 'post',
      proxy: undefined,
      url: `${baseUrl}/v1/record.json`,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'X-HTTP-Method-Override': 'GET',
      },
      data: { key: value, [SESSION_TOKEN_KEY]: requestToken },
    })
  })

  it('should build get method requestConfig for data', async () => {
    const requestConfig = await haloRequestConfigBuilder.build(
      'get',
      '/v1/record.json',
      { key: 'value' },
      { responseType: 'arraybuffer' },
    )
    expect(requestConfig).toStrictEqual({
      method: 'get',
      proxy: undefined,
      url: `${baseUrl}/v1/record.json?key=value`,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
      },
      responseType: 'arraybuffer',
    })
  })

  it('should build post method requestConfig', async () => {
    const requestConfig = await haloRequestConfigBuilder.build('post', '/v1/record.json', { key: 'value' })
    expect(requestConfig).toStrictEqual({
      method: 'post',
      proxy: undefined,
      url: `${baseUrl}/v1/record.json`,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
      },
      data: {
        key: 'value',
        [SESSION_TOKEN_KEY]: requestToken,
      },
    })
  })

  it('should build post method requestConfig for data', async () => {
    const formData = new FormData()
    formData.append('key', 'value')
    const requestConfig = await haloRequestConfigBuilder.build('post', '/v1/record.json', formData)
    const { data, ...config } = requestConfig
    expect(config).toStrictEqual({
      method: 'post',
      proxy: undefined,
      url: `${baseUrl}/v1/record.json`,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        ...formData.getHeaders(),
      },
    })
    expect(data).toBeInstanceOf(FormData)
  })

  it('should build put method requestConfig', async () => {
    const requestConfig = await haloRequestConfigBuilder.build('put', '/v1/record.json', { key: 'value' })
    expect(requestConfig).toStrictEqual({
      method: 'put',
      proxy: undefined,
      url: `${baseUrl}/v1/record.json`,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
      },
      data: {
        key: 'value',
        [SESSION_TOKEN_KEY]: requestToken,
      },
    })
  })

  it('should build delete method requestConfig', async () => {
    const requestConfig = await haloRequestConfigBuilder.build('delete', '/v1/record.json', { key: 'value' })
    expect(requestConfig).toStrictEqual({
      method: 'delete',
      proxy: undefined,
      url: `${baseUrl}/v1/record.json?${SESSION_TOKEN_KEY}=${requestToken}&key=value`,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
      },
    })
  })
})

describe('options', () => {
  it('should build `requestConfig` having `proxy` property', async () => {
    const baseUrl = 'https://example.halo.run'
    const apiToken = 'apiToken'
    const headers = {
      'API-Authorization': apiToken,
      'User-Agent': expectedDefaultUa,
    }
    const proxy = {
      host: 'localhost',
      port: 8080,
      auth: {
        username: 'admin',
        password: 'password',
      },
    }

    const haloRequestConfigBuilder = new HaloRequestConfigBuilder({
      baseUrl,
      auth: {
        type: 'apiToken',
        apiToken,
      },
      proxy,
    })

    const requestConfig = await haloRequestConfigBuilder.build('get', '/v1/record.json', { key: 'value' })
    expect(requestConfig).toStrictEqual({
      method: 'get',
      url: `${baseUrl}/v1/record.json?key=value`,
      headers,
      proxy,
    })
  })

  it('should build `requestConfig` having `httpsAgent` property', async () => {
    const baseUrl = 'https://example.halo.run'
    const apiToken = 'apiToken'
    const clientCertAuth = {
      pfx: Buffer.alloc(0),
      password: 'password',
    }

    const haloRequestConfigBuilder = new HaloRequestConfigBuilder({
      baseUrl,
      clientCertAuth,
      auth: {
        type: 'apiToken',
        apiToken,
      },
    })

    const requestConfig = await haloRequestConfigBuilder.build('get', '/v1/record.json', { key: 'value' })
    expect(requestConfig).toHaveProperty('httpsAgent')
  })
})

describe('Headers', () => {
  const baseUrl = 'https://example.halo.run'

  it('Basic Password auth', async () => {
    const USERNAME = 'user'
    const PASSWORD = 'password'
    const haloRequestConfigBuilder = new HaloRequestConfigBuilder({
      baseUrl,
      auth: {
        type: 'password',
        username: USERNAME,
        password: PASSWORD,
      },
    })
    const requestConfig = await haloRequestConfigBuilder.build('get', '/v1/record.json', {})
    expect(requestConfig.headers).toStrictEqual({
      'User-Agent': expectedDefaultUa,
      Authorization: Base64.encode(`${USERNAME}:${PASSWORD}`),
    })
  })

  it('AdminToken auth', async () => {
    const API_TOKEN = 'ApiToken'
    const haloRequestConfigBuilder = new HaloRequestConfigBuilder({
      baseUrl,
      auth: {
        type: 'adminToken',
        adminToken: API_TOKEN,
      },
    })
    const requestConfig = await haloRequestConfigBuilder.build('get', '/v1/record.json', {})
    expect(requestConfig.headers).toStrictEqual({
      'User-Agent': expectedDefaultUa,
      'Admin-Authorization': API_TOKEN,
    })
  })

  it('ApiToken auth', async () => {
    const API_TOKEN = 'ApiToken'
    const haloRequestConfigBuilder = new HaloRequestConfigBuilder({
      baseUrl,
      auth: {
        type: 'apiToken',
        apiToken: API_TOKEN,
      },
    })
    const requestConfig = await haloRequestConfigBuilder.build('get', '/v1/record.json', {})
    expect(requestConfig.headers).toStrictEqual({
      'User-Agent': expectedDefaultUa,
      'API-Authorization': API_TOKEN,
    })
  })

  it('ApiToken auth using multiple tokens as comma-separated string', async () => {
    const API_TOKEN1 = 'ApiToken1'
    const API_TOKEN2 = 'ApiToken2'
    const haloRequestConfigBuilder = new HaloRequestConfigBuilder({
      baseUrl,
      auth: {
        type: 'apiToken',
        apiToken: `${API_TOKEN1},${API_TOKEN2}`,
      },
    })
    const requestConfig = await haloRequestConfigBuilder.build('get', '/v1/record.json', {})
    expect(requestConfig.headers).toStrictEqual({
      'User-Agent': expectedDefaultUa,
      'API-Authorization': `${API_TOKEN1},${API_TOKEN2}`,
    })
  })

  it('ApiToken auth using multiple tokens as array', async () => {
    const API_TOKEN1 = 'ApiToken1'
    const API_TOKEN2 = 'ApiToken2'
    const haloRequestConfigBuilder = new HaloRequestConfigBuilder({
      baseUrl,
      auth: {
        type: 'apiToken',
        apiToken: [API_TOKEN1, API_TOKEN2],
      },
    })
    const requestConfig = await haloRequestConfigBuilder.build('get', '/v1/record.json', {})
    expect(requestConfig.headers).toStrictEqual({
      'User-Agent': expectedDefaultUa,
      'API-Authorization': `${API_TOKEN1},${API_TOKEN2}`,
    })
  })

  it('Session auth', async () => {
    const haloRequestConfigBuilder = new HaloRequestConfigBuilder({
      baseUrl,
      auth: {
        type: 'session',
      },
    })
    const requestConfig = await haloRequestConfigBuilder.build('get', '/v1/record.json', {})
    expect(requestConfig.headers).toStrictEqual({
      'User-Agent': expectedDefaultUa,
      'X-Requested-With': 'XMLHttpRequest',
    })
  })

  it('OAuth token auth', async () => {
    const oAuthToken = 'oauth-token'
    const haloRequestConfigBuilder = new HaloRequestConfigBuilder({
      baseUrl,
      auth: {
        type: 'oAuthToken',
        oAuthToken,
      },
    })
    const requestConfig = await haloRequestConfigBuilder.build('get', '/v1/record.json', {})
    expect(requestConfig.headers).toStrictEqual({
      Authorization: `Bearer ${oAuthToken}`,
      'User-Agent': expectedDefaultUa,
    })
  })

  it('Customizer auth', async () => {
    const adminToken = 'admin-token-12345'
    const haloRequestConfigBuilder = new HaloRequestConfigBuilder({
      baseUrl,
      auth: {
        type: 'customizeAuth',
        authHeader: 'Admin-Authorization',
        getToken() {
          return adminToken
        },
      },
    })
    const requestConfig = await haloRequestConfigBuilder.build('get', '/v1/record.json', {})
    expect(requestConfig.headers).toStrictEqual({
      'Admin-Authorization': adminToken,
      'User-Agent': expectedDefaultUa,
    })
  })

  it('Basic auth', async () => {
    const basicAuth = { username: 'user', password: 'password' }
    const haloRequestConfigBuilder = new HaloRequestConfigBuilder({
      baseUrl,
      basicAuth,
      auth: {
        type: 'session',
      },
    })
    const requestConfig = await haloRequestConfigBuilder.build('get', '/v1/record.json', {})
    expect(requestConfig.headers).toStrictEqual({
      Authorization: `Basic ${Base64.encode('user:password')}`,
      'User-Agent': expectedDefaultUa,
      'X-Requested-With': 'XMLHttpRequest',
    })
  })

  it('should not include User-Agent for browser enviroment', async () => {
    injectPlatformDeps(browserDeps)
    const haloRequestConfigBuilder = new HaloRequestConfigBuilder({
      baseUrl,
      auth: {
        type: 'session',
      },
    })
    const requestConfig = await haloRequestConfigBuilder.build('get', '/v1/record.json', {})
    expect(requestConfig.headers['User-Agent']).toBeUndefined()
  })
})
