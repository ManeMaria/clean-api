
import { ok, serverError } from '../../../apresentation/helpers/http-helpers'
import { Controller, HttpRequest, HttpResponse } from '../../../apresentation/protocols'
import { LogErrorRepository } from '../../../data/protocols/log-erro-repository'
import { AccountModel } from '../../../domain/models/account'
import { LogControllerDecorator } from './log'

const makeFakeServerError = (): HttpResponse => {
  const fakeError = new Error()
  fakeError.stack = 'any_stack'
  return serverError(fakeError)
}

const makFakeRequest = (): HttpRequest => ({
  body: {
    id: 'valid_id',
    name: 'valid_name',
    email: 'valid_email@email.com',
    password: 'valid-pss'
  }
})

const makFakeAccount = (): AccountModel => ({
  id: 'valid_id',
  name: 'valid_name',
  email: 'valid_email@email.com',
  password: 'valid-pss'
})

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
      return new Promise((resolve) => resolve(ok(makFakeAccount())))
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

    await sut.handle(makFakeRequest())
    expect(handleSpy).toHaveBeenCalledWith(makFakeRequest())
  })

  test('should return the same result of the controller', async () => {
    const { sut } = makeSut()

    const httpResponse = await sut.handle(makFakeRequest())
    expect(httpResponse).toEqual(ok(makFakeAccount()))
  })

  test('should call LogErrorRepository with correct if controller returns a server error', async () => {
    const { sut, logErrorRepositoryStube, controllerStub } = makeSut()
    const logSpy = jest.spyOn(logErrorRepositoryStube, 'log')
    jest.spyOn(controllerStub, 'handle').mockReturnValueOnce(new Promise(resolve => resolve(makeFakeServerError())))

    await sut.handle(makFakeRequest())

    expect(logSpy).toHaveBeenCalledWith('any_stack')
  })
})
