import { MissingParamsError } from '../erros/missing-parrams-erros'
import { badRequest } from '../helpers/http-helpers'
import { Controller } from '../protocols/controller'
import * as i from '../protocols/http'

// lembrar de sempre commitar primeiro o arquivo de produção antes
// do arquivo de teste
export class SignUpController implements Controller {
  handle (httpRequest: i.HttpRequest): i.HttpResponse {
    const { body } = httpRequest
    const requesFields = ['email', 'name', 'password', 'passwordConfirmation']

    for (const field of requesFields) {
      if (!body[field]) {
        return badRequest(new MissingParamsError(field))
      }
    }
  }
}
