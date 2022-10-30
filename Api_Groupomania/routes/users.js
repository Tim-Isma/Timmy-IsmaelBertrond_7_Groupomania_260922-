// Import des modules. //

const express = require('express')
const userControllers = require('../controllers/users')

const checkTokenMiddleware = require('../middlewares/checking_JsonWebToken')


// Récupération du router d'express. //

let router = express.Router()

///////////////////////////////


// Routage de la ressource user. //

router.get('/', checkTokenMiddleware, userControllers.getAllUsers)

router.get('/me', checkTokenMiddleware, userControllers.getOneUser)

router.put('/', userControllers.createUser)

router.patch('/:id', checkTokenMiddleware, userControllers.updateUser)

router.delete('/:id', checkTokenMiddleware, userControllers.deleteUser)

module.exports = router