
import { Controller, HttpRequest, HttpResponse } from '../../../apresentation/protocols'
import { LogControllerDecorator } from './log'

const controllerStub = (): Controller => {
  class ControllerStub implements Controller {
    async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
      const httpReponse = {
        statusCode: 200,
        body: {
          name: 'any_name',
          email: 'any_email@email.com',
          password: 'any-pss',
          passwordConfirmation: 'any-pss'
        }
      }
      return new Promise((resolve) => resolve(httpReponse))
    }
  }

  return new ControllerStub()
}
const makeLogControllerDecorator = (controller: Controller): LogControllerDecorator => new LogControllerDecorator(controller)

describe('LoController Decorator', () => {
  test('should call controller hander', async () => {
    const stub = controllerStub()
    const handleSpy = jest.spyOn(stub, 'handle')
    const sut = makeLogControllerDecorator(stub)
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@email.com',
        password: 'any-pss',
        passwordConfirmation: 'any-pss'
      }
    }

    await sut.handle(httpRequest)
    expect(handleSpy).toHaveBeenCalledWith(httpRequest)
  })
})
