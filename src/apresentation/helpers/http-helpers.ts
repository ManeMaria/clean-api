import { HttpResponse } from '../protocols/http'
import { MissingParamsError } from '../erros/missing-parrams-erros'

export const badRequest = (error: string): HttpResponse => {
  return {
    statusCode: 400,
    body: new MissingParamsError(error)
  }
}
