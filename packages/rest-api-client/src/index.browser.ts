import { injectPlatformDeps } from './platform/'
import * as browserDeps from './platform/browser'
import FormData from 'form-data'
import Axios from 'axios'

injectPlatformDeps(browserDeps)

export { HaloRestAPIClient } from './HaloRestAPIClient'
export { HaloResponseHandler } from './HaloResponseHandler'
export { HaloRequestConfigBuilder } from './HaloRequestConfigBuilder'
export { DefaultHttpClient } from './http'

export {
  CustomizeAuth,
  DiscriminatedAuth,
  BasicAuth,
  AccessToken,
  TokenType,
  Credentials,
  HttpClient,
  ResponseHandler,
} from './types'

export { FormData, Axios }
