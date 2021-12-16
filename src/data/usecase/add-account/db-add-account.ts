import * as p from '../../../domain/usecase/add-account'
import { AccountModel } from '../../../domain/models/account'
import { Encrypter } from '../../protocols/encrypter'

export class DbAddAccount implements p.AddAccount {
   private readonly encrypter: Encrypter
   constructor (encrypter: Encrypter) {
     this.encrypter = encrypter
   }

   async add (account: p.AddAccountModel): Promise<AccountModel> {
     const { password } = account
     await this.encrypter.encrypter(password)
     return new Promise(resolve => resolve(null))
   }
}
