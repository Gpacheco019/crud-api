const express = require('express')
const routes = express.Router()

const User = require('./controllers/UserController')

routes.get('/users', User.index)
routes.post('/users', User.create)
routes.put('/users/:id', User.update)
routes.delete('/users/:id', User.delete)


module.exports = routes