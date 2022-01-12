import { Controller, HttpRequest, HttpResponse } from '../../../apresentation/protocols'

export class LogControllerDecorator implements Controller {
  constructor (
    private readonly controller: Controller
  ) {

  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    await this.controller.handle(httpRequest)

    // if (httpResponse.statusCode === 500) {

    // }

    return null
  }
}