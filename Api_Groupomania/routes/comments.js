// Import des modules. //

const express = require('express')
const commentControllers = require('../controllers/comments')

const checkTokenMiddleware = require('../middlewares/checking_JsonWebToken')


// Récupération du router d'express. //

let router = express.Router()


// Routage de la ressource user. //

router.get('/', commentControllers.getAllComments)

router.get('/:id', commentControllers.getOneComments)

router.put('/', checkTokenMiddleware, commentControllers.createComments)

router.patch('/:id', checkTokenMiddleware, commentControllers.updateComments)

router.delete('/:id', checkTokenMiddleware, commentControllers.deleteComments)

//////////////////////////////////////////////////////////

router.put('/like/:id', commentControllers.like)

router.put('/dislike/:id', commentControllers.dislike)


module.exports = router