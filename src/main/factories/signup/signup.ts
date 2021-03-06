import { SignUpController } from '../../../apresentation/controllers/signup/singup'
import { Controller } from '../../../apresentation/protocols'
import { EmailValidatorAdapter } from '../../../apresentation/utils/email-validator/email-validator-adapter'
import { DbAddAccount } from '../../../data/usecase/add-account/db-add-account'
import { BcryptAdapter } from '../../../infra/criptography/bcrypt-adapter'
import { AccountMongoRepository } from '../../../infra/data-base/mongodb/account-repoitory/account'
import { LogMongoRepository } from '../../../infra/log-repository/log-repository'
import { LogControllerDecorator } from '../../decorators/log/log'
import { makeSignUpValidation } from '../signup-validation/signup-validation'

// MANGUINHO CRIOU OUTRA PASTA E OUTRO ARQUIVO PARA SER O INDEX DAS CLASSES

export const makeSignUpController = (): Controller => {
  const salt = 12
  const accountMongoRepository = new AccountMongoRepository()
  const bcryptAdapter = new BcryptAdapter(salt)
  const dbAddAccount = new DbAddAccount(bcryptAdapter, accountMongoRepository)
  const emailValidatorAdapter = new EmailValidatorAdapter()
  const signUpController = new SignUpController(emailValidatorAdapter, dbAddAccount, makeSignUpValidation())
  const logErrorRepository = new LogMongoRepository()

  return new LogControllerDecorator(signUpController, logErrorRepository)
}
