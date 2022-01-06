
import { mongoHelper } from '../infra/data-base/mongodb/helpers/mongo-helper'
// invoco e ativo para ficar tudo em uma linha só
require('dotenv').config()

const PORT = process.env.PORT || 8080
mongoHelper.connect(process.env.MONGO_URL).then(() => {
  const app = require('./config/app')
  console.log('app :>> ', app)
  app.listen(PORT, () => console.log(`the server is running on port ${PORT}`))
  // passas direto o console error, pos e callback
}).catch(console.error)