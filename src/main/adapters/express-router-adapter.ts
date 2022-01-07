import { Response, Request } from 'express'
import { Controller, HttpRequest } from '../../apresentation/protocols'

export const adaptRouter = (controller: Controller) => {
  return async (res: Response, req: Request) => {
    const httpRequest: HttpRequest = {
      body: req.body
    }

    const { statusCode, body: requestBody } = await controller.handle(httpRequest)

    res.status(statusCode).json(requestBody)
  }
}
