
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

      const { validate } = this.validation

      const error = validate(body)

      if (error) {
        return p.badRequest(error)
      }

      const { name, email, password } = body

      // if (password !== passwordConfirmation) {
      //   return p.badRequest(new e.InvalidParamError('passwordConfirmation'))
      // }
      const isValid = this.emailValidator.isValid(email)

      if (!isValid) {
        return p.badRequest(new e.InvalidParamError('email'))
      }

      const account = await this.addAccout.add({
        name,
        email,
        password
      })

      return p.sucess(account)
    } catch (error) {
      console.log('-->', error)
      return p.serverError(error)
    }
  }
}
