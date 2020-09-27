const HaloSDK = require('../dist/halo-js-sdk.cjs')

const api = new HaloSDK({
  basePath: '/'
})

const commentsApi = api.commentsApi()

commentsApi.createComment('test', 'xdd').then().catch(err => {
  console.error(err)
})
