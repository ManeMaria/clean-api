import { Express } from 'express'
import { bodyParse } from '../middlesware/body-parse/body-parse'
import { contentType } from '../middlesware/content-type/content-type'
import { cors } from '../middlesware/cors/cors'
// arquivo é para usar os middlewares.

export default (app: Express): void => {
  app.use(bodyParse)
  app.use(cors)
  app.use(contentType)
}
