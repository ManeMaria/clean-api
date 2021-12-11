import * as http from './http'

export interface Controller {
  handle: (httpRequest: http.HttpRequest) => Promise<http.HttpResponse>
}
