import { DbAddAccount } from './db-add-account'
import * as p from './db-add-account-protocols'

const makeAddAccountRepository = (): p.AddAccountRepository => {
  class AddAccountRepositoryStub implements p.AddAccountRepository {
    async add (account: p.AddAccountModelData): Promise<p.AccountModelData> {
      const fakeAccount = {
        id: 'valid_id',
        name: 'valid_name',
        email: 'valid_email@valid.com',
        password: 'hashed_password'
      }
      return new Promise(resolve => resolve(fakeAccount))
    }
  }
  return new AddAccountRepositoryStub()
}
interface SutTypes {
  sut: DbAddAccount
  encyprterStub: p.Encrypter
  addAccountRepositoryStub: p.AddAccountRepository
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
  const addAccountRepositoryStub = makeAddAccountRepository()
  const sut = new DbAddAccount(encyprterStub, addAccountRepositoryStub)
  return {
    encyprterStub,
    addAccountRepositoryStub,
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

  it('Deve fazer uma chamda ao AddAccountRepository com os valores corretos', async () => {
    const { sut, addAccountRepositoryStub } = makeStub()
    const addSpy = jest.spyOn(addAccountRepositoryStub, 'add')
    const accountData = {
      name: 'valid_name',
      email: 'valid_email@valid.com',
      password: 'valid_password'
    }

    await sut.add(accountData)
    expect(addSpy).toHaveBeenCalledWith({
      name: 'valid_name',
      email: 'valid_email@valid.com',
      password: 'hashed_password'
    })
  })

  it('O AddAccountRepository deve retornar uma exceção', async () => {
    const { sut, addAccountRepositoryStub } = makeStub()
    jest.spyOn(addAccountRepositoryStub, 'add').mockReturnValueOnce(
      new Promise((resolve, reject) => reject(new Error()))
    )
    const accountData = {
      id: 'valid_id',
      name: 'valid_name',
      email: 'valid_email@valid.com',
      password: 'hashed_password'
    }

    const promisse = sut.add(accountData)
    await expect(promisse).rejects.toThrow()
  })

  it('Deve fazer uma chamda ao AddAccountRepository e trazer os valores em caso de sucesso', async () => {
    const { sut } = makeStub()

    const accountData = {
      name: 'valid_name',
      email: 'valid_email@valid.com',
      password: 'valid_password'
    }

    const account = await sut.add(accountData)
    expect(account).toEqual({
      id: 'valid_id',
      name: 'valid_name',
      email: 'valid_email@valid.com',
      password: 'hashed_password'
    })
  })
})
