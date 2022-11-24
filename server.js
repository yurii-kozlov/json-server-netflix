// See https://github.com/typicode/json-server#module
const jsonServer = require('json-server')
const clone = require('clone')
const data = require('./db.json')
const server = jsonServer.create()
const router = jsonServer.router('db.json', { _isFake: true })
const middlewares = jsonServer.defaults()

server.use(middlewares)

// For mocking the POST request, POST request won't make any changes to the DB
server.use((req, res, next) => {
    if (req.path === '/') return next()
    router.db.setState(clone(data))
    next()
})

server.use(router)
server.listen(process.env.PORT || 8000, () => {
    console.log('JSON Server is running')
})

// Export the Server API
module.exports = server
