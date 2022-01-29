import { CompareFieldsValidation } from '../../../apresentation/helpers/validators/compare-fildes-validation'
import { RequiredFieldValidation } from '../../../apresentation/helpers/validators/required-field-validation'
import { ValidationComposite } from '../../../apresentation/helpers/validators/validation-composite'
import { makeSignUpValidation } from './signup-validation'

// o jeste permite vc mockar um modulo inteiro
jest.mock('../../../apresentation/helpers/validators/validation-composite')

describe('Signup Validation', () => {
  const fields = ['email', 'name', 'password', 'passwordConfirmation']
  const validations: RequiredFieldValidation[] = fields.map(field => new RequiredFieldValidation(field))

  test('deve averiguar se os parâmetros foram passados corretamente', () => {
    // chama a função que retorna a classe
    makeSignUpValidation()
    // e podemos observar o comportamento interno da classe
    expect(ValidationComposite).toHaveBeenCalledWith([
      ...validations,
      new CompareFieldsValidation(fields[2], fields[3])
    ])
  })
})
