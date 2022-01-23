
import { Authentication } from '../../../domain/usecase/authetication'
import { InvalidParamError } from '../../erros/invalid-params-error'
import { MissingParamsError } from '../../erros/missing-params-erros'
import { badRequest, serverError } from '../../helpers/http-helpers'
import { EmailValidator, HttpRequest } from '../signup/signup-protocols'
import { LoginController } from './login'

const makFakeServerError = (): Error => {
  const newError = new Error()
  return newError
}

const makFakeRequest = (): HttpRequest => ({
  body: {
    email: 'any_email@email.com',
    password: 'any_password'
  }
})

const makeEmailAuthentication = (): Authentication => {
  class AuthenticationStub implements Authentication {
    async auth (email: string, password: string): Promise<string> {
      return new Promise(resolve => resolve('any_token'))
    }
  }

  return new AuthenticationStub()
}

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }

  return new EmailValidatorStub()
}

interface SutTypes {
  sut: LoginController
  emailValidatorStub: EmailValidator
  authenticationStub: Authentication
}

const makeSut = (): SutTypes => {
  const authenticationStub = makeEmailAuthentication()
  const emailValidatorStub = makeEmailValidator()
  const sut = new LoginController(emailValidatorStub, authenticationStub)

  return {
    sut,
    emailValidatorStub,
    authenticationStub
  }
}

describe('Login Controller', () => {
  test('Deve retornar 400 se o email não for aprovado ', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        password: 'any_password'
      }
    }

    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamsError('email')))
  })

  test('Deve retornar 400 se o password não for aprovado ', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        email: 'any_email@email.com'
      }
    }

    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamsError('password')))
  })

  test('Deve retornar 400 se caso o email seja inválido', async () => {
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)

    const httpResponse = await sut.handle(makFakeRequest())
    expect(httpResponse).toEqual(badRequest(new InvalidParamError('email inválido')))
  })

  test('Deve retornar 500, caso o EmailValidator encontre uma exceção', async () => {
    const { sut, emailValidatorStub } = makeSut()
    // ao invés de usar o mockReturnValueOnce que só mudaria o valor de retorno
    // temos que alterar toda a implemantação, por causa do typescrypt
    jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(() => { throw makFakeServerError() })

    const httpResponse = await sut.handle(makFakeRequest())

    expect(httpResponse).toEqual(serverError(makFakeServerError()))
  })

  test('Garantindo a chamada do Authentication correta', async () => {
    const { sut, authenticationStub } = makeSut()
    const spyAuth = jest.spyOn(authenticationStub, 'auth')
    await sut.handle(makFakeRequest())
    expect(spyAuth).toHaveBeenCalledWith('any_email@email.com',
      'any_password')
  })
})
