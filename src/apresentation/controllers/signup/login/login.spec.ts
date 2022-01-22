import { MissingParamsError } from '../../../erros/missing-params-erros'
import { badRequest } from '../../../helpers/http-helpers'
import { LoginController } from './login'

describe('Login Controller', () => {
  test('Deve retornar 400 se o email não for aprovado ', async () => {
    const sut = new LoginController()
    const httpRequest = {
      body: {
        password: 'any_password'
      }
    }

    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamsError('email')))
  })

  test('Deve retornar 400 se o password não for aprovado ', async () => {
    const sut = new LoginController()
    const httpRequest = {
      body: {
        email: 'any_email@email.com'
      }
    }

    const httpResponse = await sut.handle(httpRequest)
    expect(httpResponse).toEqual(badRequest(new MissingParamsError('password')))
  })
})
