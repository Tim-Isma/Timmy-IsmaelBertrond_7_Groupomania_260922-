// Import des modules. //

const express = require('express')
const postControllers = require('../controllers/posts')

const checkTokenMiddleware = require('../middlewares/checking_JsonWebToken')

// Récupération du router d'express. //

let router = express.Router()


// Routage de la ressource user. //

router.get('/', postControllers.getAllPosts)

router.get('/:id', postControllers.getOnePosts)

router.put('/', checkTokenMiddleware, postControllers.createPosts)

router.patch('/:id', checkTokenMiddleware, postControllers.updatePosts)

router.delete('/:id', checkTokenMiddleware, postControllers.deletePosts)


//////////////////////////////////////////////////////////

router.put('/like/:id', postControllers.like)

router.put('/dislike/:id', postControllers.dislike)


module.exports = router