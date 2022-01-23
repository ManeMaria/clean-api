
import { Authentication } from '../../../domain/usecase/authetication'
import { InvalidParamError } from '../../erros/invalid-params-error'
import { MissingParamsError } from '../../erros/missing-params-erros'
import { badRequest, serverError, unauthorizedError } from '../../helpers/http-helpers'
import { Controller, EmailValidator, HttpRequest, HttpResponse } from '../signup/signup-protocols'

export class LoginController implements Controller {
  constructor (
    readonly emailValidator: EmailValidator,
    readonly authentication: Authentication
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { body } = httpRequest
      const labelRequest = ['email', 'password']

      for (const label of labelRequest) {
        if (!body[label]) {
          return badRequest(new MissingParamsError(label))
        }
      }

      const { email, password } = body

      const { isValid } = this.emailValidator
      if (!isValid(email)) {
        return badRequest(new InvalidParamError('email inválido'))
      }

      const { auth } = this.authentication
      const isAuth = await auth(email, password)
      if (!isAuth) {
        return unauthorizedError()
      }
    } catch (error) {
      return serverError(error)
    }
  }
}
