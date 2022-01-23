
import * as p from './login-protocols'

export class LoginController implements p.Controller {
  constructor (
    readonly emailValidator: p.EmailValidator,
    readonly authentication: p.Authentication
  ) {}

  async handle (httpRequest: p.HttpRequest): Promise<p.HttpResponse> {
    try {
      const { body } = httpRequest
      const labelRequest = ['email', 'password']

      for (const label of labelRequest) {
        if (!body[label]) {
          return p.badRequest(new p.MissingParamsError(label))
        }
      }

      const { email, password } = body

      const { isValid } = this.emailValidator
      if (!isValid(email)) {
        return p.badRequest(new p.InvalidParamError('email inválido'))
      }

      const { auth } = this.authentication
      const isAuth = await auth(email, password)
      if (!isAuth) {
        return p.unauthorizedError()
      }
    } catch (error) {
      return p.serverError(error)
    }
  }
}
