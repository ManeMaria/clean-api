import * as http from './http'

export interface Controller {
  handle: (httpRequest: http.HttpRequest) => http.HttpResponse
}
