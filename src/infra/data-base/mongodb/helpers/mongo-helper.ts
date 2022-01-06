import { Collection, MongoClient } from 'mongodb'

export const mongoHelper = {
  // vê se faz diferença
  client: null as MongoClient,
  db: null,
  connect: async function (url: string): Promise<void> {
    const URL = url || global.__MONGO_URI__
    this.client = await MongoClient.connect(URL, {
      // @ts-expect-error
      useNewUrlParser: true,
      useUnifiedTopology: true
    })

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    this.db = await this.client.db(global.__MONGO_DB_NAME__)
  },

  disconnect: async function () {
    await this.client.close()
  },

  getColletion: function (name: string): Collection {
    return this.client.db().collection(name)
  },

  map: (colletion: any): any => {
    const { _id, ...colletionWithOutId } = colletion
    const refactorResult = { ...colletionWithOutId, id: _id.toString() }
    return refactorResult
  }

}
