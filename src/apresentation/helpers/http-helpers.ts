import { ServerError } from '../erros/server-erros'
import { HttpResponse } from '../protocols/http'

export const badRequest = (error: Error): HttpResponse => {
  return {
    statusCode: 400,
    body: error
  }
}
export const internalError = (): HttpResponse => {
  return {
    statusCode: 500,
    body: new ServerError()
  }
}
