// Import des modules //

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const User = require('../models/user')


// Routage de la ressource Auth //

exports.login =  async (req, res) => {
    const { email, password } = req.body
 
    // Validation des données reçues //
    if(!email || !password) {
        return res.status(400).json({ message: "Bad email or password" })
    }

    try {
        // Vérification si l'utilisateur existe //
        let user = await User.findOne({email: email })
        if (user === null) {
            return res.status(401).json({ message: 'This account does not exists !'})
        }

        // Vérification du mot de passe //
        let checkingPassword = await bcrypt.compare(password, user.password) // On compare le password qu'on reçoit dans notre requête au password contenu dans la BD.
        if(!checkingPassword) {
            return res.status(401).json({ message: 'Wrong password'})
        }

        // Génération et envoi du token // (// jwt.sign({payload}, secret, durée))
        console.log(process.env.AID)
        console.log(user)
        const token = jwt.sign({
            id: user._id,
            name: user.name,
            firstName: user.firstName,
            email: user.email,
            role: user._id == process.env.AID ? 'chaussette' : 'balais'
        }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_DURING })

        return res.json({ access_token: token})

    } catch(err) {
        // ValidatorError /// -
        if (err.name == 'ValidatorError') {
            res.status(500).json({ message: 'Database Error', error: err })
        }
        res.status(500).json({ message: 'Login process failed', error: err })
    }
}

