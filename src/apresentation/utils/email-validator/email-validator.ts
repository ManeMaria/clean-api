import validator from 'validator'
import { EmailValidator } from '../../protocols/email-validator'

export class EmailValidatorAdapter implements EmailValidator {
//   constructor (email) {
//     this._email = email
//   }

  isValid (email: string): boolean {
    return validator.isEmail(email)
  }
}