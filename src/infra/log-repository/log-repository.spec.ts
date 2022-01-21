import { Collection } from 'mongodb'
import { mongoHelper } from '../data-base/mongodb/helpers/mongo-helper'
import { LogMongoRepository } from './log-repository'

describe('Log Mongo Repository', () => {
  let errorColletion: Collection
  beforeAll(async () => {
    await mongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await mongoHelper.disconnect()
  })
  // limpa os dados do db de teste, após cada teste
  beforeEach(async () => {
    errorColletion = await mongoHelper.getColletion('errors')
    await errorColletion.deleteMany({})
  })

  test('deve retornar um log erro com sucesso', async () => {
    const sut = new LogMongoRepository()
    await sut.logError('any_error')
    const count = await errorColletion.countDocuments()
    expect(count).toBe(1)
  })
})
