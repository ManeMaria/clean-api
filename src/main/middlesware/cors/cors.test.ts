// cria-se o arquivo separado de cada middleware para testes de integração
import request from 'supertest'
import { app } from '../../config/app'

describe('CORS middleware', () => {
  test('Deve conceder acesso', async () => {
    // como temos acesso ao app, podemos simular rotas
    app.get('/access_test', (req, res) => {
      res.send()
    })

    // com o request do supertest, podemos simular uma requisição
    await request(app)
      .get('/access_test')
      .expect('access-control-allow-origin', '*')
      .expect('access-control-allow-headers', '*')
      .expect('access-control-allow-methods', '*')
  })
})
