import bcrypt from 'bcrypt'
import { BcryptAdapter } from './bcrypt-adapter'

jest.mock('bcrypt', () => ({
  hash: async (): Promise<string> => {
    return new Promise((resolve, reject) => resolve('hash'))
  }
}))

describe('Bcrypt adapter', () => {
  it('deve receber os valores corretos ', async () => {
    const salt = 12
    const sut = new BcryptAdapter(salt)
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.encrypter('any_value')
    expect(hashSpy).toHaveBeenCalledWith('any_value', salt)
  })

  it('deve retornar a hash em caso de sucesso', async () => {
    const salt = 12
    const sut = new BcryptAdapter(salt)
    const hash = await sut.encrypter('any_value')
    expect(hash).toBe('hash')
  })
})
