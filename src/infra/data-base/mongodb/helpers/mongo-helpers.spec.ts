import { mongoHelper as sut } from './mongo-helper'

describe('Mongo Helper', () => {
  beforeAll(async () => {
    await sut.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await sut.disconnect()
  })

  test('should reconnect if mongodb is down ', async () => {
    /**
     * Simula uma interrupção na conexão
     */
    let accountColletion = await sut.getColletion('accounts')
    expect(accountColletion).toBeTruthy()
    await sut.disconnect()
    accountColletion = await sut.getColletion('accounts')
    expect(accountColletion).toBeTruthy()
  })
})
