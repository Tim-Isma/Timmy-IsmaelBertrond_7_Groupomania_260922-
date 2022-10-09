// Import des modules. //

const express = require('express')
const postControllers = require('../controllers/posts')

const upload = require('../middlewares/multer-config').single('image_post')

// Récupération du router d'express. //

let router = express.Router()


// Routage de la ressource user. //

router.get('/', postControllers.getAllPosts)

router.get('/:id', postControllers.getOnePosts)

router.put('/', upload, postControllers.createPosts)

router.patch('/:id', upload, postControllers.updatePosts)

router.delete('/:id', upload, postControllers.deletePosts)

//////////////////////////////////////////////////////////

router.put('/like/:id', postControllers.like)

router.put('/dislike/:id', postControllers.dislike)


module.exports = router