// Import des modules. //

const express = require('express')
authControllers = require('../controllers/auth')

//const ObjectID = require("mongoose").Types.ObjectId;


// Récupération du router d'express. //

let router = express.Router()


// Middleware pour logger date de requête. //

router.use( (req, res, next) => {
    const event = new Date()
    console.log('AUTH Time:', event.toString())
    next()
})

// Routage de la ressource Auth. //

router.post('/login', authControllers.login) 


module.exports = router