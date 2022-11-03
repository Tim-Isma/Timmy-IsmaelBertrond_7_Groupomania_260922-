// Import des modules //

const Post = require('../models/post')
const fs = require('fs')
const ObjectID = require("mongoose").Types.ObjectId;


// Routage de la ressource post //

exports.getAllPosts = (req, res) => {
    Post.find().sort({_id:-1})
        .then(posts => res.status(200).json(posts))
        .catch(err => res.status(500).json({ message: 'Database Error !', error: err }))
}

exports.getOnePosts = async (req, res) => {

    // Vérification de l'existance du paramètre 'id' dans la requête //
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).json({ message: `ID unknown: ${req.params.id} !` })
    }

    try {
        // Recherche de l'utilisateur et vérification //
        let post = await Post.findOne({ _id: req.params.id })
        
        if (post === null) {
            return res.status(404).json({ message: 'This post does not exist !' })
        } else {
            return res.status(200).json(post)
        }
        
    } catch (err) {
        return res.status(500).json({ message: 'Database Error !', error: err })
    }
}

exports.createPosts = async (req, res) => {
    
    const {userId, post} = req.body

    // Validation des données reçues //
    if (!userId || !post) {
        return res.status(400).json({ message: 'Missing Data !'})
    }

    try {
        // Création du post //
        const postObject = req.file ? {
            ...req.body,
            picture: `${req.protocol}://${req.get('host')}/images/post/${req.file.filename}`
        } : {...req.body} 

        const postCreate = new Post ({
            ...postObject,
        })
        await postCreate.save()
        return res.status(201).json({ message: 'Post Created !' })
    } catch (err) {
        return res.status(500).json({ message: 'Database Error !', error: err })
    }
}

exports.updatePosts = async (req, res) => {
    console.log(req.body)
    // Vérification de la présence du paramètre 'id' dans la requête //
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).json({ message: `ID unknown: ${req.params.id} !` })
    }

    // Vérification de la présence du userId dans le corps de la requête //
    if (!req.body.userId) {
        return res.status(400).json({ message: `UserId unknown: ${req.body.userId} !` })
    }

    try {
        // Recherche du post et vérification //
        let post = await Post.findOne({ _id: req.params.id })

        if (post === null) {
            return res.status(404).json({ message: 'This user does not exist !' })
        }

        const postObject = req.file ? {
            ...req.body,
            picture: `${req.protocol}://${req.get('host')}/images/post/${req.file.filename}`
        } : { ...req.body }


        // Mise à jour du post // 
        await Post.updateOne(
            { _id: req.params.id },
            { ...postObject }
        )

        return res.json({ message: 'Post Updated !' })
    } catch (err) {
        return res.status(500).json({ message: 'Database Error !', error: err })
    }
}

exports.deletePosts = (req, res) => {

     // Vérification de la présence du paramètre 'id' dans la requête //
     if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).json({ message: `ID unknown: ${req.params.id} !` })
    }

    // Recup post avec id
    Post.findOne({ _id: req.params.id })
        .then((post) => {
            
            // Vérification si le post existe
            if (post === null) {
                return res.status(404).json({ message: 'This post does not exist !' })
            } 

            // Empêcher n'importe qu'elle utilisateur de delete une post
            if (!post) {
                res.status(404).json({
                    error: new Error('No such Post!')
                });
            }
            
            
            if (req.file) {
                const filename = post.picture.split('/images/post/') [1]
                fs.unlink(`images/post/${filename}`, () => {

                    Post.deleteOne({ _id: req.params.id })
                        .then(() => res.status(200).json({ message: "Post supprimé !" }))
                        .catch((error) => res.status(400).json({ error }));
                });
            } else {
                Post.deleteOne({ _id: req.params.id })
                    .then(() => res.status(200).json({ message: "Post supprimé !" }))
                    .catch((error) => res.status(400).json({ error }));
            }

        })
        .catch((error) => res.status(500).json({ error }));
}

/////////////////////////////////////////////////////////

exports.like = async (req, res) => {
    
    // Vérification des 'ID' //
    if (!ObjectID.isValid(req.params.id)) {

        return res.status(400).json({ message: `post ID unknown: ${req.params.id} !` }) 

    } else if (!ObjectID.isValid(req.body.userId)) {

        return res.status(400).json({ message: `Liker ID unknown: ${req.body.userId} !` }) 
    } 
    
    try {
        // Recherche et vérification du post //
        const post = await Post.findById(req.params.id)
    
        // Vérification si l'utilisateur a déjà disliker le post //
        if (post.userDisliked.includes(req.body.userId)) {
            return await res.status(400).json({ message: `You can't like because you already disliked !`})
        }
        // Vérification si l'utilisateur a déjà liker le post //
        if (!post.userLiked.includes(req.body.userId)) {
            // On ajoute le like + le userId de l'utilisateur qui a liker dans le tableau 'userLiked' //
            await post.updateOne(
            {
                $inc: { likes: 1 }, 
                $push: { userLiked: req.body.userId} 
            })
          
            return res.status(200).json({ message: 'like post !' }) 
        }
        // Vérification si l'utilisateur a déjà liker le post //
        if (post.userLiked.includes(req.body.userId)) {
            // On supprime le like + le userId de l'utilisateur qui a unliker dans le tableau 'userLiked' //
            await post.updateOne(
            {
                $inc: { likes: -1 }, 
                $pull: { userLiked: req.body.userId }
            })
            return res.status(200).json({ message: 'unlike post !' })
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

exports.dislike = async (req, res) => {
    
    // Vérification des 'ID' //
    if (!ObjectID.isValid(req.params.id)) {

        return res.status(400).json({ message: `post ID unknown: ${req.params.id} !` }) 

    } else if (!ObjectID.isValid(req.body.userId)) {

        return res.status(400).json({ message: `disliker ID unknown: ${req.body.userId} !` }) 
    } 
    
    try {
        // Recherche du post et vérification //
        const post = await Post.findById(req.params.id)
        // Vérification si l'utilisateur a déjà liker le post //
        if (post.userLiked.includes(req.body.userId)) {
            return await res.status(400).json({ message: `You can't dislike because you already liked !`})
        }
    
        // Vérification si l'utilisateur a déjà disliker le post //
        if (!post.userDisliked.includes(req.body.userId)) {
            // On ajoute le like + le userId de l'utilisateur qui a disliker dans le tableau 'userDisliked' //
            await post.updateOne(
            {
                $inc: { dislikes: 1 }, 
                $push: { userDisliked: req.body.userId} 
            })
          
            return res.status(200).json({ message: 'dislike post !' }) 
        }
        // Vérification si l'utilisateur a déjà disliker le post //
        if (post.userDisliked.includes(req.body.userId)) {
            // On supprime le like + le userId de l'utilisateur qui a undisliker dans le tableau 'userDisliked' //
            await post.updateOne(
            {
                $inc: { dislikes: -1 }, 
                $pull: { userDisliked: req.body.userId }
            })
            return res.status(200).json({ message: 'undislike post !' })
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

