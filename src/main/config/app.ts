// invoco e ativo para ficar tudo em uma linha só

import express from 'express'
import setupMiddlewares from '../config/middlewares'
import setupRoutes from '../config/routes'

const app = express()
// todos os middlewares estão no arquivo de setaput,
// ele tem como função 'ativar' os middlewares
setupMiddlewares(app)
setupRoutes(app)
export { app }
