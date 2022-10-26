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

let updatePost = (post) => {
    return Axios.patch('/posts/'+post._id, post)
}

let deletePost = (post) => {
    return Axios.delete('/posts/'+post._id, post)
}

let likePost = (postId, userId) => {
    return Axios.put('/posts/like/'+postId, {userId: userId})
}

let dislikePost = (post) => {
    return Axios.put('/posts/dislike/'+post._id, post)
}

export const postService = {
    getAllPosts, getOnePost, createPost, updatePost, deletePost, likePost, dislikePost
}