const MONGO_URI = process.env.NODE_ENV === 'production'
    ? process.env.MONGO_URI_PROD
    : process.env.MONGO_URI_TEST
;

const PORT = process.env.PORT || 3003;

module.exports = { MONGO_URI, PORT }