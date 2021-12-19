
import { badRequest, serverError, sucess } from '../../helpers/http-helpers'
import * as p from '../signup/signup-protocols'
import * as e from '../../erros/erros'

// lembrar de sempre commitar primeiro o arquivo de produção antes
// do arquivo de teste
export class SignUpController implements p.Controller {
  private readonly emailValidator: p.EmailValidator
  private readonly addAccout: p.AddAccount

  constructor (emailValidator: p.EmailValidator, addAccout: p.AddAccount) {
    this.emailValidator = emailValidator
    this.addAccout = addAccout
  }

  async handle (httpRequest: p.HttpRequest): Promise< p.HttpResponse> {
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

      const account = await this.addAccout.add({
        name,
        email,
        password
      })

      return sucess(account)
    } catch (error) {
      console.error(error)
      return serverError()
    }
  }
}
