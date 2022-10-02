// Import des modules. //

const express = require('express')
const postControllers = require('../controllers/posts')


// Récupération du router d'express. //

let router = express.Router()


// Routage de la ressource user. //

router.get('/', postControllers.getAllPosts)

router.get('/:id', postControllers.getOnePosts)

router.put('/', postControllers.createPosts)

router.patch('/:id', postControllers.updatePosts)

router.delete('/:id', postControllers.deletePosts)


//////////////////////////////////////////////////////////

//router.post('/like/:id', postControllers.createLikeAndDislike)


module.exports = router