
import { Controller, HttpRequest, HttpResponse } from '../../../apresentation/protocols'
import { LogControllerDecorator } from './log'

const makeController = (): Controller => {
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
const makeSut = (controller: Controller): LogControllerDecorator => new LogControllerDecorator(controller)

describe('LogController Decorator', () => {
  test('should call controller hander', async () => {
    const stub = makeController()
    const handleSpy = jest.spyOn(stub, 'handle')
    const sut = makeSut(stub)
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

  test('should return the same result of the controller', async () => {
    const stub = makeController()
    const sut = makeSut(stub)
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@email.com',
        password: 'any-pss',
        passwordConfirmation: 'any-pss'
      }
    }

    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual({
      statusCode: 200,
      body: {
        name: 'any_name',
        email: 'any_email@email.com',
        password: 'any-pss',
        passwordConfirmation: 'any-pss'
      }
    })
  })
})
