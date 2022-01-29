import { MissingParamsError } from '../../erros/missing-params-erros'
import { Validation } from './validation'

export class RequiredFieldValidation implements Validation {
  constructor (
    readonly fieldName: string
  ) {}

  validate (input: any): Error {
    if (!input[this.fieldName]) {
      return new MissingParamsError(this.fieldName)
    }
  }
}
