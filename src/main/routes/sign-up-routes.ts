import { Router } from 'express'
import { adaptRoute } from '../adapters/express-router-adapter'
import { makeSignUpController } from '../factories/signup/signup'

// criamos rotas dinânmicas
// com esse algorítmo, buscamos os arquivos com final routes.ts e criamos
// rotas dinâmicas
export default (route: Router): void => {
  route.post('/signup', adaptRoute(makeSignUpController()))
}
