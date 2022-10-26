// Import des modules //

const bcrypt = require('bcrypt')
const fs = require('fs')
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
            profilePicture: `${req.protocol}://${req.get('host')}/images/uploads/profiles/${req.file.filename}`
        })
        await user.save()
        return res.status(201).json({ message: 'User Created !'})

    } catch (err) {
        return res.status(500).json({ message: 'Database Error !', error: err })
    }
}

exports.updateUser = async (req, res) => {
    console.log('MARCEL')
    // Vérification de la présence du paramètre 'id' dans la requête //
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).json({ message: `ID unknown: ${req.params.id} !` })
    }

    try {
        console.log(req.body)
        console.log("FILE", req.file)
        const userObject = req.file ? {
            ...req.body,
            profilePicture: `${req.protocol}://${req.get('host')}/images/uploads/profiles/${req.file.filename}`
        } : {...req.body}

        // Recherche et vérification de l'utilisateur //
        let userModify = await User.findOne({ _id: req.params.id })

        if (userModify === null) {
            return res.status(404).json({ message: 'This user does not exist !' })
        }

        // Mise à jour de l'utilisateur // 
        // User.updateOne(WHERE, DATA).
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

    /*
    User.findOne({ _id: req.params.id})
        .then(user => {
            if (user === null) {
                res.status(404).json({ message: 'This user does not exist !' })
            } else {
                    User.deleteOne({_id: req.params.id})
                        .then(() => { res.status(204).json({message: 'Delete User !'})})
                        .catch(error => res.status(401).json({ error }))
            }
        })
        .catch( error => {
            res.status(500).json({ error });
        })
    */

    
    User.findOne({ _id: req.params.id})
        .then(user => {
            if (user === null) {
                res.status(404).json({ message: 'This user does not exist !' })
            } else {
                const filename = user.profilePicture.split('/images/uploads/profiles/') [1];
                fs.unlink(`images/uploads/profiles/${filename}`, () => {
                    User.deleteOne({_id: req.params.id})
                        .then(() => { res.status(204).json({message: 'Delete User !'})})
                        .catch(error => res.status(401).json({ error }))
                });
            }
        })
        .catch( error => {
            res.status(500).json({ error });
        })
    
    /*
    try {
        let userDelete = await User.findOne({ _id: req.params.id })

        if (userDelete === null) {
            return res.status(404).json({ message: 'This user does not exist !' })
        } else {
            const filename = userDelete.profilePicture.split('/images/uploads/profiles/') [1]
            console.log("test222")
                await fs.unlink(`images/uploads/profiles/${filename}`, () => {
                    User.deleteOne({_id: req.params.id})
                        return res.status(204).json({message: 'Delete User !'})
                })  
        }        
    } catch(err) {
        return res.status(500).json({ message: 'Database Error', error: err })
    }
    */
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
    } 
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

exports.unlike = async (req, res) => {

    // Vérification des 'ID' //
    if (!ObjectID.isValid(req.params.id)) {

        return res.status(400).json({ message: `Liker ID unknown: ${req.params.id} !` }) 

    } else if (!ObjectID.isValid(req.body.userId)){

        return res.status(400).json({ message: `Liking ID unknown: ${req.body.userId} !` }) 
    // Vérification que les 'ID' ne soient pas identiques //
    } else if (req.params.id === req.body.userId) {
        
        return res.status(403).json({ message: `You can't unlike yourself !`})
    }
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

exports.follow = async (req, res) => {

    // Vérification des 'ID' //
    if (!ObjectID.isValid(req.params.id)) {

        return res.status(400).json({ message: `Follower ID unknown: ${req.params.id} !` }) 

    } else if (!ObjectID.isValid(req.body.userId)){

        return res.status(400).json({ message: `Following ID unknown: ${req.body.userId} !` }) 
    // Vérification que les 'ID' ne soient pas identiques //
    } else if (req.params.id === req.body.userId) {
        
        return res.status(403).json({ message: `You can't follow yourself !`})
    }

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

exports.unfollow = async (req, res) => {

    // Vérification des 'ID' //
    if (!ObjectID.isValid(req.params.id)) {

        return res.status(400).json({ message: `Follower ID unknown: ${req.params.id}` }) 

    } else if (!ObjectID.isValid(req.body.userId)){

        return res.status(400).json({ message: `Following ID unknown: ${req.body.userId}` }) 
    // Vérification que les 'ID' ne soient pas identiques //
    } else if (req.params.id === req.body.userId) {
        
        return res.status(403).json({ message: `You can't follow yourself`})
    }    
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
        return res.status(500).json({ message: 'Database Error', error: err })
    }
}
