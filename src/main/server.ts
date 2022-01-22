import dotenv from '../main/dotEnv/env'
import { mongoHelper } from '../infra/data-base/mongodb/helpers/mongo-helper'
const PORT = process.env.PORT || 8080
mongoHelper.connect(dotenv().MONGO_URL).then(async () => {
  const { app } = (await import('./config/app'))

  app.listen(PORT, () => console.log(`the server is running on port ${PORT}`))
  // passas direto o console error, pos e callback
}).catch(console.error)
