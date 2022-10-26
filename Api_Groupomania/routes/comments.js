// Import des modules. //

const express = require('express')
const commentControllers = require('../controllers/comments')

const upload = require('../middlewares/multer-config').single('image_comment')

// Récupération du router d'express. //

let router = express.Router()


// Routage de la ressource user. //

router.get('/', commentControllers.getAllComments)

router.get('/me', commentControllers.getOneComments)

router.put('/', upload, commentControllers.createComments)

router.patch('/:id', upload, commentControllers.updateComments)

router.delete('/:id', upload, commentControllers.deleteComments)

//////////////////////////////////////////////////////////

router.put('/like/:id', commentControllers.like)

router.put('/dislike/:id', commentControllers.dislike)


module.exports = router