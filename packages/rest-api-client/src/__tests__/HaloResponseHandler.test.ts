import { HttpResponse } from '../types'
import { HaloResponseHandler } from '../HaloResponseHandler'

describe('HaloResponseHandler', () => {
  describe('handle', () => {
    it('should pass', async () => {
      const responseHandler = new HaloResponseHandler()
      const response: HttpResponse = {
        data: { status: 'success', data: null },
        headers: {
          hello: 'world',
        },
      }
      await expect(responseHandler.handle(Promise.resolve(response))).resolves.toStrictEqual({
        status: 'success',
        data: null,
      })
    })
  })
})
