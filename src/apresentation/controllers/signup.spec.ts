import { SignUpController } from './singup'
// lembrar de sempre commitar primeiro o arquivo de produção antes
// do arquivo de teste
describe('SignUp Controller', () => {
  test('se não enviar um nome, será retornado erro 400', () => {
    // coloca a classe de sut (sistem unde test) como prefixo para
    // indicar qual classe estamos testando
    const sut = new SignUpController()
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
    expect(htttpResponse.body).toEqual(new Error('Parâmetros não fornecidos'))
  })
})
