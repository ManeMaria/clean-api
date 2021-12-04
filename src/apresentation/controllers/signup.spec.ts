import { SignUpController } from './singup'
import { MissingParamsError } from '../erros/missing-params-erros'
import { InvalidParamError } from '../erros/invalid-params-error'
import { EmailValidator } from '../protocols/email-validator'
import { ServerError } from '../erros/server-erros'

interface SutTypes {
  sut: SignUpController
  emailValidator: EmailValidator
}
const makeSut = (): SutTypes => {
  // test buble, um tipo de moke, um função que retorna um valor certo
  // se criou um moke, pois a intenção do teste é apenas realizar uma função baseado
  // na resposta do validador
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }

  const emailValidator = new EmailValidatorStub()
  return {
    sut: new SignUpController(emailValidator),
    emailValidator
  }
}

describe('SignUp Controller', () => {
  test('se não enviar um email, será retornado erro 400', () => {
    // coloca a classe de sut (sistem unde test) como prefixo para
    // indicar qual classe estamos testando
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name',
        password: 'any-pss',
        passwordConfirmation: 'any-pss'
      }
    }
    const htttpResponse = sut.handle(httpRequest)
    // tobe compara os objetos em si
    expect(htttpResponse.statusCode).toBe(400)
    // tobe compara os valores dos objetos em si
    expect(htttpResponse.body).toEqual(new MissingParamsError('email'))
  })

  test('se não enviar um nome, será retornado erro 400', () => {
    // coloca a classe de sut (sistem unde test) como prefixo para
    // indicar qual classe estamos testando
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        email: 'any@email@email.com',
        password: 'any-pss',
        passwordConfirmation: 'any-pss'
      }
    }
    const htttpResponse = sut.handle(httpRequest)
    // tobe compara os objetos em si
    expect(htttpResponse.statusCode).toBe(400)
    // tobe compara os valores dos objetos em si
    expect(htttpResponse.body).toEqual(new MissingParamsError('name'))
  })

  test('se não enviar um passwordConfirmation, será retornado erro 400', () => {
    // coloca a classe de sut (sistem unde test) como prefixo para
    // indicar qual classe estamos testando
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any@email@email.com',
        password: 'any-pss'
      }
    }
    const htttpResponse = sut.handle(httpRequest)
    // tobe compara os objetos em si
    expect(htttpResponse.statusCode).toBe(400)
    // tobe compara os valores dos objetos em si
    expect(htttpResponse.body).toEqual(new MissingParamsError('passwordConfirmation'))
  })

  test('se não enviar um password, será retornado erro 400', () => {
    // coloca a classe de sut (sistem unde test) como prefixo para
    // indicar qual classe estamos testando
    const { sut } = makeSut()
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any@email@email.com',
        passwordConfirmation: 'any-pss'
      }
    }
    const htttpResponse = sut.handle(httpRequest)
    // tobe compara os objetos em si
    expect(htttpResponse.statusCode).toBe(400)
    // tobe compara os valores dos objetos em si
    expect(htttpResponse.body).toEqual(new MissingParamsError('password'))
  })

  test('validadndo email', () => {
    // coloca a classe de sut (sistem unde test) como prefixo para
    // indicar qual classe estamos testando
    const { sut, emailValidator } = makeSut()

    jest.spyOn(emailValidator, 'isValid').mockReturnValueOnce(false)
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'invali_email@email@email.com',
        password: 'any-pss',
        passwordConfirmation: 'any-pss'
      }
    }
    const htttpResponse = sut.handle(httpRequest)
    // tobe compara os objetos em si
    expect(htttpResponse.statusCode).toBe(400)
    // tobe compara os valores dos objetos em si
    expect(htttpResponse.body).toEqual(new InvalidParamError('email'))
  })

  test('garantindo que o EmailValidator chame o email correto', () => {
    const { sut, emailValidator } = makeSut()
    // solicita ao jest observar o método isValid
    const isValid = jest.spyOn(emailValidator, 'isValid')
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@email.com',
        password: 'any-pss',
        passwordConfirmation: 'any-pss'
      }
    }
    sut.handle(httpRequest)

    // toHaveBeenLastCalledWith verifica o valor passado ao isValid
    expect(isValid).toHaveBeenLastCalledWith('any_email@email.com')
  })

  test('erro do servidor', () => {
    class EmailValidatorStub implements EmailValidator {
      isValid (email: string): boolean {
        throw new Error()
      }
    }

    const emailValidator = new EmailValidatorStub()
    const sut = new SignUpController(emailValidator)
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'invali_email@email@email.com',
        password: 'any-pss',
        passwordConfirmation: 'any-pss'
      }
    }
    const htttpResponse = sut.handle(httpRequest)
    // tobe compara os objetos em si
    expect(htttpResponse.statusCode).toBe(500)
    // tobe compara os valores dos objetos em si
    expect(htttpResponse.body).toEqual(new ServerError())
  })
})
