// cria-se o arquivo separado de cada middleware para testes de integração
import request from 'supertest'
import { app } from '../../config/app'
describe('Testando o express.json()', () => {
  test('Deve converter o body em json', async () => {
    // como temos acesso ao app, podemos simular rotas
    app.post('/test_body_parser', (req, res) => {
      res.send(req.body)
    })

    // com o request do supertest, podemos simular uma requisição
    await request(app)
      .post('/test_body_parser')
      .send({ name: 'César' })
      .expect({ name: 'César' })
  })
})
