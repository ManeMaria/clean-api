import { DbAddAccount } from '../add-account/db-add-account'
// import {Encrypter} from '../../protocols/encrypter'

// const makeEncrypterStub = async (): Promise<any> => {

//   }
//   return new EncrypterStub()
// }

describe('DbAddAccount Usecase', () => {
  it('Deve receber um password adequado para encriptografar', async () => {
    class EncrypterStub {
      async encrypter (value: string): Promise<string> {
        return new Promise(resolve => resolve('hashed_password'))
      }
    }
    const encrypterStub = new EncrypterStub()
    const sut = new DbAddAccount(encrypterStub)
    const scryptSpy = jest.spyOn(encrypterStub, 'encrypter')
    const accountData = {
      name: 'valid_name',
      email: 'valid_email@valid.com',
      password: 'valid_password'
    }

    await sut.add(accountData)
    expect(scryptSpy).toHaveBeenCalledWith('valid_password')
  })
})
