import { RequiredFieldValidation } from '../../../apresentation/helpers/validators/required-field-validation'
import { ValidationComposite } from '../../../apresentation/helpers/validators/validation-composite'
import { makeSignUpValidation } from './signup-validation'

// o jeste permite vc mockar um modulo inteiro
jest.mock('../../../apresentation/helpers/validators/validation-composite')

describe('Signup Validation', () => {
  const validations: RequiredFieldValidation[] = ['email', 'name', 'password', 'passwordConfirmation']
    .map(field => new RequiredFieldValidation(field))

  test('should ', () => {
    // chama a função que retorna a classe
    makeSignUpValidation()
    // e podemos observar o comportamento interno da classe
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
