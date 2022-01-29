import { InvalidParamError } from '../../erros/invalid-params-error'
import { Validation } from './validation'

export class CompareFieldsValidation implements Validation {
  constructor (
    readonly fieldName: string,
    readonly fieldTwoName: string
  ) {}

  validate (input: any): Error {
    if (input[this.fieldName] !== input[this.fieldTwoName]) {
      return new InvalidParamError(this.fieldTwoName)
    }
  }
}
