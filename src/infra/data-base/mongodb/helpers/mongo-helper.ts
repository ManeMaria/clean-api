import { MongoClient } from 'mongodb'

export const mongoHelper = {
  // vê se faz diferença
//   client: null as MongoClient,
  client: MongoClient,
  db: null,
  connect: async () => {
    // @ts-expect-error
    this.client = await MongoClient.connect(global.__MONGO_URI__, {
      // @ts-expect-error
      // o types do mongo não está sendo lido
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    // @ts-expect-error
    this.db = await this.client.db(global.__MONGO_DB_NAME__)
  },
  disconnect: async () => {
    // @ts-expect-error
    await this.client.close()
    // @ts-expect-error
    await this.db.close()
  }
}
