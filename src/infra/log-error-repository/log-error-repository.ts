import { LogErrorRepository } from '../../data/protocols/log-erro-repository'

export class RepositoryErros implements LogErrorRepository {
  async log (stack: string): Promise<void> {
    return new Promise((resolve) => resolve())
  }
}
