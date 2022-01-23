import { ServerError } from '../erros/server-erros'
import { Unauthorized } from '../erros/unauthorized-error'
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

export const unauthorizedError = (): HttpResponse => {
  return {
    statusCode: 401,
    body: new Unauthorized()
  }
}

// created
export const sucess = (value: any): HttpResponse => {
  return {
    statusCode: 201,
    body: value
  }
}

export const ok = (value: any): HttpResponse => {
  return {
    statusCode: 200,
    body: value
  }
}
