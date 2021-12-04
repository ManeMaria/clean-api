
/**
 * Informa o name desejado para a classe Error do javascript.
 */
export class InvalidParamError extends Error {
  constructor (paramName: string) {
    super(`Missing params: ${paramName}`)
    this.name = 'InvalidParamError'
  }
}
