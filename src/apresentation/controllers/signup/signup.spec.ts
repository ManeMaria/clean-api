import { SignUpController } from './singup'
import * as e from '../../erros/erros'
import * as p from '../signup/signup-protocols'

// NOTA: após a criação dos testes, o arquivo foi refatorado em sucessivos dias.

const makFakeAccount = (): p.AccountModel => ({
  id: 'valid_id',
  name: 'valid_name',
  email: 'valid_email@email.com',
  password: 'valid-pss'
})

const makFakeRequest = (): p.HttpRequest => ({
  body: {
    name: 'any_name',
    email: 'any_email@email.com',
    password: 'any-pss',
    passwordConfirmation: 'any-pss'
  }
})

const makeFakeServerError = (): p.HttpResponse => {
  const fakeError = new Error()
  fakeError.stack = 'any_stack'
  return p.serverError(fakeError)
}

const makeValidation = (): p.Validation => {
  class ValidationStub implements p.Validation {
    validate (input: any): Error {
      return null
    }
  }
  return new ValidationStub()
}
const makeAddAccount = (): p.AddAccount => {
  class AddAccountStub implements p.AddAccount {
    async add (account: p.AddAccountModel): Promise<p.AccountModel> {
      return new Promise(resolve => resolve(makFakeAccount()))
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
  validationStub: p.Validation
}

const makeSut = (): SutTypes => {
  // test buble, um tipo de moke, um função que retorna um valor certo
  // se criou um moke, pois a intenção do teste é apenas realizar uma função baseado
  // na resposta do validador
  const validationStub = makeValidation()
  const addAccountStub = makeAddAccount()
  const emailValidator = makeEmailValidator()
  return {
    sut: new SignUpController(emailValidator, addAccountStub, validationStub),
    emailValidator,
    addAccountStub,
    validationStub
  }
}

describe('SignUp Controller', () => {
  // test('se não enviar um email, será retornado erro 400', async () => {
  //   // coloca a classe de sut (sistem unde test) como prefixo para
  //   // indicar qual classe estamos testando
  //   const { sut } = await makeSut()
  //   const httpRequest = {
  //     body: {
  //       name: 'any_name',
  //       password: 'any-pss',
  //       passwordConfirmation: 'any-pss'
  //     }
  //   }
  //   const htttpResponse = await sut.handle(httpRequest)

  //   // tobe compara os valores das props dos objetos em si
  //   expect(htttpResponse).toEqual(p.badRequest(new e.MissingParamsError('email')))
  // })

  // test('se não enviar um nome, será retornado erro 400', async () => {
  //   // coloca a classe de sut (sistem unde test) como prefixo para
  //   // indicar qual classe estamos testando
  //   const { sut } = makeSut()
  //   const httpRequest = {
  //     body: {
  //       email: 'any@email@email.com',
  //       password: 'any-pss',
  //       passwordConfirmation: 'any-pss'
  //     }
  //   }
  //   const htttpResponse = await sut.handle(httpRequest)

  //   expect(htttpResponse).toEqual(p.badRequest(new e.MissingParamsError('name')))
  // })

  // test('se não enviar um passwordConfirmation, será retornado erro 400', async () => {
  //   // coloca a classe de sut (sistem unde test) como prefixo para
  //   // indicar qual classe estamos testando
  //   const { sut } = makeSut()
  //   const httpRequest = {
  //     body: {
  //       name: 'any_name',
  //       email: 'any@email@email.com',
  //       password: 'any-pss'
  //     }
  //   }
  //   const htttpResponse = await sut.handle(httpRequest)

  //   expect(htttpResponse).toEqual(p.badRequest(new e.MissingParamsError('passwordConfirmation')))
  // })

  // test('se não enviar um password, será retornado erro 400', async () => {
  //   // coloca a classe de sut (sistem unde test) como prefixo para
  //   // indicar qual classe estamos testando
  //   const { sut } = makeSut()
  //   const httpRequest = {
  //     body: {
  //       name: 'any_name',
  //       email: 'any@email@email.com',
  //       passwordConfirmation: 'any-pss'
  //     }
  //   }
  //   const htttpResponse = await sut.handle(httpRequest)

  //   expect(htttpResponse).toEqual(p.badRequest(new e.MissingParamsError('password')))
  // })

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

    expect(htttpResponse).toEqual(p.badRequest(new e.InvalidParamError('passwordConfirmation')))
  })

  test('validadndo email', async () => {
    // coloca a classe de sut (sistem unde test) como prefixo para
    // indicar qual classe estamos testando
    const { sut, emailValidator } = makeSut()

    jest.spyOn(emailValidator, 'isValid').mockReturnValueOnce(false)

    const htttpResponse = await sut.handle(makFakeRequest())

    expect(htttpResponse).toEqual(p.badRequest(new e.InvalidParamError('email')))
  })

  test('garantindo que o EmailValidator chame o email correto', async () => {
    const { sut, emailValidator } = makeSut()
    // solicita ao jest observar o método isValid
    const isValid = jest.spyOn(emailValidator, 'isValid')
    await sut.handle(makFakeRequest())

    // toHaveBeenLastCalledWith verifica o valor passado ao isValid
    expect(isValid).toHaveBeenLastCalledWith('any_email@email.com')
  })

  test('garantindo o valores adicionados estejam corretos', async () => {
    const { sut, addAccountStub } = makeSut()
    // solicita ao jest observar o método isValid
    const addSpy = jest.spyOn(addAccountStub, 'add')
    await sut.handle(makFakeRequest())

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

    const htttpResponse = await sut.handle(makFakeRequest())

    expect(htttpResponse).toEqual(makeFakeServerError())
  })

  test('Excessão vinda do servidor addAccount', async () => {
    const { sut, addAccountStub } = makeSut()

    // serve para simular um valor de retorno diferente do stub
    jest.spyOn(addAccountStub, 'add').mockImplementationOnce(async () => {
      return new Promise((resolve, reject) => reject(new Error()))
    })

    const htttpResponse = await sut.handle(makFakeRequest())

    expect(htttpResponse).toEqual(makeFakeServerError())
  })

  test('Sucesso ao passar dados válidos', async () => {
    const { sut } = makeSut()

    const htttpResponse = await sut.handle(makFakeRequest())
    // toEqual compara as props dos objetos em si
    expect(htttpResponse).toEqual(p.sucess(makFakeAccount()))
  })

  test('garantindo que o Validation esteja recebendo os corretos', async () => {
    const { sut, validationStub } = makeSut()
    // solicita ao jest observar o método isValid
    const validateSpy = jest.spyOn(validationStub, 'validate')
    const httpRequest = makFakeRequest()
    await sut.handle(makFakeRequest())

    // toHaveBeenLastCalledWith verifica o valor passado ao isValid
    expect(validateSpy).toHaveBeenLastCalledWith(httpRequest.body)
  })

  test('DeveRetornar 400 em caso da lavidação não passar', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new e.MissingParamsError('any_field'))
    const htttpResponse = await sut.handle(makFakeRequest())
    // não importa a field, só queremos saber que retorne um erro
    expect(htttpResponse).toEqual(p.badRequest(new e.MissingParamsError('any_field')))
  })
})
