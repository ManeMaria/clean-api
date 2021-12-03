import { SignUpController } from './singup'
import { MissingParamsError } from '../erros/missing-parrams-erros'

const makeSut = (): SignUpController => new SignUpController()
describe('SignUp Controller', () => {
  test('se não enviar um email, será retornado erro 400', () => {
    // coloca a classe de sut (sistem unde test) como prefixo para
    // indicar qual classe estamos testando
    const sut = makeSut()
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
})

// lembrar de sempre commitar primeiro o arquivo de produção antes
// do arquivo de teste
describe('SignUp Controller', () => {
  test('se não enviar um nome, será retornado erro 400', () => {
    // coloca a classe de sut (sistem unde test) como prefixo para
    // indicar qual classe estamos testando
    const sut = makeSut()
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
})

// lembrar de sempre commitar primeiro o arquivo de produção antes
// do arquivo de teste
describe('SignUp Controller', () => {
  test('se não enviar um password, será retornado erro 400', () => {
    // coloca a classe de sut (sistem unde test) como prefixo para
    // indicar qual classe estamos testando
    const sut = makeSut()
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
})

// lembrar de sempre commitar primeiro o arquivo de produção antes
// do arquivo de teste
describe('SignUp Controller', () => {
  test('se não enviar um passwordConfirmation, será retornado erro 400', () => {
    // coloca a classe de sut (sistem unde test) como prefixo para
    // indicar qual classe estamos testando
    const sut = makeSut()
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
})
