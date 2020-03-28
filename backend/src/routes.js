const express = require('express')
const routes = express.Router()
//  CONTROLLERS
const OngController = require('./controllers/OngController')
const IncidentController = require('./controllers/IncidentController')
const ProfileController = require('./controllers/ProfileController')
const SessionController = require('./controllers/SessionController')
//  MIDDLEWARES
const incidentsMiddleware = require('./middleware/incidentsMiddleware')
const ongMiddleware = require('./middleware/ongMiddleware')
const profileMiddleware = require('./middleware/profileMiddleware')


//LOGIN
routes.post('/session', SessionController.create)

//ONGS
routes.get('/ongs', OngController.index)
routes.post('/ongs', ongMiddleware.withBody, OngController.create)

//INCIDENTS
routes.get('/incidents', incidentsMiddleware.page , IncidentController.index)
routes.post('/incidents', incidentsMiddleware.withAuthAndBody, IncidentController.create)
routes.delete('/incidents/:id', incidentsMiddleware.withIncidentId, IncidentController.delete)

//PROFILE
routes.get('/profile', profileMiddleware.withAth, ProfileController.index)


module.exports = routes