import { Express } from 'express'
import { bodyParse, contentType, cors } from '../middlesware'
// arquivo é para usar os middlewares.

export default (app: Express): void => {
  app.use(bodyParse)
  app.use(cors)
  app.use(contentType)
}
