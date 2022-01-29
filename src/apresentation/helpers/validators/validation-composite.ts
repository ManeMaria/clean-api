import { Validation } from './validation'

// não sei porquê, mas tentar guardar os valores nas props da classe não funciona
// o método não enxergar a props
// joguei numa variável pra soclucionar
let validationsMemo: Validation[] | undefined
export class ValidationComposite implements Validation {
  constructor (validations: Validation[]
  ) {
    validationsMemo = validations
  }

  validate (input: any): Error {
    for (const validation of validationsMemo) {
      const error = validation.validate(input)
      if (error) {
        return error
      }
    }
  }
}
