import { AccountModelData } from './account-data'
export interface AddAccountModelData {
  name: string
  email: string
  password: string
}
export interface AddAccountData {
  add: (account: AddAccountModelData) => Promise<AccountModelData>
}
