import Axios from "./caller.service";

let getAllPosts = () => {
    return Axios.get('/posts')
}

let getOnePost = () => {
    return Axios.get('/posts/me')
}

let createPost = () => {
    return Axios.put('/posts')
}

let updatePost = () => {
    return Axios.patch('/posts/me')
}

let deletePost = () => {
    return Axios.delete('/posts/me')
}

export const postService = {
    getAllPosts, getOnePost, createPost, updatePost, deletePost
}