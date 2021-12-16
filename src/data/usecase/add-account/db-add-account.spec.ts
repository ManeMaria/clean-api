import { DbAddAccount } from '../add-account/db-add-account'
import { Encrypter } from '../../protocols/encrypter'
interface SutTypes {
  sut: DbAddAccount
  encyprterStub: Encrypter
}

const makeStub = (): SutTypes => {
  class EncrypterStub implements Encrypter {
    async encrypter (value: string): Promise<string> {
      return new Promise(resolve => resolve('hashed_password'))
    }
  }
  const encyprterStub = new EncrypterStub()
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
})
