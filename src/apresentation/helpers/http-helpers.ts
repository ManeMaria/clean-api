import { ServerError } from '../erros/server-erros'
import { HttpResponse } from '../protocols/http'

export const badRequest = (error: Error): HttpResponse => {
  return {
    statusCode: 400,
    body: error
  }
}

export const serverError = (): HttpResponse => {
  return {
    statusCode: 500,
    body: new ServerError()
  }
}

export const sucess = (value: any): HttpResponse => {
  return {
    statusCode: 201,
    body: value
  }
}
