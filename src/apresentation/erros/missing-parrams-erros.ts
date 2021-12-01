
/**
 * Informa o name desejado para a classe Error do javascript.
 */
export class MissingParamsError extends Error {
  constructor (paramName: string) {
    super(`Missing params: ${paramName}`)
    this.name = 'MissingParamsError'
  }
}
