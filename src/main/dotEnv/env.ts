interface IMONGO_URL {
  MONGO_URL: string
}

export default (): IMONGO_URL => ({
  MONGO_URL: 'mongodb://localhost:27017/api-study'
})
