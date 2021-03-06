
import { AccountModelData } from '../../../../data/protocols/account-data'
import { AddAccountModelData } from '../../../../data/protocols/add-account-data'
import { AddAccountRepository } from '../../../../data/protocols/add-account-repository'
import { mongoHelper } from '../helpers/mongo-helper'

export class AccountMongoRepository implements AddAccountRepository {
  async add (accountData: AddAccountModelData): Promise<AccountModelData> {
    const accountColletion = await mongoHelper.getColletion('accounts')
    await accountColletion.insertOne(accountData)
    return mongoHelper.map(accountData)
  }
}
