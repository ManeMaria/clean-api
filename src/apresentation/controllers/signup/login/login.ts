
import { MissingParamsError } from '../../../erros/missing-params-erros'
import { badRequest } from '../../../helpers/http-helpers'
import { Controller, HttpRequest, HttpResponse } from '../signup-protocols'

export class LoginController implements Controller {
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    return new Promise((resolve, reject) => resolve(badRequest(new MissingParamsError('email'))))
  }
}
