import { Collection, MongoClient } from 'mongodb'

export const mongoHelper = {
  // vê se faz diferença
  client: null as MongoClient,
  db: null,
  url: null as string,
  connect: async function (url: string): Promise<void> {
    const URL = url || global.__MONGO_URI__

    this.url = URL
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
    this.client = null
  },

  getColletion: async function (name: string): Promise<Collection> {
    // não achei o método isConnected do Mongo
    const isConnected = !this.client
    if (isConnected) {
      await this.connect(this.url)
    }
    return this.client.db().collection(name)
  },

  map: (colletion: any): any => {
    const { _id, ...colletionWithOutId } = colletion
    const refactorResult = { ...colletionWithOutId, id: _id.toString() }
    return refactorResult
  }

}
