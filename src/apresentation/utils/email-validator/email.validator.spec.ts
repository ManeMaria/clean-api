
import { EmailValidatorAdapter } from './email-validator'
import validator from 'validator'
jest.mock('validator', () => (
  {
    isEmail: (): boolean => true
  }
))

describe('EmailValidator adapter', () => {
  it('should return true if is not validated', () => {
    const sut = new EmailValidatorAdapter()
    const isValid = sut.isValid('valid_email@email.com')
    expect(isValid).toBe(true)
  })

  it('should return false if is not validated', () => {
    const sut = new EmailValidatorAdapter()
    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false)
    const isValid = sut.isValid('invalid_email@email.com')
    expect(isValid).toBe(false)
  })
})
