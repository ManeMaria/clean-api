
// lembrar de sempre commitar primeiro o arquivo de produção antes
// do arquivo de teste
export class SignUpController {
  handle (httpRequest: any): any {
    return {
      statusCode: 400,
      body: new Error('Parâmetros não fornecidos')
    }
  }
}
