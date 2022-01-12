/* eslint-disable @typescript-eslint/dot-notation */
import { Response, Request } from 'express'
import { Controller, HttpRequest } from '../../apresentation/protocols'

export const adaptRoute = (controller: Controller) => {
  return async (req: Request, res: Response) => {
    const httpRequest: HttpRequest = {
      body: req?.body
    }

    const httpResponse = await controller.handle(httpRequest)
    res.status(httpResponse.statusCode).json(httpResponse.body)
  }
}
