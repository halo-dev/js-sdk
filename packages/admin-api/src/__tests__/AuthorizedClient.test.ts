import { AuthorizedClient } from '../AuthorizedClient'

describe('Halo AuthorizedClient test', () => {
  it('base test', async () => {
    const authorizedClient = new AuthorizedClient('http://localhost:8090')

    const data = await authorizedClient.isInstalled()
    console.log('authorizedClient test response:', data)
  })
})
