
import { AccountModelData } from '../../../../data/protocols/account-data'
import { AddAccountModelData } from '../../../../data/protocols/add-account-data'
import { AddAccountRepository } from '../../../../data/protocols/add-account-repository'
import { mongoHelper } from '../helpers/mongo-helper'

export class AccountMongoRepository implements AddAccountRepository {
  async add (accountData: AddAccountModelData): Promise<AccountModelData> {
    const accountColletion = mongoHelper.getColletion('accounts')
    await accountColletion.insertOne(accountData)

    // @ts-expect-error
    const { _id, ...accountWithOutId } = accountData
    const refactorResult = { ...accountWithOutId, id: _id.toString() }
    return refactorResult
  }
}
