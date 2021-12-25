import { Collection, MongoClient } from 'mongodb'

let connection, dB

export const mongoHelper = {
  // vê se faz diferença
//   client: null as MongoClient,
  // client: null as MongoClient,
  // db: null,
  connect: async function () {
    connection = await MongoClient.connect(global.__MONGO_URI__, {
      // @ts-expect-error
      useNewUrlParser: true,
      useUnifiedTopology: true
    })

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    dB = await connection.db(global.__MONGO_DB_NAME__)
  },
  disconnect: async function () {
    await connection.close()
  },

  getColletion: function (name: string): Collection {
    return connection.db().collection(name)
  }
}
