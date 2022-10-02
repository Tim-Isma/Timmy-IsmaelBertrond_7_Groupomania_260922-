// Import des modules. //

const Comment = require('../models/comment')

const ObjectID = require("mongoose").Types.ObjectId;

// Routage de la ressource post. //

exports.getAllComments = (req, res) => {
    Comment.find()
        .then(comments => res.status(200).json(comments))
        .catch(err => res.status(500).json({ message: 'Database Error', error: err }))
}

exports.getOneComments = async (req, res) => {

    // Vérification de l'existance du paramètre 'id' dans la requête.
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).json({ message: `ID unknown ${req.params.id}` })
    }

    try {
        // Recherche de l'utilisateur et vérification
        let comment = await Comment.findOne({ _id: req.params.id })
        if (comment === null) {
            return res.status(404).json({ message: 'This comment does not exist !' })
        } else {
            return res.status(200).json(comment)
        }
        
    } catch (err) {
        return res.status(500).json({ mesage: 'Data Error', error: err })
    }
}

exports.createComments = async (req, res) => {

    const {userId, postId, comment} = req.body

    if (!userId || !postId || !comment) {
        return res.status(400).json({ message: 'Missing Data'})
    }
  
    try {
        const commentObject = req.body
        const commentCreate = new Comment ({
            ...commentObject
        })

        await commentCreate.save()
        return res.status(201).json({ message: 'Comment Created' })
    } catch (err) {
        return res.status(500).json({ message: 'Data Error', error: err })
    }
}

exports.updateComments = async (req, res) => {
 
       // Vérification de la présence du paramètre 'id' dans la requête.
       if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).json({ message: `ID unknown ${req.params.id}` })
    }

    if (!req.body.userId) {
        return res.status(400).json({ message: 'UserId unknown !' })
    } else if (!req.body.postId){
        return res.status(400).json({ message: 'postId unknown !' })
    }
   
    try {
        // Recherche du post et vérification.
        let comment = await Comment.findOne({ _id: req.params.id })
        if (comment === null) {
            return res.status(404).json({ message: 'This comment does not exist !' })
        }

        // Mise à jour du post. 
        await Comment.updateOne({ _id: req.params.id }, {...req.body, _id: req.params.id})
        return res.json({ message: 'Comment Updated' })
    } catch (err) {
        return res.status(500).json({ message: 'Data Error', error: err })
    }
}

exports.deleteComments = (req, res) => {

        // Vérification de la présence du paramètre 'id' dans la requête.
        if (!ObjectID.isValid(req.params.id)) {
            return res.status(400).json({ message: `ID unknown ${req.params.id}` })
        }
    
        if (!req.body.userId) {
            return res.status(400).json({ message: 'UserId unknown !' })
        }  else if (!req.body.postId){
            return res.status(400).json({ message: 'postId unknown !' })
        }
    
        // Suppression du post.
        Comment.deleteOne({ _id: req.params.id }) 
            .then(() => res.status(204).json({ message: 'Delete User !' }))
            .catch(err => res.status(500).json({ message: 'Database Error', error: err }))
}


//////////////////////////////////////////////////////:

//Système de like&dislike => ...
