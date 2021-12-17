import { AddAccountModelData } from './add-account-data'
import { AccountModelData } from './account-data'

export interface AddAccountRepository {
  add: (account: AddAccountModelData) => Promise<AccountModelData>
}
