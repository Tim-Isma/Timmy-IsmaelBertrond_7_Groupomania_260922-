// Import des modules. //

const express = require('express')
const commentControllers = require('../controllers/comments')


// Récupération du router d'express. //

let router = express.Router()


// Routage de la ressource user. //

router.get('/', commentControllers.getAllComments)

router.get('/:id', commentControllers.getOneComments)

router.put('/', commentControllers.createComments)

router.patch('/:id', commentControllers.updateComments)

router.delete('/:id', commentControllers.deleteComments)

//router.patch('/like/:id', commentControllers.addLikeComment)


module.exports = router