import { MissingParamsError } from '../erros/missing-params-erros'
import { badRequest, serverError } from '../helpers/http-helpers'
import { Controller } from '../protocols/controller'
import * as i from '../protocols/http'
import { EmailValidator } from '../protocols/email-validator'
import { InvalidParamError } from '../erros/invalid-params-error'

// lembrar de sempre commitar primeiro o arquivo de produção antes
// do arquivo de teste
export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator
  constructor (emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  handle (httpRequest: i.HttpRequest): i.HttpResponse {
    try {
      const { body } = httpRequest
      const requesFields = ['email', 'name', 'password', 'passwordConfirmation']

      for (const field of requesFields) {
        if (!body[field]) {
          return badRequest(new MissingParamsError(field))
        }
      }

      const isValid = this.emailValidator.isValid(body.email)

      if (!isValid) {
        return badRequest(new InvalidParamError('email'))
      }
    } catch (error) {
      console.error(error)
      return serverError()
    }
  }
}
