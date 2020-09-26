const HaloSDK = require('../dist/halo-js-sdk.cjs')

const api = new HaloSDK({
  url: 'xxx'
})

const commentsApi = api.commentsApi

commentsApi.createComment('test', 'test').then(response => {
  console.log('xx')
})
