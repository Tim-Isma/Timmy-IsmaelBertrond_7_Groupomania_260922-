// Import des modules //

const Comment = require('../models/comment')

const ObjectID = require("mongoose").Types.ObjectId;

// Routage de la ressource post //

exports.getAllComments = (req, res) => {
    Comment.find()
        .then(comments => res.status(200).json(comments))
        .catch(err => res.status(500).json({ message: 'Database Error !', error: err }))
}

exports.getOneComments = async (req, res) => {

    // Vérification de l'existance du paramètre 'id' dans la requête.
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).json({ message: `ID unknown: ${req.params.id} !` })
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
        return res.status(500).json({ mesage: 'Database Error !', error: err })
    }
}

exports.createComments = async (req, res) => {

    const {userId, postId, comment} = req.body

    // Validation des données reçues //
    if (!userId || !postId || !comment) {
        return res.status(400).json({ message: 'Missing Data !'})
    }
  
    try {
        // Création du commentaire //
        const commentObject = req.body
        const commentCreate = new Comment ({
            ...commentObject
        })

        await commentCreate.save()
        return res.status(201).json({ message: 'Comment Created !' })
    } catch (err) {
        return res.status(500).json({ message: 'Database Error !', error: err })
    }
}

exports.updateComments = async (req, res) => {
 
    // Vérification de la présence du paramètre 'id' dans la requête //
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).json({ message: `ID unknown: ${req.params.id} !` })
    }

    // Vérification de la présence du userId et postId dans le corps de la requête //
    if (!req.body.userId) {
        return res.status(400).json({ message: `UserId unknown: ${req.body.userId} !` })
    } else if (!req.body.postId) {
        return res.status(400).json({ message: `postId unknown: ${req.body.postId} !` })
    }
   
    try {
        // Recherche du commentaire et vérification //
        let comment = await Comment.findOne({ _id: req.params.id })
        
        if (comment === null) {
            return res.status(404).json({ message: 'This comment does not exist !' })
        }

        // Mise à jour du commentaire // 
        await Comment.updateOne(
            { _id: req.params.id }, 
            {...req.body, _id: req.params.id}
        )

        return res.json({ message: 'Comment Updated !' })
    } catch (err) {
        return res.status(500).json({ message: 'Database Error !', error: err })
    }
}

exports.deleteComments = (req, res) => {

        // Vérification de la présence du paramètre 'id' dans la requête //
        if (!ObjectID.isValid(req.params.id)) {
            return res.status(400).json({ message: `ID unknown: ${req.params.id} !` })
        }

        // Vérification de la présence du userId et postId dans le corps de la requête //
        if (!req.body.userId) {
            return res.status(400).json({ message: `UserId unknown: ${req.body.userId} !` })
        }  else if (!req.body.postId){
            return res.status(400).json({ message: `postId unknown: ${req.body.postId} !` })
        }
    
        // Suppression du commentaire //
        Comment.deleteOne({ _id: req.params.id }) 
            .then(() => res.status(204).json({ message: 'Delete User !' }))
            .catch(err => res.status(500).json({ message: 'Database Error !', error: err }))
}

//////////////////////////////////////////////////////:

exports.like = async (req, res) => {
    
    // Vérification des 'ID' //
    if (!ObjectID.isValid(req.params.id)) {

        return res.status(400).json({ message: `Comment ID unknown: ${req.params.id} !` }) 

    } else if (!ObjectID.isValid(req.body.userId)) {

        return res.status(400).json({ message: `Liker ID unknown: ${req.body.userId} !` })
    
    } else if (!ObjectID.isValid(req.body.postId)) {

        return res.status(400).json({ message: `Post ID unknown: ${req.body.postId} !` })

    } else {
    
        try {
            // Recherche et vérification du commentaire //
            const comment = await Comment.findById(req.params.id)
            
            // Vérification si l'utilisateur a déjà disliker le commentaire //
            if (comment.userDisliked.includes(req.body.userId)) {
                return await res.status(400).json({ message: `You can't like because you already disliked !`})
            }
        
            // Vérification si l'utilisateur a déjà liker le commentaire //
            if (!comment.userLiked.includes(req.body.userId)) {
                // On ajoute le like + le userId de l'utilisateur qui a liker dans le tableau 'userLiked' //
                await comment.updateOne(
                {
                    $inc: { likes: 1 }, 
                    $push: { userLiked: req.body.userId} 
                })
              
                return res.status(200).json({ message: 'You like this comment !' }) 
            }

            // Vérification si l'utilisateur a déjà liker le commentaire //
            if (comment.userLiked.includes(req.body.userId)) {
                // On supprime le like + le userId de l'utilisateur qui a unliker dans le tableau 'userLiked' //
                await comment.updateOne(
                {
                    $inc: { likes: -1 }, 
                    $pull: { userLiked: req.body.userId }
                })

                return res.status(200).json({ message: 'You unlike this comment !' })
            }      
        } catch (err) {
            const {likes, userLiked} = req.body

            // Vérification des paramètres likes et userLiked sont inexistants on renvoie une erreur 400 //
            if (!likes || !userLiked) {
                return res.status(400).json({ message: 'Bad Request !'})
            }
           
            return res.status(500).json({ message: 'Database Error !', error: err })
        }
    }
}

exports.dislike = async (req, res) => {
    
    // Vérification des 'ID' //
    if (!ObjectID.isValid(req.params.id)) {

        return res.status(400).json({ message: `Comment ID unknown: ${req.params.id}` }) 

    } else if (!ObjectID.isValid(req.body.userId)) {

        return res.status(400).json({ message: `Disliker ID unknown: ${req.body.userId}` }) 

    } else if (!ObjectID.isValid(req.body.postId)) {

        return res.status(400).json({ message: `Post ID unknown: ${req.body.postId}` })

    } else {
    
        try {
            // Recherche du commentaire et vérification //
            const comment = await Comment.findById(req.params.id)

            // Vérification si l'utilisateur a déjà liker le commentaire //
            if (comment.userLiked.includes(req.body.userId)) {
                return await res.status(400).json({ message: `You can't dislike because you already liked !`})
            }
        
            // Vérification si l'utilisateur a déjà disliker le commentaire //
            if (!comment.userDisliked.includes(req.body.userId)) {
                // On ajoute le like + le userId de l'utilisateur qui a disliker dans le tableau 'userDisliked' //
                await comment.updateOne(
                {
                    $inc: { dislikes: 1 }, 
                    $push: { userDisliked: req.body.userId} 
                })
              
                return res.status(200).json({ message: 'You dislike this comment' }) 
            }

            // Vérification si l'utilisateur a déjà disliker le commentaire //
            if (comment.userDisliked.includes(req.body.userId)) {
                // On supprime le like + le userId de l'utilisateur qui a undisliker dans le tableau 'userDisliked' //
                await comment.updateOne(
                {
                    $inc: { dislikes: -1 }, 
                    $pull: { userDisliked: req.body.userId }
                })

                return res.status(200).json({ message: 'You undislike this comment' })
            }      
        } catch (err) {
            const {dislikes, userDisliked} = req.body

            // Vérification des paramètres dislikes et userDisliked sont inexistants on renvoie une erreur 400 //
            if (!dislikes || !userDisliked) {
                return res.status(400).json({ message: 'Bad Request !'})
            }
           
            return res.status(500).json({ message: 'Database Error !', error: err })
        }
    }
}
