import Axios from "./caller.service";

let getAllPosts = () => {
    return Axios.get('/posts')
}

let getOnePost = () => {
    return Axios.get('/posts/')
}

let createPost = (post) => {
    return Axios.put('/posts', post)
}

let updatePost = (postId, userId, post) => {
    return Axios.patch('/posts/'+postId, {userId: userId, post: post})
}

let deletePost = (postId, userId) => {
    return Axios.delete('/posts/'+postId, {userId: userId})
}

/*///////////////////////////////////*/

let likePost = (postId, userId) => {
    return Axios.put('/posts/like/'+postId, {userId: userId})
}

let dislikePost = (postId, userId) => {
    return Axios.put('/posts/dislike/'+postId, {userId: userId})
}

export const postService = {
    getAllPosts, getOnePost, createPost, updatePost, deletePost, likePost, dislikePost
}