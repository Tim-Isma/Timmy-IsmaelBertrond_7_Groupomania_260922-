// Import des modules. //

const express = require('express')
const userControllers = require('../controllers/users')
const upload = require('../middlewares/multer-config').single('image_profile')

const checkTokenMiddleware = require('../middlewares/checking_JsonWebToken')


// Récupération du router d'express. //

let router = express.Router()

///////////////////////////////


// Routage de la ressource user. //

router.get('/', checkTokenMiddleware, userControllers.getAllUsers)

router.get('/:id', checkTokenMiddleware, userControllers.getOneUser)

router.put('/', upload, userControllers.createUser)

router.patch('/:id', checkTokenMiddleware, upload, userControllers.updateUser)

router.delete('/:id', checkTokenMiddleware, upload, userControllers.deleteUser)

router.put('/like/:id', checkTokenMiddleware, userControllers.like)

router.put('/unlike/:id', checkTokenMiddleware, userControllers.unlike)

router.put('/follow/:id', checkTokenMiddleware, userControllers.follow)

router.put('/unfollow/:id', checkTokenMiddleware, userControllers.unfollow)


module.exports = router