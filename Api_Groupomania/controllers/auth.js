// Import des modules. //

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../models/user')

//const ObjectID = require("mongoose").Types.ObjectId;


// Routage de la ressource Auth. //

exports.login =  (req, res) => {
    const { email, password } = req.body
 
    // Validation des données reçues
    if(!email || !password) {
        return res.status(400).json({ message: "Bad email or password" })
    }

    User.findOne({email: email })
        .then(user => {
            // Vérification si l'utilisateur existe.
            if (user === null) {
                return res.status(401).json({ message: 'This account does not exists !'})
            }

            // Vérification du mot de passe.
            bcrypt.compare(password, user.password) // Comparer le password qu'on reçoit au password contenu dans la BD.
                .then(test => {
                    if(!test) {
                        return res.status(401).json({ message: 'Wrong password'})
                    }

                    // Génération du token. (// jwt.sign({payload}, secret, durée))
                    const token = jwt.sign({
                        id: user.id,
                        name: user.name,
                        firstName: user.firstName,
                        email: user.email
                    }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_DURING })

                    return res.json({ access_token: token})

                })
                .catch(err => res.status(500).json({ message: 'Login process failed', error: err }))
        })
        .catch(err => res.status(500).json({ message: 'Database Error', error: err }))
}

