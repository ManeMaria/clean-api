
import request from 'supertest'
import { app } from '../config/app'

describe('SingUp rota', () => {
  test('Deve retornar uma conta nova em caso de sucesso', async () => {
    // como temos acesso ao app, podemos simular rotas
    await request(app)
      .post('/api/signup')
      .send({
        name: 'any_name',
        email: 'any_email@email@email.com',
        password: 'any-pss',
        passwordConfirmation: 'any-pss'
      })
      .expect(201)
  })
  test('Deve receber um "ok"', async () => {
    // como temos acesso ao app, podemos simular rotas
    await request(app)
      .get('/api/getsignup')
      .expect(200)
      .expect({ ok: 'ok' })
  })
})
