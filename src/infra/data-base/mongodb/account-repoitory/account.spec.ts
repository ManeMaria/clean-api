
import { AccountMongoRepository } from './account'
import { mongoHelper } from '../helpers/mongo-helper'

const makeSut = (): AccountMongoRepository => {
  return new AccountMongoRepository()
}

describe('Conta no Mongo repository', () => {
  beforeAll(async () => {
    await mongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await mongoHelper.disconnect()
  })
  // limpa os dados do db de teste, após cada teste
  beforeEach(async () => {
    const accountColletion = await mongoHelper.getColletion('accounts')
    await accountColletion.deleteMany({})
  })

  test('Deve retornar uma conta em caso de sucesso', async () => {
    const sut = makeSut()

    const account = await sut.add({
      name: 'any_name',
      email: 'any_email@any.com',
      password: 'any_password'
    })
    // verifica um por um, pois não me interessa saber como será o hash do id
    expect(account).toBeTruthy()
    expect(account.id).toBeTruthy()
    expect(account.name).toBe('any_name')
    expect(account.email).toBe('any_email@any.com')
    expect(account.password).toBe('any_password')
  })
})
