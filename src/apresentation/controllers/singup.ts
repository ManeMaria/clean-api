import { badRequest } from '../helpers/http-helpers'
import * as i from '../protocols/http'

// lembrar de sempre commitar primeiro o arquivo de produção antes
// do arquivo de teste
export class SignUpController {
  handle (httpRequest: i.HttpRequest): i.HttpResponse {
    const { body: { name, email } } = httpRequest
    if (!name || !email) {
      return badRequest('Parâmetros não fornecidos')
    }
  }
}
