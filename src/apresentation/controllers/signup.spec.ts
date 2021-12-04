import { SignUpController } from './singup'
import * as e from '../erros/erros'
import * as p from '../protocols/index'

interface SutTypes {
  sut: SignUpController
  emailValidator: p.EmailValidator
}
const makeEmailValidator = (): p.EmailValidator => {
  class EmailValidatorStub implements p.EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}

const makeEmailValidatorWithError = (): p.EmailValidator => {
  class EmailValidatorStub implements p.EmailValidator {
    isValid (email: string): boolean {
      throw new Error()
    }
  }
  return new EmailValidatorStub()
}
const makeSut = (): SutTypes => {
  // test buble, um tipo de moke, um função que retorna um valor certo
  // se criou um moke, pois a intenção do teste é apenas realizar uma função baseado
  // na resposta do validador
  const emailValidator = makeEmailValidator()
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
    expect(htttpResponse.body).toEqual(new e.MissingParamsError('email'))
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
    expect(htttpResponse.body).toEqual(new e.MissingParamsError('name'))
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
    expect(htttpResponse.body).toEqual(new e.MissingParamsError('passwordConfirmation'))
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
    expect(htttpResponse.body).toEqual(new e.MissingParamsError('password'))
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
    expect(htttpResponse.body).toEqual(new e.InvalidParamError('email'))
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
    const emailValidator = makeEmailValidatorWithError()
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
    expect(htttpResponse.body).toEqual(new e.ServerError())
  })
})
