import { DbAddAccount } from './db-add-account'
import * as p from './db-add-account-protocols'
interface SutTypes {
  sut: DbAddAccount
  encyprterStub: p.Encrypter
}

const makeEncrypterStub = (): p.Encrypter => {
  class EncrypterStub implements p.Encrypter {
    async encrypter (value: string): Promise<string> {
      return new Promise(resolve => resolve('hashed_password'))
    }
  }
  return new EncrypterStub()
}

const makeStub = (): SutTypes => {
  const encyprterStub = makeEncrypterStub()
  const sut = new DbAddAccount(encyprterStub)
  return {
    encyprterStub,
    sut
  }
}

describe('DbAddAccount Usecase', () => {
  it('Deve receber um password adequado para encriptografar', async () => {
    const { sut, encyprterStub } = makeStub()
    const scryptSpy = jest.spyOn(encyprterStub, 'encrypter')
    const accountData = {
      name: 'valid_name',
      email: 'valid_email@valid.com',
      password: 'valid_password'
    }

    await sut.add(accountData)
    expect(scryptSpy).toHaveBeenCalledWith('valid_password')
  })

  it('O encrypeter deve retornar uma exceção', async () => {
    const { sut, encyprterStub } = makeStub()
    jest.spyOn(encyprterStub, 'encrypter').mockReturnValueOnce(
      new Promise((resolve, reject) => reject(new Error()))
    )
    const accountData = {
      name: 'valid_name',
      email: 'valid_email@valid.com',
      password: 'valid_password'
    }

    const promisse = sut.add(accountData)
    await expect(promisse).rejects.toThrow()
  })
})
