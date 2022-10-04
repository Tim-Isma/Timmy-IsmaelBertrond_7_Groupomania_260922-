// Import des modules. //

const Post = require('../models/post')

const ObjectID = require("mongoose").Types.ObjectId;

// Routage de la ressource post. //

exports.getAllPosts = (req, res) => {
    Post.find()
        .then(posts => res.status(200).json(posts))
        .catch(err => res.status(500).json({ message: 'Database Error', error: err }))
}

exports.getOnePosts = async (req, res) => {

    // Vérification de l'existance du paramètre 'id' dans la requête.
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).json({ message: `ID unknown ${req.params.id}` })
    }

    try {
        // Recherche de l'utilisateur et vérification
        let post = await Post.findOne({ _id: req.params.id })
        if (post === null) {
            return res.status(404).json({ message: 'This post does not exist !' })
        } else {
            return res.status(200).json(post)
        }
        
    } catch (err) {
        return res.status(500).json({ mesage: 'Data Error', error: err })
    }
}

exports.createPosts = async (req, res) => {
    const {userId, post} = req.body

    if (!userId || !post) {
        return res.status(400).json({ message: 'Missing Data'})
    }

    try {
        const postObject = req.body
        const postCreate = new Post ({
            ...postObject
        })

        await postCreate.save()
        return res.status(201).json({ message: 'Post Created' })
    } catch (err) {
        return res.status(500).json({ message: 'Data Error', error: err })
    }
}

exports.updatePosts = async (req, res) => {
   // Vérification de la présence du paramètre 'id' dans la requête.
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).json({ message: `ID unknown ${req.params.id}` })
    }

    if (!req.body.userId) {
        return res.status(400).json({ message: 'UserId unknown !' })
    }
   
    try {
        // Recherche du post et vérification.
        let post = await Post.findOne({ _id: req.params.id })
        if (post === null) {
            return res.status(404).json({ message: 'This user does not exist !' })
        }

        // Mise à jour du post. 
        await Post.updateOne({ _id: req.params.id }, {...req.body, _id: req.params.id})
        return res.json({ message: 'Post Updated' })
    } catch (err) {
        return res.status(500).json({ mesage: 'Data Error', error: err })
    }
}

exports.deletePosts = (req, res) => {

     // Vérification de la présence du paramètre 'id' dans la requête.
    if (!ObjectID.isValid(req.params.id)) {
        return res.status(400).json({ message: `ID unknown ${req.params.id}` })
    }

    if (!req.body.userId) {
        return res.status(400).json({ message: 'UserId unknown !' })
    }

    // Suppression du post.
    Post.deleteOne({ _id: req.params.id }) 
        .then(() => res.status(204).json({ message: 'Delete User !' }))
        .catch(err => res.status(500).json({ message: 'Database Error', error: err }))
}


/////////////////////////////////////////////////////////

exports.like = async (req, res) => {
    
    if (!ObjectID.isValid(req.params.id)) {

        return res.status(400).json({ message: `post ID unknown: ${req.params.id}` }) 

    } else if (!ObjectID.isValid(req.body.userId)) {

        return res.status(400).json({ message: `Liker ID unknown: ${req.body.userId}` }) 

    } else {
    
        try {
            
            const post = await Post.findById(req.params.id)
        
            if (!post.userLiked.includes(req.body.userId)) {
                await post.updateOne(
                {
                    $inc: { likes: 1 }, 
                    $push: { userLiked: req.body.userId} 
                })
              
                return res.status(200).json({ message: 'You like this post' }) 
            }

            if (post.userLiked.includes(req.body.userId)) {
                await post.updateOne(
                {
                    $inc: { likes: -1 }, 
                    $pull: { userLiked: req.body.userId }
                })

                return res.status(200).json({ message: 'You unlike this post' })
            }      
        } catch (err) {
            const {likes, userLiked} = req.body

            if (!likes || !userLiked) {
                return res.status(400).json({ message: 'Bad Request !'})
            }
           
            return res.status(500).json({ message: 'Data Error', error: err })
        }
    }
}

exports.dislike = async (req, res) => {
    
    if (!ObjectID.isValid(req.params.id)) {

        return res.status(400).json({ message: `post ID unknown: ${req.params.id}` }) 

    } else if (!ObjectID.isValid(req.body.userId)) {

        return res.status(400).json({ message: `disliker ID unknown: ${req.body.userId}` }) 

    } else {
    
        try {
            
            const post = await Post.findById(req.params.id)
        
            if (!post.userDisliked.includes(req.body.userId)) {
                await post.updateOne(
                {
                    $inc: { dislikes: 1 }, 
                    $push: { userDisliked: req.body.userId} 
                })
              
                return res.status(200).json({ message: 'You dislike this post' }) 
            }

            if (post.userDisliked.includes(req.body.userId)) {
                await post.updateOne(
                {
                    $inc: { dislikes: -1 }, 
                    $pull: { userDisliked: req.body.userId }
                })

                return res.status(200).json({ message: 'You undislike this post' })
            }      
        } catch (err) {
            const {dislikes, userDisliked} = req.body

            if (!dislikes || !userDisliked) {
                return res.status(400).json({ message: 'Bad Request !'})
            }
           
            return res.status(500).json({ message: 'Data Error', error: err })
        }
    }
}