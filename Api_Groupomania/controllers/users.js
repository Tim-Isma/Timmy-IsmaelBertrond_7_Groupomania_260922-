// Import des modules. //

const bcrypt = require('bcrypt')
const User = require('../models/user')

const ObjectID = require("mongoose").Types.ObjectId;


// Routage de la ressource user. //

exports.getAllUsers = (req, res) => {
    User.find().select('-password')
        .then(users => res.status(200).json(users))
        .catch(err => res.status(500).json({ message: 'Database Error', error: err }))
}

exports.getOneUser = async (req, res) => {

    // Vérification de l'existance du paramètre 'id' dans la requête.
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).json({ message: `ID unknown ${req.params.id}` })
    }
    console.log(req.body)
    try {
        // Recherche de l'utilisateur et vérification
        let user = await User.findOne({ _id: req.params.id }).select('-password')
        if (user === null) {
            return res.status(404).json({ message: 'This user does not exist !' })
        } else {
            return res.status(200).json(user)
        }
        
    } catch (err) {
        return res.status(500).json({ mesage: 'Data Error', error: err })
    }
}

exports.createUser = async (req, res) => {
    const {name, firstName, pseudo, email, password, city} = req.body

    // Validation des données reçues.
    if (!name || !firstName || !pseudo || !email || !password || !city) {
        return res.status(400).json({ message: 'Missing Data'})
    }
    
    try {
        // Vérification si l'utilisateur existe déjà
        const userChecking = await User.findOne({ email: email, password: password })
        if (userChecking !== null) {
            return res.status(409).json({ message: `The user ${nom} already exists !` })
        }
    
        // Hashage du mot de passe utilisateur.
        let hash = await bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT_PASSWORD))
        req.body.password = hash
        console.log('bu')
        // Création de l'utilisateur.
        
        const userObject = req.body
        const user = new User ({
            ...userObject,
            profilePicture: "fhdkjfhdsk" //`${req.protocol}://${req.get('host')}/images/profils/${req.file.filename}`,
        })
        
        await user.save()
        return res.status(201).json({ message: 'User Created'})

    } catch (err) {
        return res.status(500).json({ message: 'Data Error', error: err })
    }
}

exports.updateUser = async (req, res) => {
  
    // Vérification de la présence du paramètre 'id' dans la requête.
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).json({ message: `ID unknown ${req.params.id}` })
    }

    try {
        // Recherche de l'utilisateur et vérification.
        let user = await User.findOne({ _id: req.params.id })
        if (user === null) {
            return res.status(404).json({ message: 'This user does not exist !' })
        }

        // Mise à jour de l'utilisateur. 
        // User.updateOne(WHERE, DATA)
        await User.updateOne({ _id: req.params.id }, {...req.body, _id: req.params.id})
        return res.json({ message: 'User Updated' })
    } catch (err) {
        return res.status(500).json({ mesage: 'Data Error', error: err })
    }
}

exports.deleteUser = (req, res) => {

 // Vérification de la présence du paramètre 'id' dans la requête.
 if (!ObjectID.isValid(req.params.id)) {
    return res.status(400).json({ message: `ID unknown ${req.params.id}` })
}

// Suppression de l'utilisateur.
User.deleteOne({ _id: req.params.id }) 
    .then(() => res.status(204).json({ message: 'Delete User !'}))
    .catch(err => res.status(500).json({ message: 'Database Error', error: err }))
}

////////////////////////////////////////////

exports.like = async (req, res) => {

        // Vérification de la présence du paramètre 'id' dans la requête.
        if (!ObjectID.isValid(req.params.id) || !ObjectID.isValid(req.body.userId)) {
            return res.status(400).json({ message: `ID unknown ${req.params.id}` })
        }
    
        try {
            // Add like to profile
            await User.findByIdAndUpdate(
                req.params.id,
                { $push: { likesProfile: req.body.userId }},
                { new: true, upsert: true },
                (err, data) => {
                    if(!err) res.status(201).json(data)
                    else return res.status(400).json(err)
                }
            )

        } catch (err) {
            return res.status(500).json({ mesage: 'Data Error', error: err })
        }
}

exports.unlike = async (req, res) => {

    // Vérification de la présence du paramètre 'id' dans la requête.
    if (!ObjectID.isValid(req.params.id) || !ObjectID.isValid(req.body.userId)) {
        return res.status(400).json({ message: `ID unknown ${req.params.id}` })
    }

    try {
        // Remove like to profile
        await User.findByIdAndUpdate(
            req.params.id,
            { $pull: { likesProfile: req.body.userId }},
            { new: true, upsert: true },
            (err, data) => {
                if(!err) res.status(201).json(data)
                else return res.status(400).json(err)
            }
        )

    } catch (err) {
        return res.status(500).json({ mesage: 'Data Error', error: err })
    }
}

exports.follow = async (req, res) => {

    // Vérification de la présence du paramètre 'id' dans la requête.
    if (
        !ObjectID.isValid(req.params.id) || 
        !ObjectID.isValid(req.body.idToFollow)
    ) 
        return res.status(400).json({ message: `ID unknown ${req.params.id}` })
    
    try {
        // Add to the follower list
        await User.findByIdAndUpdate(
            req.params.id,
            { $addToSet: { following: req.body.idToFollow } },
            { new: true, upsert: true },
            (err, data) => {
                if(!err) res.status(201).json(data)
                else return res.status(400).json(err)
            }
        )
        // Add to the following list
        await User.findByIdAndUpdate(
            req.body.idToFollow,
            { $addToSet: { follower: req.params.id } },
            { new: true, upsert: true }, // new: true == renvoie le document modifié / upsert: true == aucun document trouvé, insére un nouveau document.
            (err, data) => {
                if (err) return res.status(400).json(err)  // ???
            }
        )

    } catch (err) {
        return res.status(500).json({ mesage: 'Data Error', error: err })
    }
}

exports.unfollow = async (req, res) => {

    // Vérification de la présence du paramètre 'id' dans la requête.
    if (!ObjectID.isValid(req.params.id) || !ObjectID.isValid(req.body.idToUnfollow)) {
        return res.status(400).json({ message: `ID unknown ${req.params.id}` })
    }

    try {
        // Remove to the follower list
        await User.findByIdAndUpdate(
            req.params.id,
            { $pull: { following: req.body.idToUnfollow }},
            { new: true, upsert: true },
            (err, data) => {
                if(!err) res.status(201).json(data)
                else return res.status(400).json(err)
            }
        )
        // Remove to the following list
        await User.findByIdAndUpdate(
            req.body.idToUnfollow,
            { $pull: { follower: req.params.id }},
            { new: true, upsert: true },
            (err, data) => {
                if (err) return res.status(400).json(err)
            }
        )
    } catch (err) {
        return res.status(500).json({ mesage: 'Data Error', error: err })
    }
}