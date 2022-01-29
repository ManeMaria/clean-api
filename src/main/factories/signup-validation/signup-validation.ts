/* eslint-disable no-new */

// import { RequiredFieldValidation } from '../../../apresentation/helpers/validators/required-field-validation'
import { RequiredFieldValidation } from '../../../apresentation/helpers/validators/required-field-validation'
import { ValidationComposite } from '../../../apresentation/helpers/validators/validation-composite'

// MANGUINHO CRIOU OUTRA PASTA E OUTRO ARQUIVO PARA SER O INDEX DAS CLASSES

export const makeSignUpValidation = (): ValidationComposite => {
  const validations = ['email', 'name', 'password', 'passwordConfirmation']
    .map(field => new RequiredFieldValidation(field))

  return new ValidationComposite(validations)
}
