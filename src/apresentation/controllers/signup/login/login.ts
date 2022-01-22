
import { MissingParamsError } from '../../../erros/missing-params-erros'
import { badRequest } from '../../../helpers/http-helpers'
import { Controller, HttpRequest, HttpResponse } from '../signup-protocols'

export class LoginController implements Controller {
  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const { body } = httpRequest
    const labelRequest = ['email', 'password']

    for (const label of labelRequest) {
      if (!body[label]) {
        return new Promise((resolve) => resolve(badRequest(new MissingParamsError(label))))
      }
    }
  }
}
