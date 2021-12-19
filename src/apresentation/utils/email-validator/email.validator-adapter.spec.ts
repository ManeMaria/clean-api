
import { EmailValidatorAdapter } from './email-validator-adapter'
import validator from 'validator'

// o mock simula que lib de validação sempre retorne true,
// pois o teste fora feito antes de baixar a lib
jest.mock('validator', () => (
  {
    isEmail: (): boolean => true
  }
))
const makeSut = (): EmailValidatorAdapter => {
  return new EmailValidatorAdapter()
}
describe('EmailValidator adapter', () => {
  it('should return true if is not validated', () => {
    const sut = makeSut()
    // mockar um valor é simular o valor de retorno de uma função
    const isValid = sut.isValid('valid_email@email.com')
    expect(isValid).toBe(true)
  })

  it('should return false if is not validated', () => {
    const sut = makeSut()
    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false)
    const isValid = sut.isValid('invalid_email@email.com')
    expect(isValid).toBe(false)
  })

  it('deve validar o email correto', () => {
    const sut = makeSut()
    const isEmail = jest.spyOn(validator, 'isEmail')
    sut.isValid('any_email@email.com')
    expect(isEmail).toHaveBeenCalledWith('any_email@email.com')
  })
})
