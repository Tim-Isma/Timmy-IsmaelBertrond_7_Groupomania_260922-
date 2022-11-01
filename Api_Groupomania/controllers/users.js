// Import des modules //

const bcrypt = require('bcrypt')
const User = require('../models/user')

const ObjectID = require("mongoose").Types.ObjectId;

// Routage de la ressource user //

exports.getAllUsers = (req, res) => {
    User.find().select('-password')
        .then(users => res.status(200).json(users))
        .catch(err => res.status(500).json({ message: 'Database Error !', error: err }))
}

exports.getOneUser = async (req, res) => {

    // Vérification de l'existance du paramètre 'id' dans la requête //
    if (!ObjectID.isValid(req.user)) {
        return res.status(400).json({ message: `ID unknown: ${req.user} !` })
    }
    console.log(req.body)
    try {
        // Recherche de l'utilisateur et vérification //
        let user = await User.findOne({ _id: req.user }).select('-password')
        
        if (user === null) {
            return res.status(404).json({ message: 'This user does not exist !' })
        } else {
            return res.status(200).json(user)
        }
        
    } catch (err) {
        return res.status(500).json({ message: 'Database Error !', error: err })
    }
}

exports.createUser = async (req, res) => {
    const {name, firstName, pseudo, email, password, city} = req.body

    // Validation des données reçues //
    if (!name || !firstName || !pseudo || !email || !password || !city) {
        return res.status(400).json({ message: 'Missing Data !'})
    }
    
    try {
        // Vérification si l'utilisateur existe déjà //
        const userChecking = await User.findOne({ email: email, password: password })
        if (userChecking !== null) {
            return res.status(409).json({ message: `The user ${nom} already exists !` })
        }
       
        // Hashage du mot de passe utilisateur //
        let hash = await bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT_PASSWORD))
        req.body.password = hash
       
        // Création de l'utilisateur //
        const userObject = req.body
        const user = new User ({
            ...userObject,
        })
        await user.save()
        return res.status(201).json({ message: 'User Created !'})

    } catch (err) {
        return res.status(500).json({ message: 'Database Error !', error: err })
    }
}

exports.updateUser = async (req, res) => {

    // Vérification de la présence du paramètre 'id' dans la requête //
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).json({ message: `ID unknown: ${req.params.id} !` })
    }

    try {
        
        const userObject = req.body 
           
        // Recherche et vérification de l'utilisateur //
        let userModify = await User.findOne({ _id: req.params.id })

        if (userModify === null) {
            return res.status(404).json({ message: 'This user does not exist !' })
        }

        // Mise à jour de l'utilisateur // 
        await User.updateOne(
            { _id: req.params.id }, 
            {...userObject, _id: req.params.id}
        )

        return res.status(200).json({ message: 'User Updated !' })
    } catch (err) {
        return res.status(500).json({ message: 'Database Error !', error: err })
    }
}

exports.deleteUser = (req, res) => {

    // Vérification de la présence du paramètre 'id' dans la requête //
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).json({ message: `ID unknown: ${req.params.id} !` })
    }

    User.deleteOne({ _id: req.params.id }) 
    .then(() => res.status(204).json({ message: 'Delete User !' }))
    .catch(err => res.status(500).json({ message: 'Database Error', error: err })) 
}






