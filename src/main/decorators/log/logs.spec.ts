
import { serverError } from '../../../apresentation/helpers/http-helpers'
import { Controller, HttpRequest, HttpResponse } from '../../../apresentation/protocols'
import { LogErrorRepository } from '../../../data/protocols/log-erro-repository'
import { LogControllerDecorator } from './log'

const makeLogErrorRepositoryStube = (): LogErrorRepository => {
  class LogErrorRepositoryStube implements LogErrorRepository {
    async log (stack: string): Promise<void> {
      return new Promise((resolve) => resolve())
    }
  }

  return new LogErrorRepositoryStube()
}

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

interface Makesut {
  sut: LogControllerDecorator
  logErrorRepositoryStube: LogErrorRepository
  controllerStub: Controller
}

const makeSut = (): Makesut => {
  const controllerStub = makeController()
  const logErrorRepositoryStube = makeLogErrorRepositoryStube()
  return {
    logErrorRepositoryStube,
    sut: new LogControllerDecorator(controllerStub, logErrorRepositoryStube),
    controllerStub
  }
}

describe('LogController Decorator', () => {
  test('should call controller hander', async () => {
    const { sut, controllerStub } = makeSut()
    const handleSpy = jest.spyOn(controllerStub, 'handle')
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
    const { sut } = makeSut()
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

  test('should call LogErrorRepository with correct if controller returns a server error', async () => {
    const fakeError = new Error()
    fakeError.stack = 'any_stack'
    const error = serverError(fakeError)

    const { sut, logErrorRepositoryStube, controllerStub } = makeSut()
    const logSpy = jest.spyOn(logErrorRepositoryStube, 'log')
    jest.spyOn(controllerStub, 'handle').mockReturnValueOnce(new Promise(resolve => resolve(error)))

    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@email.com',
        password: 'any-pss',
        passwordConfirmation: 'any-pss'
      }
    }

    await sut.handle(httpRequest)

    expect(logSpy).toHaveBeenCalledWith('any_stack')
  })
})
