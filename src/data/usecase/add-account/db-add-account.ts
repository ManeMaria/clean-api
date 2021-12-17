import * as p from './db-add-account-protocols'

export class DbAddAccount implements p.AddAccount {
   private readonly encrypter: p.Encrypter
   constructor (encrypter: p.Encrypter) {
     this.encrypter = encrypter
   }

   async add (account: p.AddAccountModel): Promise<p.AccountModel> {
     const { password } = account
     await this.encrypter.encrypter(password)
     return new Promise(resolve => resolve(null))
   }
}
