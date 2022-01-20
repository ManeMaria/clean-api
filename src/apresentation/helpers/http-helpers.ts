import { ServerError } from '../erros/server-erros'
import { HttpResponse } from '../protocols/http'

export const badRequest = (error: Error): HttpResponse => {
  return {
    statusCode: 400,
    body: error
  }
}

export const serverError = (error: Error): HttpResponse => {
  return {
    statusCode: 500,
    body: new ServerError(error.stack)
  }
}

export const sucess = (value: any): HttpResponse => {
  return {
    statusCode: 201,
    body: value
  }
}
