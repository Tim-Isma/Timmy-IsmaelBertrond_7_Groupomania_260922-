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
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).json({ message: `ID unknown: ${req.params.id} !` })
    }
    console.log(req.body)
    try {
        // Recherche de l'utilisateur et vérification //
        let user = await User.findOne({ _id: req.params.id }).select('-password')
        
        if (user === null) {
            return res.status(404).json({ message: 'This user does not exist !' })
        } else {
            return res.status(200).json(user)
        }
        
    } catch (err) {
        return res.status(500).json({ mesage: 'Database Error !', error: err })
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
            profilePicture: 'images' //`${req.protocol}://${req.get('host')}/images/profils/${req.file.filename}`,
        })
        console.log('vbvc')
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
        // Recherche et vérification de l'utilisateur //
        let user = await User.findOne({ _id: req.params.id })

        if (user === null) {
            return res.status(404).json({ message: 'This user does not exist !' })
        }

        // Mise à jour de l'utilisateur // 
        // User.updateOne(WHERE, DATA).
        await User.updateOne(
            { _id: req.params.id }, 
            {...req.body, _id: req.params.id}
        )

        return res.json({ message: 'User Updated !' })
    } catch (err) {
        return res.status(500).json({ mesage: 'Database Error !', error: err })
    }
}

exports.deleteUser = (req, res) => {

 // Vérification de la présence du paramètre 'id' dans la requête //
 if (!ObjectID.isValid(req.params.id)) {
    return res.status(400).json({ message: `ID unknown: ${req.params.id} !` })
}

// Suppression de l'utilisateur //
User.deleteOne({ _id: req.params.id }) 
    .then(() => res.status(204).json({ message: 'Delete User !'}))
    .catch(err => res.status(500).json({ message: 'Database Error !', error: err }))
}

///////////////////////////////////////////////////

exports.like = async (req, res) => {

    // Vérification des 'ID' //
    if (!ObjectID.isValid(req.params.id)) {

        return res.status(400).json({ message: `Liker ID unknown: ${req.params.id} !` }) 

    } else if (!ObjectID.isValid(req.body.userId)){

        return res.status(400).json({ message: `Liking ID unknown: ${req.body.userId} !` }) 
    // Vérification que les 'ID' ne soient pas identiques //
    } else if (req.params.id === req.body.userId) {
        
        return res.status(403).json({ message: `You can't like yourself !`})

    } else {
        try {
            // Recherche et vérification de l'utilisateur //
            const user = await User.findById(req.params.id)
    
            // Vérification si l'utilisateur a déjà liker le profile //
            if (!user.likesProfile.includes(req.body.userId)) {
                await user.updateOne({ $push: { likesProfile: req.body.userId } })

                return res.status(200).json({ message: 'You like this profile !' }) 
            } else {
                return res.status(403).json({ message: 'You allready like this user !'})
            }

        } catch (err) {
            return res.status(500).json({ message: 'Database Error !', error: err })
        }
    }
}

exports.unlike = async (req, res) => {

    // Vérification des 'ID' //
    if (!ObjectID.isValid(req.params.id)) {

        return res.status(400).json({ message: `Liker ID unknown: ${req.params.id} !` }) 

    } else if (!ObjectID.isValid(req.body.userId)){

        return res.status(400).json({ message: `Liking ID unknown: ${req.body.userId} !` }) 
    // Vérification que les 'ID' ne soient pas identiques //
    } else if (req.params.id === req.body.userId) {
        
        return res.status(403).json({ message: `You can't unlike yourself !`})

    } else {
        try {
            // Recherche et vérification de l'utilisateur //
            const user = await User.findById(req.params.id)

            // Vérification si l'utilisateur a déjà liker le profile //
            if (user.likesProfile.includes(req.body.userId)) {
                await user.updateOne({ $pull: { likesProfile: req.body.userId } })

                return res.status(200).json({ message: `You don't like this profile !` }) 
            } else {
                return res.status(403).json({ message: 'You allready unlike this user !'})
            }
            
        } catch (err) {
            return res.status(500).json({ message: 'Database Error !', error: err })
        }
    }
}

exports.follow = async (req, res) => {

    // Vérification des 'ID' //
    if (!ObjectID.isValid(req.params.id)) {

        return res.status(400).json({ message: `Follower ID unknown: ${req.params.id} !` }) 

    } else if (!ObjectID.isValid(req.body.userId)){

        return res.status(400).json({ message: `Following ID unknown: ${req.body.userId} !` }) 
    // Vérification que les 'ID' ne soient pas identiques //
    } else if (req.params.id === req.body.userId) {
        
        return res.status(403).json({ message: `You can't follow yourself !`})

    } else {

        try {
            // Recherche et vérification de l'utilisateur //
            const user = await User.findById(req.params.id)
            const currentUser = await User.findById(req.body.userId)

            // Vérification si l'utilisateur a déjà follow le profile //
            if (!user.followers.includes(req.body.userId)) {
                await user.updateOne({ $push: { followers: req.body.userId } })
                await currentUser.updateOne({ $push: { following: req.params.id } })

                return res.status(200).json({ message: 'You are following this user !' }) 
            } else {
                return res.status(403).json({ message: 'You allready follow this user !'})
            }
        } catch (err) {
            return res.status(500).json({ message: 'Database Error !', error: err })
        }
    }
}

exports.unfollow = async (req, res) => {

    // Vérification des 'ID' //
    if (!ObjectID.isValid(req.params.id)) {

        return res.status(400).json({ message: `Follower ID unknown: ${req.params.id}` }) 

    } else if (!ObjectID.isValid(req.body.userId)){

        return res.status(400).json({ message: `Following ID unknown: ${req.body.userId}` }) 
    // Vérification que les 'ID' ne soient pas identiques //
    } else if (req.params.id === req.body.userId) {
        
        return res.status(403).json({ message: `You can't follow yourself`})

    } else {
        
        try {
            // Vérification si l'utilisateur a déjà follow le profile //
            const user = await User.findById(req.params.id)
            const currentUser = await User.findById(req.body.userId)

            if (user.followers.includes(req.body.userId)) {
                await user.updateOne({ $pull: { followers: req.body.userId } })
                await currentUser.updateOne({ $pull: { following: req.params.id } })

                return res.status(200).json({ message: 'You are not following this user' }) 
            } else {
                return res.status(403).json({ message: 'You allready follow this user !'})
            }
        } catch (err) {
            return res.status(500).json({ message: 'Data Error', error: err })
        }
    }
}
