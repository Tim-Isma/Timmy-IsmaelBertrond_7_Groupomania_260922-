// Import des modules. //

const express = require('express')
const userControllers = require('../controllers/users')


// Récupération du router d'express. //

let router = express.Router()

///////////////////////////////


// Routage de la ressource user. //

router.get('/', userControllers.getAllUsers)

router.get('/:id', userControllers.getOneUser)

router.put('/', userControllers.createUser)

router.patch('/:id', userControllers.updateUser)

router.delete('/:id', userControllers.deleteUser)

//router.patch('/like/:id', userControllers.like)

//router.patch('/unlike/:id', userControllers.unlike)

//router.patch('/follow/:id', userControllers.follow)

//router.patch('/unfollow/:id', userControllers.unfollow)


module.exports = router