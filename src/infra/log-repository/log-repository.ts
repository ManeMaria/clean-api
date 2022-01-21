import { LogErrorRepository } from '../../data/protocols/log-erro-repository'
import { mongoHelper } from '../data-base/mongodb/helpers/mongo-helper'

export class LogMongoRepository implements LogErrorRepository {
  async logError (stack: string): Promise<void> {
    const errorColletion = await mongoHelper.getColletion('errors')
    await errorColletion.insertOne({
      stack,
      date: new Date()
    })
  }
}
