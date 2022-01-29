/* eslint-disable no-new */

// import { RequiredFieldValidation } from '../../../apresentation/helpers/validators/required-field-validation'
import { CompareFieldsValidation } from '../../../apresentation/helpers/validators/compare-fildes-validation'
import { RequiredFieldValidation } from '../../../apresentation/helpers/validators/required-field-validation'
import { ValidationComposite } from '../../../apresentation/helpers/validators/validation-composite'

// MANGUINHO CRIOU OUTRA PASTA E OUTRO ARQUIVO PARA SER O INDEX DAS CLASSES

export const makeSignUpValidation = (): ValidationComposite => {
  const fields = ['email', 'name', 'password', 'passwordConfirmation']
  const validations = fields.map(field => new RequiredFieldValidation(field))

  return new ValidationComposite([
    ...validations,
    new CompareFieldsValidation(fields[2], fields[3])
  ])
}
