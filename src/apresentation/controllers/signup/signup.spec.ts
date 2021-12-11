import { SignUpController } from './singup'
import * as e from '../../erros/erros'
import * as p from '../signup/signup-protocols'

const makeAddAccount = (): p.AddAccount => {
  class AddAccountStub implements p.AddAccount {
    async add (account: p.AddAccountModel): Promise<p.AccountModel> {
      const fakeAccount = {
        id: 'valid_id',
        name: 'valid_name',
        email: 'valid_email@email.com',
        password: 'valid-pss'
      }

      return new Promise(resolve => resolve(fakeAccount))
    }
  }
  return new AddAccountStub()
}

const makeEmailValidator = (): p.EmailValidator => {
  class EmailValidatorStub implements p.EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}
interface SutTypes {
  sut: SignUpController
  emailValidator: p.EmailValidator
  addAccountStub: p.AddAccount
}

const makeSut = (): SutTypes => {
  // test buble, um tipo de moke, um função que retorna um valor certo
  // se criou um moke, pois a intenção do teste é apenas realizar uma função baseado
  // na resposta do validador
  const addAccountStub = makeAddAccount()
  const emailValidator = makeEmailValidator()
  return {
    sut: new SignUpController(emailValidator, addAccountStub),
    emailValidator,
    addAccountStub
  }
}

describe('SignUp Controller', () => {
  test('se não enviar um email, será retornado erro 400', async () => {
    // coloca a classe de sut (sistem unde test) como prefixo para
    // indicar qual classe estamos testando
    const { sut } = await makeSut()
    const httpRequest = {
      body: {
        name: 'any_name',
        password: 'any-pss',
        passwordConfirmation: 'any-pss'
      }
    }
    const htttpResponse = await sut.handle(httpRequest)
    // tobe compara os objetos em si
    expect(htttpResponse.statusCode).toBe(400)
    // tobe compara os valores dos objetos em si
    expect(htttpResponse.body).toEqual(new e.MissingParamsError('email'))
  })

  test('se não enviar um nome, será retornado erro 400', async () => {
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
    const htttpResponse = await sut.handle(httpRequest)
    // tobe compara os objetos em si
    expect(htttpResponse.statusCode).toBe(400)
    // tobe compara os valores dos objetos em si
    expect(htttpResponse.body).toEqual(new e.MissingParamsError('name'))
  })

  test('se não enviar um passwordConfirmation, será retornado erro 400', async () => {
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
    const htttpResponse = await sut.handle(httpRequest)
    // tobe compara os objetos em si
    expect(htttpResponse.statusCode).toBe(400)
    // tobe compara os valores dos objetos em si
    expect(htttpResponse.body).toEqual(new e.MissingParamsError('passwordConfirmation'))
  })

  test('se não enviar um password, será retornado erro 400', async () => {
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
    const htttpResponse = await sut.handle(httpRequest)
    // tobe compara os objetos em si
    expect(htttpResponse.statusCode).toBe(400)
    // tobe compara os valores dos objetos em si
    expect(htttpResponse.body).toEqual(new e.MissingParamsError('password'))
  })

  test('retorna um erro 400, se o password e o passWordConfirmation não correponderem', async () => {
    // coloca a classe de sut (sistem unde test) como prefixo para
    // indicar qual classe estamos testando
    const { sut } = makeSut()

    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@email@email.com',
        password: 'any-pss',
        passwordConfirmation: 'invalid-pss'
      }
    }
    const htttpResponse = await sut.handle(httpRequest)
    // tobe compara os objetos em si
    expect(htttpResponse.statusCode).toBe(400)
    // tobe compara os valores dos objetos em si
    expect(htttpResponse.body).toEqual(new e.InvalidParamError('passwordConfirmation'))
  })

  test('validadndo email', async () => {
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
    const htttpResponse = await sut.handle(httpRequest)
    // tobe compara os objetos em si
    expect(htttpResponse.statusCode).toBe(400)
    // tobe compara os valores dos objetos em si
    expect(htttpResponse.body).toEqual(new e.InvalidParamError('email'))
  })

  test('garantindo que o EmailValidator chame o email correto', async () => {
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
    await sut.handle(httpRequest)

    // toHaveBeenLastCalledWith verifica o valor passado ao isValid
    expect(isValid).toHaveBeenLastCalledWith('any_email@email.com')
  })

  test('garantindo o valores adicionados estejam corretos', async () => {
    const { sut, addAccountStub } = makeSut()
    // solicita ao jest observar o método isValid
    const addSpy = jest.spyOn(addAccountStub, 'add')
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@email.com',
        password: 'any-pss',
        passwordConfirmation: 'any-pss'
      }
    }
    await sut.handle(httpRequest)

    // toHaveBeenLastCalledWith verifica o valor passado ao isValid
    expect(addSpy).toHaveBeenLastCalledWith({
      name: 'any_name',
      email: 'any_email@email.com',
      password: 'any-pss'
    })
  })

  test('Excessão vinda do servidor', async () => {
    const { sut, emailValidator } = makeSut()

    // serve para simular um valor de retorno diferente do stub
    jest.spyOn(emailValidator, 'isValid').mockImplementationOnce(() => { throw new Error() })
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@email.com',
        password: 'any-pss',
        passwordConfirmation: 'any-pss'
      }
    }

    const htttpResponse = await sut.handle(httpRequest)
    // tobe compara os objetos em si
    expect(htttpResponse.statusCode).toBe(500)
    // tobe compara os valores dos objetos em si
    expect(htttpResponse.body).toEqual(new e.ServerError())
  })

  test('Excessão vinda do servidor addAccount', async () => {
    const { sut, addAccountStub } = makeSut()

    // serve para simular um valor de retorno diferente do stub
    jest.spyOn(addAccountStub, 'add').mockImplementationOnce(async () => {
      return new Promise((res, rej) => rej(new Error()))
    })
    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@email.com',
        password: 'any-pss',
        passwordConfirmation: 'any-pss'
      }
    }

    const htttpResponse = await sut.handle(httpRequest)
    // tobe compara os objetos em si
    expect(htttpResponse.statusCode).toBe(500)
    // tobe compara os valores dos objetos em si
    expect(htttpResponse.body).toEqual(new e.ServerError())
  })

  test('Sucesso ao passar dados válidos', async () => {
    const { sut } = makeSut()

    const httpRequest = {
      body: {
        name: 'any_name',
        email: 'any_email@email.com',
        password: 'any-pss',
        passwordConfirmation: 'any-pss'
      }
    }

    const htttpResponse = await sut.handle(httpRequest)
    // tobe compara os objetos em si
    expect(htttpResponse.statusCode).toBe(200)
    // tobe compara os valores dos objetos em si
    expect(htttpResponse.body).toEqual({
      id: 'valid_id',
      name: 'valid_name',
      email: 'valid_email@email.com',
      password: 'valid-pss'
    })
  })
})
