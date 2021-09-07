const express = require('express')
const routes = express.Router()

const User = require('./controllers/UserController')
const Projects = require('./controllers/ProjectController')

routes.get('/users', User.index)
routes.post('/users', User.create)
routes.put('/users/:id', User.update)
routes.delete('/users/:id', User.delete)

// projects
routes.get('/projects', Projects.index)
routes.post('/projects/:user_id', Projects.createProject)
routes.get('/projects/user', Projects.listProjectsById)




module.exports = routes