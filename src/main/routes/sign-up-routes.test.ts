
import request from 'supertest'
import { app } from '../config/app'
import { mongoHelper } from '../../infra/data-base/mongodb/helpers/mongo-helper'

describe('SingUp rota', () => {
  beforeAll(async () => {
    await mongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await mongoHelper.disconnect()
  })
  // limpa os dados do db de teste, após cada teste
  beforeEach(async () => {
    const accountColletion = mongoHelper.getColletion('accounts')
    await accountColletion.deleteMany({})
  })
  test('Deve retornar uma conta nova em caso de sucesso', async () => {
    // como temos acesso ao app, podemos simular rotas
    await request(app)
      .post('/api/signup')
      .send({
        name: 'any_name',
        email: 'any_email@email.com',
        password: 'any-pss',
        passwordConfirmation: 'any-pss'
      })
      .expect(201)
  })
})
