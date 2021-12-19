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
  // mockar um valor é simular o valor de retorno de uma função
  // o método hash foi simulado com uma valor qualquer, pois o que interessa é se ele retorna um valor,
  // em caso de sucesso, não como ele encripta um valor
  it('deve retornar a hash em caso de sucesso', async () => {
    const salt = 12
    const sut = new BcryptAdapter(salt)
    const hash = await sut.encrypter('any_value')
    expect(hash).toBe('hash')
  })
})
