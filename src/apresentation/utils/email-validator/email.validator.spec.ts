import { EmailValidatorAdapter } from './email-validator'

describe('EmailValidator adapter', () => {
  it('should return false if is not validated', () => {
    const sut = new EmailValidatorAdapter()
    const isValid = sut.isValid('invalid_email@email.com')
    expect(isValid).toBe(false)
  })
})
