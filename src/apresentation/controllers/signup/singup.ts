
import { badRequest, serverError, sucess } from '../../helpers/http-helpers'
import * as p from '../signup/signup-protocols'
import * as e from '../../erros/erros'

// lembrar de sempre commitar primeiro o arquivo de produção antes
// do arquivo de teste
export class SignUpController implements p.Controller {
  constructor (
    readonly emailValidator: p.EmailValidator,
    readonly addAccout: p.AddAccount,
    readonly validation: p.Validation
  ) {}

  async handle (httpRequest: p.HttpRequest): Promise< p.HttpResponse> {
    try {
      const { body } = httpRequest
      const requesFields = ['email', 'name', 'password', 'passwordConfirmation']
      const { validate } = this.validation
      validate(body)
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
      // console.error(error)
      return serverError(error)
    }
  }
}
