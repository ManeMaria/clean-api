import { SignUpController } from '../../../apresentation/controllers/signup/singup'
import { Controller } from '../../../apresentation/protocols'
import { EmailValidatorAdapter } from '../../../apresentation/utils/email-validator/email-validator-adapter'
import { DbAddAccount } from '../../../data/usecase/add-account/db-add-account'
import { BcryptAdapter } from '../../../infra/criptography/bcrypt-adapter'
import { AccountMongoRepository } from '../../../infra/data-base/mongodb/account-repoitory/account'
import { RepositoryErros } from '../../../infra/log-error-repository/log-error-repository'
import { LogControllerDecorator } from '../../decorators/log/log'

// MANGUINHO CRIOU OUTRA PASTA E OUTRO ARQUIVO PARA SER O INDEX DAS CLASSES

export const makeSignUpController = (): Controller => {
  const salt = 12
  const accountMongoRepository = new AccountMongoRepository()
  const bcryptAdapter = new BcryptAdapter(salt)
  const dbAddAccount = new DbAddAccount(bcryptAdapter, accountMongoRepository)
  const emailValidatorAdapter = new EmailValidatorAdapter()
  const signUpController = new SignUpController(emailValidatorAdapter, dbAddAccount)
  const logErrorRepository = new RepositoryErros()

  return new LogControllerDecorator(signUpController, logErrorRepository)
}
