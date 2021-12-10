
import { badRequest, serverError } from '../helpers/http-helpers'
import * as p from '../protocols/index'
import * as i from '../protocols/http'
import * as e from '../erros/erros'
import { AddAccount } from '../../domain/usecase/add-account'

// lembrar de sempre commitar primeiro o arquivo de produção antes
// do arquivo de teste
export class SignUpController implements p.Controller {
  private readonly emailValidator: p.EmailValidator
  private readonly addAccout: AddAccount

  constructor (emailValidator: p.EmailValidator, addAccout: AddAccount) {
    this.emailValidator = emailValidator
    this.addAccout = addAccout
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

      const { name, email, password, passwordConfirmation } = body

      if (password !== passwordConfirmation) {
        return badRequest(new e.InvalidParamError('passwordConfirmation'))
      }

      const isValid = this.emailValidator.isValid(email)

      if (!isValid) {
        return badRequest(new e.InvalidParamError('email'))
      }

      this.addAccout.add({
        name,
        email,
        password
      })
    } catch (error) {
      console.log('%c entrou error')
      return serverError()
    }
  }
}
