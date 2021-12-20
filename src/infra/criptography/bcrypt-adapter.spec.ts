import bcrypt from 'bcrypt'
import { BcryptAdapter } from './bcrypt-adapter'

const salt = 12

jest.mock('bcrypt', () => ({
  hash: async (): Promise<string> => {
    return new Promise((resolve, reject) => resolve('hash'))
  }
}))

const makeSut = (): BcryptAdapter => {
  return new BcryptAdapter(salt)
}

describe('Bcrypt adapter', () => {
  it('deve receber os valores corretos ', async () => {
    const sut = makeSut()
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.encrypter('any_value')
    expect(hashSpy).toHaveBeenCalledWith('any_value', salt)
  })
  // mockar um valor é simular o valor de retorno de uma função
  // o método hash foi simulado com uma valor qualquer, pois o que interessa é se ele retorna um valor,
  // em caso de sucesso, não como ele encripta um valor
  it('deve retornar a hash em caso de sucesso', async () => {
    const sut = makeSut()
    const hash = await sut.encrypter('any_value')
    expect(hash).toBe('hash')
  })

  it('deve retornar um throw em caso de erro', async () => {
    const sut = makeSut()
    jest.spyOn(bcrypt, 'hash').mockReturnValueOnce(
      // @ts-expect-error
      new Promise((resolve, reject) => reject(new Error()))
    )
    const promise = sut.encrypter('any_value')
    await expect(promise).rejects.toThrow()
  })
})
