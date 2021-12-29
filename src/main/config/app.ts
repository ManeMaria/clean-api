import express from 'express'
import setupMiddlewares from '../config/middlewares'
const app = express()
// todos os middlewares estão no arquivo de setaput,
// ele tem como função 'ativar' os middlewares
setupMiddlewares(app)
export { app }
