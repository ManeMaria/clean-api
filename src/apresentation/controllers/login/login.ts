
import { Authentication } from '../../../domain/usecase/authetication'
import { InvalidParamError } from '../../erros/invalid-params-error'
import { MissingParamsError } from '../../erros/missing-params-erros'
import { badRequest, serverError } from '../../helpers/http-helpers'
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
          return new Promise((resolve) => resolve(badRequest(new MissingParamsError(label))))
        }
      }

      const { email, password } = body

      const { isValid } = this.emailValidator
      if (!isValid(email)) {
        return new Promise((resolve) => resolve(badRequest(new InvalidParamError('email inválido'))))
      }

      const { auth } = this.authentication
      await auth(email, password)
    } catch (error) {
      return serverError(error)
    }
  }
}
