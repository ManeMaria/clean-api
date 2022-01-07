import { SignUpController } from '../../../apresentation/controllers/signup/singup'
import { EmailValidatorAdapter } from '../../../apresentation/utils/email-validator/email-validator-adapter'
import { DbAddAccount } from '../../../data/usecase/add-account/db-add-account'
import { BcryptAdapter } from '../../../infra/criptography/bcrypt-adapter'
import { AccountMongoRepository } from '../../../infra/data-base/mongodb/account-repoitory/account'

// MANGUINHO CRIOU OUTRA PASTA E OUTRO ARQUIVO PARA SER O INDEX DAS CLASSES

export const makeSignUpController = (): SignUpController => {
  const salt = 12
  const accountMongoRepository = new AccountMongoRepository()
  const bcryptAdapter = new BcryptAdapter(salt)
  const dbAddAccount = new DbAddAccount(bcryptAdapter, accountMongoRepository)
  const emailValidatorAdapter = new EmailValidatorAdapter()
  return new SignUpController(emailValidatorAdapter, dbAddAccount)
}
