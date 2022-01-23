
import { MissingParamsError } from '../../erros/missing-params-erros'
import { badRequest, ok } from '../../helpers/http-helpers'
import { Controller, EmailValidator, HttpRequest, HttpResponse } from '../signup/signup-protocols'

export class LoginController implements Controller {
  constructor (
    readonly emailValidator: EmailValidator
  ) {}

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const { body } = httpRequest
    const labelRequest = ['email', 'password']

    for (const label of labelRequest) {
      if (!body[label]) {
        return new Promise((resolve) => resolve(badRequest(new MissingParamsError(label))))
      }
    }

    const { email } = body

    const { isValid } = this.emailValidator
    return ok(isValid(email))
  }
}
