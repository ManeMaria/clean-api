import { Express } from 'express'
import { bodyParse } from '../middlesware/body-parse/body-parse'
// arquivo é para usar os middlewares.

export default (app: Express): void => {
  app.use(bodyParse)
}
