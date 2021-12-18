import * as p from './db-add-account-protocols'

export class DbAddAccount implements p.AddAccount {
   private readonly encrypter: p.Encrypter
   private readonly addAccountRepository: p.AddAccountRepository
   constructor (encrypter: p.Encrypter, addAccountRepository: p.AddAccountRepository) {
     this.encrypter = encrypter
     this.addAccountRepository = addAccountRepository
   }

   async add (accountData: p.AddAccountModel): Promise<p.AccountModel> {
     const { password } = accountData
     const hashedPassword = await this.encrypter.encrypter(password)
     const { add } = this.addAccountRepository
     const account = await add({ ...accountData, password: hashedPassword })
     return account
   }
}
