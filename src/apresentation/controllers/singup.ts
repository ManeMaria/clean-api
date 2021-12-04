
import { badRequest, serverError } from '../helpers/http-helpers'
import * as p from '../protocols/index'
import * as i from '../protocols/http'
import * as e from '../erros/erros'

// lembrar de sempre commitar primeiro o arquivo de produção antes
// do arquivo de teste
export class SignUpController implements p.Controller {
  private readonly emailValidator: p.EmailValidator
  constructor (emailValidator: p.EmailValidator) {
    this.emailValidator = emailValidator
  }

  handle (httpRequest: i.HttpRequest): i.HttpResponse {
    try {
      const { body } = httpRequest
      const requesFields = ['email', 'name', 'password', 'passwordConfirmation']

      for (const field of requesFields) {
        if (!body[field]) {
          return badRequest(new e.MissingParamsError(field))
        }
      }

      const isValid = this.emailValidator.isValid(body.email)

      if (!isValid) {
        return badRequest(new e.InvalidParamError('email'))
      }
    } catch (error) {
      console.error(error)
      return serverError()
    }
  }
}
