import * as p from './login-protocols'

import { LoginController } from './login'

const makFakeServerError = (): Error => {
  const newError = new Error()
  return newError
}

const makFakeRequest = (): p.HttpRequest => ({
  body: {
    email: 'any_email@email.com',
    password: 'any_password'
  }
})

const makeEmailAuthentication = (): p.Authentication => {
  class AuthenticationStub implements p.Authentication {
    async auth (email: string, password: string): Promise<string> {
      return new Promise(resolve => resolve('any_token'))
    }
  }

  return new AuthenticationStub()
}

const makeEmailValidator = (): p.EmailValidator => {
  class EmailValidatorStub implements p.EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }

  return new EmailValidatorStub()
}

interface SutTypes {
  sut: LoginController
  emailValidatorStub: p.EmailValidator
  authenticationStub: p.Authentication
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
    expect(httpResponse).toEqual(p.badRequest(new p.MissingParamsError('email')))
  })

  test('Deve retornar 400 se o password não for aprovado ', async () => {
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        email: 'any_email@email.com'
      }
    }

    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(p.badRequest(new p.MissingParamsError('password')))
  })

  test('Deve retornar 400 se caso o email seja inválido', async () => {
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)

    const httpResponse = await sut.handle(makFakeRequest())
    expect(httpResponse).toEqual(p.badRequest(new p.InvalidParamError('email inválido')))
  })

  test('Deve retornar 500, caso o EmailValidator encontre uma exceção', async () => {
    const { sut, emailValidatorStub } = makeSut()
    // ao invés de usar o mockReturnValueOnce que só mudaria o valor de retorno
    // temos que alterar toda a implemantação, por causa do typescrypt
    jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(() => { throw makFakeServerError() })

    const httpResponse = await sut.handle(makFakeRequest())

    expect(httpResponse).toEqual(p.serverError(makFakeServerError()))
  })

  test('Garantindo a chamada do Authentication correta', async () => {
    const { sut, authenticationStub } = makeSut()
    const spyAuth = jest.spyOn(authenticationStub, 'auth')
    await sut.handle(makFakeRequest())
    expect(spyAuth).toHaveBeenCalledWith('any_email@email.com',
      'any_password')
  })

  test('Deve retornar 401, caso as credenciais não sejam aprovadas', async () => {
    const { sut, authenticationStub } = makeSut()
    // no teste, pro causa do método ser async retornamos uma Promise
    jest.spyOn(authenticationStub, 'auth').mockReturnValueOnce(new Promise((resolve) => resolve(null)))

    const httpResponse = await sut.handle(makFakeRequest())

    expect(httpResponse).toEqual(p.unauthorizedError())
  })

  test('Deve retornar 500, caso o Authentication encontre uma exceção', async () => {
    const { sut, authenticationStub } = makeSut()
    // ao invés de usar o mockReturnValueOnce que só mudaria o valor de retorno
    // temos que alterar toda a implemantação, por causa do typescrypt
    jest.spyOn(authenticationStub, 'auth').mockImplementationOnce(() => { throw makFakeServerError() })

    const httpResponse = await sut.handle(makFakeRequest())

    expect(httpResponse).toEqual(p.serverError(makFakeServerError()))
  })

  test('Authentication deve retornar 200, caso as credenciais não sejam aprovadas', async () => {
    const { sut } = makeSut()

    const httpResponse = await sut.handle(makFakeRequest())

    expect(httpResponse).toEqual(p.ok({ accessToken: 'any_token' }))
  })
})
